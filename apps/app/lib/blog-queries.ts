/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { trpc } from "./trpc";

// Query keys factory
export const blogKeys = {
  all: ["blog"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (filters: any) => [...blogKeys.lists(), filters] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (id: string) => [...blogKeys.details(), id] as const,
};

// Hook for fetching all posts with pagination and filtering
export function usePosts(filters?: {
  limit?: number;
  cursor?: string;
  status?: "draft" | "published" | "archived";
  search?: string;
}) {
  return useQuery({
    queryKey: blogKeys.list(filters || {}),
    queryFn: () => trpc.blog.list.query({
      limit: filters?.limit || 10,
      cursor: filters?.cursor,
      status: filters?.status,
      search: filters?.search,
    }),
  });
}

// Hook for fetching a single post
export function usePost(id: string) {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => trpc.blog.get.query({ id }),
    enabled: !!id,
  });
}

// Hook for fetching a post by slug
export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: [...blogKeys.details(), "slug", slug],
    queryFn: () => trpc.blog.getBySlug.query({ slug }),
    enabled: !!slug,
  });
}

// Hook for fetching user's own posts
export function useMyPosts(filters?: {
  limit?: number;
  cursor?: string;
  status?: "draft" | "published" | "archived";
  search?: string;
}) {
  return useQuery({
    queryKey: [...blogKeys.lists(), "my-posts", filters || {}],
    queryFn: () => trpc.blog.myPosts.query({
      limit: filters?.limit || 10,
      cursor: filters?.cursor,
      status: filters?.status,
      search: filters?.search,
    }),
  });
}

// Hook for creating a new post
export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: trpc.blog.create.mutate,
    onSuccess: () => {
      // Invalidate all post lists to refresh the data
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...blogKeys.lists(), "my-posts"] });
    },
  });
}

// Hook for updating a post
export function useUpdatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: trpc.blog.update.mutate,
    onSuccess: (data) => {
      // Invalidate the specific post and all lists
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...blogKeys.lists(), "my-posts"] });
    },
  });
}

// Hook for deleting a post
export function useDeletePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: trpc.blog.delete.mutate,
    onSuccess: () => {
      // Invalidate all post lists
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...blogKeys.lists(), "my-posts"] });
    },
  });
}

// Optimistic updates helper
export function useOptimisticPostUpdate() {
  const queryClient = useQueryClient();

  return {
    updatePost: async (variables: Parameters<typeof trpc.blog.update.mutate>[0]) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: blogKeys.detail(variables.id) });

      // Snapshot the previous value
      const previousPost = queryClient.getQueryData(blogKeys.detail(variables.id));

      // Optimistically update the cache
      queryClient.setQueryData(blogKeys.detail(variables.id), (old: any) => ({
        ...old,
        ...variables,
      }));

      return { previousPost };
    },

    onError: (error: any, variables: any, context: any) => {
      // Rollback on error
      if (context?.previousPost) {
        queryClient.setQueryData(blogKeys.detail(variables.id), context.previousPost);
      }
    },

    onSettled: (data: any, error: any, variables: any) => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(variables.id) });
    },
  };
}