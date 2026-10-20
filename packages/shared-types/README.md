# Shared Types Package (`packages/shared-types`)

Monorepo package containing TypeScript type definitions, DTOs (Data Transfer Objects), enums, and API interfaces shared across the desktop client, backend API, and worker processes.

## Key Types
- **Case & Tasks**: `Case`, `CaseStatus`, `Priority`, `Task`, `TaskStatus`, `DeadlineType`
- **Email & Ingestion**: `EmailMessage`, `EmailConnection`, `AttachmentMetadata`, `CaseMatchingSignal`
- **AI & Extraction**: `ExtractionProposal`, `ExtractedItem`, `EvidenceCitation`, `ConfidenceScore`
- **Auth & Tenancy**: `Organization`, `User`, `Role` (`Owner`, `Admin`, `Manager`, `Member`, `ReadOnly`), `JWTPayload`
- **Audit**: `AuditEvent`, `AuditActionType`
