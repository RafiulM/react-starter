# Project Requirements Document (PRD)

## 1. Project Overview

The **react-starter** repository is a fully opinionated boilerplate designed to kickstart the development of modern, full-stack web applications. It provides a monorepo setup that includes a React-based frontend scaffold, a Node.js/TypeScript API backend, and Terraform scripts for infrastructure provisioning. By bundling these components together with built-in authentication and AI integration modules, developers can immediately focus on delivering business logic and UI features rather than spending time on repetitive setup.

This starter kit is being built to reduce initial configuration overhead, enforce best practices, and ensure consistency across teams. The key objectives are to:

- Enable developers to clone a single repo and have a working frontend, backend, and IaC environment in minutes.
- Promote code quality and collaboration through TypeScript, Git hooks (Husky), and shared VS Code settings.
- Provide out-of-the-box authentication and AI integration so teams can secure their app and experiment with intelligent features without custom plumbing.
- Support maintainable, scalable growth by using a monorepo for shared logic and Terraform for reproducible infrastructure.

Success will be measured by how quickly a new developer can get the environment running, the absence of common setup errors, and the ease of extending the boilerplate to real-world application needs.

---

## 2. In-Scope vs. Out-of-Scope

**In-Scope (v1.0):**

- Monorepo structure with `apps/` folder containing frontend and backend directories.
- React frontend scaffold (TypeScript, basic folder layout, routing support).
- Node.js + TypeScript API backend under `apps/api/`, including controllers, services, and routing.
- Authentication module (`auth.ts`) supporting user registration, login, JWT issuance/validation.
- AI integration module (`ai.ts`) encapsulating calls to external AI services.
- Terraform scripts for provisioning core infrastructure (compute, networking, database placeholder).
- Development tooling: Husky for Git hooks, ESLint + Prettier configurations, and shared VS Code settings.
- Documentation: README with setup, run, and deploy instructions.

**Out-of-Scope (Phase 1):**

- Complete database setup and ORM configuration (e.g., Prisma, TypeORM) beyond placeholders.
- Full CI/CD pipeline (e.g., GitHub Actions workflows) – only manual Terraform invocation.
- End-to-end / UI test suites (Cypress, Playwright) – only basic unit test examples.
- Production-grade monitoring, logging, and observability tools (e.g., Prometheus, ELK).
- Advanced infrastructure patterns like auto-scaling groups or service meshes.
- Mobile or native client apps – only web React scaffold is provided.

---

## 3. User Flow (Developer Journey)

A new team member clones the `react-starter` repo and runs `npm install` at the root. Because of the monorepo setup, all dependencies for both the `apps/web` (frontend) and `apps/api` (backend) are installed at once. They review the shared VS Code settings that enforce consistent linting and formatting. With a single command (`npm run dev`), the developer spins up the React development server on `http://localhost:3000` and the Node/TypeScript API on `http://localhost:4000`. They verify hot-reload, linting, and basic endpoints (Health Check, Auth) are working.

Next, the developer explores the authentication and AI modules in `apps/api/lib`. They add a new protected API route by importing the existing `auth.ts` middleware and extend the AI wrapper in `ai.ts` to call a sample language model. On the frontend side, they create a React page that calls this new endpoint and displays results. When ready to test infrastructure, they navigate to the `.claude/terraform` directory, configure environment variables, and execute `terraform apply` to provision resources in their cloud account. The developer now has a live environment mirroring local setup and can iterate on features seamlessly.

---

## 4. Core Features

- **Monorepo Structure**: Single repository containing all apps and shared packages under `apps/` and (optional) `packages/`.
- **Frontend Scaffold**: React + TypeScript project with standard folder layout (`components/`, `pages/`, `services/`), routing, and sample pages.
- **API Backend**:
  - Express or Fastify server in Node.js with TypeScript.
  - Controllers, services, and middleware organization.
- **Authentication Module** (`apps/api/lib/auth.ts`):
  - JWT-based login, registration, password hashing, token validation.
  - Middleware for protected routes.
