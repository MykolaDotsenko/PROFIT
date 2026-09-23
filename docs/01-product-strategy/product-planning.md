# Product Planning

Use this document before committing major product work.

## 1. Product Discovery

### Identify the Problem
Start from a real farmer problem in `../02-farmer-problems/`.

### Understand the User
Identify user role, farm type, workflow, current workaround and buying influence.

### Measure the Problem
Estimate:
- frequency;
- economic impact;
- time impact;
- operational risk;
- number of affected users or farms.

### Collect Evidence
Use interviews, observation, operating experience, user feedback, data and market research.

### Define the Desired Outcome
Describe what should improve for the farmer.

### Explore Solutions
Compare multiple possible solutions before selecting one.

### Test Risky Assumptions
Validate value, usability, feasibility and data availability before large engineering investment.

### Define MVP
Select the smallest reliable workflow that can create and measure real value.

### Write Requirements
Only after the problem, user, outcome and MVP are sufficiently understood.

## 2. Problem Prioritization

Detailed farmer problems live in `../02-farmer-problems/`.

| Problem | Segment | Frequency | Economic Impact | Urgency | Evidence | PROFIT Fit | Priority |
|---|---|---:|---:|---:|---:|---:|---:|
| Example | Field crops |  |  |  |  |  |  |

Evidence levels:
- **Hypothesis** — plausible but not directly observed.
- **Observed** — seen in real work or user feedback.
- **Repeated** — confirmed by several independent farmers or sources.
- **Validated** — strong evidence that the problem is frequent, important and worth solving.

High-impact, frequent, validated problems should normally be considered before low-evidence feature ideas.

## 3. Business Case

Use this for large modules or major investments.

### Opportunity
Which farmer/business problem creates the opportunity?

### Target Segment
Who benefits and who pays?

### Expected Customer Value
Estimate savings, revenue improvement, risk reduction or productivity impact.

### Expected PROFIT Value
Potential effects on:
- acquisition;
- conversion;
- retention;
- expansion;
- pricing power;
- differentiation.

### Cost
Estimate:
- product/design effort;
- engineering effort;
- data/integration cost;
- infrastructure cost;
- support/operations cost.

### Alternatives
What could we do instead, including doing nothing?

### Decision
Proceed / research more / defer / reject.

## 4. Assumptions and Risks

| Assumption / Risk | Evidence | Impact if Wrong | How to Test / Mitigate | Status |
|---|---|---|---|---|

Consider:
- product assumptions;
- willingness to pay;
- buyer authority;
- data availability and quality;
- integration dependency;
- technical complexity;
- adoption friction;
- onboarding cost;
- support burden.

High-impact assumptions with weak evidence should be tested before large engineering investment.

## 5. Ready-for-Implementation Checklist

### Problem
- [ ] Real farmer problem is documented.
- [ ] Target segment is clear.
- [ ] Evidence level is known.
- [ ] Frequency and economic impact are understood.

### Customer and Value
- [ ] Target user is defined.
- [ ] Buyer and user are identified.
- [ ] Relevant JTBD is documented.
- [ ] Expected farmer outcome is measurable.
- [ ] Current alternative/workaround is understood.

### Scope and Priority
- [ ] MVP objective is defined.
- [ ] Must-have scope is defined.
- [ ] Out-of-scope items are explicit.
- [ ] Priority reasoning is documented.
- [ ] Effort and risk are considered.

### Delivery and Measurement
- [ ] Roadmap placement is clear.
- [ ] Requirements/specification exists or is planned.
- [ ] Owner is defined.
- [ ] Success KPI is defined.
- [ ] Data source for measurement is known.

If several boxes remain unchecked, the work is not ready for implementation.
