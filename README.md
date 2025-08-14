# React Starter Kit

A fully opinionated boilerplate designed to kickstart the development of modern, full-stack web applications. This monorepo provides a complete foundation with React frontend, Node.js/TypeScript backend, authentication, AI integration, and Terraform infrastructure scripts.

## Project Overview

The **react-starter** repository enables developers to clone a single repository and have a working frontend, backend, and Infrastructure as Code (IaC) environment running in minutes. Built to reduce initial configuration overhead, enforce best practices, and ensure consistency across teams.

### Key Objectives

- **Rapid Setup**: Get a complete development environment running in under 15 minutes
- **Best Practices**: Enforced code quality through TypeScript, Git hooks, and shared configurations  
- **Batteries Included**: Out-of-the-box authentication and AI integration modules
- **Scalable Growth**: Monorepo structure with Terraform for reproducible infrastructure

## Features

### Core Capabilities

- **Monorepo Architecture**: Organized structure promoting code reuse and maintainability
- **Type-Safe Full Stack**: End-to-end TypeScript with shared types between frontend and backend
- **Authentication Ready**: Complete JWT-based auth system with registration, login, and protected routes
- **AI Integration**: Pre-configured wrapper for external AI services (OpenAI, Anthropic)
- **Infrastructure as Code**: Terraform scripts for cloud resource provisioning
- **Developer Experience**: ESLint, Prettier, Husky git hooks, and VS Code configurations

### What's Included

- React 18+ frontend with TypeScript and routing
- Node.js/TypeScript API backend with Express/Fastify
- Authentication module with JWT and password hashing
- AI integration wrapper for language models
- Terraform configurations for AWS/Azure/GCP
- Code quality tooling and git hooks
- Comprehensive documentation and setup scripts

## Technology Stack

### Frontend & UI
- **React 18+** - Modern React with hooks and concurrent features
- **TypeScript** - Static type checking and enhanced developer experience
- **React Router** - Client-side routing and navigation
- **Webpack/Vite** - Build tooling and development server

### Backend & API  
- **Node.js** - Runtime environment (v16+)
- **TypeScript** - Type-safe server-side development
- **Express/Fastify** - Web framework for API endpoints
- **JWT & bcrypt** - Authentication and password security

### Infrastructure & DevOps
- **Terraform** - Infrastructure as Code for cloud resources
- **AWS/Azure/GCP** - Cloud provider support
- **Docker** - Containerization (optional)

### Development Tools
- **ESLint & Prettier** - Code linting and formatting
- **Husky** - Git hooks for quality gates
- **Jest & Supertest** - Unit and API testing
- **VS Code** - Recommended editor with workspace settings

### AI & External Services
- **OpenAI SDK** - GPT models and embeddings
- **Anthropic SDK** - Claude AI integration
- **Rate limiting** - Built-in retry and backoff strategies

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Bun** v1.2+ (replaces Node.js and npm)
- **Terraform** 1.12+ for infrastructure provisioning
- **Git** for version control
- **VS Code** (recommended) with our [recommended extensions](.vscode/extensions.json)
- **Cloudflare account** for deployment

### Quick Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RafiulM/react-starter.git
   cd react-starter
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Configure Environment Variables**
   ```bash
   # Create environment files for local development
   touch .env .env.local
   # Configure your environment variables (see Environment Setup section)
   ```

4. **Initialize Database**
   ```bash
   # Set up database schema and run migrations
   bun --filter @repo/db migrate
   
   # Optional: Seed with sample data
   bun --filter @repo/db seed
   ```

5. **Start Development Servers**
   
   **Option A: Start All Services**
   ```bash
   # Start main web app (marketing site)
   bun dev
   # Runs on http://localhost:4321
   ```
   
   **Option B: Start Individual Services**
   ```bash
   # Terminal 1 - React App
   bun --filter @repo/app dev
   # Runs on http://localhost:5173
   
   # Terminal 2 - API Backend  
   bun --filter @repo/api dev
   # Runs on configured port (typically 8000)
   
   # Terminal 3 - Edge Worker (for production-like testing)
   bun --filter @repo/edge build --watch
   bun wrangler dev
   # Runs on http://localhost:8787
   
   # Terminal 4 - Marketing Website
   bun --filter @repo/web dev  
   # Runs on http://localhost:4321
   ```

6. **Verify Setup**
   - **React App**: `http://localhost:5173` - Main application interface
   - **Marketing Site**: `http://localhost:4321` - Astro marketing website
   - **API Health Check**: Check the API status through the edge worker
   - **Database Studio**: `bun --filter @repo/db studio` - Drizzle database browser

