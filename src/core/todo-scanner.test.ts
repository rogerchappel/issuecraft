import assert from "node:assert/strict";
import test from "node:test";
import { scanTodos, todoFindingToDraft } from "./todo-scanner.js";

test("scans TODO and FIXME markers with redaction", async () => {
  const findings = await scanTodos(["test/fixtures/todo-src"]);
  assert.equal(findings.length, 2);
  assert.equal(findings[0].marker, "TODO");
  assert.doesNotMatch(findings[1].text, /supersecret/);
  const draft = todoFindingToDraft(findings[0]);
  assert.equal(draft.labels.includes("todo"), true);
});
