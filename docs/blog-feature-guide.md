# Blog Feature Usage Guide

This guide covers how to use the new blog application feature, including the admin dashboard for CRUD operations and client-side data fetching with TanStack Query.

## Overview

The blog feature provides a complete content management system with:
- **Admin Dashboard**: Full CRUD operations for blog posts
- **Client-side Fetching**: Optimized data fetching with TanStack Query
- **Status Management**: Draft, published, and archived states
- **Search & Filtering**: Find posts by title, content, or status
- **Responsive Design**: Works on all devices

## Quick Start

1. **Start the development servers:**
   ```bash
   # Terminal 1: Start the API
   cd apps/api && bun dev
   
   # Terminal 2: Start the web app
   cd apps/app && bun dev
   ```

2. **Access the admin dashboard:**
   - Navigate to `http://localhost:5173/admin/posts`
   - Log in with your credentials
   - Start managing your blog posts

## Admin Dashboard Guide

### Accessing the Dashboard

The admin dashboard is located at `/admin/posts` in the web application. You'll need to:

1. **Navigate to the admin area** by visiting `/admin/posts`
2. **Authenticate** using your existing user account
3. **View the posts list** with real-time updates

### Creating a New Post

1. **Click "New Post"** in the admin dashboard
2. **Fill in the required fields:**
   - **Title**: The post title (required)
   - **Content**: The main post content (required)
   - **Excerpt**: Brief summary (optional)
   - **Status**: Choose from draft, published, or archived

3. **Save the post** using one of these options:
   - **Save as Draft**: Creates the post in draft state
   - **Publish**: Creates and immediately publishes the post
   - **Save**: Uses the selected status

4. **The post will appear** in the list with an optimistic update

### Editing Existing Posts

1. **Find the post** in the admin posts list
2. **Click "Edit"** next to the post you want to modify
3. **Make your changes** to any field:
   - Title, content, excerpt, or status
   - Changes are tracked in real-time

4. **Update the post**:
   - Click "Update Post" to save changes
   - The UI will update immediately with optimistic updates
   - No page refresh needed

### Deleting Posts

1. **Locate the post** in the admin posts list
2. **Click "Delete"** next to the post
3. **Confirm deletion** in the confirmation dialog
4. **Post is removed** from the list with optimistic updates

### Searching and Filtering

The admin dashboard includes powerful search and filtering:

- **Search by title**: Type in the search box to find posts by title
- **Filter by status**: Use the status dropdown to show only draft, published, or archived posts
- **Real-time results**: Updates happen instantly as you type or select filters

## Client-Side Data Fetching with TanStack Query

### How It Works

The blog feature uses TanStack Query (formerly React Query) for efficient client-side data management:

- **Caching**: Posts are cached to reduce API calls
- **Optimistic Updates**: UI updates immediately before server confirmation
- **Background Refetching**: Data stays fresh automatically
- **Error Handling**: Graceful fallbacks for network issues

### Key Query Hooks

#### `usePostsQuery`
Fetches all posts with optional filtering:

```typescript
import { usePostsQuery } from '@/lib/blog-queries';

// Basic usage
const { data: posts, isLoading, error } = usePostsQuery();

// With search and filter
const { data: posts } = usePostsQuery({
  search: 'react',
  status: 'published'
});
```

#### `usePostQuery`
Fetches a single post by ID:

```typescript
import { usePostQuery } from '@/lib/blog-queries';

const { data: post, isLoading } = usePostQuery({ id: 'post-id-123' });
```

#### `useCreatePostMutation`
Creates a new post with optimistic updates:

```typescript
import { useCreatePostMutation } from '@/lib/blog-queries';

const createPost = useCreatePostMutation();

// Usage
await createPost.mutateAsync({
  title: 'My New Post',
  content: 'Post content here...',
  status: 'published'
});
```

#### `useUpdatePostMutation`
Updates an existing post:

