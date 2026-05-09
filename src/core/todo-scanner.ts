import { readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { readdirSync, statSync } from "node:fs";
import type { DraftInput, TodoFinding } from "./types.js";
import { redactSecrets } from "./redact.js";

const TODO_PATTERN = /\b(TODO|FIXME|BUG|HACK)\b[:\- ]?(.*)$/i;
const IGNORED_DIRS = new Set([".git", "node_modules", "dist", "coverage"]);

export function walkFiles(paths: string[], cwd = process.cwd()): string[] {
  const results: string[] = [];
  for (const entry of paths) {
    const absolute = join(cwd, entry);
    const stat = statSync(absolute);
    if (stat.isDirectory()) {
      for (const child of readdirSync(absolute)) {
        if (!IGNORED_DIRS.has(child)) results.push(...walkFiles([join(entry, child)], cwd));
      }
    } else if (stat.isFile()) {
      results.push(relative(cwd, absolute));
    }
  }
  return results.sort();
}

export async function scanTodos(paths: string[], cwd = process.cwd()): Promise<TodoFinding[]> {
  const findings: TodoFinding[] = [];
  for (const file of walkFiles(paths, cwd)) {
    const content = await readFile(join(cwd, file), "utf8").catch(() => "");
    content.split(/\r?\n/).forEach((line, index) => {
      const match = TODO_PATTERN.exec(line);
      if (match) findings.push({ path: file, line: index + 1, marker: match[1].toUpperCase(), text: redactSecrets(match[2].trim() || line.trim()) });
    });
  }
  return findings;
}

export function todoFindingToDraft(finding: TodoFinding): DraftInput {
  return {
    title: `${finding.marker}: ${finding.text}`,
    template: "todo",
    summary: `A ${finding.marker} marker was found in \`${finding.path}\` and converted into a reviewable issue draft.`,
    reproductionSteps: [`Open \`${finding.path}\` at line ${finding.line}.`, "Review whether the marker still describes actionable work."],
    expected: "Tracked work should be explicit, deduplicated, and reviewed before becoming a GitHub issue.",
    actual: finding.text,
    labels: ["todo", "needs-triage"],
    sources: [{ kind: "todo", path: finding.path, line: finding.line, excerpt: finding.text }]
  };
}
