# Change Policy

**Status:** Normative
**Principle:** Every file has a designated owner. Changes beyond ownership require escalation.

## File Ownership

| File / Directory | Owner | May Change Without Approval |
|-----------------|-------|-----------------------------|
| `CANON.md` | Human only | Nobody |
| `AI_GOVERNANCE.md` | Human only | Nobody |
| `AGENTS.md` | Human only | Nobody |
| `backend/core/canon/*` | Human only | Nobody |
| `PDA/core/*` | Human only | Nobody |
| `backend/core/metronome.js` | Human only | Nobody |
| `sql-schema/*` | Human only | Nobody |
| `tools/replay-core.js` | Human only | Nobody |
| `backend/services/*` | Human + Jules (L2) | Jules with approved Issue |
| `backend/routes/*` | Human + Jules (L2) | Jules with approved Issue |
| `tests/*` | Human + Jules (L1) | Jules with approved Issue |
| `docs/*` | Human + Jules (L1) | Jules with approved Issue |
| `.github/workflows/*` | Human + Jules (L1) | Jules with approved Issue |
| `engineering/*` | Human only | Nobody |
| `docker-compose.yml` | Human only | Nobody |
| `Dockerfile` | Human + Jules (L1) | Jules with approved Issue |
| `package.json` | Human only | Nobody |
| `tools/ci-seed.js` | Human + Jules (L1) | Jules with approved Issue |

## Jules Trust Levels

### Level 1 (Current)
Tests, documentation, CI, Docker, logging, GitHub Actions.

### Level 2 (After 3+ successful PRs)
Service layer, refactoring, dependency cleanup.

### Level 3 (Never automatic)
Canon Layer, PDA Core, Metronome, acts_log, emission-policy, Replay.
Always requires separate human decision.

## Escalation Triggers

Any of these requires immediate human review:
- File from "Human only" ownership modified
- New dependency added
- Framework replacement proposed
- acts_log schema change
- Emission limit change
- Temporal rule change
- Version handshake range change
