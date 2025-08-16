# Project Requirements Document (PRD)

## 1. Project Overview

“react-starter" is an opinionated, full-stack boilerplate designed to accelerate development of React applications with a built-in Node/TypeScript API. By packaging a monorepo structure, authentication utilities, AI service helpers, pre-configured hooks, and IDE settings into one repository, this starter kit lets teams hit the ground running instead of reinventing foundational setup.

This starter is being built to enforce best practices from day one: strong typing (TypeScript), code quality gates (Husky pre-commit hooks), consistent editor configuration (VS Code settings), and modular architecture (clear separation of auth, AI, and context). Success is measured by how quickly a developer can clone the repo, run `yarn dev`, and begin adding business-specific features without wrestling with boilerplate setup.

## 2. In-Scope vs. Out-of-Scope

In-Scope (v1.0):
- Monorepo layout under `apps/`, housing both frontend and backend
- Frontend scaffold using React + TypeScript
- Backend API in TypeScript with core modules: authentication, AI utilities, request context
- Husky-driven pre-commit hooks for linting and testing
- VS Code workspace settings for unified editor experience
- Minimal CLI scripts for starting dev servers (`yarn dev`), building (`yarn build`)

Out-of-Scope (deferred to later releases):
- Dedicated database integration and ORM setup (e.g., Prisma, TypeORM)
- CI/CD pipeline definitions (GitHub Actions, GitLab CI)
- Dockerization (`Dockerfile` / `docker-compose.yml`)
- Rich example UI components or styling framework
- Production-grade deployment configuration
- File-generation scaffolding (e.g., `yarn generate component`)

## 3. User Flow

A developer first clones the `react-starter` repo, runs `yarn install`, and executes `yarn dev`. This launches two processes: one for the frontend (`http://localhost:3000`) and one for the API (`http://localhost:4000`). The developer sees a minimal React application that prompts for login or registration. Sample credentials can be used to hit the `/api/auth` endpoints. VS Code will automatically apply formatting and linting rules on file save, ensuring code quality from the start.

An end user (of the eventual app built on this starter) registers with email and password via the React UI, then logs in. On successful authentication, a dashboard screen appears with a left sidebar for navigation (e.g., "Generate AI Content") and a main area. When the user submits input to the AI tool (via the React form), the frontend calls `/api/ai/generate`, displaying the returned AI response in the UI. All API calls include a JWT token in the Authorization header for protected routes.

## 4. Core Features

- **Monorepo Structure**: `apps/api` (backend) and `apps/web` (frontend) under one Git repository
- **Authentication Module** (`auth.ts`):
  - Registration, login endpoints
  - JWT issuance and validation
  - Token refresh logic
- **AI Utilities** (`ai.ts`):
  - Wrapper functions for external AI service calls
  - API endpoint to generate or classify content
- **Request Context** (`context.ts`):
  - Central place to assemble per-request data (e.g., user identity, DB clients)
- **Pre-commit Hooks (Husky)**:
  - Enforce ESLint and Prettier before commit
  - Run basic smoke tests
- **VS Code Settings** (`.vscode/settings.json`):
  - Unified editor formatting and TypeScript rules
- **CLI Scripts**:
  - `yarn dev`: starts frontend and backend in watch mode
  - `yarn build`: compiles TypeScript for production

## 5. Tech Stack & Tools

- **Frontend**:
  - React (Create React App or Next.js) with TypeScript
  - State management: React Context or Redux (optional)
- **Backend**:
  - Node.js (v18+) with TypeScript
  - Express.js or Fastify (to be chosen) for HTTP server
- **Monorepo & Package Manager**:
  - Yarn Workspaces or pnpm Workspaces
- **AI Integration**:
  - Placeholder for external API calls (OpenAI GPT-4, Claude)
  - `.claude/commands` directory for AI-driven code automation
- **Quality & Editor**:
  - ESLint + Prettier
  - Husky for Git hooks
  - VS Code workspace settings

## 6. Non-Functional Requirements

- **Performance**: API endpoints respond within 200ms under typical load; initial page load under 1s on a modern desktop browser.
- **Security**: All protected routes require valid JWTs; enforce HTTPS in production; sanitize inputs to avoid injection attacks.
- **Compliance**: CORS enabled for known frontend origin; GDPR-ready storage of user data (no unauthorized logging of PII).
- **Usability**: Responsive design on mobile/tablet; clear error messages for auth failures and AI timeouts.

## 7. Constraints & Assumptions

- Node.js version must be v18 or newer
- External AI service keys (OpenAI, Anthropic) are available and valid
- Developers use VS Code or configure equivalent editor rules
- No full database schema or migrations are included—teams will integrate their own choice later
- Choice of HTTP framework (Express vs. Fastify) will be finalized before detailed backend docs

## 8. Known Issues & Potential Pitfalls

- **Undefined Backend Framework**: The starter doesn’t yet pin Express or Fastify. This ambiguity must be resolved to generate route examples and middleware patterns.
- **No Database Layer**: Without an ORM or connection instructions, teams may diverge in patterns. We recommend providing a basic Prisma config in the next iteration.
- **AI Rate Limits & Latency**: External AI services may impose rate limits or experience slow responses. Implement retries, timeouts, and user-friendly loading states.
- **Monorepo Tooling Conflicts**: Yarn vs. pnpm vs. npm workspaces can conflict. Locking to one package manager and adding CI checks will guard against drift.

---
This document provides a complete, unambiguous reference for generating all subsequent technical documents (Tech Stack, Frontend Guidelines, Backend Structure, App Flow, File Structure, IDE rules, etc.). If any detail needs clarification—such as choice of HTTP framework or database library—it should be resolved before moving to the next phase.