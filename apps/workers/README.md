# InboxOps Background Workers (`apps/workers`)

Asynchronous background job execution powered by **Redis** and **BullMQ**. Hosted workers operate independently of whether client desktop applications are currently online or offline.

## Worker Domains

### 1. `email-sync/`
- **Mailbox Ingestion**: Fetches incoming emails via provider APIs (OAuth2 with Google Workspace / Microsoft 365).
- **Deduplication**: Deduplicates incoming messages using `(account_id, provider_message_id)` compound uniqueness.
- **Normalization**: Cleanses headers, safely normalizes HTML/plaintext, extracts attachment metadata.
- **Reconciliation**: Periodic sync cron to detect missed webhooks or provider connection drops.

### 2. `extraction/`
- **AI Classification**: Categorizes emails into `quotation_request`, `sales_enquiry`, `reply_update`, `irrelevant`, or `needs_review`.
- **Structured Field Extraction**: Extracts buyer, contacts, requested products, quantities, units, reference numbers, and deadlines.
- **Evidence Linking**: Mandates that every extracted entity links directly to source text snippets or attachment coordinates.
- **Attachment Sandbox**: Isolated parsing for PDF and spreadsheet attachments with OCR fallback; zero execution of untrusted macros/scripts.
- **Prompt Injection Defense**: Ingested text is treated strictly as passive data, never as prompt instructions.

### 3. `reminders/`
- **SLA & Overdue Engine**: Evaluates active case deadlines against workspace business hours and timezone configurations.
- **Derived State**: Flags cases as `is_overdue = true` without mutating original customer deadlines.
- **Notification Dispatch**: Dispatches idempotent notifications (email/in-app) respecting quiet hours and escalation hierarchies.
