import type { DraftArtifact } from "./types.js";

export function buildGhPreview(draftPath: string, draft: Pick<DraftArtifact, "title" | "labels">): string {
  const labelArgs = draft.labels.flatMap((label) => ["--label", shellQuote(label)]).join(" ");
  return [`gh issue create`, `--title ${shellQuote(draft.title)}`, `--body-file ${shellQuote(draftPath)}`, labelArgs]
    .filter(Boolean)
    .join(" ");
}

export function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'"'"'`)}'`;
}
