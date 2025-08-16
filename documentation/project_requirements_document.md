# Project Requirements Document for "react-starter"

## 1. Project Overview

"react-starter" is a boilerplate monorepo designed to accelerate development of modern full-stack web applications. It provides a clear separation between the React-based frontend (`apps/web/`), the Node.js API backend (`apps/api/`), and a shared utilities folder (`packages/`). By prescribing a well-structured foundation—complete with authentication scaffolding, AI integration hooks, and Infrastructure-as-Code pointers—it solves the common pain of setting up project architecture, allowing teams to focus on business logic instead of repetitive setup tasks.

This project is being built to standardize and streamline the initial phases of web app development. Key objectives include: 1) delivering a ready-to-use monorepo with best practices embedded, 2) ensuring consistent code quality via pre-configured tooling (Husky, ESLint, Prettier), and 3) enabling smooth local and cloud deployments through Terraform and database migration guidelines. Success is measured by how quickly a new developer can clone the repo, install dependencies, run both frontend and backend locally, and build a sample feature with minimal friction.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (v1)
- Monorepo setup containing `apps/web/`, `apps/api/`, and `packages/` folders
- React frontend with routing, environment variable support, and state management hooks
- Node.js backend with RESTful endpoint scaffolding, authentication module, and AI integration stub (`ai.ts`)
- Shared utilities in `packages/` (shared types, helper functions, API client)
- Git hooks via Husky enforcing linting and formatting
- Pre-configured VS Code settings and recommended extensions
- Documentation stubs for Terraform (`review-terraform.md`) and Cloudflare D1 migration (`migrate-to-d1.md`)

### Out-of-Scope (Phase 2+)
- Production-ready CI/CD pipelines
- Comprehensive test suites (unit, integration, e2e)
- Full database schema and migrations beyond the D1 migration outline
- Advanced state management libraries (e.g., Redux) pre-wired
- Deployment automation beyond Terraform documentation (e.g., GitHub Actions workflows)
- Detailed UI component library beyond basic starter components

## 3. User Flow

A developer kicks off by cloning the `react-starter` repository and running `yarn install` (or `npm install`) at the root. Once dependencies are installed, they navigate to the monorepo root and run `yarn dev`, which concurrently starts the React development server on `localhost:3000` and the Node API server on `localhost:4000`. The developer opens the browser to see a placeholder React page confirming the frontend is up, and can inspect API endpoints (e.g., `/api/health`) to verify the backend is operational.

Internally, the React app imports shared types and utility functions from `packages/`, while the Node server loads authentication logic and AI stubs from `apps/api/lib/`. As the developer adds features, they create new modules under `apps/web/src/` for UI components and under `apps/api/src/` for new routes. Shared code in `packages/` is updated once and consumed by both sides. Git hooks automatically lint and format code on each commit, and VS Code settings guide the developer toward consistent styling and recommended extensions.

## 4. Core Features
- Monorepo architecture with separate `apps/web`, `apps/api`, and `packages` folders
- React frontend setup with routing, environment variables, and hot-reload
- Node.js/Express (or similar) backend API with route scaffolding
- Authentication module (`auth.ts`) supporting login, session, and JWT handling
- AI integration stub (`ai.ts`) ready for plugging in third-party models
- Context management (`context.ts`) for request tracing and dependency injection
- Shared utilities (types, API client functions) in `packages/`
- Git hook enforcement (Husky) for linting (ESLint) and formatting (Prettier)
- VS Code workspace configuration and recommended extensions
- Infrastructure-as-Code guidance via Terraform documentation
- Cloudflare D1 migration notes for serverless SQL database setup

## 5. Tech Stack & Tools
- Frontend: React (JavaScript/TypeScript), React Router, built using Yarn workspaces
- Backend: Node.js with Express or Fastify, TypeScript, RESTful API conventions
- Shared: TypeScript for types, code reusability
- Database: Cloudflare D1 (serverless SQL), migration notes provided
- IA C: Terraform (referenced via `review-terraform.md`)
- Code Quality: ESLint, Prettier, Husky for pre-commit hooks
- Editor: VS Code with settings in `.vscode/` and recommended extensions
- Potential AI models: Placeholder for OpenAI GPT-4 integration in `ai.ts`

## 6. Non-Functional Requirements
- Performance: Local dev servers should startup within 10 seconds
- Security: JWT-based authentication, input validation, and OWASP guidelines
- Compliance: Follow general GDPR best practices for user data handling
- Usability: One-command dev startup (`yarn dev`), clear README and scripts
- Scalability: Monorepo structure must allow adding new apps or packages without structural changes

## 7. Constraints & Assumptions
- Assumes Node.js (v16+) and Yarn (or npm v7+) installed locally
- Terraform CLI availability for infrastructure steps
- Cloudflare account configured for D1 database when migrating
- AI integration is stubbed; actual model credentials must be supplied later
- Developer has VS Code or similar IDE for best experience

## 8. Known Issues & Potential Pitfalls
- API rate limiting and error handling not fully implemented—may need middleware
- Terraform scripts are documented but not validated end-to-end—requires review
- Shared package versioning can cause mismatches if not managed (consider Lerna/Nx later)
- Lack of automated tests means regressions could slip by—must add tests in Phase 2
- State management in React is minimal—may need a more robust solution for complex UIs

---

This PRD provides a complete, unambiguous blueprint for the AI model to generate subsequent technical documents (Tech Stack, Frontend Guidelines, Backend Structure, etc.) without additional clarification.