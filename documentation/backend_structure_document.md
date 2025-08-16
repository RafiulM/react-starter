# Backend Structure Document

This document explains how the backend of the **rafiulm/react-starter** template is organized and works. It covers architecture, database setup, APIs, hosting, infrastructure, security, monitoring, and more. You don’t need a deep technical background to understand it.

## 1. Backend Architecture

**Overall Design**
- The backend is a standalone service written in **TypeScript** running on **Node.js**.  
- It follows a **modular structure**: each concern (AI features, authentication, context management) lives in its own file under `apps/api/lib/`.  
- We use **Express.js** (or a similarly lightweight framework) to define HTTP routes and middleware.

**Key Patterns and Frameworks**
- **Dependency Injection via Context** (`context.ts`): shares resources like database connections across requests.  
- **AI Integration Module** (`ai.ts`): central place for calling external AI services (e.g., Claude or GPT).  
- **Authentication Module** (`auth.ts`): handles login, token validation, and user guards.  
- **Environment Configuration**: loads secrets and variables from a `.env` file using the `dotenv` library.

**Scalability, Maintainability, Performance**
- **Modularity** lets teams work on AI, auth, or core logic without stepping on each other’s toes.  
- **TypeScript** with strict mode ensures type safety and catches errors early.  
- **Stateless HTTP** design means we can run multiple instances behind a load balancer to handle more traffic.  
- **Serverless-friendly**: the same code can run in traditional servers or in serverless environments (e.g., Cloudflare Workers).

## 2. Database Management

**Database Technology**
- We use **Cloudflare D1**, a serverless **SQL** database that scales automatically and requires no server maintenance.  
- Optionally, you can add an ORM or query builder like **Prisma** or **Kysely** for easier migrations and type-safe queries.

**Data Storage and Access**
- Data is stored in tables, queried via standard SQL statements.  
- The `context.ts` module creates and reuses a single database connection per request.  
- Migrations and schema changes are tracked manually or via a migration tool (e.g., Prisma Migrate).

**Data Management Practices**
- **Environment Variables**: Database connection strings live in `.env` to keep secrets out of version control.  
- **Backups**: D1 automatically snapshots data; you can configure retention policies in Cloudflare.  
- **Caching**: For heavy-read tables, you can introduce a Redis cache or rely on Cloudflare’s edge cache.

## 3. Database Schema

The database is SQL-based. Below is a sample schema. You can run these statements in Cloudflare D1 or any PostgreSQL-compatible engine.

```sql
-- Users table for authentication
CREATE TABLE users (
  id            TEXT      PRIMARY KEY,
  email         TEXT      UNIQUE NOT NULL,
  password_hash TEXT      NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI requests log: stores prompts and responses per user
CREATE TABLE ai_requests (
  id         TEXT      PRIMARY KEY,
  user_id    TEXT      REFERENCES users(id),
  prompt     TEXT      NOT NULL,
  response   TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- (Optional) Refresh tokens for session management
CREATE TABLE refresh_tokens (
  token       TEXT      PRIMARY KEY,
  user_id     TEXT      REFERENCES users(id),
  expires_at  TIMESTAMP NOT NULL
);
```

> You can extend this schema with more tables (e.g., roles, permissions, logs) as your application grows.

## 4. API Design and Endpoints

**RESTful Approach**
- The API follows **REST** conventions: resources are accessed via clear URLs, operations map to HTTP methods (GET, POST, PUT, DELETE).  
- JSON is used for requests and responses.

**Key Endpoints**

| Endpoint                   | Method | Purpose                                        |
|----------------------------|--------|------------------------------------------------|
| /api/hello                 | GET    | Test endpoint returning a simple message       |
| /api/auth/register         | POST   | Create a new user account                      |
| /api/auth/login            | POST   | Authenticate user and return tokens            |
| /api/auth/refresh          | POST   | Issue a new access token using a refresh token |
| /api/users/me              | GET    | Fetch current user profile (protected)         |
| /api/ai/process            | POST   | Send a prompt to AI service, get a response    |

