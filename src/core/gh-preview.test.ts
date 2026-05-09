import assert from "node:assert/strict";
import test from "node:test";
import { buildGhPreview, shellQuote } from "./gh-preview.js";

test("quotes gh preview commands without executing them", () => {
  assert.equal(shellQuote("it's broken"), `'it'"'"'s broken'`);
  const command = buildGhPreview("issues/bug.md", { title: "Bug found", labels: ["bug", "needs triage"] });
  assert.match(command, /^gh issue create/);
  assert.match(command, /--body-file 'issues\/bug.md'/);
  assert.match(command, /--label 'needs triage'/);
});
