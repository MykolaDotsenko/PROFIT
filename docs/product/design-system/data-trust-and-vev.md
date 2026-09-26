# Data Trust and VEV UX

## Principle

PROFIT must make the epistemic status of important data visible.

A user must not need to guess whether a number is measured, entered, calculated, estimated or predicted.

## Data states

- **Observed** — directly measured/recorded outcome.
- **Imported** — received from an external source; provenance remains available.
- **User entered** — manually supplied by a user.
- **Calculated** — deterministic result from known inputs/rules.
- **Estimated** — approximation from incomplete/indirect inputs.
- **Modelled** — output from a statistical/agronomic/economic model.
- **Predicted** — future-oriented estimate/model output.
- **Missing** — required/relevant data unavailable.
- **Stale** — data may no longer represent current conditions.
- **Unverified** — provenance/quality has not been sufficiently checked.

Do not collapse these into one generic “AI” status.

## Confidence

Use confidence only when it has a defined interpretation.

Initial UX vocabulary:

- High
- Medium
- Low

Avoid fake precision such as “83% confidence” unless the method genuinely produces a calibrated probability with documented meaning.

## Economic values

A material economic number should expose enough context to avoid false certainty:

~~~text
€842 / ha
Observed
High confidence
2026 season
~~~

or:

~~~text
€790–910 / ha
Estimated
Medium confidence
~~~

Prefer ranges when a point estimate would mislead.

## VEV evidence states

- **Hypothetical** — concept-level value proposition.
- **Modelled** — projected from assumptions/models.
- **Observed** — outcome occurred after use/intervention; attribution not established.
- **Attributed** — evidence supports an incremental effect attributable to PROFIT with stated confidence.
- **Verified** — satisfies the PROFIT VEV Standard and required evidence threshold.

The exact Verified threshold must come from the formal PROFIT VEV Standard when defined; this document does not invent it.

## Presentation rules

1. Never style Modelled/Estimated as if it were Observed.
2. Show material assumptions on demand.
3. Preserve source/provenance for important inputs.
4. Show freshness where it can change the decision.
5. Separate expected value from actual outcome.
6. Separate actual outcome from attributed incremental effect.
7. Do not imply causal attribution from simple before/after comparison.
8. Use text/iconography in addition to color.
9. If uncertainty is too high, say so rather than fabricating a narrow range.

## Progressive disclosure

### Farmer

What happened → why it matters → economic implication → next action → confidence.

### Manager

Costs → operations → benchmarks → scenarios → variance.

### Expert

Source data → assumptions → methodology/model → confidence basis → audit trail.