- **AI Integration Module** (`apps/api/lib/ai.ts`):
  - Wrapper to call external AI services (e.g., OpenAI, Anthropic).
  - Support for text generation and embeddings.
- **Infrastructure as Code** (`.claude/terraform/`):
  - Terraform configurations for compute instances (e.g., AWS EC2, ECS), networking, and placeholder database.
  - Variables and outputs structured for easy customization.
- **Developer Tooling**:
  - Husky Git hooks triggering ESLint, Prettier, and unit tests before commits/pushes.
  - ESLint + Prettier configs for TypeScript consistency.
  - VS Code workspace settings and recommended extensions for a unified environment.
- **Documentation & Scripts**:
  - Root README with step-by-step instructions.
  - NPM scripts for linting, testing, formatting, and Terraform commands.

---

## 5. Tech Stack & Tools

- **Frontend:** React 18, TypeScript, React Router (or Next.js if chosen later). Babel, Webpack or Vite.
- **Backend:** Node.js (v16+), TypeScript, Express or Fastify, JWT, bcrypt.
- **Infrastructure as Code:** Terraform 1.x targeting AWS/Azure/GCP providers.
- **Authentication & Security:** JWT, bcrypt, helmet (HTTP headers), CORS.
- **AI Models / Libraries:** OpenAI SDK or Anthropic SDK integrated in `ai.ts`.
- **Code Quality:** ESLint, Prettier, Husky (Git hooks).
- **Editor Integration:** VS Code with `.vscode/settings.json` and `extensions.json`.
- **Monorepo Tools (optional):** Lerna, Yarn Workspaces or PNPM Workspaces.
- **Testing (basic):** Jest for unit tests, Supertest for API route testing.

---

## 6. Non-Functional Requirements

- **Performance:** Frontend bundle size < 200 KB gzipped; API response times < 200 ms for simple endpoints.
- **Scalability:** Code structure should allow independent scaling of frontend and backend services.
- **Security:** Follow OWASP Top 10 best practices; secure HTTP headers; strong password hashing; input validation.
- **Availability:** Infrastructure scripts should support applying and destroying without manual state drift.
- **Usability:** Developer onboarding time (clone to Hello World) < 15 minutes; clear error messages.
- **Maintainability:** 90% code coverage for core modules; consistent code formatting; modular folder layout.

---

## 7. Constraints & Assumptions

- **Terraform Availability:** Assumes users have Terraform installed and configured with cloud credentials.
- **Node & NPM Versions:** Requires Node.js v16+ and a compatible package manager (npm, Yarn, PNPM).
- **Database Placeholder:** A real database engine is not pre-configured; the starter provides placeholders for later integration.
- **Cloud Provider:** Terraform configs assume AWS by default; users must adapt variables for other providers.
- **Monorepo Tooling Chosen Later:** The boilerplate is flexible but may need a decision on Lerna vs. native workspaces.
- **External AI Service Access:** Assumes valid API keys and network access for AI providers.

---

## 8. Known Issues & Potential Pitfalls

- **Missing Frontend App Directory:** If `apps/web` is not present, developers must scaffold or rename accordingly.
- **Database Integration Gap:** Developers must manually add ORM/ODM and configure migrations; placeholders may confuse newcomers.
- **Terraform State Management:** Without a remote backend (e.g., S3 bucket), state files can drift when team members run apply separately.
- **API Rate Limits:** Calls to AI services are subject to rate limits; implement retry and backoff strategies in `ai.ts`.
- **Version Mismatches:** Monorepo dependency versions can diverge; adopt strict versioning or a lockfile strategy.
- **Local vs. Cloud Parity:** Differences between local Dockerized or dev environments and Terraform-provisioned resources can lead to surprises; document environment variables clearly.

**Mitigation Guidelines:**
- Provide a sample `.env.example` and instructions for database setup.
- Encourage using Terraform remote state for teams.
- Add retry logic and configuration knobs for AI calls.
- Document Lerna/PNPM setup if monorepo tooling is introduced later.
- Include a small shell script to validate environment versions (Node, Terraform).

---

_End of PRD_