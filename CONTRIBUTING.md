# Contributing Guide

Thank you for your interest in improving this project! This guide explains how to set up your environment, run the project, follow code standards, test changes, and submit pull requests.

## Table of Contents

- Getting Started
- Development Workflow
- Quality Standards
- Running Tests
- Commit & PR Guidelines
- FAQ

## Getting Started

- Bun: >= 1.2 (see packageManager in package.json)
- Git and GitHub CLI (optional but recommended)
- VS Code + recommended extensions (.vscode/extensions.json)
- Cloudflare Wrangler for edge/dev deploys (optional)

Install dependencies at the repo root:

```bash
bun install
```

## Development Workflow

This is a monorepo managed with Bun workspaces. Useful commands:

- Start the marketing site:
  ```bash
  bun dev           # alias for: bun --filter @repo/web dev
  ```
- Start the React app:
  ```bash
  bun --filter @repo/app dev
  ```
- Start the API (local bun process):
  ```bash
  bun dev:api      # alias for: bun --filter @repo/api dev
  ```
- Start the Edge worker (wrangler):
  ```bash
  bun dev:edge     # alias for: bun --filter @repo/edge dev
  ```

Database (optional):

```bash
bun --filter @repo/db migrate
bun --filter @repo/db seed   # optional
```

Build targets:

```bash
bun build                 # builds web + api + edge
bun build:web             # only web
bun build:edge            # only edge
bun build:api             # Docker image for api
bun build:types           # type builds via tsc --build
```

## Quality Standards

- Linting (ESLint):
  ```bash
  bun lint
  ```
- Formatting (Prettier):
  ```bash
  bun prettier --check .
  bun prettier --write .
  ```
- Typechecking (TypeScript):
  ```bash
  bun typecheck
  ```

Notes:

- ESLint and Prettier are configured at the repo root.
- Follow existing code style; prefer small, focused changes.

## Running Tests

Vitest is used across the workspace:

```bash
bun test
```

Pre-commit hook:

- Husky runs `bun test` on commit via `.husky/pre-commit`.
- Ensure tests pass locally before pushing.

## Commit & PR Guidelines

- Branch naming: `feature/<short-name>` or `fix/<short-name>`
- Conventional PR titles (enforced by CI):
  - Examples: `docs(contributing): add guide`, `chore(repo): align scripts`, `feat(app): add user onboarding`
- Before opening a PR:
  - `bun lint`, `bun typecheck`, `bun test` all pass
  - Update docs if behavior or scripts changed
- Pull Request:
  - Provide a clear description of the change and rationale (the “why”)
  - Include screenshots or CLI output when helpful
  - Link related issues if any

## FAQ

- Which runtime/package manager? Bun (see package.json engines)
- Where are scripts? At root `package.json` and per package (e.g., `apps/app`, `apps/api`, `packages/ui`)
- How do workspace filters work? Use `bun --filter <packageName> <script>` to run a script in a specific workspace.
