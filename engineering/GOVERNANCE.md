# Engineering Governance v1.0

**Status:** Normative
**Scope:** Development process for multi-agent team (Human + AI)
**Hierarchy:** CANON.md > AI_GOVERNANCE.md > this document

## Document Map

```
CANON.md                    — What the system IS (constitution)
AI_GOVERNANCE.md            — Who does WHAT (roles)
engineering/GOVERNANCE.md   — HOW we work (process)
engineering/REVIEW_POLICY.md — HOW we review
engineering/CHANGE_POLICY.md — WHAT can change
engineering/RISK_REGISTER.md — WHAT can go wrong
```

## Development Workflow

```
1. Human creates Issue (with template)
2. Architectural discussion (ChatGPT / Claude / Grok)
3. Human approves approach
4. Independent audit (Claude / MiMo)
5. Human assigns to executor (Jules or human)
6. Executor creates branch + PR
7. CI runs: sync tests → integration tests → replay
8. Human reviews PR (with checklist)
9. Human merges or rejects
```

## Gates

| Gate | Blocks | Enforced by |
|------|--------|-------------|
| Issue template complete | Assignment | Human |
| Architecture discussion done | Implementation | Human |
| Audit passed | PR merge | Human |
| CI green | PR merge | GitHub Actions |
| Replay 0 mismatches | PR merge | GitHub Actions |
| Human approval | Merge | Human |

No gate may be skipped. No agent may self-approve any gate.

## Branch Strategy

- `main` — stable, always deployable
- Feature branches — per Issue, named `issue-{N}-{description}`
- No direct commits to `main`
- All changes via PR

## Commit Convention

```
{type}({scope}): {description}

type: feat | fix | docs | test | ci | refactor | chore
scope: canon | pda | services | routes | tests | ci | docs
```

Examples:
```
feat(services): add cooldown gate to emission
fix(pda): correct version handshake range
test(integration): add DB-dependent PDA tests
ci(github): add PostgreSQL service container
docs(engineering): add governance v1.0
```
