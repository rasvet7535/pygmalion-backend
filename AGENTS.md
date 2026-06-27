# AGENTS.md — AI Agent Execution Rules

## Before Any Task

Read CANON.md. It is the normative source. This file is not.

## Forbidden

- Never modify CANON.md
- Never modify acts_log schema
- Never bypass Replay
- Never introduce new architecture
- Never replace frameworks
- Never add business logic to routes
- Never access database from PDA
- Never create upward or cyclic dependencies
- Never duplicate Canon rules in other modules

## Required

- Always create Pull Request (no direct commits to main)
- Always run tests before marking task complete
- Always reference CANON.md section in PR description
- Always use canonical names (R.U., R.M., O.K., acts_log)

## Testing

```bash
node PDA/tests/pda.test.js              # sync tests (no DB)
node PDA/tests/canon-contract.test.js    # contract tests (no DB)
```

Async tests require PostgreSQL. Do not run in environments without DB.

## File Ownership

| You may edit | You must NOT edit |
|-------------|------------------|
| docs/*.md | CANON.md |
| tests/* | PDA/core/version-handshake.js |
| backend/services/* | backend/core/canon/* |
| backend/routes/* (structure only) | acts_log schema |
| .github/workflows/* | docker-compose.yml (without approval) |
