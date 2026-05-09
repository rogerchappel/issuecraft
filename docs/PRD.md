# IssueCraft PRD

Status: in-progress

## One-liner

Offline GitHub issue draft builder.

## Summary

A local-first CLI that turns failing test logs, TODO blocks, and repo metadata into clean issue draft files without posting anything by default.

## Problem

Agents and developers often find problems while deep in local work, then either forget them or create noisy half-baked issues. Drafting should be deterministic, private, and reviewable first.

## Target users

OSS maintainers, solo developers, QA agents, release managers.

## V1 scope

- Collect evidence from logs, test output, git status, and selected files
- Generate Markdown issue drafts with labels, reproduction steps, expected/actual behavior, and source citations
- Group duplicate findings by fingerprint
- Optional gh command preview for creating reviewed issues
- Never posts externally unless explicitly requested

## CLI shape

```bash
issuecraft draft --log test-output.log --template bug
issuecraft scan-todos src docs --output issues/
issuecraft gh-preview issues/bug-001.md
```

## Non-goals

- No SaaS backend.
- No hidden telemetry.
- No external posting or mutation by default.
- No secret collection beyond explicit, redacted local inputs.

## Differentiation

Unlike direct GitHub bots, IssueCraft defaults to offline drafts and makes evidence provenance explicit.

## Safety and privacy

- Local-first by default.
- Explicit opt-in for any external command preview/execution.
- Fixture-backed tests for parsing, reporting, and redaction behavior.
- Clear failure modes and deterministic output suitable for CI.

## Acceptance criteria

- TypeScript CLI scaffolded with StackForge under `/Users/roger/Developer/my-opensource/issuecraft`.
- `docs/PRD.md`, `docs/TASKS.md`, `docs/ORCHESTRATION.md`, and `docs/orchestration.json` exist.
- Functional MVP with fixtures and tests.
- `npm test`, `npm run check`, `npm run build`, `npm run smoke`, and `bash scripts/validate.sh` pass where present.
- Public GitHub repository `rogerchappel/issuecraft` exists with useful description and topics.
- Branch protection attempted for `main`.

## Source attribution

Original local-first workflow idea from agentic QA/reporting pain points. No external repo copied.
