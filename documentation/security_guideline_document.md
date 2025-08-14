# Security Guidelines for `react-starter`

A comprehensive security guideline tailored for the **`react-starter`** monorepo, which includes a React frontend, Node.js backend API, Terraform-managed infrastructure, and AI-assisted development tools. These recommendations align with security-by-design principles and cover the full application stack.

---

## 1. Security-by-Design & Project Organization

- **Embed security early:** Incorporate threat modeling and design reviews before writing code. Document key assets, trust boundaries, and threat scenarios in your repository (e.g., `SECURITY.md`).
- **Monorepo hardening:**
  - Enforce directory-level permissions so only authorized developers can push changes to sensitive modules (e.g., `apps/api/lib/auth.ts`).
  - Use branch protection rules and require pull-request reviews for all security-sensitive files (Terraform, auth logic, environment configs).
- **Secure defaults:** Ensure all configs (frontend, backend, infra) ship with safe defaults (no debug flags, secure ports, CORS locked down).

---

## 2. Authentication & Access Control

- **Use proven libraries:** Leverage established frameworks such as Passport.js or `bcrypt`/`argon2` for password hashing with unique salts.
- **JWT best practices:**
  - Sign using `HS256` or `RS256` (avoid `none`).
  - Validate `exp`, `iat`, and `aud` claims on every request.
  - Store secrets (signing keys) in a secret manager (e.g., AWS Secrets Manager, HashiCorp Vault), not in code or `.env` files.
- **Session management:**
  - For cookie-based sessions, set `HttpOnly`, `Secure`, and `SameSite=Strict`.
  - Implement idle and absolute timeouts with forced re-authentication.
- **RBAC & least privilege:**
  - Define roles (e.g., `admin`, `user`, `service`) and enforce server-side checks in every endpoint.
  - Never rely solely on client-side role checks in React components.
- **Multi-Factor Authentication (MFA):**
  - Offer TOTP or SMS-based MFA for privileged accounts or sensitive actions (e.g., password changes).

---

## 3. Input Handling & Output Encoding

- **Server-side validation:**
  - Use a schema validation library (e.g., Joi, Zod) in your `apps/api` routes to enforce data shapes, types, and value ranges.
  - Always validate and sanitize file uploads (type, extension, size). Store outside the webroot and scan for malware.
- **Prevent injection:**
  - Use an ORM or parameterized queries (e.g., Prisma, Knex) for all D1/SQLite calls—no string interpolation.
  - Sanitize shell/command-line inputs if invoking external processes.
- **XSS mitigation in React:**
  - Avoid `dangerouslySetInnerHTML`. If unavoidable, sanitize with a library like DOMPurify.
  - Implement a strict Content Security Policy (CSP) in your HTTP headers.

---

## 4. Data Protection & Privacy

- **Encrypt data in transit:**
  - Enforce HTTPS/TLS 1.2+ on all endpoints (frontend, API, Terraform remote state).
  - Redirect HTTP to HTTPS at the edge (if using Cloudflare Workers).
- **Encrypt data at rest:**
  - Enable encryption for D1 or any managed database storage.
  - Encrypt Terraform state files (e.g., in an S3 bucket with SSE-KMS).
- **Secrets management:**
  - Remove hard-coded secrets from code. Use a secrets manager and inject via environment variables at runtime.
  - Rotate credentials periodically and audit usage.
- **PII handling:**
  - Mask or truncate PII in logs (e.g., email addresses, credit cards).
  - Delete or anonymize user data on request to comply with GDPR/CCPA.

---

## 5. API & Service Security

- **Rate limiting & throttling:**
  - Use middleware (e.g., `express-rate-limit`) to prevent brute-force and DoS attacks on all sensitive endpoints.
- **CORS policy:**
  - Restrict `Access-Control-Allow-Origin` to known frontend domains only.
  - Avoid wildcards in production.
- **HTTP method enforcement:**
  - Use GET for reads, POST/PUT/PATCH for writes, DELETE for deletions. Reject unsupported verbs.
- **Versioning:**
  - Prefix routes with `/v1/`, `/v2/`, etc., to manage breaking changes without disrupting clients.

---

## 6. Web Application Security Hygiene

- **Security headers:**
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'`
  - `Referrer-Policy: no-referrer-when-downgrade`
- **CSRF protection:**
  - Implement anti-CSRF tokens using synchronizer-token pattern for state-changing requests.
- **Subresource Integrity (SRI):**
  - Add SRI hashes for any third-party scripts/styles loaded from CDNs.
- **Client storage:**
  - Never store tokens or PII in `localStorage`. Prefer `HttpOnly` cookies or secure memory.

---

## 7. Infrastructure & Configuration Management

- **Terraform security:**
  - Use remote backends with encryption and access controls (e.g., Terraform Cloud, S3 + DynamoDB).
  - Limit IAM roles/policies for Terraform runners to only required actions (least privilege).
  - Scan HCL for secrets with tools like `tfsec`.
- **Hardened environments:**
  - Disable SSH or remote debugging on production hosts.
  - Apply OS and runtime security patches regularly.
- **CI/CD pipeline:**
  - Integrate Static Application Security Testing (SAST) and dependency scanning as part of your GitHub Actions or GitLab CI.
  - Fail builds on high-severity vulnerabilities or policy violations.

---

## 8. Dependency Management

- **Lockfiles:** Commit and enforce `pnpm-lock.yaml` (or `yarn.lock`) to guarantee reproducible builds.
- **Vulnerability scanning:** Integrate automated scans (e.g., Dependabot, Snyk) to detect vulnerable packages.
- **Minimize footprint:** Only install production dependencies in your API and frontend; use `devDependencies` for build tools and tests.
- **Regular updates:** Schedule periodic dependency upgrades and regression tests to avoid stale or insecure libraries.

---

## 9. Monitoring, Logging & Incident Response

- **Structured logging:** Emit JSON logs with correlation IDs (request IDs) to trace requests across frontend-backend boundaries.
- **Error handling:** Do not leak stack traces or internal errors to clients. Use generic error messages plus detailed server-side logs.
- **Alerting & metrics:** Configure application performance monitoring (e.g., Sentry, New Relic) and set alerts for error spikes or unusual traffic.
- **Incident playbooks:** Document procedures for common incidents (e.g., data breach, service outage) and store them securely in the repo (e.g., `docs/incident-response.md`).

---

## Conclusion
By following these guidelines, the `react-starter` project will incorporate robust security controls across all layers—from developer workflows and code quality to infrastructure and runtime operations. Regularly review and update these practices to address emerging threats and maintain a secure development lifecycle.
