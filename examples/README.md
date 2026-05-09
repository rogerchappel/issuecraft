# Examples

Try the fixture-like examples after building:

```bash
npm run build
node dist/cli.js draft --log examples/test-output.log --output /tmp/issuecraft-example
node dist/cli.js scan-todos examples --output /tmp/issuecraft-example
find /tmp/issuecraft-example -name '*.md' -maxdepth 1 -print
```

These inputs are intentionally fake and safe to share.
