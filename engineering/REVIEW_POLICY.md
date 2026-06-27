# Review Policy

**Status:** Normative
**Applies to:** All PRs from any source (human or AI)

## Review Levels

### Level 1: Automated (CI)

Runs on every PR. Blocks merge if fails.
- Sync tests (PDA + Contract)
- Integration tests (with PostgreSQL)
- Replay verification (0 mismatches)
- Docker build

### Level 2: Structural Review

Human checks:
- [ ] Does PR match Issue description?
- [ ] Are changes minimal (no scope creep)?
- [ ] Is commit convention followed?
- [ ] Are new files in correct locations?
- [ ] No secrets, no credentials, no .env

### Level 3: Architecture Review

Required for changes touching:
- `backend/core/canon/*`
- `PDA/core/*`
- `backend/services/*`
- `sql-schema/*`
- `tools/replay-core.js`

Human checks:
- [ ] Layer direction preserved (downward only)
- [ ] No upward/cyclic dependencies introduced
- [ ] SSOT (acts_log) not compromised
- [ ] Replay remains deterministic
- [ ] Version handshake still passes
- [ ] Canon rules not duplicated

### Level 4: Canon Review

Required for changes to:
- `CANON.md`
- `AI_GOVERNANCE.md`
- `AGENTS.md`
- Emission policy
- Temporal rules

Requires explicit human sign-off. No AI may approve.

## AI Agent PRs

PRs from Jules or other AI agents require:
1. CI green (Level 1)
2. Human structural review (Level 2)
3. Architecture review if touching restricted files (Level 3)
4. Human merge approval

AI agents may not:
- Self-approve their own PRs
- Merge without human review
- Modify review policy
- Skip any gate
