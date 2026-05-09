# Security Policy

IssueCraft handles local evidence that may contain sensitive project details. Please treat generated drafts as private until reviewed.

## Supported versions

Security fixes target the latest `main` branch until versioned releases begin.

## Reporting a vulnerability

Open a private security advisory on GitHub if available, or contact the maintainer without including live secrets in the report. Include reproduction steps, affected commands, and the smallest safe sample input.

## Data handling expectations

- IssueCraft does not send data over the network.
- Draft generation only reads paths passed on the command line.
- Redaction is best-effort and covered by fixtures, but humans must still review drafts before sharing.
- `gh-preview` must remain a preview; automatic posting requires a separate, explicit design review.

## Secret examples to avoid

Do not include real API keys, private keys, credentials, or customer data in fixtures or issues. Use fake values that exercise redaction behavior instead.
