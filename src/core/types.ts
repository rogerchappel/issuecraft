export type IssueTemplate = "bug" | "todo" | "task";

export interface EvidenceSource {
  kind: "log" | "file" | "git" | "todo";
  path?: string;
  line?: number;
  excerpt: string;
}

export interface DraftInput {
  title: string;
  template: IssueTemplate;
  summary: string;
  actual?: string;
  expected?: string;
  reproductionSteps: string[];
  labels: string[];
  sources: EvidenceSource[];
}

export interface DraftArtifact {
  slug: string;
  fingerprint: string;
  title: string;
  labels: string[];
  markdown: string;
  sources: EvidenceSource[];
}

export interface DraftOptions {
  template?: IssueTemplate;
  outputDir?: string;
  repoRoot?: string;
}

export interface TodoFinding {
  path: string;
  line: number;
  marker: string;
  text: string;
}
