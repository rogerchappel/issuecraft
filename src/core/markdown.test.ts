import assert from "node:assert/strict";
import test from "node:test";
import { renderDraft } from "./markdown.js";

test("renders deterministic Markdown with evidence provenance", () => {
  const first = renderDraft({
    title: "Broken thing",
    template: "bug",
    summary: "Something broke.",
    reproductionSteps: ["Run it"],
    labels: ["bug", "bug", "needs-triage"],
    sources: [{ kind: "log", path: "out.log", line: 2, excerpt: "FAIL" }]
  });
  const second = renderDraft({ ...first, template: "bug", summary: "Something broke.", reproductionSteps: ["Run it"], sources: [{ kind: "log", path: "out.log", line: 2, excerpt: "FAIL" }] });
  assert.equal(first.fingerprint, second.fingerprint);
  assert.match(first.markdown, /out\.log:2/);
  assert.deepEqual(first.labels, ["bug", "needs-triage"]);
});
