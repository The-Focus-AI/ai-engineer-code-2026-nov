/**
 * Local speech-to-text with Qwen3-ASR (antirez/qwen-asr, a pure C build), used when a
 * recording has no Voice Memos transcript, or when one is asked for explicitly.
 *
 * The binary and weights live outside this repo:
 *   QWEN_ASR_DIR    the checkout holding `qwen_asr`   (default ~/src/qwen-asr)
 *   QWEN_ASR_MODEL  model directory inside it, or an absolute path
 *                   (default qwen3-asr-1.7b)
 *
 * Qwen gives timings per segment (about five seconds), not per word. Every word
 * in a segment carries that segment's start and end, and `timing` says so. No
 * finer timing is invented.
 *
 * Qwen can echo its prompt as transcript text, typically over trailing silence.
 * A segment carrying three or more of the prompt's terms is dropped and counted
 * in `dropped_segments`, so a name in the transcript came from the audio.
 *
 * Qwen runs on every CPU core at a few times realtime: a 25-minute talk drains a
 * laptop battery noticeably. On battery power it is deferred, not run, unless the
 * caller allows it (`--allow-battery`, or RECORDINGS_ASR_ON_BATTERY=allow). A
 * deferred recording arrives without a transcript; `mise run transcribe` fills it
 * in once the machine is on AC power.
 */

import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { isAbsolute, join } from "node:path";

export interface Word {
  w: string;
  start: number | null;
  end: number | null;
}

export interface Transcript {
  text: string;
  words: Word[];
  locale: string | null;
  source: string;
  timing: "word" | "segment";
  dropped_segments: number;
}

const expand = (p: string): string => (p.startsWith("~") ? join(homedir(), p.slice(1)) : p);

export interface QwenSetup {
  binary: string;
  model: string;
  name: string;
}

export interface Power {
  onBattery: boolean | null;
  percent: number | null;
}

/** Where power comes from right now. Unknown (not macOS, no pmset) is null. */
export function powerSource(): Power {
  try {
    const run = Bun.spawnSync({ cmd: ["pmset", "-g", "batt"], stdout: "pipe", stderr: "pipe" });
    if (run.exitCode !== 0) return { onBattery: null, percent: null };
    const out = run.stdout.toString();
    const pct = out.match(/(\d+)%/);
    return {
      onBattery: out.includes("'Battery Power'") ? true : out.includes("'AC Power'") ? false : null,
      percent: pct ? Number(pct[1]) : null,
    };
  } catch {
    return { onBattery: null, percent: null };
  }
}

/**
 * The local install, or the reason it cannot run now: not installed, or on
 * battery power without permission to run there.
 */
export function qwenSetup(opts: { allowBattery?: boolean } = {}): QwenSetup | { missing: string } {
  const allow = opts.allowBattery || process.env.RECORDINGS_ASR_ON_BATTERY === "allow";
  if (!allow) {
    const power = powerSource();
    if (power.onBattery) {
      return { missing: `on battery power (${power.percent ?? "?"}%); deferred — plug in, or pass --allow-battery` };
    }
  }
  const dir = expand(process.env.QWEN_ASR_DIR ?? "~/src/qwen-asr");
  const binary = join(dir, "qwen_asr");
  const modelSetting = process.env.QWEN_ASR_MODEL ?? "qwen3-asr-1.7b";
  const model = isAbsolute(expand(modelSetting)) ? expand(modelSetting) : join(dir, modelSetting);
  if (!existsSync(binary)) return { missing: `no qwen_asr binary at ${binary} (set QWEN_ASR_DIR)` };
  if (!existsSync(join(model, "vocab.json"))) return { missing: `no Qwen3-ASR model at ${model} (set QWEN_ASR_MODEL)` };
  const name = model.split("/").filter(Boolean).pop() ?? "qwen3-asr";
  return { binary, model, name };
}

/**
 * A spelling hint from the schedule: the speaker names and affiliations of
 * sessions that overlap the recording, so they come out right. Titles are left
 * out: they are long, and a long prompt is what Qwen echoes back as text.
 */
