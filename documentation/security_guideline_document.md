# Security Guidelines for React Starter Kit

This document provides comprehensive security guidelines tailored for the **React Starter Kit** monorepo by RafiM. It embeds security-by-design principles across the entire stack—from the edge runtime and API services to frontend applications and infrastructure—as outlined below.

---

## 1. Authentication & Access Control

### 1.1 Better Auth Integration
- Leverage Better Auth’s secure defaults: strong password hashing (e.g., bcrypt/Argon2 with unique salts), built-in account lockout, and brute-force protection.  
- Disable insecure algorithms (no `none` JWT) and enforce token signature validation on every request.

### 1.2 Enforce Strong Password Policies
- Minimum length: 12 characters; require uppercase, lowercase, digits, and symbols.  
- Implement password rotation for high-privilege accounts (e.g., every 90 days).  
- Store only hashed passwords; never store or log plaintext.

### 1.3 Secure Session & Token Management
- Use short-lived JWTs with `exp` claims (e.g., 15 min) plus rotating refresh tokens.  
- Store tokens in `HttpOnly`, `Secure`, `SameSite=Strict` cookies.  
- Protect against session fixation by regenerating tokens on login.  
- Provide explicit logout endpoints that revoke refresh tokens server-side.

### 1.4 Role-Based Access Control (RBAC)
- Define minimal roles (e.g., `user`, `admin`, `superadmin`) with explicit permission sets.  
- Enforce server-side authorization in every tRPC procedure using middleware.  
- Deny-by-default: any request without an explicit allow rule must be refused (401/403).

### 1.5 Multi-Factor Authentication (MFA)
- Offer TOTP (e.g., Google Authenticator) or SMS/Email OTP for sensitive operations (password changes, privilege escalations).  
- Store MFA secrets encrypted at rest and require re-authentication upon recovery flows.

---

## 2. Input Validation & Output Encoding

### 2.1 Prevent Injection Attacks
- Use Drizzle ORM’s parameterized queries exclusively; avoid raw SQL strings.  
- Validate all user-supplied data with a schema library (e.g., Zod) before forwarding to tRPC or DB layers.  
- Reject unexpected fields and log validation failures without exposing stack traces.

### 2.2 Mitigate Cross-Site Scripting (XSS)
- Sanitize user-provided HTML using a whitelist approach if rich text is allowed; otherwise escape all values in React by default.  
- Implement a robust Content Security Policy (CSP):
  - `default-src 'self'; script-src 'self' 'nonce-<random>'; style-src 'self' 'nonce-<random>';`  
  - Avoid `unsafe-inline` and dynamically generate nonces for scripts and styles.

### 2.3 Prevent Cross-Site Request Forgery (CSRF)
- Use synchronizer tokens for all state-changing requests in `apps/app` and `apps/web`.  
- Verify CSRF tokens in the Cloudflare Worker edge entry before proxying to tRPC.

### 2.4 Secure File Uploads (if applicable)
- Validate MIME type and file extension against an allow-list.  
- Scan uploads for malware and store outside the webroot (e.g., Cloudflare R2 or KV with restricted policies).  
- Generate safe filenames (UUIDs) and restrict maximum file size.

---

## 3. Data Protection & Privacy

### 3.1 Encryption in Transit & at Rest
- Enforce TLS 1.2+ for all client-server and inter-service traffic.  
- Enable automatic at-rest encryption for Neon PostgreSQL.  
- Use AES-256 for any additional data encryption needs (e.g., backup files).

### 3.2 Secrets Management
- Store secrets (DB credentials, API keys, JWT secrets) in a secrets vault (e.g., Cloudflare Secrets, AWS Secrets Manager) rather than environment variables in plaintext.  
- Rotate secrets regularly and revoke old versions promptly.

### 3.3 Prevent Information Leakage
- Do not expose stack traces or internal error details in production builds.  
- Implement custom error handlers in Hono/tRPC to return generic messages (e.g., `"Internal server error"`).  
- Mask PII in logs and audit trails; only log non-sensitive identifiers.