### Environment Setup

Create `.env` and `.env.local` files in the project root with the following variables:

```bash
# Database Configuration
DATABASE_URL="your-postgresql-connection-string"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:5173"

# AI Integration (Optional)
OPENAI_API_KEY="your-openai-api-key"

# Cloudflare (for deployment)
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
```

## Development Workflow

### Monorepo Structure

```
react-starter/
├── apps/
│   ├── app/                 # React 19 application (main app)
│   │   ├── components/      # React components
│   │   ├── routes/          # TanStack Router routes
│   │   ├── lib/             # Client utilities (auth, store)
│   │   ├── styles/          # Tailwind CSS styles
│   │   └── vite.config.ts   # Vite configuration
│   ├── web/                 # Astro marketing website
│   │   ├── pages/           # Astro page components
│   │   ├── layouts/         # Page layouts
│   │   └── astro.config.mjs # Astro configuration
│   ├── api/                 # tRPC API server (Hono backend)
│   │   ├── lib/             # Core utilities (auth.ts, ai.ts)
│   │   ├── routers/         # tRPC route definitions
│   │   ├── index.ts         # API entry point
│   │   └── start.ts         # Development server
│   └── edge/                # Cloudflare Workers entry point
│       ├── index.ts         # Edge worker handler
│       └── wrangler.jsonc   # Cloudflare configuration
├── db/                      # Database layer
│   ├── schema/              # Drizzle ORM schemas
│   ├── migrations/          # Database migrations
│   ├── scripts/             # Database utilities (seed, export)
│   └── drizzle.config.ts    # Drizzle configuration
├── docs/                    # VitePress documentation
├── infra/                   # Terraform infrastructure
│   ├── environments/        # Environment configs (preview, staging, prod)
│   └── modules/             # Reusable Terraform modules
├── packages/                # Shared packages (if any)
├── scripts/                 # Build and development scripts
├── .husky/                  # Git hooks
└── package.json             # Workspace root configuration
```

### Available Scripts

```bash
# Development
bun dev                    # Start marketing website (Astro)
bun --filter @repo/app dev # Start React application
bun --filter @repo/api dev # Start API server
bun --filter @repo/edge dev # Start edge worker development

# Individual service shortcuts
bun dev:web                # Start marketing website
bun dev:api                # Start API backend
bun dev:edge               # Start edge worker

# Building
bun build                  # Build all applications
bun build:web              # Build marketing website
bun build:api              # Build API server
bun build:edge             # Build edge worker

# Code Quality
bun lint                   # Run ESLint across workspace
bun typecheck              # TypeScript compilation check
bun test                   # Run Vitest test suites

# Database Operations  
bun --filter @repo/db migrate    # Apply database migrations
bun --filter @repo/db seed       # Seed database with sample data
bun --filter @repo/db studio     # Open Drizzle Studio
bun --filter @repo/db generate   # Generate new migration

# Infrastructure (from infra/ directory)
terraform init             # Initialize Terraform
terraform plan             # Preview infrastructure changes  
terraform apply            # Apply infrastructure changes
terraform destroy          # Destroy infrastructure

# Documentation
bun docs:dev               # Start VitePress docs development
bun docs:build             # Build documentation site
```

### Git Workflow

The repository uses Husky git hooks to enforce quality:

- **Pre-commit**: Runs ESLint, Prettier, and type checking
- **Pre-push**: Runs unit tests
- **Commit-msg**: Validates commit message format

## Authentication & AI Integration

### Authentication Module (`apps/api/lib/auth.ts`)

