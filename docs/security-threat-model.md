# Security Architecture & Threat Model

## 1. Core Threat Matrix & Mitigations

| Threat | Risk Level | Primary Control & Architecture Defense |
| :--- | :--- | :--- |
| **Cross-Tenant Data Leakage** | Critical | Tenant-scoped queries (`WHERE organization_id = :org_id`), server-side role validation, automated negative security test suites, and optional PostgreSQL Row-Level Security (RLS). |
| **OAuth Token Theft** | Critical | Refresh tokens are encrypted at rest with AES-256-GCM. Scopes are restricted to minimum required mailbox folders. Tokens are never transmitted to the Electron renderer process. |
| **Prompt Injection Attacks** | High | Ingested email bodies and attachments are strictly treated as **untrusted data**, never as executable prompts. System instructions are segregated; AI models have **zero direct access** to database or outbound email tools. |
| **Malicious Attachments** | High | Strict MIME allow-list. Files are scanned and parsed inside isolated sandboxed worker processes with memory/CPU limits. Executables and macro-bearing files are blocked. |
| **Forged / Replayed Webhooks** | Medium | Cryptographic provider signature verification on all push notifications. BullMQ job deduplication via idempotency keys. |
| **Accidental Outbound Commitments** | High | Strict "human-in-the-loop" policy: InboxOps MVP does **not** autonomously send emails or make commercial quotes. Every external communication requires explicit staff authorization. |
| **Race Conditions & Double Claiming** | Medium | Optimistic locking on cases via `version` column. Concurrent status changes result in explicit conflict warnings rather than silent state overwrites. |

---

## 2. Desktop Security (Electron Baseline)
To prevent common Electron attack vectors:
1. **Context Isolation**: `contextIsolation: true` is strictly enforced.
2. **Node Integration Disabled**: `nodeIntegration: false` in renderer.
3. **Restrictive Content Security Policy (CSP)**: Disallows `unsafe-eval` and restricts resource loading to trusted endpoints.
4. **Validated IPC Bridge**: Only explicitly enumerated IPC channels with parameter validation are exposed via `contextBridge`.

---

## 3. Privacy & Regulatory Compliance
- **Data Minimization**: Ingests only messages from designated business folders/labels. Personal or non-business email accounts are excluded.
- **Tenant Isolation**: Strict logical separation of all organization data.
- **Auditability**: Every assignment change, approval, edit, and status transition is immutably logged with actor ID and timestamp.
- **Compliance Alignment**: Formulated to adhere to applicable Indian Digital Personal Data Protection (DPDP) Act, GDPR, and enterprise enterprise-readiness guidelines.
