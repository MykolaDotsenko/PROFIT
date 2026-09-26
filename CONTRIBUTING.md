# Contributing to PROFIT

PROFIT uses a pull-based delivery workflow designed to maximize reliable flow and verified customer value.

Read **[Development Operating System](docs/engineering/development-operating-system.md)** before starting material work.

For product UI/UX changes also read **[PROFIT Design System v0.1](docs/product/design-system/README.md)**.

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
- For UI changes, reuse existing design-system patterns before creating new shared components.
- Do not present estimated/modelled/predicted values as observed.
- Target WCAG 2.2 AA for production UI and verify relevant keyboard/focus/content states.

## Definition of Done

An item is Done only when relevant acceptance criteria are verified, tests pass, review is complete, the change is merged/deployed to the target environment, and no known critical regression remains.

Done does **not** mean Verified Economic Value. VEV requires separate outcome and attribution evidence.
