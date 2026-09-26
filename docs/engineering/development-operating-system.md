# PROFIT Development Operating System

**Status:** Proposed operating standard  
**Applies to:** product and engineering work in PROFIT  
**Primary platform:** GitHub Issues + GitHub Projects + Pull Requests + GitHub Actions

## 1. Objective

Optimize for fast, reliable flow of valuable work from evidence to production while preserving correctness, farmer trust, and traceability.

The system must make it easy to answer:

- What should we finish next?
- What is blocked?
- Where is work waiting?
- What threatens the next release?
- What changed and why?
- Was the delivered work verified?
- Did it later create measurable customer value?

The board is a delivery system, not a list of everything anyone might want.

## 2. Core workflow

~~~text
BACKLOG
   ↓ replenishment
TODO
   ↓ pull
IN PROGRESS
   ↓
REVIEW
   ↓
VERIFY
   ↓
DONE
~~~

### Status semantics

| Status | Meaning |
| --- | --- |
| Backlog | Candidate work. No delivery commitment. |
| Todo | Committed, sufficiently shaped, ready to pull. |
| In Progress | Someone is actively working on it now. |
| Review | Implementation is ready for peer review. |
| Verify | Implementation passed review and is being checked against product/domain acceptance criteria. |
| Done | Definition of Done is satisfied in the target environment. |

Do not add extra statuses unless real flow data shows a persistent need.

## 3. Initial WIP limits

These are starting hypotheses and must be recalibrated after 30–50 completed work items.

| Column | Initial limit |
| --- | ---: |
| Todo | 6 |
| In Progress | 3 |
| Review | 2 |
| Verify | 2 |
| Expedite | 1 |

When a downstream column is at or above its WIP limit, prefer helping finish work already in the system before starting new work.

**Default rule: finish before starting.**

## 4. Exception handling

### Blocked work

Blocked is not a status.

Keep the work item in its actual workflow state and use a native dependency relationship such as `blocked by`.

Example:

~~~text
FP-142
Status: In Progress
Blocked by: FP-137
~~~

### Rework after Review

If Review finds material implementation work is still required:

`Review → In Progress`

### Rework after Verify

If Verify finds the feature does not satisfy acceptance criteria:

`Verify → In Progress`

Create a separate Bug only when the defect is already part of accepted/released behaviour, needs independent tracking, or is materially distinct from the original scope.

### Expedite / P0

Use only for work that justifies interrupting normal flow, for example:

- production outage;
- materially wrong economic calculation in production;
- data corruption;
- critical security incident;
- critical customer-blocking failure.

**Expedite WIP = 1.**

If multiple items are marked P0 at once, re-triage them; P0 must remain exceptional.

## 5. Project fields

Keep metadata minimal.

### Required project fields

- **Status:** Backlog / Todo / In Progress / Review / Verify / Done
- **Priority:** P0 / P1 / P2 / P3
- **Effort:** XS / S / M / L / XL
- **Area:** Field Profitability / Data Collection / Decision Intelligence / Platform
- **Expected Value Impact:** High / Medium / Low / Unknown
- **Iteration:** current delivery cycle
- **Target Release:** release or milestone when relevant

### Priority policy

| Priority | Meaning |
| --- | --- |
| P0 | Critical production/security/data issue that may interrupt normal flow. |
| P1 | Must be done for the current product/release objective. |
| P2 | Important, but can move without breaking the current objective. |
| P3 | Useful option; low current cost of delay. |

If everything is P0/P1, priority has stopped carrying information.

### Effort policy

Use relative size only:

`XS / S / M / L / XL`

An XL item is a signal to reconsider scope and split into smaller vertical slices before entering Todo.

## 6. Issue types

Use four primary work-item types:

- **Feature** — delivers user/product capability.
- **Bug** — repairs incorrect accepted/released behaviour.
- **Experiment** — tests a hypothesis; may finish successfully with a Kill decision.
- **Task** — engineering, documentation, infrastructure, operational or enabling work.

Do not encode frontend/backend/database as issue types. Use the Area/project context and the issue body.

## 7. Definition of Ready for Todo

An item can move from Backlog to Todo only when:

- the problem or purpose is understood;
- the relevant user/context is known;
- desired outcome is clear;
- acceptance criteria are present;
- priority is set;
- critical dependencies are identified;
- no known blocker prevents starting;
- the work is small enough to flow;
- expected value impact is stated;
- required design/data decisions are sufficiently resolved.

Todo is a short committed queue, not a second backlog.

## 8. Entry policies

### Todo → In Progress

Move only when:

- capacity exists under the WIP limit;
- someone is actually starting the work now;
- an assignee is set.

Do not move work to In Progress because someone plans to start it tomorrow.

### In Progress → Review

Move only when:

- implementation is materially complete;
- a PR exists when code changed;
- self-review is complete;
- appropriate tests were added or updated;
- CI is sufficiently green for review;
- no known critical implementation work remains hidden.

### Review → Verify

Move only when:

