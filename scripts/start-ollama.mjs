// Ensures a local Ollama server + the chatbot model are running before
// `npm run dev` / `npm start` (wired via the predev/prestart hooks).
//
// Non-fatal by design: if Ollama isn't installed or can't start, we log a
// notice and exit 0 so the app still boots — the chatbot then uses its
// offline fallback estimator.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const log = (m) => console.log(`\x1b[35m[ollama]\x1b[0m ${m}`);

// Read OLLAMA_* from .env.local (Next loads it for the app; scripts don't).
function envFromLocal(key, fallback) {
  if (process.env[key]) return process.env[key];
  try {
    const txt = readFileSync(join(process.cwd(), ".env.local"), "utf8");
    const m = txt.match(new RegExp(`^\\s*${key}\\s*=\\s*(.+)\\s*$`, "m"));
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    /* no .env.local — use fallback */
  }
  return fallback;
}

const HOST = envFromLocal("OLLAMA_URL", "http://127.0.0.1:11434");
const MODEL = envFromLocal("OLLAMA_MODEL", "qwen2.5:3b");

function findOllama() {
  const which = spawnSync(process.platform === "win32" ? "where" : "which", ["ollama"], {
    encoding: "utf8",
  });
  if (which.status === 0 && which.stdout.trim()) return "ollama";
  const candidates =
    process.platform === "win32"
      ? [join(homedir(), "ollama", "ollama.exe")]
      : [join(homedir(), "ollama", "ollama"), "/usr/local/bin/ollama"];
  return candidates.find((c) => existsSync(c)) ?? null;
}

async function serverUp() {
  try {
    const res = await fetch(`${HOST}/api/version`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

async function waitUp(timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await serverUp()) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function main() {
  const bin = findOllama();
  if (!bin) {
    log("Ollama not found — chatbot will use its offline fallback. Install: https://ollama.com");
    return;
  }

  if (await serverUp()) {
    log("server already running.");
  } else {
    log("starting server…");
    const child = spawn(bin, ["serve"], {
      detached: true,
      stdio: "ignore",
      windowsHide: true,
    });
    child.unref();
    if (!(await waitUp())) {
      log("server didn't come up in time — chatbot will use fallback.");
      return;
    }
    log("server ready.");
  }

  // Ensure the model is present (first run downloads it).
  const list = spawnSync(bin, ["list"], { encoding: "utf8" });
  const present = list.status === 0 && list.stdout.includes(MODEL);
  if (!present) {
    log(`pulling ${MODEL} (first run only, this can take a few minutes)…`);
    const pull = spawnSync(bin, ["pull", MODEL], { stdio: "inherit" });
    if (pull.status !== 0) {
      log("pull failed — chatbot will use fallback.");
      return;
    }
  }
  log(`model "${MODEL}" ready. 🚀`);
}

main().catch((e) => {
  log(`skipped (${e?.message ?? e}) — chatbot will use fallback.`);
});
