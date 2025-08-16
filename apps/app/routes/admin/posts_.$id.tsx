/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-LicenseText: MIT */

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { usePost } from "@/lib/blog-queries";

export const Route = createFileRoute("/admin/posts/$id")({
  component: ViewPost,
});

function ViewPost() {
  const { id } = Route.useParams();

  const { data: post, isLoading, error } = usePost(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading post: {error.message}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">View Post</h2>
          <p className="mt-1 text-sm text-gray-600">View and review your blog post.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            to="/admin/posts"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="-ml-1 mr-2 h-4 w-4" />
            Back to Posts
          </Link>
          <Link
            to={`/admin/posts/${id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Edit className="-ml-1 mr-2 h-4 w-4" />
            Edit Post
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {post.featuredImage && (
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  post.status === "published"
                    ? "bg-green-100 text-green-800"
                    : post.status === "draft"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {post.status}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Created {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {post.excerpt && (
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="text-gray-700 italic">{post.excerpt}</p>
            </div>
          )}

          <div className="prose max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <p>
                <strong>Author:</strong> {post.author?.name || post.author?.email}
              </p>
              <p>
                <strong>Created:</strong> {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.updatedAt && (
                <p>
                  <strong>Last updated:</strong> {new Date(post.updatedAt).toLocaleDateString()}
                </p>
              )}
              {post.publishedAt && (
                <p>
                  <strong>Published:</strong> {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}