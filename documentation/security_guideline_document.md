# Security Guidelines for `rafiulm/react-starter`

## Introduction
This document provides comprehensive security guidelines tailored to the **react-starter** boilerplate. Following these recommendations will help you build a secure, scalable, and maintainable full-stack application—from React frontend to Node.js backend and infrastructure provisioning with Terraform.

---

## Core Security Principles

- **Security by Design:** Integrate security considerations from project inception through deployment. Don’t defer security tasks until the end.
- **Least Privilege:** Grant only the minimum permissions required—for database users, API roles, Terraform service principals, etc.
- **Defense in Depth:** Layer controls (input validation, authentication, rate limiting, CSP) so that a single failure won’t compromise the system.
- **Fail Securely:** Default to safe states on errors. Never leak stack traces, PII, or internal paths to clients or logs.
- **Secure Defaults & Simplicity:** Use conservative, well-documented configurations. Avoid unnecessary complexity.

---

## 1. Authentication & Access Control

### Password Management
- Store passwords hashed with Argon2id or bcrypt with unique salts.
- Enforce strong password policies: minimum length (12 chars), complexity, and periodic rotation for sensitive accounts.

### JSON Web Tokens (JWT)
- Use a robust signing algorithm (e.g., HS512 or RS256); never accept the `none` algorithm.
- Validate the signature, `exp`, and `nbf` claims on each request.
- Keep signing keys in a secrets manager (e.g., Vault, AWS Secrets Manager) and rotate them regularly.
- Implement token revocation or a short expiration (e.g., 15 minutes) with refresh tokens stored securely (HttpOnly, Secure cookies).

### Session & Roles
- If using session cookies instead of JWT, set `HttpOnly`, `Secure`, `SameSite=Strict` attributes.
- Define roles (e.g., `user`, `admin`) and enforce Role-Based Access Control (RBAC) server-side on every protected endpoint.
- Avoid privilege escalation by validating user roles in middleware.

### Multi-Factor Authentication (MFA)
- Offer MFA (TOTP, SMS, or hardware key) for privileged operations (e.g., password resets, role changes).

---

## 2. Input Handling & Processing

### Prevent Injection Attacks
- Use parameterized queries or an ORM when interacting with Cloudflare D1. Never concatenate user input into SQL strings.
- Sanitize all JSON/XML inputs. Reject unexpected fields and enforce strict schemas (e.g., with Zod or Joi).

### Cross-Site Scripting (XSS)
- In React, avoid dangerouslySetInnerHTML whenever possible.
- Encode user-supplied data in any HTML context. Use libraries like DOMPurify when sanitizing HTML input.
- Implement a strong Content Security Policy (CSP) to restrict script sources.

### Cross-Site Request Forgery (CSRF)
- For state-changing requests, require anti-CSRF tokens (e.g., double-submit cookie or synchronizer token pattern).
- Verify the `Origin` or `Referer` header against an allow-list of trusted domains.

### File Uploads
- Allow only specific MIME types and file extensions.
- Store uploads outside the webroot with randomized filenames.
- Scan for malware and validate file size limits.
- Prevent path traversal by sanitizing filenames.

---

## 3. Data Protection & Privacy

### Encryption In Transit & At Rest
- Serve all endpoints over HTTPS/TLS 1.2+; redirect HTTP to HTTPS.
- Encrypt sensitive data at rest (e.g., database fields, backups) using AES-256.

### Secrets Management
- Do **not** hardcode secrets (API keys, DB credentials) in code or `.env` files. Use a managed secrets store.
- Reference secrets via environment variables injected at runtime by a secure pipeline.

### Logging & Error Handling
- Avoid logging PII or credentials. Mask sensitive fields (e.g., credit cards, SSNs).
- In production, return generic error messages. Log detailed stack traces only to secure, access-controlled log storage.

---

## 4. API & Service Security

### Rate Limiting & Throttling
- Protect endpoints against brute-force (login, token refresh) and DoS by implementing rate limits (e.g., 100 requests/min per IP).

### CORS Configuration
- Restrict `Access-Control-Allow-Origin` to known, trusted frontend origins.
- Avoid using wildcard (`*`) in production.

### Versioning & Principle of Least Data
- Version your API (e.g., `/api/v1/…`) and deprecate old versions gracefully.
- Return only the fields required by the client; never over-expose internal data structures.

---

## 5. Frontend Security Hygiene

- **Secure Storage:** Never store tokens in `localStorage` or `sessionStorage`. Prefer HttpOnly cookies.
- **Subresource Integrity (SRI):** For third-party scripts/styles, include SRI hashes.
- **Security Headers:** Serve pages with:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: no-referrer-when-downgrade`

---

## 6. Infrastructure & Configuration Management

### Terraform Best Practices
- Store state in a remote, encrypted backend (e.g., S3 with encryption + DynamoDB locking).
- Use separate workspaces/environments (dev, staging, prod) with environment-specific variables.
- Grant the Terraform service principal only the minimal IAM permissions it needs to provision resources.

### Server Hardening
- Disable unused services and ports on deployment targets.
- Keep OS, Node.js runtime, and dependencies up to date with the latest security patches.
- Disable debug modes and verbose logging in production.

---

## 7. Dependency Management

- Use a lockfile (`package-lock.json`) to ensure reproducible builds.
- Run automated vulnerability scans (e.g., `npm audit`, Snyk) on all dependencies, including transitive ones.
- Minimize external libraries; vet each for maintenance status and reported CVEs.
- Regularly update key dependencies (React, Node.js, Terraform providers) to patched versions.

---

## Conclusion
By embedding these security practices into the **react-starter** project, you establish a solid foundation for building secure applications. Regularly review and update these guidelines as your project evolves and new threats emerge. Always err on the side of caution, and flag any uncertain security decisions for expert review.