# PROFIT Technology Stack

**Status:** Accepted target architecture  
**Last reviewed:** 2026-09-22  
**Applies to:** PROFIT — FarmOps Profit Command Center

## 1. Decision

PROFIT will use a **TypeScript-first product stack** with a **Python intelligence layer** and an **AWS event-driven backbone**.

The central split is intentional:

- **TypeScript / Node.js** owns transactional product behaviour: procurement, sales, trade, finance workflows, approvals, integrations, opportunities, and user-facing APIs.
- **Python** owns agronomy, modelling, statistics, optimisation, machine learning, and farm-specific calibration.
- **PostgreSQL/PostGIS** is the system of record.
- **SNS/SQS** connects asynchronous workflows and intelligence jobs.
- **AWS + Terraform + CI/CD + observability** are first-class engineering concerns, not deployment afterthoughts.

We will **not** begin with a microservice estate. The first production shape is a modular monolith plus specialised asynchronous workers.

---

## 2. Why this architecture fits PROFIT

PROFIT is both a transactional business application and an agricultural intelligence product.

The transactional side includes:

- supplier management;
- RFQs and quotes;
- purchase orders;
- deliveries and invoices;
- buyers and offers;
- contracts and sales;
- approvals and operational actions;
- opportunity tracking;
- expected vs actual margin;
- integrations and audit trails.

The intelligence side includes:

- paddock economics;
- input-response analysis;
- fertiliser ROI;
- production-response modelling;
- opportunity scoring;
- anomaly detection;
- uncertainty and confidence estimates;
- farm-specific model calibration.

Using one runtime for every concern would optimise for simplicity at the expense of fit. Using many services from day one would optimise for technology count at the expense of reliability and development speed. The chosen split keeps both sides natural while maintaining a small operational surface.

---

## 3. High-level architecture

```text
                   PROFIT WEB
                      │
            Next.js / React / TS
                      │
                      ▼
                NESTJS API
              TypeScript / Node
                      │
               Modular Monolith
                      │
       ┌──────────────┼──────────────┐
       │              │              │
     Buy            Sell           Profit
       │              │              │
       ├──── Production / Trade ─────┤
       │              │              │
       └──────────────┼──────────────┘
                      │
              PostgreSQL / PostGIS
                      │
              Transactional Outbox
                      │
                     SNS
                 ┌────┴────┐
                 │         │
                SQS       SQS
                 │         │
                 ▼         ▼
        Python Intelligence   Other workers
                 │
       Agronomy / ML / Stats
                 │
                 ▼
          Opportunity result
                 │
                 ▼
              PostgreSQL
```

The application can evolve into separate services only after domain boundaries, scaling needs, reliability needs, or deployment independence justify extraction.

---

## 4. Web application

### Planned technologies

- **TypeScript**
- **React**
- **Next.js**
- **TanStack Query**
- **Zod**
- **Tailwind CSS**
- **shadcn/ui**
- **Radix / equivalent accessible primitives where used by the chosen component implementation**
- **Storybook**
- **ECharts**
- **MapLibre**

### Responsibilities

The web application will host:

- Profit Command Center;
- Opportunity Queue;
- Production Economics;
- Buy / procurement workflows;
- Sell / trade workflows;
- supplier and buyer comparisons;
- margin and ROI views;
- expected-vs-actual performance;
- paddock/economic maps;
- AI-assisted explanations.

### Why

React + TypeScript gives a strongly typed product surface and lets us share contracts and generated API types with the backend. Next.js provides a mature application framework without requiring a separate frontend platform.

MapLibre is used for farm and paddock visualisation. The goal is **economic and agronomic mapping**, not physical-farm-control functionality.

### Product design system

PROFIT uses a production-oriented design-system contract documented in **[../product/design-system/README.md](../product/design-system/README.md)**.

- Figma owns UX/design intent.
- Semantic token names are defined as a shared design/code contract.
- shadcn/ui and accessible primitives provide commodity interaction building blocks.
- PROFIT-specific components concentrate on economic, confidence, evidence and decision workflows.
- Storybook becomes the catalogue of reusable production component states once the web application exists.
- Production React behaviour is authoritative for what actually ships.
- Final token values must not be invented before branding/accessibility decisions are approved.

---

## 5. Core backend

### Planned technologies

- **Node.js**
- **TypeScript**
- **NestJS**
- **Fastify adapter**
- **Prisma**
- explicit **SQL** for queries where SQL/PostGIS is the clearer tool

### Architecture style

Start with a **modular monolith**.

Initial bounded modules:

```text
identity
farm
production
procurement
sales
trade
finance
opportunity
execution
performance
integration
```

Modules must communicate through explicit application/domain interfaces rather than importing internal implementation details across boundaries.

### Why Node.js / TypeScript

Most of PROFIT's core application is transactional and integration-heavy:

