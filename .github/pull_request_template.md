## Description
<!-- Provide a brief description of the changes introduced in this PR. -->

## Linked Issues
<!-- Reference issue(s) resolved or impacted (e.g. Closes #123) -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Architecture / Refactor / Performance
- [ ] Documentation update
- [ ] CI/CD or build tooling

## Checklist
- [ ] My code follows the project's architecture standards and style guidelines.
- [ ] Tenant scoping (`organization_id`) is strictly enforced on all queries/mutations.
- [ ] Background jobs are idempotent and safe for replay.
- [ ] AI prompt injection defenses maintained (untrusted content is not treated as instructions).
- [ ] Unit / Integration tests have been added or updated to cover changes.
- [ ] Tested locally with mock email data fixtures.
- [ ] All linting and type checks pass.
