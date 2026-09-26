# PROFIT Design System v0.1

**Status:** Accepted foundation  
**Applies to:** all PROFIT product UX/UI work  
**Reference module:** Field Profitability

## Objective

The design system exists to make farmer decisions clearer, safer and faster while reducing design-to-code drift.

~~~text
Farmer problem
    ↓
Evidence
    ↓
Desired outcome
    ↓
UX intent / prototype
    ↓
Validated interaction
    ↓
Production component
    ↓
Farmer use
    ↓
Observed outcome
    ↓
VEV evidence
    ↓
Learn / improve
~~~

The design system is infrastructure for this loop. It is not a separate product and must not delay valuable experiments.

## Source of truth

| Concern | Source of truth |
| --- | --- |
| Farmer problem and evidence | Product/customer research |
| User flow and design intent | Figma |
| Token names and semantics | Repository design-system contract |
| Production component behaviour | React implementation |
| Component states and examples | Storybook once the web app exists |
| Business/economic calculation | Validated domain logic |
| Released behaviour | Production |
| Verified Economic Value | Outcome + attribution evidence |

Figma is **not** the sole source of truth. Production code owns production behaviour.

## Architecture

~~~text
Figma / UX intent
        │
        ▼
Semantic design contract
        │
        ├── tokens
        ├── components
        ├── patterns
        ├── data-trust rules
        └── accessibility rules
        │
        ▼
shadcn/ui + accessible primitives
        │
        ▼
PROFIT React components
        │
        ▼
Storybook
        │
        ▼
Next.js
        │
        ▼
Production
~~~

## v0.1 scope

### Foundations

- semantic color roles;
- typography scale;
- spacing scale;
- radii;
- elevation;
- grid/breakpoints;
- motion rules;
- icon rules.

Final visual values are **not** fixed until the brand is approved.

### Core primitives

Prefer existing proven primitives before custom work:

- Button, Input, Textarea, Select;
- Checkbox, Radio, Switch;
- Badge, Tooltip, Popover;
- Dialog, Sheet, Tabs, Dropdown;
- Command, Table, Calendar/Date Picker;
- Card, Accordion, Breadcrumb, Pagination;
- Skeleton, Toast.

### PROFIT-specific components and patterns

Invest design effort where domain value is created:

- EconomicValue;
- ProfitabilitySummary;
- MarginBridge;
- CostBreakdown;
- DataSource;
- DataFreshness;
- DataConfidence;
- AssumptionIndicator;
- FieldStatus;
- OperationTimeline;
- ScenarioComparison;
- RecommendationCard;
- DecisionCard;
- EvidenceDrawer;
- VEVStatus;
- EconomicImpact.

See [Components and Patterns](components-and-patterns.md).

## Governing principles

1. **Farmer task first.** Visual novelty never outranks task success.
2. **Reuse before creating.** New components need a real repeated need.
3. **Progressive disclosure.** Farmer, manager and expert depth should not be forced into one dense screen.
4. **Uncertainty must be visible.** Estimated/modelled values must never look observed.
5. **Economic meaning is semantic.** Do not encode profit/loss or risk by color alone.
6. **Field context is different.** Mobile/operator workflows optimise for capture, confirmation and action, not desktop analysis.
7. **Accessibility is a design input.** Target WCAG 2.2 AA for product surfaces.
8. **AI is contextual.** Prefer actions such as “Explain this” and “Compare scenarios” over a generic AI box.
9. **No premature system bloat.** Local patterns stay local until reuse justifies promotion.
10. **Measure outcomes.** Shipping a screen is not proof of farmer value.

## Figma

Use two main files initially:

- **PROFIT — Design System**
- **PROFIT — Product**

Do not split by domain until file complexity creates a measurable coordination problem.

See [Figma Structure](figma.md).

## Tokens

Use a three-layer model:

~~~text
Primitive → Semantic → Component
~~~

Semantic names are stable; visual values may change with the brand.

See [Token Contract](tokens.md).

## Data trust and VEV

See [Data Trust and VEV UX](data-trust-and-vev.md).

## Accessibility and field UX

See [Accessibility and Field UX](accessibility-and-field-ux.md).

## Delivery workflow

See [Design-to-Development Workflow](workflow.md).

## Reconsider if

Simplify or change this system if it:

- measurably slows delivery;
- creates unused components;
- requires more maintenance than value;
- prevents rapid farmer experiments;
- diverges persistently from production code.

**Create Value. Prove It. Scale It.**
