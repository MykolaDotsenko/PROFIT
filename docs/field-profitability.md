# Field Profitability v1

## Goal
Help a farmer answer one decision-grade question: **What is the operating profitability of this field, based on the revenue and costs allocated to it?**

## Scope
Included: field, crop, season, area, yield, price, itemised variable costs, allocated fixed costs, auditable snapshots, break-even metrics and optional AI explanation.

Excluded from v1: whole-farm P&L, tax, financing, depreciation policy, inventory accounting, GIS, scenario optimisation, external telemetry, ERP integrations and asynchronous event infrastructure.

## Architecture decision
For the first production module, PROFIT uses a deliberately small modular monolith:
- Next.js App Router for UI + server boundary;
- Supabase Auth + PostgreSQL for persistence and RLS;
- deterministic TypeScript domain calculations;
- PostgreSQL RPC as the transactional write boundary;
- Vercel AI Gateway only for explanation, never calculation;
- Vercel deployment/observability.

This supersedes the heavier NestJS/AWS deployment shape **for v1 only**. Service extraction remains possible later, after measured need.

## Economic definitions
- Revenue = area × yield × price.
- Variable costs = sum of costs marked variable.
- Allocated fixed costs = sum of fixed/overhead costs explicitly allocated to the field.
- Operating costs = variable costs + allocated fixed costs.
- Gross margin = revenue − variable costs.
- Operating profit = revenue − operating costs.
- Operating margin % = operating profit / revenue × 100.
- ROI on allocated cost % = operating profit / operating costs × 100.
- Break-even price = operating costs / (area × yield).
- Break-even yield = operating costs / (area × price).

Null is returned when a denominator is zero.

## Financial caveat
"Operating profit" is intentionally used instead of "net profit". Unallocated whole-farm overhead, financing, tax and owner-specific accounting items are excluded unless the farmer allocates them as costs.

## Security
- Every exposed table has RLS.
- Client roles get read-only table grants.
- Writes occur through narrow SECURITY DEFINER RPCs.
- RPC execute is revoked from PUBLIC/anon and granted only to authenticated.
- Each RPC checks auth.uid() and organization membership/role.
- No service-role key is used by the web client.
- AI only receives data already accessible to the authenticated user through RLS.

## Verification gates
1. TypeScript strict typecheck.
2. Unit tests for financial formulas and invariants.
3. Next.js production build.
4. Supabase migration applied to a fresh project.
5. Supabase security + performance advisors clean or consciously accepted.
6. Browser E2E: signup → create farm → save snapshot → reload → explain.
7. Preview deploy verification.
8. Production promotion only after the same preview artifact passes verification.

## Monitoring
Emit structured errors for AI failures. Enable Vercel Web Analytics and Speed Insights when the Vercel project is linked; monitor runtime 5xx, auth failures, RPC errors and AI fallback rate. Add external drains/Sentry only when traffic or operational requirements justify them.
