/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../lib/trpc.js";

// Input schemas
const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(500, "Excerpt is too long").optional(),
  featuredImage: z.string().url("Must be a valid URL").optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().uuid("Invalid post ID"),
});

const getPostSchema = z.object({
  id: z.string().uuid("Invalid post ID"),
});

const listPostsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  cursor: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  search: z.string().optional(),
});

const deletePostSchema = z.object({
  id: z.string().uuid("Invalid post ID"),
});

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const blogRouter = router({
  // Create a new blog post
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ input, ctx }) => {
      const slug = generateSlug(input.title);
      
      // Check if slug already exists
      const existingPost = await ctx.db.query.post.findFirst({
        where: (post, { eq }) => eq(post.slug, slug),
      });

      if (existingPost) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A post with this title already exists",
        });
      }

      const [newPost] = await ctx.db
        .insert(ctx.schema.post)
        .values({
          ...input,
          slug,
          authorId: ctx.user.id,
          publishedAt: input.status === "published" ? new Date() : null,
        })
        .returning();

      return {
        ...newPost,
        author: {
          id: ctx.user.id,
          name: ctx.user.name,
          email: ctx.user.email,
        },
      };
    }),

  // Get a single blog post by ID
  get: protectedProcedure
    .input(getPostSchema)
    .query(async ({ input, ctx }) => {
      const post = await ctx.db.query.post.findFirst({
        where: (post, { eq }) => eq(post.id, input.id),
        with: {
          author: {
            columns: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      return post;
    }),

  // Get a single blog post by slug
  getBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.db.query.post.findFirst({
        where: (post, { eq }) => eq(post.slug, input.slug),
        with: {
          author: {
            columns: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      return post;
    }),

  // List blog posts with pagination and filtering
  list: protectedProcedure
    .input(listPostsSchema)
    .query(async ({ input, ctx }) => {
      const { limit, cursor, status, search } = input;

      let query = ctx.db.query.post.findMany({
        limit: limit + 1, // Get one extra to check if there's a next page
        with: {
          author: {
            columns: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: (post, { desc }) => [desc(post.createdAt)],
      });

      // Apply status filter
      if (status) {
        query = ctx.db.query.post.findMany({
          where: (post, { eq }) => eq(post.status, status),
          limit: limit + 1,
          with: {
            author: {
              columns: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: (post, { desc }) => [desc(post.createdAt)],
        });
      }

      // Apply search filter
      if (search) {
        query = ctx.db.query.post.findMany({
          where: (post, { or, ilike }) => or(
            ilike(post.title, `%${search}%`),
            ilike(post.content, `%${search}%`),
            ilike(post.excerpt, `%${search}%`)
          ),
          limit: limit + 1,
          with: {
            author: {
              columns: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: (post, { desc }) => [desc(post.createdAt)],
        });
      }

      // Apply both status and search filters
      if (status && search) {
        query = ctx.db.query.post.findMany({
          where: (post, { and, eq, or, ilike }) => and(
            eq(post.status, status),
            or(
              ilike(post.title, `%${search}%`),
              ilike(post.content, `%${search}%`),
              ilike(post.excerpt, `%${search}%`)
            )
          ),
          limit: limit + 1,
          with: {
            author: {
              columns: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: (post, { desc }) => [desc(post.createdAt)],
        });
      }

      const posts = await query;

      let nextCursor: string | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),

  // Update a blog post
  update: protectedProcedure
    .input(updatePostSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;

      // Check if post exists
      const existingPost = await ctx.db.query.post.findFirst({
        where: (post, { eq }) => eq(post.id, id),
      });

      if (!existingPost) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      // Check authorization - only author can update
      if (existingPost.authorId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only update your own posts",
        });
      }

      // Handle slug generation if title is being updated
      let slug = existingPost.slug;
      if (updateData.title && updateData.title !== existingPost.title) {
        slug = generateSlug(updateData.title);
        
        // Check if new slug already exists (excluding current post)
        const slugExists = await ctx.db.query.post.findFirst({
          where: (post, { and, eq, ne }) => and(
            eq(post.slug, slug),
            ne(post.id, id)
          ),
        });

        if (slugExists) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A post with this title already exists",
          });
        }
      }

      const [updatedPost] = await ctx.db
        .update(ctx.schema.post)
        .set({
          ...updateData,
          slug,
          updatedAt: new Date(),
          publishedAt: updateData.status === "published" && !existingPost.publishedAt 
            ? new Date() 
            : updateData.status === "draft" 
              ? null 
              : existingPost.publishedAt,
        })
        .where((post, { eq }) => eq(post.id, id))
        .returning();

      return {
        ...updatedPost,
        author: {
          id: ctx.user.id,
          name: ctx.user.name,
          email: ctx.user.email,
        },
      };
    }),

  // Delete a blog post
  delete: protectedProcedure
    .input(deletePostSchema)
    .mutation(async ({ input, ctx }) => {
      // Check if post exists
      const existingPost = await ctx.db.query.post.findFirst({
        where: (post, { eq }) => eq(post.id, input.id),
      });

      if (!existingPost) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      // Check authorization - only author can delete
      if (existingPost.authorId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete your own posts",
        });
      }

      await ctx.db
        .delete(ctx.schema.post)
        .where((post, { eq }) => eq(post.id, input.id));

      return { success: true };
    }),

  // Get posts by current user
  myPosts: protectedProcedure
    .input(listPostsSchema)
    .query(async ({ input, ctx }) => {
      const { limit, cursor, status, search } = input;

      let query = ctx.db.query.post.findMany({
        where: (post, { eq }) => eq(post.authorId, ctx.user.id),
        limit: limit + 1,
        with: {
          author: {
            columns: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: (post, { desc }) => [desc(post.createdAt)],
      });

      if (status) {
        query = ctx.db.query.post.findMany({
          where: (post, { and, eq }) => and(
            eq(post.authorId, ctx.user.id),
            eq(post.status, status)
          ),
          limit: limit + 1,
          with: {
            author: {
              columns: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: (post, { desc }) => [desc(post.createdAt)],
        });
      }

      if (search) {
        query = ctx.db.query.post.findMany({
          where: (post, { and, eq, or, ilike }) => and(
            eq(post.authorId, ctx.user.id),
            or(
              ilike(post.title, `%${search}%`),
              ilike(post.content, `%${search}%`),
              ilike(post.excerpt, `%${search}%`)
            )
          ),
          limit: limit + 1,
          with: {
            author: {
              columns: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: (post, { desc }) => [desc(post.createdAt)],
        });
      }

      const posts = await query;

      let nextCursor: string | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
});