import { basename } from "node:path";
import { buildGhPreview } from "../core/gh-preview.js";
import { readText } from "../util/fs.js";

function titleFromMarkdown(markdown: string, fallback: string): string {
  return markdown.split(/\r?\n/).find((line) => line.startsWith("# "))?.slice(2).trim() || fallback;
}

function labelsFromMarkdown(markdown: string): string[] {
  const line = markdown.split(/\r?\n/).find((candidate) => candidate.startsWith("Labels:"));
  return line ? [...line.matchAll(/`([^`]+)`/g)].map((match) => match[1]) : [];
}

export async function ghPreviewCommand(options: { draftPath?: string }): Promise<string> {
  if (!options.draftPath) throw new Error("gh-preview requires a draft markdown path");
  const markdown = await readText(options.draftPath);
  return buildGhPreview(options.draftPath, { title: titleFromMarkdown(markdown, basename(options.draftPath, ".md")), labels: labelsFromMarkdown(markdown) });
}
