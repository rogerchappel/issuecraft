import { createHash } from "node:crypto";
import type { EvidenceSource } from "./types.js";

export function fingerprintIssue(title: string, sources: EvidenceSource[]): string {
  const canonical = JSON.stringify({
    title: title.trim().toLowerCase(),
    sources: sources.map((source) => ({
      kind: source.kind,
      path: source.path ?? "",
      line: source.line ?? 0,
      excerpt: source.excerpt.trim().slice(0, 500)
    }))
  });
  return createHash("sha256").update(canonical).digest("hex").slice(0, 12);
}
