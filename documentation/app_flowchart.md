flowchart TD
    User[User] --> Frontend[React Frontend]
    Frontend --> API[Backend API]
    API --> Auth[Auth Module]
    API --> Context[Context Module]
    API --> AI[AI Integration Module]
    API --> DB[Cloudflare D1 Database]
    Auth --> API
    Context --> API
    AI --> API
    DB --> API
    API --> Frontend
    Frontend --> User