```typescript
import { useUpdatePostMutation } from '@/lib/blog-queries';

const updatePost = useUpdatePostMutation();

// Usage
await updatePost.mutateAsync({
  id: 'post-id-123',
  data: {
    title: 'Updated Title',
    content: 'Updated content...'
  }
});
```

#### `useDeletePostMutation`
Deletes a post with confirmation:

```typescript
import { useDeletePostMutation } from '@/lib/blog-queries';

const deletePost = useDeletePostMutation();

// Usage
await deletePost.mutateAsync({ id: 'post-id-123' });
```

### Cache Invalidation

TanStack Query automatically handles cache invalidation:

- **Post creation**: Updates the posts list cache
- **Post update**: Updates both individual post and posts list caches
- **Post deletion**: Removes from both caches
- **Manual refresh**: Use `queryClient.invalidateQueries()` when needed

## API Endpoints Reference

### Authentication
All endpoints require JWT authentication via Bearer token:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### GET /api/posts
Retrieve all posts with optional filtering:
```typescript
// Request
GET /api/posts?search=react&status=published

// Response
{
  "posts": [
    {
      "id": "post-id-123",
      "title": "My Post",
      "content": "Post content...",
      "excerpt": "Brief summary",
      "status": "published",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET /api/posts/:id
Retrieve a single post:
```typescript
// Request
GET /api/posts/post-id-123

// Response
{
  "post": {
    "id": "post-id-123",
    "title": "My Post",
    "content": "Post content...",
    "excerpt": "Brief summary",
    "status": "published",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### POST /api/posts
Create a new post:
```typescript
// Request
POST /api/posts
Content-Type: application/json

{
  "title": "New Post",
  "content": "Post content...",
  "excerpt": "Brief summary",
  "status": "draft"
}

// Response
{
  "post": {
    "id": "new-post-id",
    "title": "New Post",
    "content": "Post content...",
    "excerpt": "Brief summary",
    "status": "draft",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PATCH /api/posts/:id
Update an existing post:
```typescript
// Request
PATCH /api/posts/post-id-123
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "published"
}

// Response
{
  "post": {
    "id": "post-id-123",
    "title": "Updated Title",
    "content": "Updated content...",
    "status": "published",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### DELETE /api/posts/:id
Delete a post:
```typescript
// Request
DELETE /api/posts/post-id-123

// Response
{
  "success": true
}
```

## Error Handling

The application includes comprehensive error handling:

### Client-side Errors
- **Network errors**: Automatic retry with exponential backoff
- **Validation errors**: Clear form validation messages
- **Permission errors**: Graceful handling of unauthorized access

### API Errors
Common error responses:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": {
      "field": "title",
      "value": ""
    }
  }
}
```

## Development Tips

### Testing the Feature

1. **Use the seeded data**: The database includes sample posts for testing
2. **Check the network tab**: Monitor TanStack Query requests in browser dev tools
3. **Test offline behavior**: Disable network to see caching in action
4. **Try rapid actions**: Create/edit/delete posts quickly to test optimistic updates

### Common Issues

- **CORS errors**: Ensure the API is running on the correct port
- **Authentication failures**: Check your JWT token is valid
- **Cache issues**: Use React Query DevTools to inspect cache state

### Performance Optimization

- **Pagination**: Large post lists use cursor-based pagination
- **Debounced search**: Search inputs are debounced to reduce API calls
- **Selective fetching**: Only requested fields are fetched from the database

## Next Steps

1. **Customize the UI**: Modify components in `apps/app/routes/admin/`
2. **Add new fields**: Extend the schema in `db/schema/post.ts`
3. **Implement tags**: Add tagging system for better organization
4. **Add rich text**: Integrate a rich text editor for better content creation

## Support

If you encounter issues:
- Check the browser console for error messages
- Verify API connectivity at `http://localhost:3000/api/health`
- Review the TanStack Query DevTools for cache inspection
- Consult the project README for setup instructions