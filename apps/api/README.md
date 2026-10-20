# InboxOps Backend REST API (`apps/api`)

The authoritative backend REST service for InboxOps, built with **Node.js**, **TypeScript**, and **Fastify** (or NestJS).

## Architectural Responsibilities
- **Authentication & Multi-Tenant Authorization**:
  - JWT & session authentication.
  - Organization-scoped tenancy: Every request must authenticate the user and strictly scope queries by `organization_id`. Authorization is never delegated to the client.
- **REST Endpoints (`/api/v1`)**:
  - `/api/v1/me`: Authenticated user profile and workspace context.
  - `/api/v1/cases`: Case listings, filtering, manual creation, detail view, assignment, status transitions (`open`, `in_progress`, `waiting_customer`, `resolved`, `closed`).
  - `/api/v1/tasks`: Task assignment, deadline tracking, completion evidence.
  - `/api/v1/review-queue`: Proposals awaiting human decision, approval/rejection mutations.
  - `/api/v1/integrations`: Mailbox connections, sync status, manual sync triggers.
  - `/api/v1/reports/summary`: Operational metrics, first response time, SLA adherence.
  - `/api/v1/webhooks/{provider}`: Replay-safe provider webhook receiver with cryptographic signature validation.
- **Concurrency & Integrity**:
  - Optimistic locking via `version` fields (`If-Match` headers) to prevent silent concurrent overwrites.
  - Transactional database operations for state changes, approvals, and assignments.
  - Comprehensive audit event recording for compliance and tracing.
