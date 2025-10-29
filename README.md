# React Starter Monorepo

[![Build](https://img.shields.io/github/actions/workflow/status/RafiulM/react-starter/main.yml?branch=main)](https://github.com/RafiulM/react-starter/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, edge‑ready React monorepo for building full‑stack apps fast. It ships a typed frontend, an edge runtime, and a PostgreSQL data layer—all wired for great DX and global performance.

## Features

- Type‑safe full stack: React 19, tRPC, TypeScript
- Edge runtime: Cloudflare Workers via Vite build
- Data layer: Drizzle ORM + Neon PostgreSQL (via Hyperdrive)
- UI system: Tailwind v4 + shadcn/ui + Jotai
- Monorepo with shared packages and strict lint/type tooling
- Docs site (VitePress) and GitHub Actions CI

## Tech Stack

- Runtime & Tooling: [Bun](https://bun.sh/), [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/)
- Frontend: [React 19](https://react.dev/), [TanStack Router](https://tanstack.com/router), [Tailwind v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Jotai](https://jotai.org/)
- API & Edge: [tRPC](https://trpc.io/), [Hono](https://hono.dev/), [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- Auth: [Better Auth](https://www.better-auth.com/)
- Database: [Drizzle ORM](https://orm.drizzle.team/), [Neon PostgreSQL](https://neon.tech/) via [Hyperdrive](https://developers.cloudflare.com/hyperdrive/)
- Infra: [Terraform](https://www.terraform.io/) (infra/)

## Prerequisites

- Bun v1.2+
- Cloudflare account (Workers + Hyperdrive)
- Neon PostgreSQL database (or compatible Postgres)
- Recommended: VS Code with repo extensions (.vscode/extensions.json)

## Getting Started

1. Install dependencies

```bash
bun install
```

2. Configure environment

- Copy `.env.example` to `.env` and set:
  - `DATABASE_URL=postgresql://user:password@host/db` (Neon)
  - Any API keys (e.g., `OPENAI_API_KEY`) as needed
- Update Hyperdrive bindings in `apps/edge/wrangler.jsonc` (`HYPERDRIVE`, `HYPERDRIVE_DIRECT` ids)

3. Start development

- Marketing site (Astro)

```bash
bun dev:web
```

- React app (SPA)

```bash
bun dev:app
# or
bun --filter @repo/app dev
```

- Edge worker (API + static asset serving)

```bash
bun --filter @repo/edge build
bun wrangler dev --config apps/edge/wrangler.jsonc
```

4. Initialize database (optional seed)

```bash
bun --filter @repo/db migrate
bun --filter @repo/db seed
```

Default dev ports: web `http://localhost:4321`, app `http://localhost:5173`, Workers dev shown by `wrangler dev` (typically `http://localhost:8787`).

## Project Structure

```
apps/
  app/     # React 19 SPA (TanStack Router, Tailwind v4)
  web/     # Astro marketing site
  api/     # tRPC API types and server primitives
  edge/    # Cloudflare Workers entry (Vite build → Wrangler)
packages/
  core/    # Shared types and utilities
  ui/      # Shared UI components (shadcn/ui)
  ws-protocol/ # Typed WS protocol helpers
db/        # Drizzle schema, migrations, seeds
infra/     # Terraform modules and envs
scripts/   # Repo scripts and MCP tools
docs/      # VitePress documentation site
```

## Architecture

```
               +-------------------------+
               |      apps/web (Astro)   |
               +------------+------------+
                            |
                            v  static assets
+-----------+     +---------+---------+      +-----------------------+
| apps/app  | --> |  apps/edge (Worker) | --> |  Hyperdrive → Neon PG |
|  (React)  |     |  (Hono + tRPC)     |      |   (PostgreSQL)       |
+-----------+     +---------+---------+      +-----------------------+
           ^                 |
           |                 v
     packages/ui,core   packages/api types
```

## Available Scripts (root)

- `bun dev:web` — Start Astro site
- `bun dev:app` — Start React SPA
- `bun dev:edge` — Vite dev for worker (build preview)
- `bun build` — Build web, api, edge
- `bun test` — Run unit tests
- `bun lint` — Lint with ESLint
- `bun typecheck` — TS project references build
- `bun ui:*` — Manage shared UI components (see `packages/ui`)

Package‑scoped:

- `bun --filter @repo/db <cmd>` — DB tasks: `migrate`, `seed`, `studio`, `generate`, `push`
- `bun --filter @repo/api <cmd>` — API tasks: `build`, `typecheck`, `test`
- `bun --filter @repo/edge <cmd>` — Edge tasks: `build`, `dev`, `test`
- `bun --filter @repo/web <cmd>` — Web tasks: `dev`, `build`, `preview`

## Testing

- Root: `bun test`
- Per package: `bun --filter <pkg> test`
- Coverage (example): `bun --filter @repo/edge coverage`

## Deployment

1. Build artifacts

```bash
bun build
bun --filter @repo/web build
bun --filter @repo/edge build
```

2. Configure production environment

- Set Cloudflare Wrangler `env.production` in `apps/edge/wrangler.jsonc`
- Add Cloudflare secrets (examples):

```bash
bun wrangler secret put BETTER_AUTH_SECRET --env=production
bun wrangler secret put OPENAI_API_KEY --env=production
```

3. Deploy Worker

```bash
bun wrangler deploy --env=production --config apps/edge/wrangler.jsonc
```

Database migrations (if applicable):

```bash
bun --filter @repo/db migrate:prod
```

## Contribution Guidelines

- See `CONTRIBUTING.md` and commit with Conventional Commits
- Keep types shared in `packages/core` and UI in `packages/ui`
- Prefer tRPC for API contracts; validate with Zod
- Update docs (`docs/`) when workflows change

## References

- tRPC: https://trpc.io/
- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Drizzle ORM: https://orm.drizzle.team/
- Neon: https://neon.tech/
- Terraform: https://developer.hashicorp.com/terraform/docs
- Tailwind v4: https://tailwindcss.com/
- shadcn/ui: https://ui.shadcn.com/
