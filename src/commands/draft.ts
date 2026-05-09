import { parseLogToDraft } from "../core/log-parser.js";
import { renderDraft } from "../core/markdown.js";
import type { IssueTemplate } from "../core/types.js";
import { readText, writeDraft } from "../util/fs.js";

export async function draftCommand(options: { log?: string; template?: string; output?: string }): Promise<string> {
  if (!options.log) throw new Error("draft requires --log <path>");
  const content = await readText(options.log);
  const draft = renderDraft(parseLogToDraft(content, options.log, (options.template as IssueTemplate | undefined) ?? "bug"));
  const target = await writeDraft(options.output ?? "issues", draft);
  return `Wrote ${target}`;
}
