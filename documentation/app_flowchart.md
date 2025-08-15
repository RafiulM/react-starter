flowchart TD
  U[Client User] --> F[React Frontend]
  F --> B[Node JS API]
  B --> D[Cloudflare D1 DB]
  B --> A[Auth Module]
  B --> I[AI Service]
  T[Terraform IaC] -.-> B
  T -.-> D
  H[Husky Hooks] -.-> F
  H -.-> B