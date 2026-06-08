# Release Candidate Checklist

Use this checklist before publishing an IssueCraft package or tagging a release.

## Verification

- Run `npm run release:check`.
- Confirm `npm run smoke` still generates draft issue Markdown from bundled fixtures.
- Inspect `npm pack --dry-run` output and confirm it includes `dist`, `README.md`, `LICENSE`, and `SECURITY.md`.

## Evidence

- Save the fixture input and generated Markdown shape when templates change.
- Include parser, redaction, or GitHub preview changes in release notes.
- Note any CLI flag additions with one example command.

## Support Notes

- Drafts should stay local until the user reviews them.
- Do not publish logs with secrets, customer names, or private repository data.