- required review is complete;
- required changes are resolved;
- code is merged or deployed to the verification environment as appropriate.

### Verify → Done

Move only when the Definition of Done is satisfied.

## 9. Definition of Done

A normal engineering item is Done only when all relevant criteria are satisfied:

- acceptance criteria verified;
- required tests pass;
- code reviewed;
- change merged;
- build/CI is green;
- required migration succeeds;
- deployed to the target environment;
- no known critical regression remains;
- documentation is updated when needed.

**Done does not mean VEV Verified.**

Delivery completion and verified farmer economic value are separate evidence loops.

## 10. Product value and VEV

Before delivery use:

**Expected Value Impact:** High / Medium / Low / Unknown

Do not label expected benefit as Verified Economic Value.

After release, value evidence may progress separately:

~~~text
Released
  ↓
Customer exposed
  ↓
Used
  ↓
Observed outcome
  ↓
Counterfactual/baseline
  ↓
Incremental economic effect
  ↓
Attribution
  ↓
Confidence
  ↓
VEV
~~~

## 11. Recommended GitHub Project views

Create one project dataset and multiple views, not many disconnected boards.

### 01 — Development
Board grouped by Status.

Columns:

`Backlog → Todo → In Progress → Review → Verify → Done`

Apply WIP limits to Todo, In Progress, Review and Verify.

### 02 — Current Iteration
Filter to the current Iteration and exclude Done when focusing on active work.

### 03 — Blocked & Risks
Show open items with dependencies/blockers, P0/P1 priority, failed verification or release risk.

### 04 — Bugs
Show Bug items, sorted P0 → P3.

### 05 — Experiments
Show Experiment items, including hypothesis and decision outcome.

### 06 — Roadmap
Roadmap layout using Iteration/Target Release/date fields.

### 07 — My Work
Filter:

`assignee:@me status:!Done`

### 08 — Release
Filter to the active Target Release and group by Status or Area.

## 12. Cadence

### Daily Flow Check — about 10 minutes

Review the board from right to left:

1. What can reach Done?
2. What is stuck in Verify?
3. What is waiting in Review?
4. What In Progress item is aging or blocked?
5. Only then: what should be pulled from Todo?

This is a work-flow conversation, not a person-by-person status recital.

### Weekly Replenishment — 30–45 minutes

Move only enough well-shaped work from Backlog to Todo to maintain a short ready queue.

Questions:

- Is the problem still important?
- Is evidence sufficient?
- What is the cost of delay?
- Is there a simpler solution?
- What should be removed or deferred?

### Flow/Product Review — every 1–2 weeks

Review:

- shipped outcomes;
- blockers;
- aging work;
- production defects;
- cycle time;
- throughput;
- WIP;
- customer feedback;
- expected vs observed outcomes.

## 13. Core metrics

Start with:

- **WIP**
- **Cycle Time:** In Progress → Done
- **Throughput:** completed work items per period
- **Work Item Age:** age of unfinished started work
- **Deployment Frequency**
- **Change Fail Rate**

Do not use issue counts per developer as a productivity ranking.

After enough data exists, add percentile-based SLEs and deeper flow analytics only if they improve decisions.

## 14. Work-item sizing

Prefer small vertical slices that deliver testable end-to-end behaviour.

Good:

- user can see contribution margin for one field;
- user can enter one cost category;
- system handles missing cost values explicitly.

Avoid layer-only batches that defer usable value for weeks:

- build all database tables;
- build all APIs;
- build all frontend;
- test everything later.

## 15. Experiments

An Experiment must state:

- hypothesis;
- baseline;
- target metric;
- guardrails;
- smallest valuable test;
- evidence source;
- decision rule: Kill / Improve / Scale.

An experiment can be **Done** even when the hypothesis fails. A disproved hypothesis can be valuable learning.

## 16. Backlog hygiene

Backlog items are options, not promises.

Every 2–4 weeks:

- keep;
- merge;
- rewrite;
- defer;
- close as not planned.

Do not maintain a detailed cemetery of low-evidence ideas.

## 17. Branch and PR convention

Preferred branch patterns:

- `feat/<issue>-short-description`
- `fix/<issue>-short-description`
- `exp/<issue>-short-description`
- `chore/<issue>-short-description`

When practical, reference the issue in the PR body with:

`Closes #123`

Keep PRs small enough to review quickly and safely.

## 18. When to reconsider GitHub Projects

Re-evaluate the tool only when real coordination pain appears, for example:

- multiple autonomous engineering teams;
- persistent cross-team dependency problems;
- portfolio planning materially exceeds GitHub capabilities;
- project reporting requires significant manual maintenance;
- multi-repository automation becomes costly;
- planning/admin overhead becomes a measurable bottleneck.

Do not migrate tools to solve a process problem that WIP, scope control, review discipline or better issue shaping would solve.

## 19. Operating principle

**Create Value. Prove It. Scale It.**

For delivery:

**Shape clearly → Commit narrowly → Pull → Finish → Verify → Release → Measure.**
