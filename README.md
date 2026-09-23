# PROFIT

**[UNIQUE  BRAND] (**Agrelio, AgroMargin, MarginLoop, FarmROI, AGCONOMY, ACREZA, TILWARD, RURENA, PROFIT)  

### **From farm data to profitable action.**

**Powered by the PROFIT Framework™**

**P — Production**

Optimize what you produce.

**R — Revenue**

Understand what you earn.

**O — Operations**

Run the farm efficiently.

**F — Finance**

Know the true economics.

**I — Intelligence**

Turn data into better decisions.

**T — Trade**

Buy and sell at the right time.

**Farm Data → PROFIT Framework → Intelligence → Action → Verified Profit**

## Product Logic

```text
Farm Data
    ↓
PROFIT Framework
    ↓
Intelligence
    ↓
Action
    ↓
Verified Profit
```

The system should help answer practical questions such as:

- What is actually profitable?
- Where are costs increasing?
- Which field, crop, herd, activity or customer produces the best margin?
- What decision should be taken next?
- What was the expected economic result?
- What actually happened after the decision?
- Did the action create verified profit?

## Target Architecture

PROFIT will start as a **modular monolith** for the transactional product layer, with a separate **Python intelligence worker** for agronomy, modelling, statistics and machine learning.

| Area | Planned technologies |
| --- | --- |
| Web | Next.js, React, TypeScript, TanStack Query, Tailwind CSS, ECharts, MapLibre, Zod |
| Core backend | Node.js, TypeScript, NestJS, Fastify adapter |
| Persistence | PostgreSQL, PostGIS, Prisma + explicit SQL where appropriate |
| Intelligence | Python, Pydantic, Polars, NumPy, SciPy, scikit-learn |
| Async/eventing | AWS SNS, SQS |
| Cloud | AWS ECS Fargate, RDS, S3, ECR, CloudWatch, Secrets Manager, IAM |
| Infrastructure | Terraform, Docker, GitHub Actions |
| Observability | OpenTelemetry, CloudWatch, Sentry |
| Testing | Jest/Supertest, pytest/Hypothesis, Vitest/Testing Library, Playwright |
| Later, when justified | React Native, Athena, dbt, Kinesis, Go |

The detailed technology decision, boundaries, rationale and phased adoption rules live in **[docs/engineering/technology-stack.md](docs/13-architecture-engineering/technology-stack.md)**.

## Documentation

Product planning and project documentation are organized under **[docs/](docs/README.md)**.

Key areas include:

- product;
- farmer problems;
- crop production;
- livestock;
- farm economics;
- branding;
- engineering;
- market.

## Engineering Principles

- Prefer clear domain boundaries over premature microservices.
- Keep financial and agronomic calculations deterministic, testable and auditable.
- Treat AI as an interface to verified domain logic, not as the source of financial truth.
- Use asynchronous processing where failure isolation or long-running work justifies it.
- Design event consumers for retries, idempotency, dead-letter handling and observability.
- Add infrastructure only when the product or measured system behaviour justifies it.

## Status

Product planning, brand selection and architecture design are in progress.
