# Design-to-Development Workflow

## End-to-end flow

~~~text
Farmer problem
      ↓
Desired outcome
      ↓
Evidence
      ↓
User flow
      ↓
Low-fi prototype
      ↓
Farmer validation
      ↓
Existing pattern?
  ↙ yes       no ↘
 reuse      local prototype
                 ↓
           repeated/stable?
             ↙       ↘
            no       yes
          local    candidate component
                      ↓
                 Ready for Dev
                      ↓
                 GitHub issue
                      ↓
               React / shadcn
                      ↓
                  Storybook
                      ↓
                    PR
                      ↓
             automated checks
                      ↓
                 design QA
                      ↓
                production
                      ↓
                farmer use
                      ↓
             observed outcome
                      ↓
                     VEV
                      ↓
                    learn
~~~

## Before design

For material features establish problem, target user/context, desired outcome, evidence, expected value, smallest useful scope, success metric and guardrails.

Do not start with a polished screen if the problem is unclear.

## Exploration

Use low-fidelity flows before high-fidelity work when visual polish would not improve learning.

AI/v0/Figma Make may generate alternatives, but generated polish is not evidence that UX is correct.

## Ready for Dev

Relevant design decisions cover:

- primary flow;
- interaction behaviour;
- loading;
- empty;
- partial data;
- error/recovery;
- stale/offline when applicable;
- permissions when applicable;
- responsive behaviour;
- keyboard/focus;
- localization;
- data uncertainty;
- analytics/measurement when relevant.

## Implementation

When the web app exists:

1. reuse the existing production component;
2. use a proven primitive where possible;
3. create a local feature component when reuse is not yet justified;
4. promote only stable/repeated patterns;
5. document reusable states in Storybook.

Storybook becomes the production-state catalogue. Figma remains the design-intent layer.

## PR verification

Verify relevant items:

- component/pattern reuse;
- semantic tokens;
- responsive behaviour;
- loading/empty/error states;
- keyboard navigation and focus;
- accessible naming/semantics;
- long/localized text;
- representative data shapes;
- estimated/modelled/observed states;
- visual regression when available.

## Definition of Done

A UI feature is not Done merely because it resembles Figma.

Relevant conditions include verified acceptance criteria, approved patterns or documented exception, accessibility checks, representative data states, reconciled design intent/production behaviour, required measurement, and updated reusable documentation/Storybook.

Delivery completion does **not** mean VEV Verified.

## First reference module

Field Profitability is the first module used to pressure-test this system. Only abstractions that survive real Field Profitability workflows should be promoted early.
