# PROFIT Documentation Hub

This directory is the single source of truth for PROFIT documentation.

## Structure

| Area | Purpose |
|---|---|
| `00-governance` | Documentation rules, glossary, decisions, ownership |
| `01-product-strategy` | Vision, positioning, personas, roadmap, KPIs |
| `02-farmer-research` | Farmer pain points, interviews, field experience, jobs-to-be-done |
| `03-crop-production` | Crop production knowledge, agronomy, crop economics and risks |
| `04-livestock` | Livestock production knowledge and economics |
| `05-farm-economics` | Farm accounting, unit economics, ROI, margins, budgeting |
| `06-profit-framework` | PROFIT framework: Production, Revenue, Operations, Finance, Intelligence, Trade |
| `07-product-modules` | Functional modules such as Field Profitability, CRM, inventory, workforce and risk |
| `08-requirements-specifications` | PRDs, functional/non-functional requirements, use cases, acceptance criteria |
| `09-data-integrations` | Data model, external sources, APIs, imports/exports, data quality |
| `10-ai-intelligence` | AI features, decision support, prompts, evaluation and guardrails |
| `11-ux-design` | UX research, flows, information architecture, design system |
| `12-brand-marketing` | Naming, branding, messaging, content and SEO |
| `13-architecture-engineering` | System architecture, stack, database, frontend/backend, ADRs |
| `14-security-compliance` | Security, privacy, access control and regulatory requirements |
| `15-qa-validation` | Test strategy, test cases, verification and release quality |
| `16-go-to-market-monetization` | Pricing, monetization, sales, onboarding and partnerships |
| `17-competitor-market-research` | Competitors, benchmarks, market research and customer reviews |
| `18-operations-support` | Internal operating processes, support and incident/runbook documentation |
| `99-archive` | Superseded or historical documentation |

## Documentation rules

1. One canonical document per topic; link instead of duplicating.
2. Every important product decision belongs in the decision log or an ADR.
3. Separate facts/evidence from hypotheses and proposals.
4. Requirements should link to the farmer problem and measurable outcome they address.
5. Research should record source, date, geography, farm type and confidence where relevant.
6. Use lowercase kebab-case for directories and file names.
7. Keep active documentation out of `99-archive`.
8. Prefer Markdown so changes can be reviewed in Git.

Existing `technology-stack.md` remains in place for compatibility and can later be consolidated under `13-architecture-engineering` after references are checked.
