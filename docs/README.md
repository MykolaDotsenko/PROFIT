# PROFIT Documentation Hub

This directory is the canonical knowledge base for PROFIT.

The structure deliberately separates:
1. **domain knowledge** — how farms, agronomy, livestock, finance and commercial operations work in reality;
2. **farmer evidence** — observed problems, interviews and first-hand experience;
3. **product specifications** — how PROFIT should solve validated problems;
4. **engineering documentation** — how the system is designed, built, secured and operated;
5. **brand and market knowledge** — how PROFIT is positioned, named and taken to market.

## Documentation map

```text
docs/
├── 00-governance/                  # documentation rules, ownership, templates
├── 01-company-strategy/            # mission, vision, strategy, business model
├── 02-product/                     # product vision, requirements, specs, modules, UX
│   ├── specifications/
│   └── modules/
├── 03-farmer-insights/             # real farmer problems and evidence
│   ├── pain-points/
│   ├── field-experience/
│   └── interviews/
├── 04-crop-production/             # agronomy and crop-production domain knowledge
├── 05-livestock/                   # dairy, pigs, beef, poultry and livestock economics
├── 06-farm-operations/             # labour, machinery, maintenance, inventory, workflows
├── 07-commercial/                  # CRM, procurement, suppliers, sales and trade
│   └── crm/
├── 08-finance-profitability/       # costing, margins, ROI, budgets, risk, profitability
├── 09-data-ai-integrations/        # data sources, integrations, analytics and AI
├── 10-branding-marketing/          # brand, naming, positioning, SEO, GTM
│   ├── naming/
│   └── seo/
├── 11-research-competitive-intelligence/ # competitors, benchmarks, books, market research
├── 12-engineering/                 # architecture, DB, testing, DevOps, observability
├── 13-security-compliance/         # security, privacy, permissions, legal/compliance
├── 14-roadmap-decisions/           # roadmap, prioritisation, ADRs, decision log
├── 15-reference/                   # glossary, formulas, KPIs, canonical definitions
└── _templates/                     # reusable documentation templates
```

## Placement rule

Use this rule when adding a document:

- **What happens on real farms?** → domain folders (04–08).
- **What farmers actually struggle with?** → 03-farmer-insights.
- **What should PROFIT build?** → 02-product.
- **Why did we choose a technical approach?** → 12-engineering or 14-roadmap-decisions.
- **What does the market/competition say?** → 11-research-competitive-intelligence.
- **How do we present and acquire users?** → 10-branding-marketing.
- **What is a canonical KPI/formula/term?** → 15-reference.

## Required metadata

Every substantial document should start with:

```text
Status: Draft | Review | Accepted | Superseded
Owner: <person/team>
Last reviewed: YYYY-MM-DD
Evidence level: First-hand | Interview | Source-backed | Hypothesis
Related product module: <module or N/A>
```

## Evidence hierarchy

Prefer evidence in this order:
1. verified farm/accounting data;
2. repeated first-hand operational experience;
3. structured customer interviews;
4. reputable primary sources and standards;
5. competitor/customer evidence;
6. books/frameworks;
7. hypotheses.

Never present a hypothesis as a validated farmer problem.

## Language

English is the canonical repository language for reusable documentation. First-hand notes may be captured in Ukrainian, Finnish, Danish or another original language when nuance matters, but add an English summary for material decisions.

## Existing architecture document

The current target stack remains in [technology-stack.md](technology-stack.md). Its long-term home is under `12-engineering/`, but it is intentionally not moved in this structural change to avoid breaking existing links.
