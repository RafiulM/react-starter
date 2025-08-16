# Security Guidelines for react-starter

This document provides comprehensive security guidelines tailored to the **react-starter** monorepo. It outlines best practices and actionable controls across authentication, data handling, infrastructure, and more, ensuring a robust security posture by design.

---

## 1. Secure Authentication & Access Control

### 1.1 Strong Authentication
- Use **bcrypt** or **Argon2** with unique salts for password hashing in `apps/api/lib/auth.ts`.  
- Enforce a password policy requiring: minimum length (≥ 8 characters), complexity (upper/lowercase, digits, symbols), and periodic rotation if applicable.
- Do not store credentials or salts in source code; load them via environment variables.

### 1.2 JSON Web Tokens (JWT)
- Sign tokens with a strong secret or RSA/ECDSA private key (do **not** use the `none` algorithm).  
- Validate the JWT signature, `exp`, `iat`, and `aud`/`iss` claims on every protected route.  
- Store secrets in a secrets manager (e.g., AWS Secrets Manager) rather than plaintext `.env` files in version control.
- Implement token revocation or rotation strategy (e.g., short-lived access tokens + refresh tokens with revocation list).

### 1.3 Session Management & MFA
- If using sessions, generate cryptographically strong session IDs and store them with `HttpOnly` and `Secure` flags.  
- Enforce idle and absolute timeouts for sessions/JWTs.  
- Provide optional Multi-Factor Authentication (MFA) for sensitive actions or privileged users.

### 1.4 Role-Based Access Control (RBAC)
- Define user roles and permissions in a central policy module.  
- Perform **server-side** authorization checks in every endpoint (e.g., in `context.ts` or middleware).  
- Deny by default and explicitly allow based on least privilege.


## 2. Input Validation & Output Encoding

### 2.1 Prevent Injection Attacks
- Use parameterized queries or an ORM (e.g., Prisma, TypeORM) for all database interactions (future database integration).  
- Sanitize inputs for shell commands or OS calls—avoid direct interpolation.

### 2.2 Validation Layers
- Implement schemas (e.g., Zod, Joi) to validate all incoming JSON, query params, and headers in `apps/api` before business logic.  
- Keep client-side validation only for UX; enforce all rules server-side.

### 2.3 Cross-Site Scripting (XSS)
- In React components, avoid `dangerouslySetInnerHTML`.  
- Always encode user-supplied data before rendering.  
- Adopt a strict Content Security Policy (CSP) via security headers to restrict script sources.

### 2.4 File Upload Security
- If file uploads are added, validate MIME types, file size, and scan for malware.  
- Store uploads outside the webroot or in a dedicated object storage with limited permissions.


## 3. Data Protection & Privacy

### 3.1 Encryption in Transit & At Rest
- Enforce **HTTPS/TLS** (TLS 1.2+) for all frontend–backend and backend–external service communications.  
- Plan for at-rest encryption if persistent storage is introduced (e.g., encrypted database volumes).

### 3.2 Secrets Management
- Do **not** commit any secret keys or credentials to Git.  
- Use environment-based secrets storage:  
  • Local: `.env` (excluded from VCS) + `dotenv`  
  • Production: Managed Secret Vault or CI/CD secret store.

### 3.3 PII & Logging
- Mask or redact personal data (emails, user IDs) in logs.  
- Avoid verbose error messages exposing stack traces or internal paths.  
- Comply with GDPR/CCPA by providing user data deletion and export mechanisms when data storage is added.


## 4. API & Service Security

### 4.1 HTTPS & CORS
- Serve the API exclusively over HTTPS in production.  
- Configure CORS to allow only the trusted frontend origin (`https://your-app.com`).  
- Reject requests with missing or invalid `Origin` headers.

### 4.2 Rate Limiting & Throttling
- Implement per-IP and per-user rate limits (e.g., 100 req/min) to protect against brute-force and DoS.  
- Consider exponential backoff or captchas on repeated auth failures.

### 4.3 Versioned & Least-Privilege Endpoints
- Version your API (e.g., `/api/v1/...`) to manage future changes.  
- Return only necessary fields in responses—avoid overexposure of internal data.

### 4.4 Secure API Methods
- Enforce proper HTTP methods: GET for reads, POST for creates, PUT/PATCH for updates, DELETE for removals.  
- Reject method overrides or tunneling attempts.


## 5. Web Application Security Hygiene

### 5.1 Anti-CSRF
- Protect all state-changing endpoints (POST/PUT/DELETE) with anti-CSRF tokens or SameSite `Strict` cookies.  
- For JWT-based SPAs, consider double-submit cookie pattern or custom header with CSRF token.

### 5.2 Security Headers
- Add the following HTTP headers via your server framework or proxy (e.g., Nginx):  
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`  
  - `Content-Security-Policy` restricting sources for scripts, styles, images  
  - `X-Content-Type-Options: nosniff`  
  - `X-Frame-Options: DENY` or `SAMEORIGIN`  
  - `Referrer-Policy: no-referrer-when-downgrade`

### 5.3 Secure Cookies & Storage
- Set cookies with `HttpOnly`, `Secure`, and `SameSite=Strict`/`Lax` attributes.  
- Avoid storing JWTs in `localStorage`; prefer in-memory storage or secure cookies to mitigate XSS risk.

### 5.4 Subresource Integrity (SRI)
- When loading third-party scripts or styles, include an `integrity` attribute to verify resource integrity.


## 6. Infrastructure & Configuration Security

### 6.1 Server Hardening
- Disable unused ports and services on servers.  
- Remove default accounts and change default credentials immediately.  
- Apply latest OS and package updates regularly.

### 6.2 TLS/SSL Configuration
- Use strong cipher suites; disable SSLv2/3 and TLS 1.0/1.1.  
- Employ automated certificate renewal (e.g., Let’s Encrypt).

### 6.3 Environment Segregation
- Separate dev, staging, and prod environments with distinct configurations and credentials.  
- Enforce least-privilege IAM roles for infrastructure components.

### 6.4 Fail Securely
- On errors, return generic messages (e.g., “Internal server error”) without leaking stack traces.  
- Implement health checks and alerts for service degradation.


## 7. Dependency & Supply Chain Security

### 7.1 Secure Dependencies
- Use lock files (`yarn.lock`, `package-lock.json`) and commit them to VCS.  
- Vet new packages for maintenance, community trust, and CVE history before adoption.

### 7.2 Automated Scanning
- Integrate SCA tools (e.g., Dependabot, Snyk) in CI to detect known vulnerabilities.  
- Establish a process for timely upgrades of critical/High severity dependencies.

### 7.3 Minimize Footprint
- Remove unused dependencies and devDependencies from production builds.  
- Leverage tree-shaking and bundle analyzers to identify bloat.


## 8. CI/CD & DevOps Recommendations

- Enforce pre-commit hooks (Husky) for linting, formatting, and basic tests.  
- Extend CI pipelines (e.g., GitHub Actions) to include:  
  - Full test suite execution  
  - Static analysis (ESLint, type checks)  
  - Security scanning (Snyk, Trivy)  
- Automate deployments with rollback capabilities and infrastructure-as-code (Terraform, CloudFormation).


---

Adhering to these guidelines ensures **react-starter** remains secure by design. Regularly review and update security controls as the project evolves and new threats emerge.
