/**
 * Documentation content for React Starter
 * Centralized content for the documentation page
 */

export const docsContent = {
  setupGuide: {
    title: "Setup Guide",
    content: `
      <h2>Setup Guide</h2>
      <p>This guide will help you set up the React Starter template locally and get it running.</p>
      
      <h3>Prerequisites</h3>
      <ul>
        <li><strong>Bun</strong> v1.2+ (replaces Node.js and npm)</li>
        <li><strong>Git</strong> for version control</li>
        <li><strong>VS Code</strong> with recommended extensions</li>
        <li><strong>Cloudflare account</strong> for deployment</li>
        <li><strong>PostgreSQL database</strong> (Neon recommended)</li>
      </ul>

      <h3>Installation Steps</h3>
      <ol>
        <li>
          <strong>Clone the repository</strong>
          <pre><code>git clone https://github.com/your-username/your-project-name.git
cd your-project-name</code></pre>
        </li>
        
        <li>
          <strong>Install dependencies</strong>
          <pre><code>bun install</code></pre>
          <p>This installs all dependencies across the monorepo using Bun workspaces.</p>
        </li>
        
        <li>
          <strong>Configure environment variables</strong>
          <pre><code># Copy environment template
cp .env.example .env

# Required variables:
# DATABASE_URL=postgresql://...
# BETTER_AUTH_SECRET=your-secret-key
# OPENAI_API_KEY=your-openai-key (optional)
# VITE_API_URL=http://localhost:8787</code></pre>
        </li>
        
        <li>
          <strong>Set up the database</strong>
          <pre><code># Apply database schema
bun --filter @repo/db migrate

# Optional: Add sample data
bun --filter @repo/db seed</code></pre>
        </li>
        
        <li>
          <strong>Start development servers</strong>
          <p>Open multiple terminals:</p>
          
          <strong>Terminal 1 - React Application:</strong>
          <pre><code>bun --filter @repo/app dev</code></pre>
          
          <strong>Terminal 2 - Backend API:</strong>
          <pre><code>bun --filter @repo/edge build --watch
bun wrangler dev</code></pre>
          
          <strong>Terminal 3 - Marketing Website (optional):</strong>
          <pre><code>bun --filter @repo/web dev</code></pre>
        </li>
      </ol>

      <h3>Access Points</h3>
      <ul>
        <li><strong>React App:</strong> http://localhost:5173</li>
        <li><strong>Marketing Website:</strong> http://localhost:4321</li>
        <li><strong>API:</strong> http://localhost:8787</li>
      </ul>
    `
  },

  folderStructure: {
    title: "Folder Structure",
    content: `
      <h2>Folder Structure</h2>
      <p>Understanding the project structure is key to working effectively with the React Starter.</p>

      <h3>Root Level Structure</h3>
      <pre><code>react-starter/
├── apps/                 # Applications
├── packages/            # Shared packages
├── docs/               # VitePress documentation
├── infra/              # Terraform infrastructure
├── db/                 # Database schemas & migrations
└── scripts/            # Build automation tools</code></pre>

      <h3>Applications (apps/)</h3>
      <ul>
        <li>
          <strong>app/</strong> - Main React 19 application
          <ul>
            <li>TanStack Router for type-safe routing</li>
            <li>Tailwind CSS v4 for styling</li>
            <li>shadcn/ui component library</li>
            <li>Jotai for state management</li>
          </ul>
        </li>
        
        <li>
          <strong>api/</strong> - tRPC API server with Hono framework
          <ul>
            <li>Type-safe API endpoints</li>
            <li>Better Auth integration</li>
            <li>Drizzle ORM integration</li>
          </ul>
        </li>
        
        <li>
          <strong>web/</strong> - Astro marketing website
          <ul>
            <li>Static site generation</li>
            <li>Optimized for performance</li>
            <li>SEO-friendly</li>
          </ul>
        </li>
        
        <li>
          <strong>edge/</strong> - Cloudflare Workers entry point
          <ul>
            <li>Edge computing deployment</li>
            <li>Global performance optimization</li>
            <li>Serverless architecture</li>
          </ul>
        </li>
      </ul>

      <h3>Shared Packages (packages/)</h3>
      <ul>
        <li><strong>core/</strong> - Shared TypeScript types and utilities</li>
        <li><strong>ui/</strong> - Shared UI components with shadcn/ui</li>
        <li><strong>ws-protocol/</strong> - WebSocket protocol template</li>
      </ul>

      <h3>Database Layer (db/)</h3>
      <ul>
        <li><strong>schema/</strong> - Drizzle ORM schema definitions</li>
        <li><strong>migrations/</strong> - Database migrations</li>
        <li><strong>seeds/</strong> - Sample data for development</li>
      </ul>

      <h3>Infrastructure (infra/)</h3>
      <ul>
        <li><strong>environments/</strong> - Terraform configs for prod, staging, preview</li>
        <li><strong>modules/</strong> - Reusable infrastructure modules</li>
      </ul>
    `
  },

  contributing: {
    title: "Contributing Guidelines",
    content: `
      <h2>Contributing Guidelines</h2>
      <p>We welcome contributions to the React Starter project! This guide will help you get started.</p>

      <h3>Development Workflow</h3>
      <ol>
        <li><strong>Fork the repository</strong> on GitHub</li>
        <li><strong>Clone your fork</strong> locally</li>
        <li><strong>Create a feature branch</strong> from main</li>
        <li><strong>Make your changes</strong> following code standards</li>
        <li><strong>Write tests</strong> for new functionality</li>
        <li><strong>Submit a pull request</strong> with clear description</li>
      </ol>

      <h3>Code Standards</h3>
      <h4>TypeScript</h4>
      <ul>
        <li>Use strict TypeScript configuration</li>
        <li>Avoid `any` type - use proper type definitions</li>
        <li>Prefer interfaces over type aliases for object shapes</li>
        <li>Use const assertions for literal types</li>
      </ul>

      <h4>Component Structure</h4>
      <ul>
        <li>Use PascalCase for component names</li>
        <li>Use kebab-case for file names</li>
        <li>Keep components small and focused</li>
        <li>Use proper TypeScript props interfaces</li>
      </ul>

      <h4>Styling Guidelines</h4>
      <ul>
        <li>Use Tailwind CSS utility classes</li>
        <li>Follow shadcn/ui component patterns</li>
        <li>Use CSS variables for theming</li>
        <li>Responsive design first</li>
      </ul>

      <h3>Commit Conventions</h3>
      <p>We use conventional commits for clear version history:</p>

      <h4>Format</h4>
      <pre><code><type>(<scope>): <description>

[optional body]

[optional footer]</code></pre>

      <h4>Types</h4>
      <ul>
        <li><code>feat</code> - New features</li>
        <li><code>fix</code> - Bug fixes</li>
        <li><code>docs</code> - Documentation updates</li>
        <li><code>style</code> - Code style changes</li>
        <li><code>refactor</code> - Code refactoring</li>
        <li><code>test</code> - Adding tests</li>
        <li><code>chore</code> - Maintenance tasks</li>
      </ul>

      <h4>Examples</h4>
      <pre><code>feat(auth): add user registration endpoint
fix(api): resolve user login validation issue
docs(readme): update installation instructions
style(app): format code with prettier
refactor(ui): improve button component structure
test(auth): add unit tests for login flow
chore(deps): update all dependencies to latest</code></pre>

      <h3>Testing</h3>
      <p>All contributions must include appropriate tests:</p>

      <h4>Running Tests</h4>
      <pre><code># Run all tests
bun test

# Run tests for specific package
bun test --filter=@repo/app

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage</code></pre>

      <h4>Test Structure</h4>
      <ul>
        <li>Unit tests for individual functions/components</li>
        <li>Integration tests for API endpoints</li>
        <li>E2E tests for critical user flows</li>
        <li>Tests should be placed next to the source files</li>
      </ul>

      <h3>Pull Request Guidelines</h3>
      <ul>
        <li>Use clear, descriptive titles</li>
        <li>Include screenshots for UI changes</li>
        <li>Reference related issues</li>
        <li>Ensure all tests pass</li>
        <li>Keep PRs focused and atomic</li>
      </ul>
    `
  },

  apiReference: {
    title: "API Reference",
    content: `
      <h2>API Reference</h2>
      <p>Complete API documentation for the React Starter backend with practical examples and code snippets.</p>

      <h3>🚀 Quick Start with API</h3>
      <pre><code>// Install the required package
npm install @tanstack/react-query

// Set up API client in your React app
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}</code></pre>

      <h3>🔐 Authentication Endpoints</h3>
      
      <h4>User Registration - POST /api/auth/signup</h4>
      <p>Create a new user account with email and password.</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5>Request</h5>
          <pre><code>POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}</code></pre>
        </div>
        
        <div>
          <h5>Response (201)</h5>
          <pre><code>{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}</code></pre>
        </div>
      </div>

      <h4>User Login - POST /api/auth/login</h4>
      <p>Authenticate user credentials and receive JWT token.</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5>Request</h5>
          <pre><code>POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}</code></pre>
        </div>
        
        <div>
          <h5>Response (200)</h5>
          <pre><code>{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}</code></pre>
        </div>
      </div>

      <h4>Get Current User - GET /api/auth/me</h4>
      <p>Retrieve the currently authenticated user's information.</p>
      
      <pre><code>// Headers
Authorization: Bearer <token>

// Response (200)
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00Z"
}</code></pre>

      <h3>👥 User Management</h3>

      <h4>List Users - GET /api/users</h4>
      <p>Retrieve all users (admin only).</p>
      
      <pre><code>// React Query example
import { useQuery } from '@tanstack/react-query'

function UsersList() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      return res.json()
    }
  })

  if (isLoading) return <div>Loading...</div>
  
  return <div>{data?.users?.length} users found</div>
}</code></pre>

      <h4>Get User by ID - GET /api/users/:id</h4>
      <pre><code>// Request
GET /api/users/user_123
Authorization: Bearer <token>

// Response (200)
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00Z"
}</code></pre>

      <h4>Update User - PUT /api/users/:id</h4>
      <pre><code>// Request
PUT /api/users/user_123
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}

// Response (200)
{
  "id": "user_123",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "updatedAt": "2024-01-01T12:00:00Z"
}</code></pre>

      <h3>🤖 AI Integration</h3>

      <h4>Chat Completion - POST /api/ai/chat</h4>
      <p>Send messages to OpenAI GPT models.</p>
      
      <pre><code>// React Hook example
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

function useAIChat() {
  const [messages, setMessages] = useState([])
  
  const chatMutation = useMutation({
    mutationFn: async (message) => {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message,
          model: 'gpt-4',
          temperature: 0.7,
          max_tokens: 1000
        })
      })
      return res.json()
    }
  })

  const sendMessage = async (message) => {
    const response = await chatMutation.mutateAsync(message)
    setMessages(prev => [...prev, { role: 'user', content: message }, 
                                  { role: 'assistant', content: response.text }])
  }

  return { messages, sendMessage, isLoading: chatMutation.isPending }
}</code></pre>

      <h4>Text Generation - POST /api/ai/generate</h4>
      <pre><code>// Request
POST /api/ai/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Write a professional email to schedule a meeting",
  "model": "gpt-3.5-turbo",
  "temperature": 0.8,
  "max_tokens": 500
}

// Response (200)
{
  "text": "Subject: Meeting Request - Project Discussion\n\nDear Team,\n\nI hope this email finds you well...",
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 125,
    "total_tokens": 140
  }
}</code></pre>

      <h3>🔒 JWT Token Flow</h3>
      <p>The starter uses JWT tokens for authentication. Here's how to implement protected routes:</p>
      
      <pre><code>// Auth context example
import { createContext, useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const { data: user } = useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      if (!token) return null
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return res.json()
    },
    enabled: !!token
  })

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
    }
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Protected route component
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  return children
}</code></pre>

      <h3>❌ Error Handling Patterns</h3>
      <p>All endpoints return consistent error responses:</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5>Error Response Format</h5>
          <pre><code>{
  "error": {
    "message": "Detailed error message",
    "code": "ERROR_CODE",
    "details": { ... }
  }
}</code></pre>
        </div>
        
        <div>
          <h5>Common HTTP Status Codes</h5>
          <ul>
            <li><code>200</code> - Success</li>
            <li><code>201</code> - Created</li>
            <li><code>400</code> - Bad Request</li>
            <li><code>401</code> - Unauthorized</li>
            <li><code>403</code> - Forbidden</li>
            <li><code>404</code> - Not Found</li>
            <li><code>500</code> - Server Error</li>
          </ul>
        </div>
      </div>

      <h4>Error Handling in React</h4>
      <pre><code>// Error boundary component
import { useQuery } from '@tanstack/react-query'

function useApiErrorHandler() {
  const handleApiError = (error) => {
    if (error.status === 401) {
      // Redirect to login
      window.location.href = '/login'
    } else if (error.status === 429) {
      alert('Too many requests. Please try again later.')
    } else {
      console.error('API Error:', error)
    }
  }

  return { handleApiError }
}

// Usage in component
const { data, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  retry: 3,
  retryDelay: 1000
})

if (error) {
  return <ErrorMessage error={error} />
}</code></pre>

      <h3>📋 Complete Error Code Reference</h3>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>HTTP Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>INVALID_CREDENTIALS</td>
            <td>Email or password is incorrect</td>
            <td>401</td>
          </tr>
          <tr>
            <td>USER_NOT_FOUND</td>
            <td>User doesn't exist</td>
            <td>404</td>
          </tr>
          <tr>
            <td>VALIDATION_ERROR</td>
            <td>Invalid input data</td>
            <td>400</td>
          </tr>
          <tr>
            <td>UNAUTHORIZED</td>
            <td>Missing or invalid token</td>
            <td>401</td>
          </tr>
          <tr>
            <td>FORBIDDEN</td>
            <td>Insufficient permissions</td>
            <td>403</td>
          </tr>
          <tr>
            <td>RATE_LIMITED</td>
            <td>Too many requests</td>
            <td>429</td>
          </tr>
          <tr>
            <td>AI_SERVICE_ERROR</td>
            <td>OpenAI service unavailable</td>
            <td>503</td>
          </tr>
        </tbody>
      </table>

      <h3>🔧 SDK Usage Examples</h3>
      <pre><code>// Type-safe API client with tRPC
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../api/src/router'

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8787/trpc',
      headers: () => ({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  ]
})

// Usage in component
const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: () => trpc.auth.me.query()
})

const loginMutation = useMutation({
  mutationFn: (data) => trpc.auth.login.mutate(data),
  onSuccess: (data) => {
    localStorage.setItem('token', data.token)
  }
})</code></pre>
    `
  }
};

export type DocsSection = keyof typeof docsContent;