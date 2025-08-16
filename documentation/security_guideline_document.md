# React‐Starter Security Guidelines

This document provides security best practices tailored to the **react-starter** monorepo. It embeds security by design, defense in depth, and least privilege throughout the frontend (`apps/web/`), backend (`apps/api/`), shared packages (`packages/`), and infrastructure code.

---

## 1. Security Principles

- **Security by Design**: Incorporate security from day one—design, implementation, testing, and deployment.  
- **Least Privilege**: Grant only necessary permissions to code, services, and users.  
- **Defense in Depth**: Layer controls so that a single failure does not lead to total compromise.  
- **Fail Securely**: On error, avoid exposing sensitive data or leaving services in an insecure state.  
- **Keep Security Simple**: Favor clarity over complexity in security controls.  
- **Secure Defaults**: Ship code with the most restrictive, safest settings.

---

## 2. Authentication & Access Control

### 2.1 User Authentication

- Use **bcrypt** or **Argon2** with unique salts for password hashing in `apps/api/lib/auth.ts`.  
- Enforce strong password policies: minimum length ≥ 8, mix of character types, rate-limiting on registration and login.  
- Implement **Multi-Factor Authentication (MFA)** for sensitive accounts (e.g., admin roles).

### 2.2 Session & JWT Management

- Issue **JWT**s using robust algorithms (e.g., `HS256` or `RS256`), never `none`.  
- Validate `exp`, `iat`, and audience/issuer (`aud`/`iss`) claims server-side on every request.  
- Store tokens in **Secure**, **HttpOnly**, **SameSite=Strict** cookies; avoid `localStorage` for auth.  
- Rotate and revoke tokens on logout or password change.  
- Protect against **session fixation** by regenerating tokens post-login.

### 2.3 Role-Based Access Control (RBAC)

- Define roles (e.g., `user`, `admin`) in `apps/api/lib/context.ts`.  
- Authorize every protected endpoint server-side based on role.  
- Validate permissions on data operations (e.g., ensure a user can only update their own profile).

---

## 3. Input Handling & Processing

### 3.1 General Validation

- Treat **all** external input as untrusted.  
- In `apps/api`, use a schema-validation library (e.g., **Zod**, **Joi**, **Yup**) for JSON bodies, query params, and headers.  
- On the React side, perform client-side validation only for user experience; all checks must repeat server-side.

### 3.2 Preventing Injection Attacks

- Access databases (Cloudflare D1) via **parameterized queries** or a vetted ORM/Query builder.  
- Never interpolate user input into SQL strings.  
- Sanitize any filesystem operations (e.g., file uploads) to prevent path traversal.

### 3.3 Cross-Site Scripting (XSS)

- In React, avoid `dangerouslySetInnerHTML`.  
- Context-aware escape all user-supplied data.  
- Deploy a **Content Security Policy (CSP)** header to restrict script sources.

### 3.4 CSRF Protection

- For state-changing API calls, use **anti-CSRF tokens** in cookies and request headers.  
- Set `SameSite=Strict` on cookies to mitigate cross-site requests.

---

## 4. Data Protection & Privacy

### 4.1 Encryption

- Enforce **HTTPS/TLS 1.2+** for all traffic (frontend, API, IaC endpoints).  
- Encrypt sensitive data at rest if stored outside Cloudflare D1 (e.g., logs, backups).

### 4.2 Secrets Management

- Do **not** hardcode API keys or secrets in code.  
- Leverage a secrets manager (e.g., AWS Secrets Manager, HashiCorp Vault) for environment secrets.  
- For local development, use `.env.local` (excluded from VCS) and validate secret presence in CI.

### 4.3 Sensitive Data Handling

- Mask or redact PII in logs.  
- Limit stored PII to only what’s necessary to operate the service.  
- Plan data retention and secure deletion to comply with GDPR/CCPA.

---

## 5. API & Service Security

### 5.1 HTTPS & CORS

- Enforce **HTTPS** on all API endpoints.  
- Configure CORS in `apps/api` to allow only trusted origins (e.g., the production web domain).

### 5.2 Rate Limiting & Throttling

- Implement rate limits per IP/user on authentication endpoints (e.g., `/auth/login`, `/auth/register`).  
- Consider global request throttling to mitigate DoS attacks.

### 5.3 Error Handling

- Return generic error messages to clients; log detailed errors internally.  
- Standardize error codes and formats (e.g., `{ error: { code, message } }`).

### 5.4 API Versioning

- Prefix routes with `/v1/` to enable safe non-breaking and breaking changes in the future.

---

## 6. Web Application Security Hygiene

- Set secure HTTP headers via Helmet (or equivalent):  
  - `Strict-Transport-Security` (HSTS)  
  - `X-Frame-Options: DENY`  
  - `X-Content-Type-Options: nosniff`  
  - `Referrer-Policy: no-referrer-when-downgrade`  
  - `Content-Security-Policy` to lock down resources.

- Secure cookies with `Secure`, `HttpOnly`, and strict `SameSite` attributes.  
- Avoid storing sensitive data in `sessionStorage` or `localStorage`.  
- Use **Subresource Integrity (SRI)** when loading third-party scripts.

---

## 7. Infrastructure & Configuration Management

- **Terraform** code (`.claude/review-terraform.md`) must never include secrets; use remote state with encryption.  
- Harden serverless or VM instances: only expose required ports (e.g., 443), disable SSH in production if unnecessary, enforce private networking.  
- Use version-pinned versions of Terraform providers and modules.  
- Disable debugging endpoints and verbose logging in production.

---

## 8. Dependency Management

- Maintain a **lockfile** (`yarn.lock`, etc.) to ensure deterministic builds.  
- Regularly scan for vulnerabilities using SCA tools (e.g., **Dependabot**, **Snyk**).  
- Audit and update dependencies on a scheduled cadence.  
- Minimize transitive dependencies by only installing what is needed.

---

## 9. Monitoring & Incident Response

- Integrate an error-tracking service (e.g., Sentry) in both frontend and backend.  
- Centralize logs (structured JSON) in a SIEM or log management system.  
- Define an incident response plan: alert thresholds, on-call rotations, and post-mortem procedures.

---

## 10. Ongoing Security Practices

- Conduct periodic threat modeling and security reviews as features evolve.  
- Schedule regular penetration tests and code audits.  
- Include security checkpoints in your CI/CD pipeline (e.g., linting rules, SAST scans).  
- Provide developer training on secure coding and OWASP Top 10 risks.

---

By adhering to these guidelines, the **react-starter** repository will uphold a strong security posture across its entire development lifecycle and infrastructure stack.