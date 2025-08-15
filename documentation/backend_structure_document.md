# Backend Structure Document

This document outlines the backend architecture, database design, APIs, hosting, infrastructure, security, and maintenance strategies for the `react-starter` full-stack template. It’s written in everyday language so that anyone can understand how the backend is set up and why each component was chosen.

## 1. Backend Architecture

### Overall Design
- The backend is a Node.js application written in TypeScript.  
- It follows a modular structure with separate folders for controllers, services, middleware, and utilities.  
- Business logic lives in **services**, HTTP request handling lives in **controllers**, and shared helpers live in **lib** (e.g., `auth.ts`, `ai.ts`).

### Design Patterns and Frameworks
- **Express.js** for routing and middleware support.  
- **Dependency Injection** pattern for managing service instances (optional with frameworks like Inversify or built-in factory patterns).  
- **Repository/ORM Layer** using Prisma (or TypeORM) to abstract database calls.

### Scalability, Maintainability, Performance
- **Scalability**: Stateless API instances can be scaled horizontally behind a load balancer.  
- **Maintainability**: Clear separation of concerns (controllers vs. services vs. models) and TypeScript’s type safety reduce bugs.  
- **Performance**: Lean middleware chain, connection pooling at the database layer, and optional in-memory caching (Redis).

## 2. Database Management

### Technologies Used
- **Type**: Relational (SQL)  
- **System**: PostgreSQL (managed by Terraform)  
- **ORM**: Prisma (or TypeORM) for type-safe database access

### Data Structure and Access
- Data resides in tables with clearly defined relations (users, sessions, AI logs).  
- The ORM handles migrations, schema synchronization, and query generation.  
- Connection pooling ensures efficient reuse of database connections.  
- Environment variables (via `dotenv`) store credentials, keeping secrets out of code.

### Data Management Practices
- **Migrations**: Versioned migration files ensure consistent schema updates across environments.  
- **Backups**: Automated daily backups of the PostgreSQL database (via AWS RDS snapshots).  
- **Access Control**: Database credentials limited to necessary privileges (least privilege principle).

## 3. Database Schema

Below is a human-readable description of the main tables, followed by SQL definitions.

### Tables Overview
- **users**: Holds user credentials and profile information.  
- **sessions**: Tracks active user sessions or JWT refresh tokens.  
- **ai_interactions**: Logs each AI request and response for auditing and analytics.

### SQL Schema (PostgreSQL)
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  refresh_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Interactions table
CREATE TABLE ai_interactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. API Design and Endpoints

### Architecture
- **RESTful API** served over HTTPS.  
- JSON payloads for requests and responses.  
- API versioning via URL (e.g., `/api/v1`).

### Key Endpoints

**Authentication**
- `POST /api/v1/auth/register`  
  • Registers a new user with email and password.  
- `POST /api/v1/auth/login`  
  • Verifies credentials, returns access and refresh tokens.  
- `POST /api/v1/auth/refresh`  
  • Exchanges a valid refresh token for a new access token.

**User Management**
- `GET /api/v1/users/me`  
  • Returns the authenticated user’s profile.  
- `PUT /api/v1/users/me`  
  • Updates user profile details.

**AI Integration**
- `POST /api/v1/ai/query`  
  • Sends a prompt to the AI service, returns the generated response.  
- `GET /api/v1/ai/logs`  
  • Lists previous AI interactions for the user.

### Frontend Communication
- Axios or Fetch calls from React to these endpoints.  
- JWT access token stored in memory or secure cookie; refresh token in HttpOnly cookie.

## 5. Hosting Solutions

### Cloud Provider
- **AWS** (Amazon Web Services) managed via Terraform.  
- **Compute**: AWS Elastic Container Service (ECS) with Fargate or EC2 instances.  
- **Database**: Amazon RDS for PostgreSQL.  
- **Storage**: S3 buckets for static assets (if frontend deployed here).

### Benefits
- **Reliability**: AWS SLA-backed services.  
- **Scalability**: Auto-scaling groups for ECS or EC2.  
- **Cost-Effectiveness**: Pay-as-you-go, scale down dev/staging environments when unused.

## 6. Infrastructure Components

### Load Balancing
- **AWS Application Load Balancer (ALB)** distributes incoming traffic across backend instances.

### Caching
- **Redis** (Elasticache) for session storage and caching frequent queries (e.g., AI service responses).

### Content Delivery Network
- **CloudFront** in front of S3 to serve frontend assets with low latency.

### Infrastructure as Code
- **Terraform** files in `.claude/terraform`: define VPCs, subnets, security groups, ECS clusters, RDS instances, and IAM roles.

### How They Work Together
1. Client ➔ ALB ➔ ECS instances running the API.  
2. ECS tasks connect to RDS for data storage and Redis for cache.  
3. S3 + CloudFront serve static frontend assets.  
4. Terraform ensures all components are provisioned consistently.

## 7. Security Measures

### Authentication and Authorization
- **JWT** for stateless authentication, short-lived access tokens + HttpOnly refresh cookies.  
- Role checks in middleware to protect admin or sensitive routes.

### Data Encryption
- **TLS/SSL** enforced for all HTTP traffic.  
- **At-rest encryption** for RDS and S3.  
- **Environment variables** stored securely (e.g., AWS Parameter Store or Secrets Manager).

### Input Validation and Sanitization
- **Express-validator** or Joi to validate request payloads.  
- **Helmet** middleware to set secure HTTP headers.  
- **CORS** configured to allow only known origins.

### Network Security
- Security groups restrict access by port and IP.  
- Private subnets for database and cache; public subnets only for load balancer.

### Compliance
- Follows OWASP Top 10 best practices to protect against SQL injection, XSS, CSRF, etc.

## 8. Monitoring and Maintenance

### Monitoring Tools
- **AWS CloudWatch** for metrics (CPU, memory, request latency).  
- **Prometheus & Grafana** (optional) for custom metrics and dashboards.  
- **ELK Stack** (Elasticsearch, Logstash, Kibana) or **AWS CloudWatch Logs** for log aggregation.

### Alerts and Notifications
- CloudWatch alarms trigger SNS notifications on high error rates or resource thresholds.

### Maintenance Strategies
- **Automated Backups**: RDS snapshots, S3 versioning enabled.  
- **Rolling Deployments**: Zero-downtime updates via ECS or blue/green deployments.  
- **Dependency Updates**: Regular `npm audit` checks and scheduled upgrades.  
- **Health Checks**: ALB health checks to auto-replace unhealthy instances.

## 9. Conclusion and Overall Backend Summary

The backend of the `react-starter` monorepo uses a modular, TypeScript-based Node.js API, backed by PostgreSQL and managed with Prisma. It offers RESTful endpoints for authentication, user management, and AI integration. Hosted on AWS via Terraform, the setup includes load balancing, caching, CDN, and strong security measures. Monitoring with CloudWatch (and optional Prometheus/Grafana) ensures reliability, while CI/CD and IaC practices deliver consistency and speed. This structure balances developer productivity, application performance, scalability, and security, making it an ideal starting point for any modern web application.