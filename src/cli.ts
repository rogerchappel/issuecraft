#!/usr/bin/env node
import { draftCommand } from "./commands/draft.js";
import { ghPreviewCommand } from "./commands/gh-preview.js";
import { scanTodosCommand } from "./commands/scan-todos.js";
import { flagString, parseArgs } from "./util/args.js";

const HELP = `IssueCraft — offline GitHub issue draft builder

Usage:
  issuecraft draft --log test-output.log [--template bug] [--output issues]
  issuecraft scan-todos src docs [--output issues]
  issuecraft gh-preview issues/bug.md

IssueCraft writes local Markdown drafts only. It never posts to GitHub.`;

async function main(argv: string[]): Promise<number> {
  const parsed = parseArgs(argv);
  try {
    if (!parsed.command || parsed.command === "help" || parsed.flags.has("help")) {
      console.log(HELP);
      return 0;
    }
    if (parsed.command === "draft") {
      console.log(await draftCommand({ log: flagString(parsed.flags, "log"), template: flagString(parsed.flags, "template"), output: flagString(parsed.flags, "output") }));
      return 0;
    }
    if (parsed.command === "scan-todos") {
      console.log(await scanTodosCommand({ paths: parsed.positionals, output: flagString(parsed.flags, "output") }));
      return 0;
    }
    if (parsed.command === "gh-preview") {
      console.log(await ghPreviewCommand({ draftPath: parsed.positionals[0] }));
      return 0;
    }
    throw new Error(`Unknown command: ${parsed.command}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 1;
  }
}

main(process.argv.slice(2)).then((code) => {
  process.exitCode = code;
});