**How It Works**
- **Registration/Login**: calls `auth.ts`, hashes passwords, issues JWTs.  
- **Protected Routes**: middleware checks JWT in the `Authorization` header.  
- **AI Processing**: `ai.ts` sends the prompt to the AI provider, logs details in `ai_requests` table, and returns the AI’s response.

## 5. Hosting Solutions

**Cloudflare-Centric Stack**
- **Cloudflare Workers**: can run the API code serverlessly at the network edge, reducing latency.  
- **Cloudflare Pages** (or Vercel/Netlify): can host the React frontend, automatically deploying on Git pushes.

**Benefits**
- **Reliability**: global edge network minimizes downtime.  
- **Scalability**: serverless functions autoscale with traffic.  
- **Cost-effectiveness**: pay-per-use model avoids idle server costs.  
- **Built-in CDN**: static assets and API responses can be cached at the edge.

## 6. Infrastructure Components

- **Load Balancer / Edge Routing**
  - Managed by Cloudflare Workers or a cloud provider’s load balancer, distributing requests across instances.  
- **Content Delivery Network (CDN)**
  - Cloudflare’s CDN caches static assets and API responses close to users worldwide.  
- **Caching Layer (Optional)**
  - Redis or in-memory cache for hot data (session info, frequently accessed records).  
- **Infrastructure as Code (IaC)**
  - **Terraform** scripts (documented in `review-terraform.md`) describe resources like Workers, D1 databases, and KV stores.  
- **CI/CD Pipeline (Future)**
  - GitHub Actions or another tool can run tests, build containers, and deploy via Terraform or CLI commands.

## 7. Security Measures

- **Authentication & Authorization**
  - JWT-based tokens for stateless auth.  
  - Passwords are hashed (e.g., bcrypt) before storage.  
- **Input Validation & Sanitization**
  - All incoming data is validated at the route level to prevent injections.  
- **Encryption**
  - **In transit**: HTTPS for all API calls and frontend assets.  
  - **At rest**: Cloudflare D1 encrypts data in storage.  
- **Environment Isolation**
  - Secrets and keys live in a `.env` file (or secret manager in production) and are never committed.  
- **CORS Configuration**
  - Controlled to allow only your frontend origin to talk to the API.  
- **Dependency Scanning**
  - Regularly run tools like npm audit or Snyk to catch vulnerable packages.

## 8. Monitoring and Maintenance

**Monitoring Tools**
- **Cloudflare Metrics & Logs**: track request rates, error rates, latency.  
- **Error Tracking**: integrate Sentry or a similar service for real-time crash reports.  
- **Custom Application Logs**: use a logger (e.g., Winston) to record important events, errors, and performance timings.

**Maintenance Strategies**
- **Regular Dependency Updates**: automate via tools like Dependabot.  
- **Database Backups & Migrations**: leverage D1 backups and run schema migrations during off-peak hours.  
- **Health Checks**: set up uptime monitors to ping `/api/hello` every minute.  
- **Performance Reviews**: periodically profile slow endpoints and optimize queries or introduce caching.

## 9. Conclusion and Overall Backend Summary

The backend of the **rafiulm/react-starter** template provides a clear, modular foundation for building web applications. It:

- Uses **TypeScript** and **Express.js** for a type-safe, maintainable API layer.  
- Stores data in **Cloudflare D1** with a straightforward SQL schema for users and AI logs.  
- Exposes **RESTful endpoints** for auth, user profiles, and AI processing.  
- Can be hosted **serverlessly** on Cloudflare Workers, backed by a global CDN and autoscaling.  
- Includes **security best practices** (JWT, input validation, encryption) and **monitoring hooks** for reliability.

Together, these components align with the project’s goal of providing a robust, scalable, and easy-to-understand backend—ready for AI integration and future growth.