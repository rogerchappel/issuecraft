import type { DraftArtifact, DraftInput, EvidenceSource } from "./types.js";
import { fingerprintIssue } from "./fingerprint.js";
import { slugify, uniqueSorted } from "../util/text.js";

function evidenceLine(source: EvidenceSource): string {
  const location = source.path ? `${source.path}${source.line ? `:${source.line}` : ""}` : source.kind;
  return `- \`${location}\` — ${source.excerpt.replace(/\n/g, " ")}`;
}

export function renderDraft(input: DraftInput): DraftArtifact {
  const labels = uniqueSorted(input.labels);
  const fingerprint = fingerprintIssue(input.title, input.sources);
  const slug = `${slugify(input.title)}-${fingerprint}`;
  const body = [
    `# ${input.title}`,
    "",
    `Fingerprint: \`${fingerprint}\``,
    labels.length ? `Labels: ${labels.map((label) => `\`${label}\``).join(", ")}` : "Labels: _none suggested_",
    "",
    "## Summary",
    "",
    input.summary,
    "",
    "## Reproduction steps",
    "",
    ...(input.reproductionSteps.length ? input.reproductionSteps.map((step, index) => `${index + 1}. ${step}`) : ["1. Review cited local evidence."]),
    "",
    "## Expected behavior",
    "",
    input.expected ?? "The project should behave as documented or intended.",
    "",
    "## Actual behavior",
    "",
    input.actual ?? "Local evidence indicates behavior that needs review.",
    "",
    "## Evidence and provenance",
    "",
    ...input.sources.map(evidenceLine),
    "",
    "## Safety note",
    "",
    "Generated offline by IssueCraft. Review redactions and context before using `gh issue create`.",
    ""
  ].join("\n");
  return { slug, fingerprint, title: input.title, labels, markdown: body, sources: input.sources };
}
