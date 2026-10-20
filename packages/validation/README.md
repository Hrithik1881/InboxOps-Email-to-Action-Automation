# Validation Package (`packages/validation`)

Runtime validation schemas (powered by **Zod**) and deterministic business rule checkers used by both the backend API and the extraction workers.

## Responsibilities
- **AI Extraction Schema Validation**: Validates raw JSON output from LLMs against rigid Zod schemas before allowing it into the review queue.
- **Deterministic Business Rules**: Verifies unit conversions, date logic (e.g. deadline must be in the future, valid ISO 8601), and positive integer quantities.
- **API Request Validation**: Validates query params, request bodies, and headers for `/api/v1` routes.
- **Prompt Injection Scrubbing**: Sanitization rules for user-supplied email bodies before processing.
