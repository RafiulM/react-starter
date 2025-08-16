# Project Requirements Document (PRD)

## 1. Project Overview

This repository, **`rafiulm/react-starter`**, is a boilerplate template for kick-starting full-stack web applications. It bundles a modern React frontend with a TypeScript-based backend API, plus built-in tooling for code quality (Husky), IDE configuration (VS Code), and an early integration of AI services (via a `.claude` folder and `ai.ts` module). The core problem it solves is reducing setup time and enforcing best practices so that teams can focus on feature development instead of repetitive configuration.

We’re building this starter to achieve two key objectives: 1) Provide a rock-solid, opinionated foundation that enforces separation of concerns, type safety, and modularity; 2) Seamlessly integrate AI-powered code assistance and automated review processes to boost developer productivity. Success will be measured by how quickly a new project can be scaffolded, how consistent the code quality is across teams, and how easily AI features can be leveraged for code generation or review.

## 2. In-Scope vs. Out-of-Scope

**In-Scope (Version 1.0)**
- React-based frontend app scaffolding (folder under `apps/`)
- TypeScript backend API service (`apps/api/`) with modules for AI (`ai.ts`), authentication, and request context
- Git hooks (pre-commit/pre-push) via Husky for linting and formatting
- VS Code workspace settings (`.vscode/`) with recommended extensions and debugging configurations
- AI assistant configuration directory (`.claude/`) containing guidelines (e.g., `migrate-to-d1.md`, `review-terraform.md`)
- Documentation for Terraform-based IaC and migrating to Cloudflare D1

**Out-of-Scope (Later Phases)**
- Production-grade CI/CD pipelines and automated deployments
- Advanced monitoring/logging dashboards and alerting
- Mobile app or native desktop client templates
- GraphQL API option or multiple backend frameworks
- Complete test suite with coverage for every module
- Performance-tuned build pipelines (e.g., bundle splitting, serverless functions tuning)

## 3. User Flow

A developer clones the `rafiulm/react-starter` repository and runs `npm install` (or `yarn`). They open the project in VS Code, which automatically picks up the recommended extensions and settings from `.vscode/`. Running `npm run dev` simultaneously boots up the React frontend on one port and the TypeScript API on another. The developer sees a sample homepage served by React and a “hello world” endpoint in the API, confirming that the environment is working as expected.

From there, the developer edits React components inside `apps/frontend/`, creates new API routes in `apps/api/lib/`, and writes AI-powered scripts using `ai.ts`. Husky hooks run linting and formatting on every commit to keep code consistent. If they need infrastructure, they follow the guides in `.claude/` (`migrate-to-d1.md`) to provision a Cloudflare D1 database or review Terraform recommendations. This streamlined flow gets teams from zero to a working prototype in minutes.

## 4. Core Features

- **Frontend Scaffolding**: React app with basic routing, styling placeholder, and sample components.  
- **Backend API**: TypeScript service exposing REST endpoints, with modules for  
  • AI integration (`ai.ts`)  
  • Authentication (`auth.ts`)  
  • Request context and dependency injection (`context.ts`)  
- **AI Assistant Directory**: `.claude/` containing AI prompts, migration guides, and review templates.  
- **Code Quality Automation**: Husky pre-commit/pre-push hooks running ESLint and Prettier.  
- **IDE Configuration**: `.vscode/` workspace settings with extensions (e.g., ESLint, Prettier, TypeScript Hero) and debugger launch profiles.  
- **Infrastructure as Code Docs**: Markdown guides for using Terraform and Cloudflare D1 migrations.  
- **Monorepo Structure**: Shared dependencies, unified linting, and a clear separation under `apps/` for frontend and backend.

## 5. Tech Stack & Tools

- **Frontend**: React (Create React App or Next.js as a base), TypeScript, React Router
- **Backend**: Node.js (v16+), Express.js or Hono, TypeScript
- **AI Integration**: Claude or GPT-4o via `.claude` configs, accessed through `ai.ts` module
- **Database (Optional)**: Cloudflare D1 (serverless SQL), Prisma or Kysely for ORM
- **IaC**: Terraform (v1.x) for cloud resource provisioning
- **Code Quality**: ESLint, Prettier, Husky for Git hooks
- **IDE**: VS Code with workspace settings and recommended extensions
- **Package Management**: npm or Yarn v1/v2

## 6. Non-Functional Requirements

- **Performance**: API response times under 200 ms for simple endpoints; frontend bundle size under 300 KB gzip.
- **Security**: Use HTTPS for all API calls, validate and sanitize inputs in `auth.ts`, use secure environment variables for secrets.
- **Scalability**: Monorepo must support adding micro-frontends or additional API services without restructuring.
- **Usability**: New developers should be able to clone, install, and run dev scripts in under 3 minutes.
- **Code Quality**: 100% adherence to ESLint/Prettier rules; TypeScript `--strict` mode enabled.

## 7. Constraints & Assumptions

- Node.js v16+ must be available in the developer environment.
- Developers will use VS Code; other editors may need manual config adjustments.
- Claude/GPT API keys are pre-configured in environment variables for AI features.
- Terraform CLI is installed and authenticated for IaC guides to work.
- Cloudflare D1 availability in the target region.

## 8. Known Issues & Potential Pitfalls

- **AI Rate Limits**: Calls to Claude/GPT may hit rate limits. Recommend caching responses and mocking AI during tests.  
- **Terraform Version Mismatch**: Users with older Terraform CLI may face syntax errors. Include `required_version` in `.tf` files.  
- **Monorepo Dependency Conflicts**: Shared `node_modules` might cause version collisions. Use Yarn Workspaces or PNPM to isolate.  
- **CORS Errors**: Frontend and backend run on different ports by default. Ensure CORS is configured in the API.  
- **Environment Variable Leakage**: Document `.env` patterns and add `dotenv` to `.gitignore` to prevent secrets from being committed.

---

This PRD provides a clear, unambiguous reference for generating all subsequent technical documents—Tech Stack guides, Frontend/Backend architecture docs, file structures, and IDE rules—without any missing details.