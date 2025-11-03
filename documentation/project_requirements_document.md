# Project Requirements Document (PRD)

## 1. Project Overview

This project is a fully opinionated, edge-first React Starter Kit designed to help developers kick off new web applications in minutes. It provides a monorepo template that wires up best-in-class tools—from a performant JavaScript runtime and type-safe API layer to a modern UI system and cloud deployment pipelines—so teams can focus on building features, not configuring infrastructure.

Our main goal is to deliver a turnkey, production-ready foundation that combines:

- Ultra-fast local development (Bun + Vite)
- End-to-end TypeScript safety (Drizzle ORM, tRPC, React)
- Global low-latency deployment (Cloudflare Workers)
- A customizable UI toolkit (React 19 + Tailwind CSS + shadcn/ui)
- Infrastructure as Code (Terraform)

Success is measured by:

1. Developers being able to clone, install, and run the starter kit in under 2 minutes.  
2. Achieving sub-100 ms API response times from any region.  
3. Zero type mismatches from database schema to frontend.  
4. Clear, up-to-date documentation for every module.

---

## 2. In-Scope vs. Out-of-Scope

### In-Scope (Version 1.0)

- Monorepo setup using Bun workspaces
- Frontend app (`apps/app`) with React 19, TanStack Router, Jotai, Tailwind CSS, shadcn/ui
- Marketing site (`apps/web`) built with Astro
- API service (`apps/api`) using Hono + tRPC + Better Auth
- Edge entrypoint (`apps/edge`) for proxying and static asset hosting on Cloudflare Workers
- Shared packages:
  - `packages/db`: Drizzle ORM schemas, migrations, seeds for Neon PostgreSQL
  - `packages/ui`: Reusable shadcn/ui-based React components
  - `packages/core`: Common types and utilities
- Infrastructure as Code (`infra`) with Terraform modules for Cloudflare Workers, KV stores, DNS, custom domains
- Documentation site (`docs`) powered by VitePress
- Basic unit tests (Vitest) and code formatting (Prettier)
- GitHub Actions CI pipeline for building, testing, and deploying to staging/prod

### Out-of-Scope (Future Phases)

- End-to-end user testing or automated UI tests (Cypress, Playwright)
- Real-time features (WebSockets, Durable Objects)
- Internationalization (i18n)
- Advanced CI features (bundle size analysis, security scans)
- In-browser performance monitoring or logging integrations
- Mobile app or React Native support
- GraphQL or alternative API paradigms beyond tRPC

---

## 3. User Flow

**Developer Onboarding:** A new developer clones the repository and runs `bun install` to fetch dependencies. They run `bun dev` in the root, which concurrently starts the Astro marketing site on port 3000, the React app on 3001, and the tRPC API on 3002, all wired through the edge worker. The developer can view the landing page, sign up for authentication via Better Auth, and see sample data fetched from Neon PostgreSQL.

**Feature Development & Deployment:** The developer creates or updates UI components in `packages/ui`, writes a new tRPC procedure in `apps/api`, and updates database schemas in `packages/db`. TypeScript immediately flags any mismatches across layers. Once satisfied, the developer pushes to GitHub, triggering Actions that run tests and Terraform apply to provision or update Cloudflare resources. On merge to `main`, the updated worker is deployed globally, delivering the new code to users with sub-100 ms latency.

---

## 4. Core Features

- **Monorepo Management**: Bun workspaces organizing apps and packages with shared TS configs.  
- **Frontend App (`apps/app`)**:  
  - React 19 + Vite dev server  
  - Type-safe routing and data loading (TanStack Router)  
  - Atomic state management (Jotai)  
  - Tailwind CSS + shadcn/ui for design system  
- **Marketing Site (`apps/web`)**:  
  - Astro static site generator  
  - Shares UI components from `packages/ui`  
- **API Service (`apps/api`)**:  
  - Hono HTTP framework optimized for edge  
  - tRPC for end-to-end type safety  
  - Better Auth for authentication and session management  
- **Edge Entry (`apps/edge`)**:  
  - Cloudflare Workers deployment  
  - Static asset hosting and CORS/origin handling  
  - Proxy to `apps/api` for tRPC endpoints  
- **Database Layer (`packages/db`)**:  
  - Drizzle ORM schemas & migrations  
  - Neon PostgreSQL as serverless DB  
- **Shared UI Components (`packages/ui`)**: Reusable React primitives built with Tailwind and shadcn/ui.  
- **Shared Utilities (`packages/core`)**: Type definitions and helper functions.  
- **Infrastructure as Code (`infra`)**: Terraform modules for Cloudflare resources.  
- **Documentation (`docs`)**: VitePress site with setup guides and API docs.  
- **CI/CD**: GitHub Actions for build, test, and deploy.

---

## 5. Tech Stack & Tools

- **Runtime & Package Manager**: Bun  
- **Frontend**: React 19, TanStack Router, Jotai, Tailwind CSS, shadcn/ui, Vite  
- **Static Site**: Astro  
- **API/Backend**: Hono, tRPC, Better Auth  
- **Database**: Neon PostgreSQL, Drizzle ORM  
- **Edge Deployment**: Cloudflare Workers, Wrangler CLI  
- **Infrastructure**: Terraform  
- **Language**: TypeScript  
- **Testing**: Vitest  
- **Formatting**: Prettier  
- **CI/CD**: GitHub Actions

---

## 6. Non-Functional Requirements

- **Performance**: API response <100 ms from any region; frontend hydration time <1 s on cold load.  
- **Scalability**: Serverless DB and Cloudflare Workers can auto-scale.  
- **Type Safety**: No TypeScript errors at build time; end-to-end type coverage across DB → API → UI.  
- **Security**: Secure authentication flows (Better Auth), HTTPS enforced, CORS properly configured.  
- **Reliability**: 99.9% uptime SLA for Workers; automated test coverage ≥80% on critical modules.  
- **Usability**: Clear README in each package; one-command local dev; searchable docs site.  
- **Maintainability**: Monorepo with consistent linting/formatting; modular package boundaries.

---

## 7. Constraints & Assumptions

- **Cloudflare Workers**: Assumes access to a Workers account and domain mapping.  
- **Bun Availability**: Developers must have Bun installed; no fallback to npm/yarn in v1.0.  
- **Developer Machine**: Requires latest Node.js & Git for local scripts.  
- **TypeScript**: Mandatory for all code; no JavaScript files.  
- **Terraform State**: Stored remotely (e.g., in a Cloudflare KV-backed state); team must set up credentials.

---

## 8. Known Issues & Potential Pitfalls

- **Cold Start Latency**: Cloudflare Workers can have cold starts; mitigate by warming strategies or Durable Objects in future phases.  
- **Drizzle Migrations**: Schema drift if migrations are not applied in CI; enforce `drizzle migrations apply` in pipeline.  
- **Bun Compatibility**: Some Node.js packages may not work; monitor build errors and pin compatible versions.  
- **Monorepo Complexity**: Developers new to monorepos may face setup hurdles; emphasize docs and add local helper scripts.  
- **API Rate Limits**: Workers have per-account limits; monitor usage and shard APIs across accounts if needed.


---

_End of PRD. This document provides a clear, unambiguous blueprint for building, testing, and deploying the React Starter Kit._