Built on [Better Auth](https://www.better-auth.com/), providing a complete multi-tenant SaaS authentication system with organization support.

**Key Features:**
- **Email/Password Authentication**: Built-in email verification and secure password handling
- **Google OAuth**: Social authentication with Google Sign-In
- **Anonymous Authentication**: Guest user support for trial features
- **Multi-Tenant Organizations**: Users can create and manage up to 5 organizations
- **Role-Based Access**: Organization owners, members, and invitation system
- **Database Integration**: Uses Drizzle ORM with PostgreSQL via custom table schema

**Usage Example:**
```typescript
import { createAuth } from '../lib/auth.js';
import { db } from '../lib/db.js';

// Initialize auth system
const auth = createAuth(db, {
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
});

// Use in tRPC procedures or Hono routes
export const protectedProcedure = publicProcedure.use(
  async ({ ctx, next }) => {
    const session = await auth.api.getSession({
      headers: ctx.req.header(),
    });
    
    if (!session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    
    return next({
      ctx: { ...ctx, user: session.user, session },
    });
  }
);
```

**Required Environment Variables:**
- `BETTER_AUTH_SECRET` - Secret key for session encryption (min 32 characters)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `DATABASE_URL` - PostgreSQL connection string

**Database Schema Requirements:**
The auth system requires the following tables in your database:
- `user` - User profiles and account data
- `session` - Active user sessions
- `identity` - OAuth account connections (custom naming for 'account')
- `organization` - Multi-tenant organization data
- `member` - Organization membership and roles
- `invitation` - Pending organization invitations
- `verification` - Email verification tokens

### AI Integration Module (`apps/api/lib/ai.ts`)

Lightweight OpenAI integration with request-scoped caching for optimal performance in serverless environments.

**Key Features:**
- **OpenAI Provider**: Uses `@ai-sdk/openai` for type-safe AI operations
- **Request Caching**: Prevents duplicate provider initialization per request
- **Environment Isolation**: Safe for multi-tenant applications
- **tRPC Integration**: Optimized for tRPC context usage

**Usage Example:**
```typescript
import { getOpenAI } from '../lib/ai.js';
import { generateText } from 'ai';

// In a tRPC procedure
export const chatProcedure = publicProcedure
  .input(z.object({ message: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const openai = getOpenAI(ctx.env, ctx.cache);
    
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt: input.message,
      maxTokens: 1000,
    });
    
    return { response: text };
  });

// In a Hono route
app.post('/api/chat', async (c) => {
  const { message } = await c.req.json();
  const openai = getOpenAI(c.env);
  
  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt: message,
  });
  
  return c.json({ response: text });
});
```

**Required Environment Variables:**
- `OPENAI_API_KEY` - OpenAI API key with appropriate usage limits

**Supported AI Operations:**
- **Text Generation**: GPT models for chat, completion, and content creation
- **Embeddings**: Vector generation for semantic search (via OpenAI embeddings)
- **Function Calling**: Tool usage and structured output generation
- **Streaming**: Real-time response streaming for better UX

**Performance Notes:**
- Uses request-scoped caching to avoid provider re-initialization
- Optimized for Cloudflare Workers and serverless environments
- Automatically handles API rate limiting through the AI SDK

## Infrastructure (Terraform)

### Overview

Terraform configurations in `infra/` support multi-environment deployment:

- **Environments**: Preview, staging, production (`infra/environments/`)
- **Resources**: Cloudflare Hyperdrive for database connectivity optimization
- **Variables**: Environment-specific configurations
- **State Management**: Cloudflare R2 remote state backend

### Setup

1. **Configure Cloudflare Credentials**
   ```bash
   # Set your Cloudflare API token
   export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
   
   # Verify access
   bun wrangler whoami
   ```

2. **Choose Environment and Initialize**
   ```bash
   # Navigate to desired environment
   cd infra/environments/preview  # or staging/prod
   
   # Copy and configure variables
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your values
   
   # Initialize Terraform
   terraform init
   ```

3. **Plan and Apply Infrastructure**
   ```bash
   # Preview changes
   terraform plan
   
   # Apply infrastructure
   terraform apply
   
   # Get configuration IDs for your application
   terraform output hyperdrive_direct_id
   terraform output hyperdrive_cached_id
   ```

4. **Configure Application**
   ```bash
   # Add Terraform output values to apps/edge/wrangler.jsonc
   # Update hyperdrive bindings with the output IDs
   ```

### Configuration

**Required Variables** (in `terraform.tfvars`):
- `project_name` - Project identifier (lowercase, hyphens only)
- `cloudflare_account_id` - Your Cloudflare account ID

**Optional Variables**:
- `neon_database_url` - PostgreSQL connection string
- `environment` - Environment name (preview/staging/prod)

### Deployment Workflow

```bash
# Complete deployment workflow
cd infra/environments/preview

# 1. Configure variables
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values

# 2. Initialize and apply infrastructure  
terraform init
terraform plan
terraform apply

# 3. Get Hyperdrive configuration IDs
terraform output hyperdrive_direct_id
terraform output hyperdrive_cached_id

# 4. Update application configuration
# Add the output values to apps/edge/wrangler.jsonc

# 5. Deploy application to Cloudflare Workers
bun --filter @repo/edge build
bun wrangler deploy --env preview
```

## Code Quality & Tooling

### ESLint Configuration

Enforces consistent code style and catches potential issues:

- **TypeScript Rules**: Strict type checking
- **React Rules**: Hook and JSX best practices  
- **Import Rules**: Module resolution and ordering
- **Custom Rules**: Project-specific conventions

### Prettier Configuration

Automatic code formatting for:
- TypeScript/JavaScript files
- JSON, YAML, Markdown
- Consistent indentation (2 spaces)
- Single quotes, trailing commas

### VS Code Integration

Workspace settings provide:
- **Auto-formatting**: On save and paste
- **Extension Recommendations**: TypeScript, ESLint, Prettier
- **Debug Configurations**: Frontend and backend debugging
- **Task Runner**: NPM scripts integration

### Git Hooks (Husky)

Quality gates before commits and pushes:
- **Lint-staged**: Only lint changed files
- **Type checking**: Ensure no TypeScript errors
- **Unit tests**: Run test suites before push
- **Commit format**: Conventional commit validation

## Troubleshooting & Known Issues

### Common Setup Issues

**Bun Runtime Issues**
- **Issue**: Package installation fails or Bun commands not recognized
- **Solution**: Ensure Bun v1.2+ is installed: `curl -fsSL https://bun.sh/install | bash`
- **Alternative**: Use Node.js v18+ with npm if Bun is unavailable

**Port Conflicts**
- **Issue**: Development servers fail to start on default ports (5173, 4321, 8787)
- **Solution**: Kill conflicting processes or configure custom ports in application configs
- **Check ports**: `lsof -i :5173` to find processes using ports

**Workspace Dependencies**
- **Issue**: Bun install fails in monorepo workspace structure
- **Solution**: Run `bun install` from project root, not individual workspace directories
- **Reset**: Delete `node_modules` and `bun.lockb`, then reinstall from root

**Environment Variables Not Loading**
- **Issue**: Applications can't read environment variables
- **Solution**: Ensure `.env` files are in project root, not in individual app directories
- **Check**: Verify `DATABASE_URL` and `BETTER_AUTH_SECRET` are properly set

### Database Integration

**PostgreSQL Connection Issues**
- **Issue**: Database connection fails with "connection refused" or timeout errors
- **Solution**: Verify `DATABASE_URL` format: `postgresql://user:password@host:port/database`
- **Local Setup**: Consider using [Neon](https://neon.tech/) for development database
- **Troubleshoot**: Test connection with `psql $DATABASE_URL`

**Migration Failures**
- **Issue**: Drizzle migrations fail or database schema is out of sync
- **Solution**: Run `bun --filter @repo/db generate` then `bun --filter @repo/db migrate`
- **Reset**: Drop database and re-run migrations for clean slate
- **Staging**: Use environment-specific commands: `bun --env ENVIRONMENT=staging drizzle-kit migrate`

**Missing Required Tables**
- **Issue**: Better Auth fails with "table does not exist" errors
- **Solution**: Ensure all auth-related tables exist (user, session, identity, organization, member, invitation, verification)
- **Check**: Use `bun --filter @repo/db studio` to browse database schema

### Infrastructure Deployment

**Cloudflare API Token Issues**
- **Issue**: Terraform fails with authentication errors (10000)
- **Solution**: Verify Cloudflare API token has required permissions:
  - Zone:DNS:Edit, Zone:Zone:Read, Zone:Zone Settings:Edit
  - Account:Cloudflare Hyperdrive:Edit
- **Test**: Run `bun wrangler whoami` to verify token access

**Terraform State Conflicts**  
- **Issue**: Multiple developers cause "state locked" errors
- **Solution**: Configure remote state backend in Cloudflare R2
- **Emergency**: Force unlock carefully: `terraform force-unlock <lock-id>`
- **Prevention**: Use separate environments (preview/staging/prod) per developer

**Hyperdrive Configuration Errors**
- **Issue**: Database connections fail through Cloudflare Workers
- **Solution**: Verify Hyperdrive configuration IDs in `apps/edge/wrangler.jsonc`
- **Update**: Run `terraform output` to get current Hyperdrive IDs after infrastructure changes

### AI Service Integration  

**OpenAI API Key Issues**
- **Issue**: AI features fail with "invalid API key" or "insufficient quota" errors
- **Solution**: Verify `OPENAI_API_KEY` is valid and has sufficient credits
- **Test**: Use OpenAI playground or CLI to test key validity
- **Billing**: Check OpenAI dashboard for usage limits and billing status

**Request Context Errors**
- **Issue**: AI integration fails in Cloudflare Workers with context errors
- **Solution**: Ensure AI functions receive proper environment context
- **Debug**: Check that `ctx.env` contains `OPENAI_API_KEY` in tRPC procedures

**Model Availability**
- **Issue**: Specific GPT models return "model not found" errors  
- **Solution**: Use available models (gpt-4-turbo, gpt-3.5-turbo) and check OpenAI model availability
- **Fallback**: Implement model fallback logic in AI wrapper

### Performance Issues

**Large Bundle Sizes**
- **Issue**: React app bundle exceeds optimal size (>500KB)
- **Solution**: Enable Vite code splitting and tree shaking
- **Analyze**: Use `bun --filter @repo/app build --analyze` to inspect bundle
- **Lazy loading**: Implement route-based code splitting with TanStack Router

**Slow Database Queries**
- **Issue**: API responses exceed 200ms due to database performance
- **Solution**: Use Cloudflare Hyperdrive for connection pooling and edge caching
- **Optimize**: Add database indexes and optimize Drizzle queries
- **Monitor**: Use Drizzle query logging to identify slow queries

**Cold Start Latency**
- **Issue**: Cloudflare Workers experience cold start delays
- **Solution**: Minimize bundle size and reduce initialization overhead
- **Cache**: Leverage request-scoped caching for database connections and AI providers

## Contribution Guidelines

### Getting Started

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
3. **Make Changes**: Follow coding standards and add tests
4. **Run Quality Checks**: Ensure linting, tests, and type checking pass
5. **Submit Pull Request**: Provide clear description of changes

### Code Standards

**TypeScript Guidelines**
- Use strict type checking (enabled in all `tsconfig.json` files)
- Prefer interfaces over type aliases for object shapes
- Add explicit return type annotations for public functions
- Use meaningful variable names following camelCase convention
- Import types using `import type` for type-only imports

**React Best Practices**  
- Use functional components with React 19 hooks
- Implement error boundaries for route-level error handling
- Follow TanStack Router patterns for data loading
- Use Jotai for state management over Context API
- Compose components using children patterns, not render props

**tRPC API Development**
- Define input/output schemas using Zod validation
- Use procedure middleware for authentication and authorization
- Implement proper error handling with `TRPCError`
- Add JSDoc comments for all public procedures
- Group related procedures in separate router files

**Database Schema (Drizzle)**
- Use consistent naming: snake_case for database columns, camelCase for TypeScript
- Add proper indexes for query optimization
- Include migration files for all schema changes
- Use foreign key constraints for data integrity

### Testing Requirements

**Unit Tests (Vitest)**
- Write tests for all utility functions and business logic
- Test React components using `@testing-library/react`
- Mock external dependencies (database, AI services)
- Use descriptive test names: `should return user data when authenticated`
- Run tests: `bun test` or `bun --filter @repo/app test`

**tRPC API Testing**
- Test all tRPC procedures with valid and invalid inputs
- Mock database calls and external API dependencies
- Test authentication middleware and authorization logic
- Include edge cases and error scenarios
- Example: Test that protected procedures reject unauthenticated requests

**Integration Testing**
- Test complete user flows (signup, login, organization creation)  
- Verify database operations work correctly
- Test AI integration endpoints with mock providers
- Use Drizzle test database for isolated testing

### Development Process

**Before Committing**
```bash
# Run all quality checks
bun lint                # ESLint across workspace
bun typecheck           # TypeScript compilation  
bun test                # Vitest test suites
bun --filter @repo/db generate  # Ensure migrations are up to date
```

**Pull Request Guidelines**
- **Title**: Use conventional commits format (`feat:`, `fix:`, `docs:`)
- **Description**: Explain the problem, solution, and testing approach
- **Screenshots**: Include for UI changes or new features
- **Dependencies**: List any new dependencies and why they're needed
- **Breaking Changes**: Clearly document any breaking API changes

**Code Review Checklist**
- [ ] Code follows TypeScript and React best practices
- [ ] New features include appropriate tests  
- [ ] Database schema changes include migrations
- [ ] Environment variables are documented
- [ ] tRPC procedures have proper input validation
- [ ] AI integration includes error handling and fallbacks

### Release Process

All contributions follow this workflow:
1. **Automated Checks**: Husky pre-commit hooks run linting and type checking
2. **CI Pipeline**: GitHub Actions run tests and build verification
3. **Code Review**: At least one maintainer approval required
4. **Integration Testing**: Changes tested in preview environment
5. **Deployment**: Automatic deployment to preview environment on merge
6. **Documentation**: README and docs updated as needed

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: Check the `docs/` folder for detailed guides
- **Issues**: Report bugs and feature requests via GitHub Issues  
- **Discussions**: Join community discussions for questions and ideas
- **Contributing**: See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for contribution guidelines

---

*Made with ❤️ for the developer community. Happy coding!*