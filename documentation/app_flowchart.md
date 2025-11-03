flowchart TD
  User[User] --> Edge[Cloudflare Worker]
  Edge -->|GET slash| Static[Static Content]
  Edge -->|POST slash api| API_Proxy[API Proxy]
  API_Proxy --> API_Server[Hono tRPC Server]
  API_Server --> Auth[Better Auth]
  API_Server --> DB[Neon PostgreSQL via Drizzle ORM]
  Auth --> DB