- request/response APIs;
- workflows;
- webhooks;
- approvals;
- external integrations;
- event production and consumption;
- notifications;
- commercial state machines.

Node.js is a strong fit for this workload, while TypeScript gives consistent types across the web and application layers.

### Why NestJS

NestJS provides useful structure for a domain-heavy B2B application:

- dependency injection;
- modules;
- guards;
- interceptors;
- validation;
- testing support;
- transport abstraction.

We will use the structure without turning framework modules into artificial microservices.

---

## 6. Database and geospatial data

### Planned technologies

- **PostgreSQL**
- **PostGIS**
- **Prisma**
- SQL migrations and explicit SQL where required

### PostgreSQL is the system of record for

- farms;
- paddocks;
- suppliers;
- buyers;
- RFQs;
- quotes;
- purchase orders;
- deliveries;
- sales;
- contracts;
- financial facts;
- opportunities;
- decisions;
- actions;
- observed outcomes;
- ROI results;
- model-calibration metadata.

### PostGIS is used for

- farm boundaries;
- paddock polygons;
- soil-sample locations;
- spatial agronomic facts;
- paddock profitability maps.

ORM convenience must not hide relational design or SQL competence. Complex analytical or PostGIS operations should use explicit SQL when that is clearer, safer, or more performant.

---

## 7. Event-driven processing

### Planned technologies

- **AWS SNS**
- **AWS SQS**
- transactional outbox
- dead-letter queues

Representative domain events:

```text
PurchaseNeedCreated
RFQCreated
QuoteReceived
SupplierSelected
PurchaseCompleted
InputApplied
BuyerOfferReceived
SaleCompleted
OpportunityDetected
OpportunityApproved
ActionCompleted
OutcomeRecorded
ROIVerified
ModelCalibrationUpdated
```

### Reliability requirements

Every asynchronous consumer must be designed for:

- at-least-once delivery;
- idempotency;
- retries with backoff;
- duplicate events;
- poison messages;
- dead-letter queues;
- correlation IDs;
- traceability;
- replay where safe.

Publishing business events should use a **transactional outbox** rather than assuming a database write and broker publish are one atomic action.

---

## 8. Python intelligence layer

### Planned technologies

- **Python**
- **Pydantic**
- **Polars**
- **NumPy**
- **SciPy**
- **scikit-learn**
- **PyMC** only if Bayesian modelling becomes justified

### Responsibilities

Python owns workloads such as:

- fertiliser-response models;
- pasture/input economics;
- production-response calculations;
- uncertainty modelling;
- opportunity scoring;
- anomaly detection;
- forecasting;
- farm-specific calibration;
- model evaluation.

### Runtime model

At the beginning, Python is a **worker**, not a second general-purpose REST backend.

Example:

```text
AgronomyAnalysisRequested
        ↓
       SQS
        ↓
 Python intelligence worker
        ↓
AgronomyAnalysisCompleted
        ↓
 Opportunity / performance update
```

We will add FastAPI only if a genuine synchronous Python API use case appears.

---

## 9. Profit and accounting calculations

Financial truth must remain deterministic and auditable.

Rules:

- use decimal-safe money types, never binary floating point for money;
- version calculation logic where historical reproducibility matters;
- persist material assumptions used by an opportunity;
- retain expected and actual values separately;
- make calculations independently testable;
- keep an audit trail from source facts to reported margin/ROI.

Representative calculations include:

- landed cost;
- net farm-gate value;
- cost attribution;
- contribution margin;
- break-even;
- opportunity cost;
- expected ROI;
- actual ROI;
- variance;
- working-capital impact.

---

## 10. Cloud platform

### AWS services planned for the core system

- **ECS Fargate** — application and worker containers
- **RDS PostgreSQL** — operational database
- **S3** — imports, exports, historical datasets and analytical storage
- **SNS** — event fan-out
- **SQS** — durable asynchronous queues
- **ECR** — container registry
- **CloudWatch** — logs, metrics, alarms
- **Secrets Manager** — application secrets
- **IAM** — least-privilege access

We deliberately avoid Kubernetes/EKS initially. ECS Fargate gives enough production realism while keeping the operational burden appropriate for the project.

---

## 11. Infrastructure and delivery

### Planned technologies

- **Terraform**
- **Docker**
- **Docker Compose**
- **GitHub Actions**

Infrastructure is provisioned through Terraform rather than manual console configuration.

Expected CI/CD flow:

```text
pull request
    ↓
lint
    ↓
type checks
    ↓
unit tests
    ↓
integration tests
    ↓
build
    ↓
container scan
    ↓
Docker image
    ↓
Terraform plan
    ↓
deploy
    ↓
smoke tests
```

Production changes must be reproducible from source control.

---

## 12. Observability

### Planned technologies

- **OpenTelemetry**
- **CloudWatch**
- **Sentry**

We will treat observability as part of the architecture from the beginning.

