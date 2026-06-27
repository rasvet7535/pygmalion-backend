# Risk Register

**Updated:** 2026-06-27

## Active Risks

| # | Risk | Severity | Probability | Status | Mitigation |
|---|------|----------|-------------|--------|------------|
| R1 | Architecture drift from AI agents | HIGH | MEDIUM | MITIGATED | AI_GOVERNANCE.md + AGENTS.md + human review |
| R2 | No CI/CD (historical) | HIGH | HIGH | RESOLVED | GitHub Actions in place |
| R3 | Hardcoded secrets in docker-compose | MEDIUM | HIGH | RESOLVED | .env pattern, docker-compose uses env vars |
| R4 | CANON.md corruption | HIGH | LOW | MITIGATED | CANON.md is normative English; Russian is informative only |
| R5 | Test count confusion | LOW | MEDIUM | RESOLVED | CI enforces 175/175 with clear suite breakdown |
| R6 | Business logic in routes/acts.js | MEDIUM | HIGH | OPEN | Service layer bypass needs refactoring |
| R7 | No .gitignore (historical) | MEDIUM | HIGH | RESOLVED | .gitignore created |
| R8 | Dockerfile version mismatch | LOW | HIGH | RESOLVED | Version synced to 0.4.02 |
| R9 | CI replay with empty DB | MEDIUM | MEDIUM | RESOLVED | ci-seed.js provides deterministic test data |
| R10 | Jules auto-approving plans | MEDIUM | MEDIUM | OPEN | Human must review all Jules plans |

## Risk Escalation

When a new risk is identified:
1. Add to this register
2. Assess severity and probability
3. Define mitigation
4. Track until resolved or accepted

## Accepted Risks

| Risk | Reason |
|------|--------|
| Jules cannot run Docker in VM | Architectural limitation; integration tests run in CI instead |
| Async tests require PostgreSQL | 25 tests run only in integration-tests CI job |
| CANON.ru.md may drift from CANON.md | Informative only; CANON.md is single normative source |
