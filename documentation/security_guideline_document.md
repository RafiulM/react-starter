# Security Guidelines for `rafiulm/react-starter`

This document outlines essential security best practices tailored to the `rafiulm/react-starter` boilerplate. Follow these guidelines to embed security by design into every layer—from the React frontend to the TypeScript backend, AI integrations, and infrastructure as code.

---

## 1. Security by Design
- **Threat Modeling**: At the start of any new feature, identify assets (user data, API endpoints, secrets) and enumerate potential threats (injection, data leakage, broken auth).
- **Secure Defaults**: Configure all tools and frameworks with the most restrictive settings by default. Explicitly open up only what’s necessary.
- **Least Privilege**: Grant each service, database user, and environment variable only the permissions it needs.

## 2. Authentication & Access Control
- **Robust Authentication**:
  - In `apps/api/lib/auth.ts`, use proven libraries (e.g., Passport.js, NextAuth) or implement JWTs with strong signing algorithms (RS256).
  - Avoid the `none` algorithm—always sign and verify tokens server-side.
- **Password Storage**:
  - If you store passwords, use Argon2 or bcrypt with unique salts. Never store or transmit plaintext passwords.
- **Session Management**:
  - If using cookies, set `Secure`, `HttpOnly`, and `SameSite=Strict` attributes.
  - Enforce idle and absolute session timeouts.
- **Role-Based Access Control (RBAC)**:
  - Define user roles and permissions centrally (e.g., in `auth.ts` or a dedicated `roles.ts`).
  - Perform authorization checks in every protected API route—never rely solely on client-side enforcement.
- **Multi-Factor Authentication (MFA)** (optional for v1):
  - Consider adding an MFA step for critical operations (e.g., user settings, admin endpoints).

## 3. Input Handling & Processing
- **Server-Side Validation**:
  - In every endpoint under `apps/api/lib`, rigorously validate incoming JSON and query parameters using a schema validator (e.g., Zod or Joi).
- **Prevent Injection**:
  - Use parameterized queries or an ORM (Prisma, Kysely) when interacting with Cloudflare D1.
  - Sanitize any dynamic file paths or shell calls.
- **Cross-Site Scripting (XSS)**:
  - On the React side, escape or sanitize any user-generated content before rendering.
  - Implement a strict Content Security Policy (CSP) header via the backend or CDN.
- **Redirect Validation**:
  - If you add OAuth or hosted login flows, validate `redirect_uri` against an allow-list to prevent open redirects.
- **Secure File Uploads** (if added later):
  - Enforce file type checks, size limits, and store uploads outside the webroot.

## 4. Data Protection & Privacy
- **Encryption In Transit**:
  - Enforce HTTPS/TLS 1.2+ for all API and AI service calls.
- **Encryption At Rest**:
  - If you store sensitive files or logs, enable encryption at rest via your cloud provider.
- **Secrets Management**:
  - Do _not_ commit `.env` to Git. Use environment variables or a secrets manager (AWS Secrets Manager, HashiCorp Vault) for API keys and database credentials.
- **Data Minimization**:
  - API responses should return only the fields needed by the frontend. Avoid exposing internal IDs or PII.
- **Logging & Error Handling**:
  - Do not reveal stack traces or environment details in error responses. Log them securely on the backend.

## 5. API & Service Security
- **HTTPS Enforcement**:
  - Redirect HTTP to HTTPS in production via your CDN or reverse proxy configuration.
- **CORS Configuration**:
  - In `apps/api`, allow only trusted origins (e.g., `http://localhost:3000`, your production domain).
- **Rate Limiting & Throttling**:
  - Implement basic rate limiting (e.g., `express-rate-limit`) to guard against brute-force and DoS attacks.
- **API Versioning**:
  - Prefix routes with `/v1/`, `/v2/` to avoid breaking changes.
- **Proper HTTP Verbs**:
  - Use GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removals.

## 6. Web Application Security Hygiene
- **Security Headers**:
  - `Strict-Transport-Security` (HSTS)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY` or CSP `frame-ancestors`
  - `Referrer-Policy: no-referrer-when-downgrade`
- **CSRF Protection**:
  - If you rely on cookies for session state, implement anti-CSRF tokens (e.g., the double-submit cookie pattern).
- **Secure Client Storage**:
  - Avoid storing tokens or secrets in `localStorage`/`sessionStorage`. Use `HttpOnly` cookies instead.
- **Subresource Integrity (SRI)**:
  - When loading third-party scripts or styles, include integrity hashes.

## 7. Infrastructure & Configuration Management
- **Infrastructure as Code (IaC)**:
  - In Terraform guides (`.claude/review-terraform.md`), require locked Terraform versions and use `terraform validate` and `terraform fmt` in CI.
- **Server Hardening**:
  - Disable unused ports and services.
  - Regularly apply OS and library patches.
- **CI/CD Considerations**:
  - Secure your pipeline secrets. Restrict scope of tokens.
  - Scan container images or build artifacts for vulnerabilities (e.g., using Trivy).

## 8. Dependency Management
- **Lockfiles**:
  - Commit `package-lock.json` or `yarn.lock` to ensure reproducible builds.
- **Vulnerability Scanning**:
  - Integrate `npm audit`, `Snyk`, or GitHub Dependabot to catch known CVEs.
- **Minimal Footprint**:
  - Keep dependencies focused—remove unused packages to shrink the attack surface.

## 9. AI Integration Security
- **Secure API Keys**:
  - Store AI service keys in environment variables.
  - Avoid logging prompts or responses that may contain sensitive data.
- **Prompt Injection**:
  - Sanitize any user-supplied input before including it in AI prompts in `apps/api/lib/ai.ts`.
- **Rate Limits & Quotas**:
  - Implement caching or request throttling to avoid unexpected costs or service degradation.

---

By adhering to these security guidelines, the `rafiulm/react-starter` project will maintain a strong security posture from day one. Regularly review and update controls as the codebase evolves and new threats emerge.