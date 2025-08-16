# Backend Structure Document

## 1. Backend Architecture

This project uses a monorepo layout, keeping the backend API next to the frontend for easy sharing of code and types. Here’s how it’s organized:

- **Node.js with TypeScript**  
  We run the server on Node.js (version 18+), and we write all code in TypeScript to catch errors early and document intent.
- **Express.js framework**  
  Express handles HTTP routing and middleware. It’s lightweight, popular, and has a large ecosystem.
- **Modular design**  
  Under `apps/api/lib`, each concern lives in its own module:
  - `auth.ts` for all authentication and user management logic.
  - `ai.ts` for AI service integrations (prompts, calls to OpenAI/Claude).
  - `context.ts` for building a per-request context (user identity, future database connections).
- **Stateless services**  
  The API doesn’t hold state in memory, so multiple instances can run side by side. This makes horizontal scaling easy.

How this supports our goals:

- **Scalability**: Because each service is independent and stateless, we can add more server instances behind a load balancer without code changes.
- **Maintainability**: Clear separation of concerns and strong typing mean new developers can find and update logic quickly.
- **Performance**: Asynchronous I/O in Node.js and minimal middleware layers ensure rapid request handling.

## 2. Database Management

> Note: In version 1.0, we do not ship with a database. The API is ready for you to plug in your choice of database and ORM. Below is how you might set it up in the future.

Planned database technology:

- **Type**: Relational (SQL)  
- **System**: PostgreSQL  
- **ORM** (future): Prisma or TypeORM for mapping TypeScript models to database tables.

Data practices:

- **Environment variables** store database credentials (host, port, user, password, database name).  
- **Connection pooling** ensures efficient reuse of database connections under load.  
- **Migrations** (via Prisma or TypeORM) keep schema changes versioned and reversible.  
- **Data validation** at both the API layer (using validation libraries) and the database layer (via column constraints).

## 3. Database Schema

Below is an example human-readable schema for PostgreSQL once you integrate a database. It covers users and AI requests.

**Tables and Fields**:

1) **Users**
   - `id`: Unique identifier (UUID or serial)  
   - `email`: User’s email address, unique  
   - `password_hash`: Securely hashed password  
   - `display_name`: User’s chosen name  
   - `created_at`: Timestamp when the account was created  
   - `updated_at`: Timestamp when the account was last updated

2) **AIRequests**
   - `id`: Unique identifier  
   - `user_id`: Foreign key referencing `Users.id`  
   - `prompt`: Text submitted for generation  
   - `response`: AI-generated content  
   - `created_at`: When the request was made

**Example PostgreSQL Schema**:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE ai_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 4. API Design and Endpoints

We follow a RESTful approach. All endpoints live under `/api` and use JSON for requests and responses.

### Authentication Endpoints

- **POST /api/auth/register**  
  Create a new user account. Expects `email`, `password`, and `display_name`. Returns a JWT.

- **POST /api/auth/login**  
  Log in an existing user. Expects `email` and `password`. Returns a JWT.

- **POST /api/auth/forgot-password**  
  Send a password-reset link via email. Expects `email`.

- **POST /api/auth/reset-password**  
  Update password using a secure token. Expects `token` and new `password`.

- **PUT /api/auth/update-profile**  
  Change user details like `display_name` or `email`. Protected route.

- **PUT /api/auth/change-password**  
  Update password while logged in. Expects `current_password` and `new_password`.

- **PATCH /api/auth/update-preferences**  
  Save user settings such as notification toggles.

### AI Endpoints

- **POST /api/ai/generate**  
  Send a prompt to the AI service. Expects `prompt`. Returns `response` text. Protected route.

### Miscellaneous

- **GET /api/health**  
  Simple health check that returns `200 OK` for uptime monitoring.

All protected routes require an `Authorization: Bearer <jwt>` header. The `context.ts` module decodes the token, verifies it, and attaches the user data to the request.

## 5. Hosting Solutions

