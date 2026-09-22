# PROFIT

## FarmOps Profit Command Center

### Production • Revenue • Operations • Finance • Intelligence • Trade

**Turn farm decisions into verified profit.**

PROFIT is a farm profitability and commercial decision platform. It connects production, agronomy, finance, operations, procurement, sales, and trade to answer a practical question:

> **Which decision will improve the farmer's bottom line the most — and did it actually deliver the expected margin?**

The product is deliberately not another physical farm-control system. Its core loop is:

```text
Buy → Produce → Sell → Verify Margin → Improve
```

## Target architecture

PROFIT will start as a **modular monolith** for the transactional product layer, with a separate **Python intelligence worker** for agronomy, modelling, statistics, and machine learning.

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

The detailed technology decision, boundaries, rationale, and phased adoption rules live in **[docs/technology-stack.md](docs/technology-stack.md)**.

## Engineering principles

- Prefer clear domain boundaries over premature microservices.
- Use asynchronous processing where failure isolation or long-running work justifies it.
- Keep financial and agronomic calculations deterministic, testable, and auditable.
- Treat AI as an interface to verified domain logic, not as the source of financial truth.
- Design event consumers for retries, idempotency, dead-letter handling, and observability.
- Add infrastructure only when the product or measured system behaviour justifies it.

## Status

Early architecture and product-design phase. The target stack is documented before implementation so future development can stay consistent and avoid unnecessary technology churn.
