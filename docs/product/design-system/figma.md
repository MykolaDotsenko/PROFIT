# Figma Structure

## Initial file model

Use only two main product-design files until scale justifies more.

### PROFIT — Design System

~~~text
00 Start Here
01 Foundations
02 Tokens
03 Core Components
04 PROFIT Components
05 Patterns
06 Data Visualization
07 Maps & Geospatial
08 States & Feedback
09 Accessibility
90 Sandbox
99 Deprecated
~~~

### PROFIT — Product

~~~text
00 Start Here
01 User Flows
02 Field Profitability
03 Field Operations
04 Farm Finance
05 Analytics
06 Livestock
07 Mobile / Field Operator
90 Experiments
99 Archive
~~~

Split domains into separate files only when navigation, performance or ownership becomes a real problem.

## Statuses

Use only:

- **Exploring**
- **Reviewed**
- **Ready for Dev**
- **Implemented**
- **Deprecated**

## Naming

Names should map to production concepts where possible.

Good:

- Button / Secondary / Small
- DataConfidence / Medium
- EconomicValue / Estimated
- DecisionCard / Recommendation

Avoid visual-only names such as `Green Card 2` or `Dashboard Final Final`.

## Ready for Dev

A significant surface may be marked Ready for Dev only when relevant states are resolved:

- default;
- loading;
- empty;
- partial data;
- error;
- offline;
- stale;
- permission denied;
- long text;
- large values;
- desktop/mobile behaviour;
- keyboard/focus behaviour;
- localization implications.

Not every state needs a separate frame, but expected behaviour must be specified.

## Figma vs production

Figma owns design intent, not production truth.

When implementation exposes a better technical or accessibility solution, update the design contract rather than forcing code to mimic an obsolete frame.

MCP/Code Connect may reduce handoff drift where available and economically justified, but they are accelerators rather than required foundations.
