# Design Token Contract

## Purpose

Tokens provide stable semantic language between design and code.

The repository defines the naming contract. Final visual values are added only after brand decisions are approved and contrast is verified.

## Model

~~~text
Primitive
   ↓
Semantic
   ↓
Component
~~~

### Primitive examples

~~~text
color.green.600
color.gray.900
space.4
radius.md
font.size.sm
~~~

Primitive names describe raw scales and should rarely appear directly in product components.

### Semantic examples

~~~text
color.background.default
color.background.surface
color.text.primary
color.text.secondary
color.border.default
color.action.primary
color.status.success
color.status.warning
color.status.critical
~~~

### PROFIT semantic namespaces

~~~text
color.economic.positive
color.economic.negative
color.economic.neutral

color.data.observed
color.data.imported
color.data.calculated
color.data.estimated
color.data.modelled
color.data.predicted
color.data.missing
color.data.stale

color.confidence.high
color.confidence.medium
color.confidence.low

color.vev.hypothetical
color.vev.modelled
color.vev.observed
color.vev.attributed
color.vev.verified
~~~

These names define meaning, not final colors.

## Rules

1. Components consume semantic tokens whenever possible.
2. Economic meaning may not depend on color alone.
3. Data-confidence states require text/icon semantics in addition to color.
4. Do not add one-off values when an existing scale can express the design.
5. Do not create a token because one mockup happens to need it.
6. Token changes must be reviewed for cross-product impact.
7. When machine-readable tokens are introduced, prefer DTCG-compatible structure.
8. Keep Figma Variables and code token names aligned.
9. Production token files become authoritative once application code exists.

## Planned implementation

When the web application starts, prefer:

~~~text
packages/
  design-tokens/
    primitive.*
    semantic.*
    profit.*
~~~

Expose stable CSS custom properties for Tailwind/React consumption.

Do **not** create fake production token values before brand and accessibility decisions are resolved.
