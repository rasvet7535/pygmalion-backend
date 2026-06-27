# Jules Execution Policy

**Status:** Normative
**Version:** 1.0
**Applies to:** Google Jules Coding Agent
**Hierarchy:** CANON.md > AI_GOVERNANCE.md > AGENTS.md > this document

## Purpose

Defines the execution boundaries, permitted zones, and forbidden actions for Google Jules when working on `backend-v0.4.02.GENEZIS`.

Jules is the **Deterministic Engineering Executor**. Not an architect. Not an author. Not an auditor.

## Modes

| Mode | Description | Requires |
|------|-------------|----------|
| **Audit** | Read-only analysis. No file creation except REPORT.md. | Approved Issue |
| **Execute** | Implement scoped task. Creates branch + PR. | Approved Issue + Human assignment |

Default mode is **Audit**. Execute mode requires explicit human assignment in the Issue.

## Forbidden Zones (Never Touch)

| Path | Reason |
|------|--------|
| `CANON.md` | Constitution. Human only. |
| `AI_GOVERNANCE.md` | Governance. Human only. |
| `AGENTS.md` | Agent rules. Human only. |
| `engineering/*` | Process docs. Human only. |
| `PDA/core/*` | Core logic. Level 3 trust. |
| `backend/core/canon/*` | Canon Layer. Level 3 trust. |
| `backend/core/metronome.js` | Temporal rules. Level 3 trust. |
| `sql-schema/*` | Database schema. Level 3 trust. |
| `tools/replay-core.js` | Replay verification. Level 3 trust. |
| `docker-compose.yml` | Infrastructure. Human only. |
| `package.json` | Dependencies. Human only. |

## Permitted Zones (Level 1)

| Path | What Jules May Do |
|------|-------------------|
| `tests/*` | Write, modify, delete test files |
| `docs/*` | Write, modify documentation |
| `.github/workflows/*` | Modify CI configuration |
| `tools/ci-seed.js` | Modify CI seed data |
| `Dockerfile` | Modify (with approved Issue) |
| `backend/routes/*` | Modify structure only (Level 2 after 3+ PRs) |
| `backend/services/*` | Modify (Level 2 after 3+ PRs) |

## Prompt Template

Every Jules task must begin with:

```
Read CANON.md and AGENTS.md first.

Mode: [Audit | Execute]

Task: [specific description from GitHub Issue]

Constraints:
- Stay within permitted zones
- No architecture changes
- No framework changes
- No modifications to forbidden zones
- All sync tests must pass
- Create REPORT.md (audit mode) or branch + PR (execute mode)
```

## Output Rules

| Mode | Output | Location |
|------|--------|----------|
| Audit | `REPORT.md` | Root of analyzed directory |
| Execute | Branch + PR | GitHub |

No other files may be created. No files may be modified except within permitted zones.

## CI Requirements

Before any PR is mergeable:
1. Sync tests pass (PDA + Contract)
2. Integration tests pass (with PostgreSQL)
3. Replay verification passes (0 mismatches)
4. Docker build succeeds

Jules does not approve its own PRs. Human reviews and merges.

## Escalation

If Jules encounters:
- Architecture ambiguity → stop, report in output
- Missing files → report "not present in local environment"
- Conflicting instructions → follow CANON.md, report conflict
- Forbidden zone access attempt → refuse, report violation
