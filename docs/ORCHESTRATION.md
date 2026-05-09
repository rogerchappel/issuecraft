# IssueCraft Orchestration

IssueCraft is intentionally boring to orchestrate: gather local evidence, write local drafts, and stop before anything external happens.

## Default flow

1. Run a command that produces evidence, such as `npm test > test-output.log`.
2. Draft from logs with `issuecraft draft --log test-output.log --output issues/`.
3. Scan code comments with `issuecraft scan-todos src docs --output issues/`.
4. Review generated Markdown files by hand.
5. If a draft is worth posting, run `issuecraft gh-preview issues/example.md` and copy the previewed command only after review.

## Agent rules

- Treat draft files as local artifacts, not publication approval.
- Never execute the preview command automatically.
- Keep source citations in every draft.
- Redact secrets before writing or sharing generated output.
- Prefer fixture-backed reproduction steps over speculative summaries.
