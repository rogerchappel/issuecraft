import { renderDraft } from "../core/markdown.js";
import { scanTodos, todoFindingToDraft } from "../core/todo-scanner.js";
import { writeDraft } from "../util/fs.js";

export async function scanTodosCommand(options: { paths: string[]; output?: string }): Promise<string> {
  const paths = options.paths.length ? options.paths : ["."];
  const findings = await scanTodos(paths);
  const written: string[] = [];
  for (const finding of findings) {
    written.push(await writeDraft(options.output ?? "issues", renderDraft(todoFindingToDraft(finding))));
  }
  return `Found ${findings.length} TODO markers${written.length ? `; wrote ${written.length} drafts` : ""}`;
}
