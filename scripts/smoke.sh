#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

node "$ROOT/dist/cli.js" draft --log "$ROOT/test/fixtures/failing-test.log" --output "$TMP/issues"
DRAFT="$(find "$TMP/issues" -name '*.md' | head -n 1)"
test -s "$DRAFT"
grep -q 'Evidence and provenance' "$DRAFT"
node "$ROOT/dist/cli.js" gh-preview "$DRAFT" | grep -q '^gh issue create'
(
  cd "$ROOT"
  node dist/cli.js scan-todos test/fixtures/todo-src --output "$TMP/todos"
)
test "$(find "$TMP/todos" -name '*.md' | wc -l | tr -d ' ')" = "2"
