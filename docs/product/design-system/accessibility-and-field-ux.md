# Accessibility and Field UX

## Accessibility target

Target **WCAG 2.2 AA** for production product surfaces.

Automated checks are guardrails, not proof of accessibility.

Critical flows require relevant manual checks such as:

- keyboard-only navigation;
- visible focus;
- screen-reader smoke test;
- 200% zoom/reflow;
- touch interaction;
- reduced motion;
- contrast;
- long/localized content.

## Interaction rules

- Do not use color as the only signal.
- Interactive controls require clear focus/hover/pressed/disabled states.
- Errors must identify the problem and recovery action.
- Destructive actions require proportionate confirmation/undo.
- Important charts need accessible text/table alternatives where practical.
- Do not hide essential information only in hover tooltips.

## Touch target policy

For field/mobile workflows, use an internal target of approximately **44–48 CSS px** for primary interactive controls when practical.

This is intentionally generous because farm use can involve gloves, movement, glare and divided attention.

## Desktop and field mode are different contexts

### Office / desktop

Analyse, compare, explore, plan, audit.

### Field / operator

See, capture, record, confirm, correct, act.

Do not shrink a desktop dashboard into a phone layout and call it mobile UX.

## Field UX requirements

When relevant:

- offline-first behaviour is explicit;
- sync state is visible;
- failed sync is recoverable;
- manual input is minimised;
- repeated data is safely prefilled;
- primary actions are obvious;
- undo/correction is fast;
- confirmation is visible;
- sunlight/high-contrast use is considered;
- one-handed interaction is preferred for common tasks;
- operator workload is minimised.

## Density

Data-heavy desktop surfaces may support **comfortable** and **compact** density without changing meaning or core interaction semantics.

## Localization

Design for longer strings, decimal/thousands separators, currency placement, hectares/units, large monetary values and locale-specific dates.
