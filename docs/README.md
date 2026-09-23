# PROFIT Documentation

PROFIT documentation follows a simple principle:

**Farmer problem → production knowledge → economics → product → implementation**

## 1. Farmer Problems

`02-farmer-problems/`

Separated by farm type:

- `pigs/` — pig farming;
- `cows/` — cattle and dairy farming;
- `vegetables/` — vegetable production;
- `field-crops/` — grains, oilseeds and other field crops;
- `general/` — problems common across different farm types.

New PROFIT feature ideas should start from real farmer problems documented here.

## 2. Production

- `03-crop-production/` — crop production;
- `04-livestock/` — livestock production.

This section stores production methods, workflows, risks, KPIs and domain knowledge.

## 3. Farm Economics

- `05-farm-economics/` — costs, margins, ROI, budgets and cash flow;
- `06-profit-framework/` — Production, Revenue, Operations, Finance, Intelligence and Trade.

## 4. PROFIT Product Modules

- `07-product-modules/` — Field Profitability, CRM, inventory, workforce, risk management and trade;
- `08-requirements-specifications/` — requirements, PRDs, user stories and acceptance criteria.

## 5. Data and AI

- `09-data-integrations/` — APIs, weather, satellite, market and other external data sources;
- `10-ai-intelligence/` — AI analytics, recommendations and forecasting.

## 6. UX, Brand and Marketing

- `11-ux-design/` — UX, screens and user flows;
- `12-brand-marketing/` — naming, branding, SEO and marketing.

## 7. Engineering

- `13-architecture-engineering/` — architecture and software development;
- `14-security-compliance/` — security, privacy and access control;
- `15-qa-validation/` — testing and quality validation.

## 8. Business and Market

- `01-product-strategy/` — product strategy and roadmap;
- `16-go-to-market-monetization/` — pricing, monetization and sales;
- `17-competitor-market-research/` — competitors and market research;
- `18-operations-support/` — internal operating processes.

## Supporting Folders

- `00-governance/` — important decisions, terminology and documentation rules;
- `99-archive/` — outdated or superseded materials.

## Simple Rule

When we discover a real farmer problem, document it first in `02-farmer-problems/`.

If PROFIT will solve or reduce that problem, create the related product specification and link it to the appropriate product module.

Do not duplicate the same information across multiple folders. Link to the canonical document instead.
