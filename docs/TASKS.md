# IssueCraft Tasks

## MVP complete

- [x] Scaffold StackForge `oss-cli` project.
- [x] Parse failing local logs into issue draft inputs.
- [x] Scan selected source trees for TODO/FIXME/BUG/HACK markers.
- [x] Redact common secrets before writing drafts.
- [x] Render deterministic Markdown drafts with evidence provenance.
- [x] Generate `gh issue create` preview commands without executing them.
- [x] Add fixture-backed tests and CLI smoke checks.
- [x] Document local-first safety boundaries.

## Future work

- [ ] Add configurable templates for bugs, tasks, regressions, and release blockers.
- [ ] Add richer git status evidence collection.
- [ ] Add duplicate grouping across an existing draft directory.
- [ ] Add optional reviewed `gh issue create` execution behind an explicit flag.
