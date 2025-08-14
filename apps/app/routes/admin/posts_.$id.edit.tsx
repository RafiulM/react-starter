/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-LicenseText: MIT */

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { usePost, useUpdatePost } from "@/lib/blog-queries";

export const Route = createFileRoute("/admin/posts/$id/edit")({
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">("draft");

  // Fetch the existing post
  const { data: post, isLoading, error } = usePost(id);

  // Update mutation
  const updateMutation = useUpdatePost();

  // Populate form with existing post data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setExcerpt(post.excerpt || "");
      setFeaturedImage(post.featuredImage || "");
      setStatus(post.status);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      id,
      title,
      content,
      excerpt: excerpt || undefined,
      featuredImage: featuredImage || undefined,
      status,
    });
  };

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

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Post</h2>
          <p className="mt-1 text-sm text-gray-600">Update your blog post content.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            to="/admin/posts"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="-ml-1 mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                Excerpt</label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                maxLength={500}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of the post (optional)"
              />
              <p className="mt-1 text-sm text-gray-500">
                {excerpt.length}/500 characters
              </p>
            </div>

            <div>
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">
                Featured Image URL</label>
              <input
                type="url"
                id="featuredImage"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content *</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your post content here..."
              />
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "draft" | "published" | "archived")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Link
              to="/admin/posts"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="-ml-1 mr-2 h-4 w-4" />
              {updateMutation.isPending ? "Updating..." : "Update Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}