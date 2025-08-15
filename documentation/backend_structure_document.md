# Backend Structure Document

This document outlines the backend architecture, database design, API structure, hosting, infrastructure, security, monitoring, and maintenance strategies for the `react-starter` full-stack application. It uses everyday language to explain each part clearly.

## 1. Backend Architecture

### Overall Design

- The backend runs on **Node.js**, organized into a clear folder structure:
  - `apps/api/` (main entry point for the API)
  - `api/lib/` (shared services and utilities, like `auth.ts`, `ai.ts`, `context.ts`)
- The code follows a **service-oriented pattern**:
  - **Controllers** receive HTTP requests and call services.
  - **Services** (in `lib/`) implement business logic, such as authentication and AI integration.
  - **Data access** happens through a simple query layer to the database.

### Frameworks and Patterns

- Likely uses **Express.js** (or a minimal wrapper) for routing and middleware.
- Modular structure (controllers, services, data access) ensures:
  - **Scalability**: You can add new services or routes without disrupting existing code.
  - **Maintainability**: Each feature lives in its own file or folder.
  - **Performance**: Lightweight Node.js runtime, with edge deployment via Cloudflare Workers (see Hosting).  

## 2. Database Management

### Database Technology

- **Cloudflare D1** (a serverless, SQLite-compatible SQL database) is used.

### Data Storage and Access

- Data is stored in SQL tables with clear schemas (see next section).
- The backend uses **parameterized SQL queries** to avoid SQL injection.
- Database migrations and versioning are managed via Terraform scripts and/or a migration tool embedded in code.

### Data Practices

- Unique indexes for fields like user emails.
- Transactional operations for multi-step updates (e.g., during user registration).
- Regular backups configured through Cloudflare’s built-in snapshot functionality.

## 3. Database Schema

Below is a human-readable overview followed by SQL definitions.

### Human-Readable Schema

1. **Users**
   - `id`: unique identifier for each user
   - `email`: user’s email address (unique)
   - `password_hash`: hashed password
   - `created_at`: timestamp when the account was created
   - `role`: user role (e.g., `user`, `admin`)

2. **AI_Requests**
   - `id`: unique identifier for each AI request
   - `user_id`: reference to `Users.id`
   - `prompt`: text sent to the AI service
   - `response`: AI-generated text
   - `created_at`: timestamp of the request

### SQL Schema (for Cloudflare D1 / SQLite)

```sql
-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AI Requests table
CREATE TABLE ai_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```  

## 4. API Design and Endpoints

The API follows a **RESTful** approach, with JSON payloads and standard HTTP methods.

### Key Endpoints

- **Authentication**
  - `POST /api/auth/register`
    - Purpose: Create a new user account.
    - Body: `{ email, password }`
    - Returns: `{ id, email, token }`
  - `POST /api/auth/login`
    - Purpose: Log in an existing user.
    - Body: `{ email, password }`
    - Returns: `{ id, email, token }`
  - `POST /api/auth/logout`
    - Purpose: Revoke the user’s session/token.
    - Headers: `Authorization: Bearer <token>`

- **User Profile**
  - `GET /api/user/me`
    - Purpose: Fetch the current user’s details.
    - Headers: `Authorization: Bearer <token>`
    - Returns: `{ id, email, role, created_at }`

- **AI Integration**
  - `POST /api/ai/generate`
    - Purpose: Send a prompt to the AI service and log the request.
    - Headers: `Authorization: Bearer <token>`
    - Body: `{ prompt }`
    - Returns: `{ id, prompt, response, created_at }`

- **Health Check**
  - `GET /api/health`
    - Purpose: Confirm that the API and database are reachable.
    - Returns: `{ status: 'ok', timestamp }`

## 5. Hosting Solutions

- Backend runs on **Cloudflare Workers**, which deploy Node.js–style code at the network edge.
- Database is hosted as **Cloudflare D1**, co-located with the Workers for low-latency queries.
- Infrastructure is provisioned via **Terraform**, ensuring the same setup in development, staging, and production.

Benefits:
- **Global distribution**: Workers run close to users for fast response times.
- **Automatic scaling**: Serverless model adjusts to traffic without manual intervention.
- **Cost efficiency**: Pay-per-use billing on Cloudflare.

## 6. Infrastructure Components

- **Federated CDN** (Cloudflare edge): Delivers static assets and caches API responses as appropriate.
- **Load balancing**: Built-in to Cloudflare Workers—requests route to the nearest edge node.
- **Caching**:
  - Short-lived API caching via Cloudflare’s Key-Value cache or Cache API.
  - CDN caching for static front-end assets.
- **Terraform**:
  - Manages Workers scripts, D1 database instances, and KV namespaces.
  - Version-controls infrastructure definitions alongside application code.

These components work together to provide fast, reliable, and globally available services.

## 7. Security Measures

- **HTTPS/TLS** enforced by default through Cloudflare.
- **JWT-based authentication**:
  - Short-lived tokens stored client-side.
  - Token revocation via a logout endpoint or token blacklist.
- **Password hashing** with bcrypt before storing in the database.
- **Input validation and sanitization** to prevent SQL injection and XSS.
- **CORS** policy restricting API access to approved origins.
- **Environment variables** (API keys, secrets) managed securely via Cloudflare and Terraform secrets.
- **Role-based access control** (RBAC) for endpoints (e.g., only `admin` can access certain routes).

## 8. Monitoring and Maintenance

- **Logs and Metrics**:
  - Cloudflare Analytics for request rates, latencies, and error rates.
  - Structured logs from Workers (e.g., via `console.log`) collected in Cloudflare’s Logpush.
- **Error Tracking**:
  - Integration with third-party services (like Sentry) for runtime errors.
- **Alerts and Health Checks**:
  - Automated alerts for high error rates or elevated latencies.
  - Scheduled uptime pings to `/api/health`.
- **Maintenance**:
  - Infrastructure updates applied via Terraform plans/`apply`.
  - Database schema changes managed through versioned migrations.
  - Pre-commit hooks (Husky) ensure code quality before deployment.

## 9. Conclusion and Overall Backend Summary

The backend for `react-starter` is built as a lightweight, serverless API on Node.js, deployed via Cloudflare Workers and using Cloudflare D1 for data storage. It follows best practices—modular code organization, Terraform-driven infrastructure, RESTful endpoints, robust security, and comprehensive monitoring. This setup delivers a reliable, scalable, and cost-effective foundation that aligns with modern development workflows and can grow with your project’s needs.