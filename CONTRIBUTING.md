# Contributing

Thanks for helping make IssueCraft sharper and safer.

## Local setup

```bash
npm install
npm test
npm run check
npm run build
npm run smoke
```

## Development principles

- Keep the CLI local-first.
- Add fixture-backed tests for parsing, redaction, and output changes.
- Never add hidden telemetry or default network calls.
- Prefer deterministic output so drafts are stable in CI.
- Keep `gh-preview` as a preview unless a future explicit execution mode is designed with strong confirmation.

## Commit style

Use Conventional Commits such as `feat:`, `fix:`, `test:`, `docs:`, and `chore:`.

## Pull requests

Include:

- what changed
- fixtures added or updated
- verification commands run
- any safety/privacy implications
