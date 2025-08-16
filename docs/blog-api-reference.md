# Blog API Reference

This document provides detailed API documentation for the blog feature endpoints, including authentication, request/response formats, and example curl commands.

## Authentication

All blog endpoints require JWT authentication. Include your JWT token in the `Authorization` header:

```bash
Authorization: Bearer <your-jwt-token>
```

### Getting a JWT Token

Authenticate via the auth endpoints to get your token:

```bash
curl -X POST http://localhost:8787/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your-password"
  }'
```

## Base URL

- **Development**: `http://localhost:8787/api`
- **Production**: `https://your-app.workers.dev/api`

## Endpoints

### GET /posts

Retrieve all blog posts with optional filtering and pagination.

#### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `search` | string | Search posts by title or content | No |
| `status` | string | Filter by post status (draft/published/archived) | No |
| `limit` | number | Number of posts to return (default: 20, max: 100) | No |
| `cursor` | string | Cursor for pagination | No |

#### Example Request

```bash
curl -X GET 'http://localhost:8787/api/posts?search=react&status=published&limit=10' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

#### Example Response

```json
{
  "posts": [
    {
      "id": "01J5RJQ4Z3Y8JQ9QX8JQ9QX8J",
      "title": "Getting Started with React 19",
      "content": "React 19 introduces powerful new features...",
      "excerpt": "Learn about the latest React features",
      "status": "published",
      "createdAt": "2024-08-14T10:30:00Z",
      "updatedAt": "2024-08-14T14:45:00Z",
      "author": {
        "id": "01J5RJQ4Z3Y8JQ9QX8JQ9QX8I",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "nextCursor": "01J5RJQ4Z3Y8JQ9QX8JQ9QX8K"
}
```

### GET /posts/:id

Retrieve a single blog post by ID.

#### Example Request

```bash
curl -X GET 'http://localhost:8787/api/posts/01J5RJQ4Z3Y8JQ9QX8JQ9QX8J' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

#### Example Response

```json
{
  "post": {
    "id": "01J5RJQ4Z3Y8JQ9QX8JQ9QX8J",
    "title": "Getting Started with React 19",
    "content": "React 19 introduces powerful new features...",
    "excerpt": "Learn about the latest React features",
    "status": "published",
    "createdAt": "2024-08-14T10:30:00Z",
    "updatedAt": "2024-08-14T14:45:00Z",
    "author": {
      "id": "01J5RJQ4Z3Y8JQ9QX8JQ9QX8I",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### POST /posts

Create a new blog post.

#### Request Body

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `title` | string | Post title (3-200 characters) | Yes |
| `content` | string | Post content (minimum 10 characters) | Yes |
| `excerpt` | string | Brief summary (max 500 characters) | No |
| `status` | string | Post status: draft, published, or archived | No (default: draft) |

#### Example Request

```bash
curl -X POST http://localhost:8787/api/posts \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Building Modern Web Apps",
    "content": "Modern web development requires a robust set of tools...",
    "excerpt": "A comprehensive guide to modern web development",
    "status": "published"
  }'
```

#### Example Response

```json
{
  "post": {
    "id": "01J5RJQ4Z3Y8JQ9QX8JQ9QX8L",
    "title": "Building Modern Web Apps",
    "content": "Modern web development requires a robust set of tools...",
    "excerpt": "A comprehensive guide to modern web development",
    "status": "published",
    "createdAt": "2024-08-14T15:00:00Z",
    "updatedAt": "2024-08-14T15:00:00Z",
    "author": {
      "id": "01J5RJQ4Z3Y8JQ9QX8JQ9QX8I",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### PATCH /posts/:id

Update an existing blog post.

#### Request Body

All fields are optional - only include the fields you want to update.

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `title` | string | Post title (3-200 characters) | No |
| `content` | string | Post content (minimum 10 characters) | No |
| `excerpt` | string | Brief summary (max 500 characters) | No |
| `status` | string | Post status: draft, published, or archived | No |

#### Example Request

```bash
curl -X PATCH 'http://localhost:8787/api/posts/01J5RJQ4Z3Y8JQ9QX8JQ9QX8L' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Building Modern Web Apps - Updated",
    "status": "draft"
  }'
```

#### Example Response

```json
{
  "post": {
    "id": "01J5RJQ4Z3Y8JQ9QX8JQ9QX8L",
    "title": "Building Modern Web Apps - Updated",
    "content": "Modern web development requires a robust set of tools...",
    "excerpt": "A comprehensive guide to modern web development",
    "status": "draft",
    "createdAt": "2024-08-14T15:00:00Z",
    "updatedAt": "2024-08-14T15:30:00Z",
    "author": {
      "id": "01J5RJQ4Z3Y8JQ9QX8JQ9QX8I",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### DELETE /posts/:id

Delete a blog post.

#### Example Request

```bash
curl -X DELETE 'http://localhost:8787/api/posts/01J5RJQ4Z3Y8JQ9QX8JQ9QX8L' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

#### Example Response

```json
{
  "success": true
}
```

## Error Responses

### Validation Errors

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "path": ["title"],
        "message": "String must contain at least 3 character(s)"
      },
      {
        "path": ["content"],
        "message": "String must contain at least 10 character(s)"
      }
    ]
  }
}
```

### Authentication Errors

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing authentication token"
  }
}
```

### Not Found Errors

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Post not found"
  }
}
```

### Permission Errors

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to modify this post"
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Authenticated requests**: 100 requests per minute per user
- **Unauthenticated requests**: 20 requests per minute per IP

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1723641600
```

## Pagination

List endpoints support cursor-based pagination:

- Use the `nextCursor` from the response to fetch the next page
- Include the cursor as a query parameter: `?cursor=01J5RJQ4Z3Y8JQ9QX8JQ9QX8K`
- When `nextCursor` is null, you've reached the end of the results

#### Example with pagination

```bash
# First page
curl -X GET 'http://localhost:8787/api/posts?limit=5' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

# Second page using cursor
curl -X GET 'http://localhost:8787/api/posts?limit=5&cursor=01J5RJQ4Z3Y8JQ9QX8JQ9QX8K' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

## Testing the API

### Using curl

```bash
# Test all endpoints
./scripts/test-api.sh

# Or manually test individual endpoints
curl -X GET http://localhost:8787/api/posts
```

### Using Postman

1. Import the collection: `docs/postman/blog-api.postman_collection.json`
2. Set up environment variables for base URL and authentication token
3. Test all endpoints with pre-configured requests

### Using the Web Interface

The React app includes a built-in API testing interface at `/admin/api-tester` (development only).

## WebSocket Support

Real-time updates are available via WebSocket connections:

```javascript
const ws = new WebSocket('ws://localhost:8787/api/posts/live');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  console.log('Post updated:', update);
};
```

## SDK and Libraries

### JavaScript/TypeScript

Use the built-in tRPC client:

```typescript
import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from '@repo/api';

const client = createTRPCClient<AppRouter>({
  url: 'http://localhost:8787/api/trpc',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Usage
const posts = await client.posts.list.query({ search: 'react' });
```

### Error Handling Best Practices

```typescript
try {
  const post = await client.posts.create.mutate({
    title: 'My Post',
    content: 'Content...',
  });
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    // Handle validation errors
    console.error('Validation failed:', error.details);
  } else if (error.code === 'UNAUTHORIZED') {
    // Redirect to login
    window.location.href = '/login';
  }
}
```