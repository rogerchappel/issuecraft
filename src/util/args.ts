export interface ParsedArgs {
  command?: string;
  positionals: string[];
  flags: Map<string, string | boolean>;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const [command, ...rest] = argv;
  const flags = new Map<string, string | boolean>();
  const positionals: string[] = [];
  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (token.startsWith("--")) {
      const [key, inlineValue] = token.slice(2).split("=", 2);
      const next = rest[index + 1];
      if (inlineValue !== undefined) flags.set(key, inlineValue);
      else if (next && !next.startsWith("--")) {
        flags.set(key, next);
        index += 1;
      } else flags.set(key, true);
    } else positionals.push(token);
  }
  return { command, positionals, flags };
}

export function flagString(flags: Map<string, string | boolean>, key: string, fallback?: string): string | undefined {
  const value = flags.get(key);
  return typeof value === "string" ? value : fallback;
}
