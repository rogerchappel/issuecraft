# IssueCraft

IssueCraft is a small, stubbornly local CLI for turning messy evidence into clean GitHub issue drafts. It reads logs and TODO comments, writes Markdown files, and refuses to post anything for you by default.

Think of it as a craft bench for issues: collect the splinters, sand the edges, keep your fingers away from the big red publish button.

## Install

```bash
npm install
npm run build
npm link
```

Or run directly from the checkout:

```bash
node dist/cli.js help
```

## Quickstart

From a checkout, build once and run the CLI directly:

```bash
npm run build
node dist/cli.js help
```

After installing or linking the package binary, draft local issue files with:

```bash
issuecraft draft --log test-output.log --template bug --output issues/
issuecraft scan-todos src docs --output issues/
issuecraft gh-preview issues/not-ok-2-renders-draft-abc123.md
```

## What it creates

Drafts include:

- a deterministic fingerprint for duplicate grouping
- suggested labels
- reproduction steps
- expected and actual behavior
- evidence citations with file/line provenance
- a safety reminder before using GitHub

## Local-first promise

- No SaaS backend.
- No telemetry.
- No network calls from draft generation.
- No GitHub posting by default.
- `gh-preview` prints a command string; it does not run it.

## Example

```bash
npm run build
node dist/cli.js draft --log examples/test-output.log --output /tmp/issuecraft-demo
node dist/cli.js scan-todos examples --output /tmp/issuecraft-demo
```

Review the Markdown files in `/tmp/issuecraft-demo` before sharing or posting.

## Development

```bash
npm test
npm run check
npm run build
npm run smoke
npm run package:smoke
npm run release:check
bash scripts/validate.sh
```

## Docs

- [Product requirements](docs/PRD.md)
- [Tasks](docs/TASKS.md)
- [Orchestration](docs/ORCHESTRATION.md)
- [Safety model](docs/SAFETY.md)
- [Security policy](SECURITY.md)

## Release Readiness

Use the same local checks that back release readiness:

```sh
npm run check
npm test
npm run build
npm run smoke
npm run package:smoke
npm run release:check
```

Run the narrower commands while iterating, then finish with
`npm run release:check` before opening a release PR. The package smoke rebuilds,
asserts the CLI/runtime entrypoints exist, and keeps docs and examples visible in
the tarball before tagging or publishing.
