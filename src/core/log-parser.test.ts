import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { parseLogToDraft } from "./log-parser.js";

test("turns failing test logs into bug draft inputs", async () => {
  const log = await readFile("test/fixtures/failing-test.log", "utf8");
  const draft = parseLogToDraft(log, "test/fixtures/failing-test.log");
  assert.equal(draft.template, "bug");
  assert.equal(draft.labels.includes("bug"), true);
  assert.match(draft.title, /not ok 2/);
  assert.doesNotMatch(draft.sources[0].excerpt, /ghp_123/);
});
