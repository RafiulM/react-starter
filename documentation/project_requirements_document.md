# Project Requirements Document (PRD)

## 1. Project Overview

**react-starter** is a full-stack web application starter kit designed to help developers quickly kick off projects with a battle-tested setup. It provides a React-based front end, a Node.js-powered back end, a built-in authentication module, and easy integration with AI services. On the infrastructure side, Terraform scripts manage deployment and a Cloudflare D1 database offers a serverless, low-latency data store. The main goal is to accelerate development by providing a clear folder structure, preconfigured tooling, and best-practice patterns out of the box.

We’re building this starter kit to solve the common pain points of setting up a modern web app from scratch: wiring authentication, configuring the database, wiring up CI/CD, and creating a consistent developer experience. Success looks like a zero-to-running-app flow in under 10 minutes, a reproducible infrastructure setup, and a baseline of high code quality enforced by hooks and editor configs. Future AI or custom features can then slot in without fighting the foundational layers.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (v1.0)
- React front end with routing, state management (e.g., React Router, Context API)
- Node.js back end exposing REST endpoints (authentication, user profile)
- Authentication module: sign-up, login, JWT handling, protected routes
- AI integration service: wrapper around an external AI provider (e.g., Claude AI)
- Data persistence using Cloudflare D1 (basic schema, migrations)
- Infrastructure provisioning via Terraform (compute, network, D1 database)
- Developer tooling: Husky hooks, ESLint/Prettier, VS Code settings
- Basic documentation: setup guide, folder structure overview, contribution notes

### Out-of-Scope (v1.0)
- Custom business logic or domain-specific features (e.g., e-commerce carts)
- Mobile app or React Native support
- Real-time features (WebSockets or real-time database sync)
- Payment gateway integrations
- Multi-tenant or role-based admin dashboard beyond basic roles
- Full CI/CD pipeline beyond local pre-commit hooks (e.g., GitHub Actions)
- Analytics, logging dashboards, or monitoring services

## 3. User Flow

When a new application built on this starter kit goes live, a typical end user will arrive at the landing page, click "Sign Up," and enter their email, password, and profile details. The front end sends these credentials to the Node.js API, which validates the information, creates a user record in Cloudflare D1, issues a JSON Web Token (JWT), and returns it to the client. The React app stores this token locally (e.g., in memory or secure cookie) and redirects the user to their personal dashboard.

On the dashboard, the user can navigate via a left-hand sidebar. They’ll see sections like "Profile," "AI Assistant," and "Settings." In "AI Assistant," the user submits a prompt or piece of content. The front end calls the AI integration endpoint, which relays the request to the external AI model (e.g., Claude). The AI response streams back through the API into the UI in conversational style. Throughout, the application enforces route protection: any unauthorized access attempts send the user back to the login page.

## 4. Core Features

- **Authentication Service**: Sign-up, login, JWT issuance and validation, protected API routes.
- **User Management**: Basic CRUD for user profiles stored in Cloudflare D1.
- **AI Integration Module**: Thin wrapper around an external AI API (Claude AI), including prompt templates and response handlers.
- **Data Layer**: Database client for Cloudflare D1, schema definitions, migration scripts.
- **Infrastructure as Code**: Terraform scripts to provision compute (e.g., Cloudflare Workers), database, and any required networking.
- **Developer Tooling**:
  - Husky pre-commit hooks running ESLint and Prettier
  - VS Code workspace settings for consistent formatting and import sorting
- **Monorepo Structure**: Co-located `apps/web` (frontend) and `apps/api` (backend) with shared `api/lib` utilities.
- **Basic Logging & Error Handling**: Centralized error middleware on the API, console-level logs for dev mode.

## 5. Tech Stack & Tools

- Frontend: React (with Hooks, React Router), TypeScript
- Backend: Node.js (ESM), TypeScript, Express.js (or similar lightweight framework)
- Database: Cloudflare D1 (Edge SQL database)
- Infrastructure: Terraform (HCL)
- AI Services: Claude AI (via custom `ai.ts` service layer)
- Version Control & Hooks: Git, Husky (pre-commit)
- Editor Integration: VS Code (`.vscode/settings.json`)
- Monorepo Management: Yarn Workspaces (or npm workspaces)
- Testing (future): Jest for unit tests, Supertest for API tests

## 6. Non-Functional Requirements

- **Performance**: Initial page load under 2 seconds on a 3G network; API response times under 200 ms for simple queries.
- **Security**: All traffic over HTTPS; JWT tokens signed with strong secret; OWASP Top 10 mitigations (CSRF, XSS, SQL injection via parameterized queries).
- **Scalability**: Stateless API suitable for horizontal scaling; Terraform-managed infra to spin up multiple instances.
- **Reliability**: 99.9% uptime SLA for critical endpoints; simple retry logic on failed AI calls.
- **Usability**: Responsive UI that works on desktop and tablet; keyboard-navigable forms; ARIA attributes on interactive components.
- **Maintainability**: 80%+ code coverage goal (in future phases); strict linting and type checks on all commits.

## 7. Constraints & Assumptions

- Cloudflare D1 and Terraform must be available in the target cloud account.
- Developers will use Node.js v16+ and modern browsers.
- The external AI provider (Claude AI) has stable API keys and enough rate quota for early development.
- No legacy code or frameworks need to be supported.
- Environment variables (database URL, JWT secret, AI API key) are managed securely (e.g., `.env` or Vault).

## 8. Known Issues & Potential Pitfalls

- **API Rate Limits**: External AI service may throttle requests—implement client-side debounce or server-side queueing.
- **Terraform Drift**: Manual changes outside of Terraform can cause inconsistencies; enforce IaC discipline.
- **Monorepo Complexity**: Growing codebase may outpace simple workspace setups—consider Turborepo/Nx later.
- **Edge Constraints**: Cloudflare Workers have CPU and execution time limits—heavy AI payloads may need external function calls.
- **Error Handling Gaps**: Uncaught exceptions in streams (AI responses) could crash the server; add global exception handlers.
- **Database Migrations**: Cloudflare D1 migration tooling is nascent—require robust rollback strategy.

---
This document serves as the single source of truth for the **react-starter** kit. It provides unambiguous guidance to generate all subsequent technical specifications, folder structures, and code guidelines without further clarification.