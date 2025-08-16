# Blog App Implementation

This document describes the complete blog app implementation with CRUD functionality, database migrations, API endpoints, and TanStack Query integration.

## 📁 Project Structure

### Database Schema
- **Location**: `db/schema/post.ts`
- **Migration**: `db/migrations/0001_create_posts_table.sql`
- **Features**: PostgreSQL schema with UUID primary keys, status enum, timestamps, and author relationships

### API Endpoints
- **Location**: `apps/api/routers/blog.ts`
- **Type**: tRPC endpoints for type-safe API calls
- **Authentication**: JWT protection via Better Auth
- **CRUD Operations**: Create, Read (single/list), Update, Delete

### Admin Dashboard UI
- **Location**: `apps/app/routes/admin/`
- **Routes**:
  - `/admin/posts` - List all posts
  - `/admin/posts/new` - Create new post
  - `/admin/posts/:id` - View post
  - `/admin/posts/:id/edit` - Edit post

### TanStack Query Integration
- **Location**: `apps/app/lib/blog-queries.ts`
- **Features**: Custom hooks, cache invalidation, optimistic updates

## 🚀 Getting Started

### 1. Database Setup
```bash
# Install dependencies
bun install

# Run database migrations (when DATABASE_URL is configured)
bun --filter @repo/db migrate
```

### 2. Start Development Servers
```bash
# Start API server
bun dev:api

# Start frontend app
bun dev:web
```

## 📋 Features Implemented

### Database Features
- ✅ Complete blog posts table schema
- ✅ UUID primary keys for security
- ✅ Status management (draft/published/archived)
- ✅ Author relationships with foreign keys
- ✅ Timestamps (created_at, updated_at, published_at)
- ✅ Slug generation for SEO-friendly URLs
- ✅ Content and excerpt fields
- ✅ Featured image support

### API Features
- ✅ RESTful tRPC endpoints
- ✅ JWT authentication protection
- ✅ Input validation with Zod
- ✅ Error handling with proper HTTP codes
- ✅ Pagination support
- ✅ Search functionality
- ✅ Status filtering
- ✅ Author authorization (users can only edit/delete their own posts)

### Admin UI Features
- ✅ Responsive dashboard layout
- ✅ Post listing with search and filtering
- ✅ Create new posts with rich form
- ✅ Edit existing posts
- ✅ View individual posts
- ✅ Delete posts with confirmation
- ✅ Status badges and visual indicators
- ✅ Loading states and error handling

### TanStack Query Features
- ✅ Type-safe data fetching
- ✅ Automatic cache invalidation
- ✅ Optimistic updates
- ✅ Loading and error states
- ✅ Custom query hooks for reusability
- ✅ Pagination support
- ✅ Real-time data synchronization

## 🛠️ Usage Examples

### Creating a New Post
```typescript
import { useCreatePost } from '@/lib/blog-queries';

const createPost = useCreatePost();

createPost.mutate({
  title: "My New Blog Post",
  content: "This is the content...",
  status: "published"
});
```

### Fetching Posts with Filters
```typescript
import { usePosts } from '@/lib/blog-queries';

const { data, isLoading, error } = usePosts({
  limit: 10,
  status: "published",
  search: "react"
});
```

### Updating a Post
```typescript
import { useUpdatePost } from '@/lib/blog-queries';

const updatePost = useUpdatePost();

updatePost.mutate({
  id: "post-id",
  title: "Updated Title",
  status: "published"
});
```

## 🔧 API Endpoints

### Blog Router Endpoints
- `blog.create` - Create a new post
- `blog.get` - Get a single post by ID
- `blog.getBySlug` - Get a post by slug
- `blog.list` - List posts with pagination and filtering
- `blog.update` - Update an existing post
- `blog.delete` - Delete a post
- `blog.myPosts` - Get posts by the current user

### Request/Response Examples

#### Create Post
```json
{
  "title": "Getting Started with React",
  "content": "React is a JavaScript library...",
  "excerpt": "Learn the basics of React",
  "featuredImage": "https://example.com/image.jpg",
  "status": "published"
}
```

#### List Posts Response
```json
{
  "posts": [
    {
      "id": "uuid",
      "title": "Post Title",
      "slug": "post-title",
      "content": "Post content...",
      "status": "published",
      "author": {
        "id": "user-id",
        "name": "Author Name",
        "email": "author@example.com"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "nextCursor": "cursor-for-pagination"
}
```

## 🎨 UI Components

### Admin Dashboard Components
- **PostList**: Table view with search, filter, and actions
- **PostForm**: Create/edit form with validation
- **PostView**: Detailed post view with metadata
- **StatusBadge**: Visual status indicators
- **LoadingSpinner**: Loading states

## 🔄 Cache Management

The TanStack Query integration includes:
- Automatic cache invalidation after mutations
- Optimistic updates for better UX
- Query key management for consistent caching
- Background refetching for stale data

## 🛡️ Security Features

- JWT authentication required for all admin endpoints
- Users can only modify their own posts
- Input validation with Zod schemas
- SQL injection prevention via parameterized queries
- XSS protection through proper content escaping

## 📊 Testing Strategy

### Database Tests
- Schema validation
- Migration rollback testing
- Data integrity checks

### API Tests
- Endpoint functionality
- Authentication and authorization
- Input validation
- Error handling

### UI Tests
- Form validation
- CRUD operations
- Loading states
- Error boundaries

## 🚀 Deployment

### Environment Variables
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/blogdb
JWT_SECRET=your-secret-key
```

### Build Commands
```bash
# Build all packages
bun build

# Build specific packages
bun build:web
bun build:api
```

## 📝 Next Steps

1. **Rich Text Editor**: Add a rich text editor like TipTap or Quill
2. **Image Upload**: Implement image upload functionality
3. **Categories/Tags**: Add post categorization
4. **Comments**: Implement comment system
5. **SEO**: Add meta tags and OpenGraph support
6. **Analytics**: Add view tracking and analytics
7. **Scheduling**: Add post scheduling functionality
8. **Draft Autosave**: Implement automatic draft saving

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add tests for new features
3. Update documentation for API changes
4. Use conventional commit messages
5. Test both happy path and error scenarios