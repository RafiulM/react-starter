flowchart TD
  A[React Frontend] -->|User Action| B[API Backend]
  B --> C{Auth Module}
  B --> D{AI Module}
  C -->|Validate Credentials| E[Database]
  D -->|Send AI Request| F[External AI Service]
  E --> B
  F --> B
  B -->|Response| A
  subgraph Infrastructure
    G[Terraform IaC]
  end