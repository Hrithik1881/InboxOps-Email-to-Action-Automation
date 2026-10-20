# Database Migrations & Seeds (`database/`)

PostgreSQL database schema management, migrations, and synthetic seed datasets.

## Directory Structure
- `migrations/`: Backward-compatible SQL / Prisma / Drizzle migration files.
- `seeds/`:
  - `synthetic-emails/`: Mock email raw fixtures (quotation requests, multipart attachments, RFQs, thread replies).
  - `dev-seed.ts`: Script to populate local databases with multi-tenant test organizations, users, cases, and proposals for rapid development without needing live email accounts.

## Schema Principles
- Multi-tenancy enforced at every table through `organization_id`.
- UUID primary keys (RFC 4122 v4).
- Optimistic concurrency control via `version` integer columns.
- Timestamps strictly stored in UTC with timezone stored at the Organization level.
