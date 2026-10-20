# InboxOps REST API Specification (`/api/v1`)

## 1. Global Conventions
- **Base URL**: `/api/v1`
- **Protocol**: HTTPS (TLS 1.3 enforced in production)
- **Content-Type**: `application/json`
- **Timestamps**: ISO 8601 UTC format (`YYYY-MM-DDTHH:mm:ss.sssZ`)
- **Pagination**: Cursor-based using `?limit=50&cursor=eyJpZCI6...`
- **Authentication**: Bearer JWT tokens in `Authorization: Bearer <token>` header.
- **Idempotency**: All state-mutating requests (`POST`, `PATCH`) support an optional `Idempotency-Key: <UUID>` header.
- **Concurrency**: `If-Match: "<version>"` header is validated on updates to avoid overwriting intermediate changes.

---

## 2. Standardized Error Response Format

All error payloads follow RFC 7807 problem details semantics:

```json
{
  "error": {
    "code": "CASE_VERSION_CONFLICT",
    "message": "This case was updated by another team member since you opened it.",
    "request_id": "req_01HV8XYZ90123",
    "details": {
      "expected_version": 4,
      "current_version": 5,
      "updated_by": "John Doe",
      "updated_at": "2026-10-21T00:30:00Z"
    }
  }
}
```

---

## 3. Endpoints Matrix

### 3.1 Session & Workspace
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/me` | Fetch authenticated user profile, organization details, and role permissions | Yes |

### 3.2 Case Management
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/cases` | List and filter cases with status, priority, owner, and search queries | Yes |
| `POST` | `/api/v1/cases` | Manually initialize a case | Yes |
| `GET` | `/api/v1/cases/:id` | Retrieve comprehensive case details, timeline, extracted fields, and tasks | Yes |
| `PATCH` | `/api/v1/cases/:id` | Update case fields (subject, priority, deadline, status) | Yes |
| `POST` | `/api/v1/cases/:id/assign` | Assign or reassign case ownership | Yes |
| `POST` | `/api/v1/cases/:id/resolve` | Mark case as resolved with required outcome note | Yes |
| `POST` | `/api/v1/cases/:id/reopen` | Reopen a resolved or closed case | Yes |

### 3.3 Tasks
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/tasks` | List pending and overdue tasks across cases | Yes |
| `POST` | `/api/v1/cases/:id/tasks` | Create a new task under a case | Yes |
| `PATCH` | `/api/v1/tasks/:id` | Update task status or assign completion evidence | Yes |

### 3.4 AI Review Queue
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/review-queue` | Retrieve pending AI-extracted proposals awaiting verification | Yes |
| `POST` | `/api/v1/review-queue/:id/approve` | Approve proposal (converts into an active Case) | Yes |
| `POST` | `/api/v1/review-queue/:id/reject` | Reject proposal as irrelevant, spam, or duplicate | Yes |

### 3.5 Integrations & Ingestion
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/integrations` | List connected email providers and synchronization statuses | Yes |
| `POST` | `/api/v1/integrations/:id/sync` | Trigger an immediate manual inbox synchronization | Yes |
| `POST` | `/api/v1/webhooks/:provider` | Ingestion webhook endpoint for Google / Microsoft push notifications | Webhook Sig |

### 3.6 Reports & Metrics
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/reports/summary` | Aggregate SLA metrics, first-response time, and overdue percentage | Yes |