We recommend a cloud environment that can grow with you:

- **Cloud Provider**: AWS, GCP, or Azure  
- **Compute**: 
  - AWS Elastic Beanstalk (easy deployment of Node.js apps) or  
  - AWS ECS/EKS (containerized with Docker) or  
  - Serverless Functions (AWS Lambda / Google Cloud Functions) for event-driven workloads
- **Database**: AWS RDS for PostgreSQL (managed, with automated backups)

Benefits:

- **Reliability**: Managed services come with built-in failover and backups.  
- **Scalability**: Auto-scaling groups or serverless tiers adjust to traffic.  
- **Cost-Effectiveness**: Pay only for what you use, with free tiers for testing.

## 6. Infrastructure Components

To ensure fast, reliable user experiences, the backend sits behind several components:

- **Load Balancer**  
  Distributes incoming traffic across multiple server instances.

- **API Gateway** (optional)  
  Handles path-based routing, request validation, and rate limiting.

- **Caching**  
  - **In-Memory Cache** (Redis or in-process) for frequently accessed data (e.g., session tokens or AI rate-limit counters).  
  - **HTTP Cache Headers** to enable browsers or CDNs to cache GET requests.

- **Content Delivery Network (CDN)**  
  While the API itself is dynamic, static assets (if any) can be served through CloudFront, Fastly, or Cloudflare to reduce latency.

- **Docker** (future)  
  Containerizing the API ensures consistent environments across development, testing, and production.

## 7. Security Measures

We follow best practices to protect user data and comply with regulations:

- **Authentication & Authorization**  
  - JWT-based auth for stateless session management.  
  - Role-based or scope-based access checks in middleware.

- **Data Encryption**  
  - HTTPS/TLS for all data in transit.  
  - At-rest encryption via the database provider.

- **Environment Variables**  
  Secrets (JWT secret, database credentials, API keys) never live in code. We use a `.env` file in development and a secure secrets manager in production.

- **Input Validation & Sanitization**  
  Using validation libraries (e.g., Joi or Zod) to guard against injection attacks.

- **Rate Limiting & Throttling**  
  Prevents abuse of endpoints, especially the AI generator.

- **HTTP Security Headers**  
  Helmet middleware in Express to set headers like `X-Frame-Options` and `Content-Security-Policy`.

- **Audit Logging**  
  Record login attempts, password resets, and critical API calls for security audits.

## 8. Monitoring and Maintenance

To keep the backend running smoothly:

- **Logs & Metrics**:
  - **Winston or Pino** for structured logging.  
  - **Prometheus + Grafana** or **Datadog** for collecting and visualizing metrics (CPU, memory, request latency, error rates).

- **Health Checks & Alerts**:
  - Automated alarms on high error rates or slow response times.  
  - Slack or email notifications when thresholds are breached.

- **Dependency Management**:
  - Regular `npm audit` or `yarn audit` to find vulnerabilities.  
  - Scheduled updates of libraries and annual Node.js major-version upgrades.

- **Backups & Recovery**:
  - Automated database snapshots (for RDS).  
  - Disaster-recovery plans and periodic restore testing.

- **Maintenance Windows**:
  - Clear communication of downtime for major upgrades.  
  - Blue-green or rolling deployments to minimize user impact.

## 9. Conclusion and Overall Backend Summary

This backend setup gives you:

- A **TypeScript/Express API** organized in a monorepo for maximum code reuse with the frontend.  
- A **modular architecture** (auth, AI, context) that’s easy to extend and test.  
- **RESTful endpoints** with clear responsibilities and protected routes via JWT.  
- A path to integrate a **PostgreSQL database** with a well-defined schema.  
- **Cloud-friendly hosting** on AWS/GCP/Azure, with components like load balancers, caching, and CDNs for performance.  
- Strong **security**, **monitoring**, and **maintenance** practices to keep user data safe and services reliable.

By following this document, any team—regardless of their prior setup—can run, scale, and maintain a production-ready backend without ambiguity.