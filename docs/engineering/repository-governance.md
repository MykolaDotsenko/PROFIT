# PROFIT Repository Governance

**Status:** Active baseline  
**Scope:** `MykolaDotsenko/PROFIT`

## Current state

The repository is currently public and primarily contains product, architecture and operating documentation. Executable application code and CI/CD are not yet present.

This baseline therefore avoids fake or low-value automation. Controls should be added when there is something concrete to verify.

## Current repository rules

- `main` is the default integration branch.
- Material changes should use a short-lived branch and pull request.
- Prefer squash merge for small, coherent changes unless preserving commit structure is useful.
- Pull requests should reference an issue when practical.
- Secrets and local environment files must not be committed.
- Financial and agronomic logic requires independent verification before completion.
- A merged PR does not automatically imply product verification or VEV.

## Files that enforce the baseline

- `.gitignore` — excludes secrets, local artifacts, build output and local state.
- `.editorconfig` — consistent whitespace and line endings.
- `.gitattributes` — stable text normalization and binary handling.
- `SECURITY.md` — vulnerability-reporting expectations.
- `.github/ISSUE_TEMPLATE/*` — structured work intake.
- `.github/pull_request_template.md` — review and verification checklist.
- `CONTRIBUTING.md` — team workflow.
- `docs/engineering/development-operating-system.md` — delivery system.

## Controls to enable when code exists

Do not enable these merely for appearance. Enable them when the relevant checks are real and reliable.

### CI required checks

Add after the first executable module exists:

- formatting/lint;
- type checking;
- unit tests;
- integration tests where relevant;
- build;
- migration validation where relevant;
- dependency/security scanning where signal quality is acceptable.

### Branch protection / rulesets

Enable after CI checks are stable:

- require pull request before merging;
- require at least one approving review for material code changes;
- require required status checks;
- require conversation resolution;
- prevent force-push to `main`;
- prevent branch deletion;
- allow narrow emergency bypass only for repository administrators.

Avoid enabling review requirements that make solo development impossible before at least two active contributors can review each other.

### Dependabot

Enable after package manifests are introduced. Until then it has nothing meaningful to monitor.

### Secret scanning

Use GitHub secret scanning/push protection when available for the repository/account plan. Regardless of tooling, committed secrets must be rotated immediately.

## Public repository and license decision

The repository is public but currently has no LICENSE file.

That should be treated as an explicit business/legal decision, not an automatic technical default.

Before publishing proprietary implementation code, decide whether to:

1. keep the repository public with an explicit open-source license;
2. keep documentation public but move implementation to private repositories;
3. make the full repository private.

Do not add MIT/Apache/GPL or another license automatically without a deliberate company decision.

## Organization migration trigger

Move PROFIT from a personal account into a dedicated GitHub Organization before collaboration/permissions become operationally important.

Strong triggers include:

- more than 2–3 active contributors;
- external contractors;
- production credentials/environments;
- multiple repositories;
- team-based permissions;
- organization-level Projects/Issue Types/fields;
- ownership continuity beyond one personal account.

## Reconsider if

Revisit this baseline when:

- the first production code is committed;
- CI becomes available;
- the repository changes visibility;
- the team grows;
- the first production environment is created;
- security/compliance requirements materially increase.
