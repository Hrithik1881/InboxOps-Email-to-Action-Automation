# InboxOps: Product Specification (v1.0 Baseline)

## 1. Executive Summary
InboxOps is a Windows desktop application backed by a secure hosted backend and asynchronous workers. It helps small B2B sales and quotation teams transform unstructured business email inquiries into evidence-backed cases, assigned tasks, tracked deadlines, follow-ups, and auditable outcomes.

### Core Value Proposition
- **Operational Reliability**: Eliminates dropped inquiries and forgotten quotes. Every relevant email has a clear owner, an actionable next step, an internal/customer deadline, and an audit trail.
- **Evidence Over Assertion**: Extracted customer data, quantities, and deadlines are permanently cited against source emails or attachment snippets.
- **Human-in-the-Loop Control**: AI proposes structured records; humans review, correct, and approve. No autonomous outbound customer commitments or emails are made in the MVP.

### Target Personas
| Persona | Key Needs | Success Metric |
| :--- | :--- | :--- |
| **Sales / Quotation Executive** | Rapidly review requests, verify quotes, prevent forgotten leads | Zero missed inquiries, 70%+ reduction in manual copy-paste |
| **Sales Manager** | High-level workload visibility, bottlenecks, SLA warnings | Reliable escalation, 100% assignment coverage |
| **Workspace Administrator** | Member management, secure OAuth integrations, retention rules | Predictable, least-privilege setup |
| **Business Owner** | Revenue protection, team velocity, conversion tracking | Tangible ROI, measured response time improvements |

---

## 2. Core Functional Modules

### 2.1 Email Ingestion & Deduplication
- **OAuth2 Mailbox Connectors**: Secure integration with Gmail / Google Workspace and Microsoft 365.
- **Selective Monitoring**: Users configure specific folders or labels (e.g., `INBOX/Enquiries`, `Quotes`).
- **Deduplication Engine**: Enforces idempotency via `(provider_account_id, provider_message_id)`.
- **Reconciliation Crons**: Polling fallback ensures zero message loss even during provider webhook dropouts.

### 2.2 AI Extraction & Parsing Pipeline
- **Classification**: Categorizes messages into `quotation_request`, `sales_enquiry`, `reply_update`, `irrelevant`, or `needs_review`.
- **Field Extraction**: Extracts customer company, primary contact, RFQ summary, reference numbers, line items (descriptions, quantities, units), and requested deadline.
- **Citation & Evidence**: Flags exact character spans in email bodies or page/cell coordinates in attachments.
- **Data Integrity**: Unknown or ambiguous fields remain `null`/`unknown`—the model is strictly forbidden from hallucinating or guessing.

### 2.3 Human Review Queue
- **Side-by-Side Verification**: Displays the incoming email on one side and the AI-proposed case fields on the other, with visual citations.
- **Review Actions**: `Approve`, `Edit & Approve`, `Reject` (as irrelevant/spam), or `Defer`.
- **Audit Tracking**: Logs who approved or edited the proposal, timestamp, original AI suggestion, and final values.

### 2.4 Case & Task Operations
- **Case Lifecycle**: Tracks status from `NeedsReview` -> `Open` -> `InProgress` -> `WaitingCustomer` -> `Resolved` -> `Closed`.
- **Dual Deadline Semantics**:
  - `customer_deadline`: Hard deadline requested by buyer (with source citation).
  - `internal_due_at`: Internal turnaround SLA assigned to the sales rep.
  - `follow_up_at`: Automated check-in or customer reminder trigger.
- **Thread Re-opening**: If a customer replies to a `Resolved` or `Closed` case, the case is automatically re-evaluated and reopened without losing history.

### 2.5 Operational Dashboard & SLA Monitoring
- Real-time views: Items awaiting review, unassigned cases, due today, overdue, waiting on customer, recently closed.
- Advanced filtering: By owner, priority, customer, case type, and date range.
- Full-text search over approved cases and extracted line items.
- Reporting metrics: First-response time, time-to-quote, follow-up coverage, and overdue rate.