export function schedulePrompt(root: string, recordedAt: Date | null, durationSeconds: number | null): string | null {
  const path = join(root, "state/world-model/conference-schedule/published/world-model.json");
  if (!recordedAt || !existsSync(path)) return null;
  try {
    const wm = JSON.parse(readFileSync(path, "utf8")) as {
      program: { sessions: Array<{ title: string; starts_at: string; ends_at: string; speaker_ids: string[] }> };
      speakers: Record<string, { name?: string; affiliation?: string }>;
    };
    // Voice Memos stamps creation near the start; allow slack either side.
    const slack = 30 * 60 * 1000;
    const from = recordedAt.getTime() - slack;
    const to = recordedAt.getTime() + (durationSeconds ?? 3600) * 1000 + slack;
    const terms = new Set<string>();
    for (const s of wm.program.sessions) {
      const a = Date.parse(s.starts_at);
      const b = Date.parse(s.ends_at);
      if (!(a < to && b > from) || !s.speaker_ids.length) continue;
      for (const id of s.speaker_ids) {
        const sp = wm.speakers[id];
        if (sp?.name) terms.add(sp.name);
        if (sp?.affiliation) terms.add(sp.affiliation);
      }
    }
    if (!terms.size) return null;
    return `Conference talk transcription. Preserve spelling: ${[...terms].join("; ")}`;
  } catch {
    return null;
  }
}

const PROMPT_TERMS = "Preserve spelling:";

/** The prompt's spelling terms, lowercased, for echo detection. */
function promptTerms(prompt: string | null): string[] {
  if (!prompt) return [];
  const at = prompt.indexOf(PROMPT_TERMS);
  if (at < 0) return [];
  return prompt.slice(at + PROMPT_TERMS.length).split("; ").map((t) => t.trim().toLowerCase()).filter(Boolean);
}

/** True when a segment reads like the prompt rather than speech. */
function echoesPrompt(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.filter((t) => lower.includes(t)).length >= 3;
}

/** Transcribe one audio file. Throws with the tool's own message on failure. */
export function qwenTranscribe(setup: QwenSetup, audioPath: string, prompt: string | null): Transcript {
  // --timestamps needs a file, not stdin, so decode to a temporary 16 kHz mono WAV.
  const work = mkdtempSync(join(tmpdir(), "qwen-asr-"));
  try {
    const wav = join(work, "audio.wav");
    const ff = Bun.spawnSync({
      cmd: ["ffmpeg", "-y", "-loglevel", "error", "-i", audioPath, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav],
      stdout: "pipe",
      stderr: "pipe",
    });
    if (ff.exitCode !== 0) throw new Error(`ffmpeg could not decode ${audioPath}: ${ff.stderr.toString().trim()}`);

    const cmd = [setup.binary, "-d", setup.model, "-i", wav, "--timestamps", "--silent"];
    if (prompt) cmd.push("--prompt", prompt);
    const run = Bun.spawnSync({ cmd, stdout: "pipe", stderr: "pipe" });
    if (run.exitCode !== 0) throw new Error(`qwen_asr failed on ${audioPath}: ${run.stderr.toString().trim()}`);

    const terms = promptTerms(prompt);
    const words: Word[] = [];
    const lines: string[] = [];
    let dropped = 0;
    for (const line of run.stdout.toString().split("\n")) {
      if (!line.trim().startsWith("{")) continue;
      const seg = JSON.parse(line) as { start?: number; end?: number; text?: string };
      const text = (seg.text ?? "").trim();
      if (!text) continue;
      if (echoesPrompt(text, terms)) {
        dropped++;
        continue;
      }
      lines.push(text);
      for (const w of text.split(/\s+/)) words.push({ w, start: seg.start ?? null, end: seg.end ?? null });
    }
    return { text: lines.join(" "), words, locale: null, source: setup.name, timing: "segment", dropped_segments: dropped };
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}
