import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { DraftArtifact } from "../core/types.js";

export async function readText(path: string): Promise<string> {
  return readFile(path, "utf8");
}

export async function writeDraft(outputDir: string, draft: DraftArtifact): Promise<string> {
  const target = join(outputDir, `${draft.slug}.md`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, draft.markdown, "utf8");
  return target;
}
