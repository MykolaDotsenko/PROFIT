# PROFIT Agent Instructions

Read the relevant authoritative documentation before changing the product.

## Required references

- Development workflow: `docs/engineering/development-operating-system.md`
- Technology decisions: `docs/engineering/technology-stack.md`
- Product UX: `docs/product/ux.md`
- Design system: `docs/product/design-system/README.md`
- Data trust / VEV UX: `docs/product/design-system/data-trust-and-vev.md`

## Product rules

- Start from the farmer problem and desired outcome, not from a UI component.
- Prefer the smallest valuable, reversible implementation.
- Reuse before creating new components.
- Do not create a new shared component when a local feature component is sufficient.
- Never represent economic meaning by color alone.
- Never present estimated/modelled/predicted data as observed.
- Keep expected, observed, attributed and verified value distinct.
- Do not let an LLM become the authoritative calculator for material financial/agronomic outputs.
- Preserve provenance, uncertainty and auditability for important decision inputs/outputs.
- Prefer contextual AI actions over generic AI-first UI.
- Field/mobile UX must account for offline state, sync, touch targets and operator workload when relevant.
- Target WCAG 2.2 AA for production UI.
- Do not invent final brand colors/typography before branding decisions are approved.
- Do not add architecture, libraries or abstractions without a concrete product/reliability need.

## Design-to-code rules

When application code exists:

- prefer shadcn/ui and approved accessible primitives for commodity UI;
- use semantic design tokens rather than arbitrary visual values;
- keep production component behaviour authoritative;
- use Storybook for reusable production states;
- treat Figma as design intent, not runtime truth;
- validate loading, empty, partial, error, stale/offline, permissions, long content and localization where relevant.

## Value rule

Shipping is not proof of value.

**Problem → Evidence → Intervention → Outcome → Attribution → Confidence → VEV**

Do not call value Verified Economic Value until the PROFIT VEV Standard is satisfied.
