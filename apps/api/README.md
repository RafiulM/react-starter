# @repo/api — API Layer (tRPC)

tRPC routers, context, and server primitives used by the edge worker. This package defines the typed API surface consumed by the frontend.

For installation, environment, development, and deployment instructions, see the root README: ../../README.md

## Local Notes

- Typecheck: `bun --filter @repo/api typecheck`
- Build: `bun --filter @repo/api build`
- Tests: `bun --filter @repo/api test`

Follow root guidelines for authentication (Better Auth), database access (Drizzle + Neon/Hyperdrive), and error handling. Keep domain routers and shared types consistent with `packages/core`.
