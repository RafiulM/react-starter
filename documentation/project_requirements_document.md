# Project Requirements Document (PRD)

## 1. Project Overview
The **react-starter** project is a full-stack starter kit designed to help developers quickly launch new web applications. It comes as a single repository (a _monorepo_) containing both a React-based frontend and a Node.js backend API. On the frontend side, it provides a ready-to-use React application scaffold with routing, state management, and build configuration. On the backend side, it offers a modular TypeScript API that handles authentication, request context, and optional AI integrations.

This kit also includes all the infrastructure-as-code (IaC) setup using Terraform, pre-configured developer workflows (Git hooks via Husky, VS Code settings), and AI-assisted development commands (using Claude AI). The main goals are to eliminate boilerplate setup, enforce consistent code quality, and make deploying preview environments and serverless databases (Cloudflare D1) as frictionless as possible. Success will be measured by how fast a new contributor can get from clone to a working app and how few manual steps are required for code quality and environment provisioning.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (Version 1.0)
- Monorepo organization with separate `apps/frontend` (React) and `apps/api` (Node.js/TypeScript) folders.  
- Preconfigured React app with routing, state management (e.g., Redux or Context API), ESLint/Prettier, and build scripts.  
- Modular Node.js API using Express.js (or similar) with core modules: `auth.ts` (authentication), `context.ts` (request context), `ai.ts` (AI calls).  
- Infrastructure as Code using Terraform to provision API deployment and Cloudflare D1 database.  
- Husky Git hooks for pre-commit linting, formatting, and basic type checks.  
- VS Code workspace settings and recommended extensions for consistent IDE experience.  
- Basic AI command scripts under `.claude/commands` for guiding database migration and reviewing Terraform plans.  
- Database migration guide and helper scripts for Cloudflare D1.  

### Out-of-Scope (Phase 2+)
- Mobile applications or native clients.  
- Advanced CI/CD pipelines beyond local pre-commit hooks (e.g., GitHub Actions or GitLab CI).  
- Detailed observability (metrics, tracing, logging dashboards).  
- Production-grade monitoring, alerting, and load testing.  
- Microservices beyond the single API service.  
- Custom theming or component library for the frontend.  

## 3. User Flow
When a developer joins the project, they will clone the `react-starter` repo and run `npm install` (or `pnpm install`) at the root. They’ll open the workspace in VS Code, which will automatically load the provided settings and recommended extensions. As soon as they make changes, Husky’s pre-commit hooks will run ESLint and Prettier to catch styling or type errors before code is pushed.

To start coding, they’ll run `npm run dev` (or equivalent) which launches both the React dev server and the Node.js API. In the browser, they’ll see the sample React homepage. The frontend communicates with the backend via HTTP calls (e.g., `fetch('/api/hello')`). If they need a preview environment, they’ll invoke Terraform commands like `terraform init` and `terraform apply` to provision cloud resources, including a Cloudflare D1 instance. For AI-assisted tasks (e.g., checking infrastructure code), they’ll use commands defined in `.claude/commands`.

## 4. Core Features
- **Monorepo Structure**: Single codebase for frontend and backend to share configs and utilities.  
- **React Frontend**: Preconfigured with routing, state management, environment variables, and build pipelines.  
- **Node.js API**: Modular TypeScript service with `auth`, `context`, and `ai` modules.  
- **Infrastructure as Code**: Terraform scripts to provision API hosting and a Cloudflare D1 database.  
- **Git Hooks**: Husky setup for running linters, formatters, and type checks on every commit.  
- **VS Code Integration**: Workspace settings and extension recommendations for a unified development environment.  
- **AI Assistance**: Claude AI command definitions for migration guidance and infrastructure review.  
- **Database Migration**: Scripts and documentation to initialize and migrate Cloudflare D1 schemas.  

## 5. Tech Stack & Tools
- **Frontend**: React (Create React App or Vite) with TypeScript, React Router (or equivalent), Context API/Redux.  
- **Backend**: Node.js (LTS) with TypeScript, Express.js (or NestJS), and modules in `apps/api/lib`.  
- **Database**: Cloudflare D1 (SQLite-compatible serverless database).  
- **IaC**: Terraform for provisioning cloud resources.  
- **Version Control Hooks**: Husky for Git pre-commit/commit-msg hooks.  
- **IDE**: VS Code with workspace `.vscode/settings.json` and recommended extensions.  
- **AI Model**: Claude AI integration via CLI commands stored in `.claude/commands`.  
- **Package Management**: npm, Yarn, or pnpm with workspaces enabled.  

## 6. Non-Functional Requirements
- **Performance**:  
  • Frontend initial load under 2 seconds on 3G mobile emulation.  
  • API response times under 200ms for simple GET/POST.  
- **Security**:  
  • All API endpoints protected via JSON Web Tokens (JWT).  
  • Input validation on server side to prevent injection attacks.  
  • Regular dependency vulnerability scans (e.g., `npm audit`).  
- **Usability**:  
  • Developer setup time under 5 minutes (post-clone to dev server running).  
  • Clear README steps and error messages.  
- **Reliability**:  
  • Terraform provisioning must be idempotent—running `apply` twice causes no unintended changes.  
  • Database migration scripts handle versioning and rollback safely.  

## 7. Constraints & Assumptions
- The team has access to a Cloudflare account with D1 beta permissions.  
- Terraform and Claude CLI tools must be installed locally for IaC and AI commands.  
- Node.js environment is standardized to an LTS version (e.g., v18+).  
- The monorepo uses a single package manager (npm/Yarn/pnpm) chosen at project start.  
- CLAUDE AI models and API keys are available and configured in developer `.env` files.  

## 8. Known Issues & Potential Pitfalls
- **Cloudflare D1 Limitations**: D1 has a ~10 MB per database file limit. Mitigation: Archive or shard data if needed.  
- **Terraform State Drift**: Remote state can become inconsistent. Mitigation: Use a remote state backend (e.g., S3, Terraform Cloud).  
- **Husky on Windows**: Git hook scripts may fail on Windows environments. Mitigation: Add `husky.sh` wrappers or documentation for Windows users.  
- **Claude CLI Reliability**: AI commands may break if Claude’s API changes. Mitigation: Pin Claude CLI versions and add fallback manual scripts.  
- **Package Manager Confusion**: Mixing npm and pnpm can cause duplicated deps. Mitigation: Lock in a single manager and document it clearly in README.