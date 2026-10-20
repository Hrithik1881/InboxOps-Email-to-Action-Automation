# Test Suites (`tests/`)

Comprehensive automated testing strategy across multiple levels of fidelity as outlined in the InboxOps specification.

## Test Layers
- `unit/`: Date & deadline math, case state transitions, role permissions, Zod schema validation, idempotency key generation.
- `integration/`: Multi-tenant database queries, BullMQ job queue lifecycles, OAuth refresh token rotation, provider webhook signature verification.
- `e2e/`: Full workflow testing with Playwright (simulating mailbox sync -> AI extraction proposal -> human verification in review queue -> case creation -> task completion -> export).
- `security/`: Cross-tenant data isolation verification, prompt-injection resilience tests, authorization escalation denial, replay attack tests.
