import type { DraftInput, IssueTemplate } from "./types.js";
import { redactSecrets } from "./redact.js";
import { truncate } from "../util/text.js";

const FAILURE_PATTERNS = [/\bFAIL\b/i, /\bERROR\b/i, /not ok\b/i, /AssertionError/i, /TypeError/i, /ReferenceError/i];

export function parseLogToDraft(content: string, path: string, template: IssueTemplate = "bug"): DraftInput {
  const redacted = redactSecrets(content);
  const lines = redacted.split(/\r?\n/);
  const firstFailureIndex = lines.findIndex((line) => FAILURE_PATTERNS.some((pattern) => pattern.test(line)));
  const start = Math.max(0, firstFailureIndex - 2);
  const excerptLines = lines.slice(start, firstFailureIndex === -1 ? Math.min(lines.length, 8) : firstFailureIndex + 6);
  const titleSeed = firstFailureIndex === -1 ? `Review log output from ${path}` : truncate(lines[firstFailureIndex].trim(), 90);

  return {
    title: titleSeed || `Review log output from ${path}`,
    template,
    summary: `IssueCraft found local log evidence in \`${path}\` that may need a tracked issue.`,
    actual: excerptLines.join("\n"),
    expected: "Tests or commands should complete without the cited failure output.",
    reproductionSteps: [`Run the command that produced \`${path}\`.`, "Compare the output with the cited failure excerpt."],
    labels: template === "bug" ? ["bug", "needs-triage"] : ["needs-triage"],
    sources: [{ kind: "log", path, line: firstFailureIndex === -1 ? undefined : firstFailureIndex + 1, excerpt: excerptLines.join("\\n") }]
  };
}
