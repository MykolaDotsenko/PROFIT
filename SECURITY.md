# Security Policy

PROFIT treats security, privacy, data integrity and farmer trust as product requirements.

## Reporting a vulnerability

Do **not** open a public GitHub issue for a suspected vulnerability that could expose:

- credentials or secrets;
- personal or customer data;
- authorization weaknesses;
- financial or agronomic data integrity issues;
- infrastructure access;
- exploitable production behaviour.

Until a private security-reporting channel is configured for the repository, contact the repository owner privately through an existing trusted channel and include:

- affected component;
- reproduction steps;
- expected vs actual behaviour;
- potential impact;
- supporting evidence;
- whether exploitation is currently possible.

Do not include live secrets or unnecessary personal data in reports.

## Response priorities

Security issues are prioritized by potential harm, exploitability, blast radius and reversibility.

Critical incidents may use the PROFIT Expedite path with WIP limit 1.

## Engineering expectations

Material changes should consider:

- least privilege;
- authorization boundaries;
- secret handling;
- input validation;
- auditability;
- data minimization;
- migration safety;
- rollback/containment;
- dependency risk;
- logging without leaking sensitive data.

Security controls will be strengthened as executable product code, infrastructure and production environments are introduced.
