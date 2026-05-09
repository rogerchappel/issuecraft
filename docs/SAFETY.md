# Safety Model

IssueCraft is local-first by design.

- It reads only paths you pass to the CLI.
- It writes Markdown drafts to the output directory you choose.
- It redacts common token, password, email, and private-key patterns before drafts are written.
- `gh-preview` prints a command string; it does not call GitHub.
- There is no telemetry, daemon, SaaS backend, or background sync.

If a draft contains sensitive context, delete it locally and improve the source fixture or redaction rule before sharing anything externally.
