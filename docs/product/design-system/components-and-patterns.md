# Components and Patterns

## Strategy

PROFIT should not build commodity UI controls from scratch.

Use shadcn/ui and accessible underlying primitives for common interaction behaviour, then apply PROFIT tokens and domain patterns.

~~~text
proven primitive
      +
PROFIT semantics
      +
domain behaviour
      =
PROFIT component
~~~

## Core primitives

Initial candidates:

Button, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Tooltip, Popover, Dialog, Sheet, Tabs, Dropdown, Command, Table, Calendar/Date Picker, Card, Accordion, Breadcrumb, Pagination, Skeleton and Toast.

Do not fork or redesign these without a user, accessibility or product reason.

## PROFIT components

### EconomicValue

Displays a monetary/economic value with value/unit, evidence state, optional range/confidence and period/scope when ambiguity exists.

### ProfitabilitySummary

Summarises revenue, costs, margin and ROI while allowing drill-down.

### MarginBridge

Explains movement from revenue to contribution/net margin through material cost drivers.

### DataSource / DataFreshness / DataConfidence

Expose provenance, freshness and uncertainty where they can affect a decision.

### ScenarioComparison

Compares baseline and alternative assumptions/outcomes.

### DecisionCard

The central Decision Intelligence pattern.

A DecisionCard should answer, when available:

1. What changed or needs attention?
2. Why does it matter?
3. What action/alternative is being considered?
4. What is the expected economic effect?
5. What evidence supports it?
6. What is uncertain?
7. What can the user do next?

~~~text
FIELD 14

Nitrogen application may be economically excessive

Current
186 kg N/ha

Alternative
165 kg N/ha

MODELLED ECONOMIC EFFECT
+€24–39 / ha

Confidence
Medium

Evidence
✓ operations
✓ input prices
✓ yield history
⚠ soil nitrogen uncertain

[Compare scenarios] [Why?] [Show evidence]
~~~

### EvidenceDrawer

Provides source data, assumptions, calculation/model reference and freshness without cluttering the default farmer view.

### VEVStatus

Represents the VEV evidence stage defined in [Data Trust and VEV UX](data-trust-and-vev.md).

## Promotion rule

~~~text
Need identified
      ↓
Can existing pattern solve it?
   ↙ yes          no ↘
 reuse          local prototype
                    ↓
              repeated / stable?
                ↙        ↘
               no        yes
             local      candidate component
~~~

Repeated use across 2–3 real flows is a signal to evaluate promotion, not an automatic rule.

## Avoid

- duplicate buttons/cards with cosmetic naming;
- variants for one screen only;
- domain logic hidden inside generic components;
- giant universal components with dozens of props;
- visual-only component names;
- AI-generated components bypassing design-system review.