### 3.4 GDPR/CCPA Compliance
- Design data retention policies and deletion endpoints for user data.  
- Enable user-initiated data export (CSV/JSON) and erasure (right to be forgotten) with proper authentication.

---

## 4. API & Service Security

### 4.1 HTTPS-Only & TLS
- Redirect all HTTP traffic to HTTPS at the edge.  
- Use strong cipher suites (e.g., ECDHE + AES-GCM) and disable weak protocols (SSLv3, TLS 1.0/1.1).

### 4.2 Rate Limiting & Throttling
- Implement global and per-user rate limits at the Cloudflare Worker layer (e.g., 100 requests/min per IP).  
- Use Cloudflare Rate Limiting rules to block traffic patterns indicating DDoS or brute-force.

### 4.3 CORS Hardening
- Allow only trusted origins (e.g., production domain) with explicit `Access-Control-Allow-Origin`.  
- Disallow wildcard (`*`) origins for credentialed requests; enforce `Access-Control-Allow-Credentials: true`.

### 4.4 API Versioning & Principle of Least Privilege
- Prefix endpoints with `/v1/` and deprecate older versions in a controlled manner.  
- Avoid exposing unnecessary fields in responses; use tRPC transformers to strip sensitive data.

---

## 5. Web Application Security Hygiene

### 5.1 Security Headers
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`  
- `X-Content-Type-Options: nosniff`  
- `X-Frame-Options: DENY`  
- `Referrer-Policy: no-referrer-when-downgrade`  
- `Permissions-Policy: geolocation=(), microphone=()` (restrict as needed)

### 5.2 Secure Cookie Attributes
- `HttpOnly; Secure; SameSite=Strict` for session and refresh tokens.  
- Short max-age for cookies; use `Expires` for absolute session limits.

### 5.3 Subresource Integrity (SRI)
- Add `integrity` attributes to CDN-loaded scripts and styles (e.g., shadcn/ui assets).

### 5.4 Client-Side Storage
- Avoid storing any sensitive data (tokens, PII) in `localStorage` or `sessionStorage`.

---

## 6. Infrastructure & Configuration Management

### 6.1 Terraform Best Practices
- Use least-privilege IAM roles for Terraform states and Cloudflare APIs.  
- Store Terraform state in a secure backend (e.g., Terraform Cloud, encrypted S3).  
- Enable state locking to prevent concurrent modifications.

### 6.2 Cloudflare Worker Hardening
- Restrict environment variables to only required functions.  
- Implement Durable Object or KV access controls for private data.

### 6.3 Secure Defaults & Patching
- Disable debugging and verbose logs in production Worker and API builds.  
- Subscribe to security bulletins for Bun, Vite, Hono, Drizzle, and update dependencies within 30 days of patches.

### 6.4 Network & Deployment
- Expose only necessary ports (443).  
- Use Cloudflare Access or VPN for administrative interfaces.  
- Automate rollback strategies in GitHub Actions for failed deployments.

---

## 7. Dependency & Supply Chain Management

- Maintain `bun.lockb`, `package-lock.json`, or `yarn.lock` to lock transitive dependencies.  
- Integrate an SCA tool (e.g., `npm audit`, Snyk, Dependabot) into CI for automated vulnerability scans.  
- Periodically review third-party packages for maintenance activity and known CVEs.  
- Remove or replace abandoned or insecure libraries quickly.

---

## 8. CI/CD Security

- Store CI secrets in encrypted GitHub Actions secrets; apply least privilege for tokens.  
- Run automated linting (`ESLint`), formatting (`Prettier`), unit tests (`Vitest`), and security scans on every pull request.  
- Deploy to ephemeral preview environments for integration testing before merging to `main`.

---

## 9. Developer & Operational Best Practices

- Perform regular security code reviews focusing on authentication flows, input validation, and error handling.  
- Document security assumptions and threat models in the `docs` site (VitePress).  
- Monitor production with performance and security metrics (Web Vitals, Cloudflare analytics).  
- Conduct periodic penetration tests and update guidelines accordingly.

---

By following these guidelines, the React Starter Kit will uphold a robust security posture, minimize attack surfaces, and ensure data integrity and privacy across all environments.。