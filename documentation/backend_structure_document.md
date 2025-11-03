# Backend Structure Document

## Backend Architecture

Our backend is designed for performance, scalability, and ease of maintenance. It follows an edge-first, serverless approach within a monorepo structure. Key design choices:

- **Monorepo with Bun Workspaces**
  - Organizes code into `apps` (frontend, API, edge entry) and `packages` (shared UI, core utilities, database schema).
  - Ensures consistent dependencies, versioning, and type safety across all parts of the stack.
- **Edge-First Deployment**
  - Uses Cloudflare Workers as the runtime for both static assets and API endpoints. This brings code closer to users worldwide, reducing latency.
- **Web Framework & API Layer**
  - **Hono**: A lightweight, high-performance HTTP framework optimized for edge environments.
  - **tRPC**: Enables end-to-end type-safe RPC calls between frontend and backend, eliminating schema duplication.
- **Runtime & Tooling**
  - **Bun**: Fast JavaScript runtime and package manager, improving startup and install times.
  - **TypeScript**: Enforced throughout for static type checking.
  - **Vitest**: Unit testing framework for backend logic.
  - **Prettier**: Code formatter to maintain consistency.

This architecture scales horizontally (Cloudflare’s global network) and keeps code maintainable through strong typing, modularity, and infrastructure as code.

## Database Management

We use a serverless SQL database with a TypeScript-first ORM for reliable, type-safe data handling.

- **Database Technology**
  - **Neon PostgreSQL** (Serverless): Automatically scales with demand and handles failover.
  - **Drizzle ORM**: Provides type-safe query building, migrations, and seed scripts in TypeScript.
- **Data Storage & Access**
  - Schemas and migrations live in `packages/db` to centralize database structure.
  - Drizzle generates TypeScript types directly from table definitions, preventing mismatches.
  - Queries and mutations are executed in the tRPC resolvers inside `apps/api`.
- **Best Practices**
  - Use migrations for schema changes; keep migration history under version control.
  - Seed data scripts help initialize development and test environments.
  - Connection pooling managed by Neon, optimizing performance under load.

## Database Schema

Below is a human-readable overview followed by the SQL definitions of the primary tables.

### Human-Readable Schema Overview

- **users**: Stores user login details, contact information, and timestamps.
- **organizations**: Represents companies or groups that users can belong to.
- **teams**: Sub-groups within an organization for finer-grained collaboration.
- **invitations**: Tracks pending invites for users to join a team.

### PostgreSQL Schema (Drizzle-Compatible)

```sql
-- users table
CREATE TABLE users (
  id             UUID       PRIMARY KEY,
  email          TEXT       NOT NULL UNIQUE,
  hashed_password TEXT      NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- organizations table
CREATE TABLE organizations (
  id         UUID       PRIMARY KEY,
  name       TEXT       NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- teams table
CREATE TABLE teams (
  id              UUID       PRIMARY KEY,
  name            TEXT       NOT NULL,
  organization_id UUID       NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- invitations table
CREATE TABLE invitations (
  id           UUID       PRIMARY KEY,
  email        TEXT       NOT NULL,
  team_id      UUID       NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  invited_by   UUID       NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  token        TEXT       NOT NULL UNIQUE,
  status       TEXT       NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at   TIMESTAMPTZ NOT NULL
);
```

## API Design and Endpoints

We use tRPC over HTTP, served by Hono on Cloudflare Workers. This approach gives us type safety without manual schema definitions.

- **Procedure Routers**
  - `userRouter`: register, login, getCurrentUser, updateProfile.
  - `organizationRouter`: list, create, update, delete organizations.
  - `teamRouter`: list, create, update, delete teams under an organization.
  - `invitationRouter`: sendInvite, acceptInvite, revokeInvite.
- **Communication Flow**
  - Frontend calls `trpc.user.register({ email, password })` and receives typed responses.
  - Errors are surfaced as structured tRPC errors, handled gracefully in the UI.
- **Middleware**
  - Authentication checks using Better Auth before protected procedures.
  - Input validation enforced by Zod schemas in each procedure.

## Hosting Solutions

- **Cloudflare Workers**
  - Global serverless deployment for both API and static assets.
  - Instant scaling, pay-per-use billing, and built-in DDoS protection.
- **Neon PostgreSQL**
  - Serverless SQL with automatic capacity adjustments.
- **Infrastructure as Code**
  - **Terraform** scripts provision Workers, KV stores, DNS records, and database resources.
  - Ensures reproducible environments for preview, staging, and production.

## Infrastructure Components

- **Global CDN & Network**
  - Cloudflare’s edge network acts as a global load balancer and CDN for static assets.
- **Caching**
  - Edge-layer HTTP caching for static content and configurable API response caching.
- **Key-Value Storage**
  - Cloudflare KV for lightweight, low-latency data (e.g., feature flags, session tokens).
- **Load Distribution**
  - Workers automatically route requests across Cloudflare’s edge points of presence.

## Security Measures

- **Authentication & Authorization**
  - **Better Auth**: Manages user sessions, token rotation, and secure cookie handling.
  - Role-based access enforced in tRPC middleware.
- **Data Encryption**
  - HTTPS/TLS for all client–server communications.
  - Neon PostgreSQL encrypts data at rest by default.
- **CORS & Rate Limiting**
  - Configured at the Worker entry point to restrict origins and prevent abuse.
- **Environment Protection**
  - Secrets stored in Cloudflare environment variables and Terraform state with encryption.

## Monitoring and Maintenance

- **Logging & Metrics**
  - Cloudflare Workers Analytics for request volume, latency, and error rates.
  - Custom logging in tRPC procedures to track business metrics.
- **Alerting**
  - Cloudflare Alerts configured for high error rates or latency spikes.
- **Testing & CI/CD**
  - **Vitest** for unit tests of API logic.
  - **GitHub Actions** for automated linting, testing, and Terraform plan/apply.
  - Preview deployments on pull requests via Cloudflare Workers Previews.
- **Maintenance Practices**
  - Regular dependency updates and security audits.
  - Scheduled review of Terraform drift and database migration histories.

## Conclusion and Overall Backend Summary

Our backend leverages a monorepo, edge-first, serverless strategy to deliver fast, reliable, and globally distributed services. By combining Cloudflare Workers, Neon PostgreSQL, Drizzle ORM, tRPC, and Terraform, we achieve:

- **Instant global scale** with low-latency responses.
- **Strong type safety** from database schema to frontend calls.
- **Robust security** through Better Auth, TLS, and principles of least privilege.
- **Ease of maintenance** via infrastructure as code, automated testing, and consistent coding standards.

This setup aligns with the project’s goals to provide a high-performance, developer-friendly foundation for building modern web applications.