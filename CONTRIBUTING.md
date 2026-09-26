# Contributing to PROFIT

PROFIT uses a pull-based delivery workflow designed to maximize reliable flow and verified customer value.

Read:

- **[Development Operating System](docs/engineering/development-operating-system.md)**
- **[Repository Governance](docs/engineering/repository-governance.md)**

before starting material work.

## Workflow

`Backlog → Todo → In Progress → Review → Verify → Done`

- Pull work from Todo only when capacity exists.
- Prefer finishing downstream work before starting more work.
- Keep changes small and independently verifiable.
- Use GitHub issue dependencies for blockers instead of creating a Blocked status.
- Treat P0/Expedite work as exceptional; WIP limit is 1.

## Branch naming

- `feat/<issue>-short-description`
- `fix/<issue>-short-description`
- `exp/<issue>-short-description`
- `chore/<issue>-short-description`

## Pull requests

- Reference the issue.
- Keep scope narrow.
- Include appropriate tests.
- Explain risk and verification evidence.
- Do not merge material financial/agronomic logic without independent verification.
- Do not treat an LLM output as authoritative financial, agronomic or statistical truth.
- Never commit credentials, production secrets or private customer data.

## Definition of Done

An item is Done only when relevant acceptance criteria are verified, tests pass, review is complete, the change is merged/deployed to the target environment, and no known critical regression remains.

Done does **not** mean Verified Economic Value. VEV requires separate outcome and attribution evidence.