Required signals:

- structured logs;
- request metrics;
- queue depth and age;
- DLQ count;
- event-processing latency;
- failed jobs;
- distributed traces;
- database performance;
- business metrics such as opportunity-processing success and ROI-verification failures.

Logs should include correlation/trace IDs across asynchronous boundaries.

---

## 13. Testing

### Web

- **Vitest**
- **React Testing Library**
- **Playwright**

### Node backend

- **Jest**
- **Supertest**
- **Testcontainers** where useful

### Python

- **pytest**
- **Hypothesis**

### Testing priorities

High-risk domain logic receives the strongest tests:

- money;
- margin;
- landed cost;
- ROI;
- allocation;
- event idempotency;
- opportunity ranking;
- agronomic calculations.

Property-based tests are particularly valuable for financial and agronomic invariants.

Example invariants:

- increasing purchase price cannot reduce landed cost if all other inputs remain unchanged;
- processing the same immutable outcome event twice cannot double-count actual ROI;
- allocated costs must reconcile to the source cost within defined rounding rules.

---

## 14. AI layer

AI is an **interface to verified domain intelligence**, not the calculator.

```text
Farmer
  ↓
AI Copilot
  ↓
tool calls
  ↓
PROFIT domain services
  ↓
deterministic / modelled result
  ↓
explanation
```

Appropriate AI responsibilities:

- explain an opportunity;
- summarise profitability drivers;
- compare supplier/buyer options from verified data;
- explain expected-vs-actual variance;
- answer “why?” questions;
- guide the user to the relevant workflow.

AI must not invent or independently calculate authoritative financial figures when a deterministic domain service should own the result.

---

## 15. Analytics platform — Phase 2

Add when enough historical data exists to justify an analytical layer:

- **S3**
- **Athena**
- **dbt**

Representative marts:

```text
mart_paddock_profitability
mart_supplier_performance
mart_buyer_margin
mart_input_roi
mart_opportunity_accuracy
mart_forecast_vs_actual
```

This layer should not replace PostgreSQL as the transactional source of truth.

---

## 16. React Native — Phase 2

A farmer-facing companion application is strategically valuable after the core web workflow is stable.

Planned use cases:

- Today's Opportunities;
- approve/reject decisions;
- compare offers;
- record farm action completion;
- attach photos;
- receive notifications;
- capture data offline;
- synchronise when connectivity returns.

Offline-first behaviour must be designed intentionally rather than added as a cache afterthought.

---

## 17. Kinesis and Go — Phase 3, only when justified

We explicitly **do not** add Kinesis or Go to the first implementation just to increase technology count.

### Kinesis becomes justified if

- telemetry/event volume is high enough that stream semantics are useful;
- ordering/windowed processing is needed;
- the product includes a credible high-volume farm-event simulation.

### Go becomes justified if

profiling shows a high-throughput or resource-sensitive path that benefits materially from extraction, for example:

```text
telemetry ingestion
        ↓
Go service
        ↓
Kinesis
        ↓
downstream processors
```

Any extraction must be supported by measured requirements or a clear operational boundary.

---

## 18. Technologies deliberately excluded from the initial stack

Do not introduce these without a concrete requirement:

- Kubernetes / EKS;
- Kafka;
- MongoDB;
- Elasticsearch/OpenSearch;
- GraphQL;
- Spark;
- many independently deployed microservices;
- Go as a third backend runtime before a measured need exists;
- FastAPI as a second synchronous API before a Python API use case exists.

The project should demonstrate architectural judgement, not technology accumulation.

---

## 19. Target repository shape

As implementation begins, prefer a structure similar to:

```text
/
├── apps/
│   ├── web/
│   └── api/
├── workers/
│   └── intelligence/
├── packages/
│   ├── contracts/
│   ├── domain-types/
│   ├── design-tokens/     # when brand/token values are approved
│   ├── ui/                # shared production components when justified
│   └── config/
├── infrastructure/
│   └── terraform/
├── docs/
│   └── technology-stack.md
└── README.md
```

The exact layout may evolve, but boundaries between product application code, intelligence workloads, shared contracts, and infrastructure should remain explicit.

---

## 20. Final stack summary

### Core — adopt from the beginning

```text
React
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Storybook

Node.js
NestJS
Fastify

PostgreSQL
PostGIS
Prisma

Python
Pydantic
Polars
NumPy
SciPy
scikit-learn

AWS ECS Fargate
RDS
S3
SNS
SQS
ECR
CloudWatch
Secrets Manager
IAM

Terraform
Docker
GitHub Actions

OpenTelemetry
Sentry
```

### Add later when justified

```text
React Native
Athena
dbt
PyMC
Kinesis
Go
```

## Guiding rule

> **Choose technology because it makes PROFIT more correct, reliable, observable, or useful — not because adding another technology makes the architecture diagram look more impressive.**
