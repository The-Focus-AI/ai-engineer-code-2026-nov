// Shared shapes for the compiled intent and the runtime.

export type SourceKind = "responsibility" | "function" | "gateway" | "pattern" | "test" | "unknown";
export type WakeSource = "input" | "self" | "external";
export type Severity = "info" | "warning" | "error";
export type PostconditionMode = "deterministic" | "render-attested";

export interface CompileSource {
  path: string;
  kind: SourceKind;
  name?: string;
}

export interface TopologyNode {
  node: string;
  contract_fingerprint: string;
  wake_source: WakeSource;
}

export interface TopologyEdge {
  subscriber: string;
  producer: string;
  facet: string;
}

export interface Topology {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  entry_points: string[];
  acyclic: boolean;
}

export interface CanonicalizerEntry {
  node: string;
  artifact: string;
  facets: string[];
}

export interface PostconditionEntry {
  node: string;
  artifact: string;
  mode: PostconditionMode;
}

export interface Diagnostic {
  severity: Severity;
  message: string;
  sourcePath?: string;
}

export interface Manifest {
  kind: string;
  version: number;
  sources: CompileSource[];
  topology: Topology;
  canonicalizers: CanonicalizerEntry[];
  postconditions: PostconditionEntry[];
  contract_fingerprints: Record<string, string>;
  diagnostics: Diagnostic[];
}

export type WorldModel = Record<string, unknown>;

export interface CanonicalizerModule {
  canonicalize(worldModel: WorldModel): Record<string, string>;
  SPEC: Record<string, string[] | null>;
}

export interface PostconditionModule {
  validate(worldModel: WorldModel): { ok: boolean; failures: string[] };
  mode: string;
}

export interface ReceiptCost {
  accounting: string;
  model: string | null;
  provider: string | null;
  surprise_cause: WakeSource;
  tokens: { fresh: number | null; reused: number | null };
}

export interface WakeRef {
  node?: string;
  fingerprint?: string;
  moved_facets?: string[];
  trigger?: string;
  trigger_id?: string;
  expression?: string;
  fired_at?: string;
  reason?: string;
  sig?: string | null;
}

export interface Receipt {
  at: string;
  contract_fingerprint: string;
  cost: ReceiptCost;
  fingerprints: Record<string, string>;
  input_fingerprints: Record<string, string>;
  node: string;
  prev: string | null;
  run_id: string;
  semantic_diff: Record<string, unknown>;
  status: "rendered" | "skipped" | "failed";
  wake: { source: WakeSource; refs: WakeRef[] };
  sig: { alg: string; digest: string; signer: null; v: number };
}

export interface TriggerPlan {
  kind: string;
  version: number;
  registered_at: string;
  openprose_root: string;
  manifest: string;
  manifest_sha256: string;
  time_zone: string;
  triggers: {
    cron: Array<{ node: string; expression: string; time_zone: string; adapter: string }>;
    http: Array<{ node: string; method: string; path: string; event: string | null; url: string; adapter: string }>;
    self_clocks: Array<{ node: string; continuity: string[] | null }>;
  };
  adapters: Record<string, string>;
}
