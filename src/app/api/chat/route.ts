import {
  buildSystemPrompt,
  localEstimate,
  hasTopicSignal,
  offTopicReply,
  type ChatLang,
} from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * LLM guard: is the message about scoping/pricing a digital or AI project?
 * Only called when the keyword fast-path (hasTopicSignal) found nothing.
 * Returns true (on-topic) on any error to avoid falsely refusing real users.
 */
async function isOnTopic(message: string): Promise<boolean> {
  const prompt = `Tu es un classifieur strict pour AIBA (agence digitale & IA).
Le message demande-t-il de concevoir/estimer/chiffrer un projet digital ou IA (site, app web, e-commerce, réservation, marketplace, app mobile, SaaS, chatbot, agent IA, automatisation) ou pose-t-il une question de prix/budget sur un tel projet ? Une salutation ou une intention vague de projet = OUI. Écrire/expliquer du code, culture générale, maths, actualités, blagues, autres tâches = NON.
Message: """${message}"""
Réponds par UN SEUL mot: OUI ou NON.`;
  try {
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
        options: { temperature: 0, num_predict: 3 },
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return true;
    const j = await res.json();
    const out = String(j?.response ?? "").trim().toUpperCase();
    return !out.startsWith("NON") && !out.startsWith("NO");
  } catch {
    return true;
  }
}

export async function POST(req: Request) {
  let messages: ChatMessage[] = [];
  let lang: ChatLang = "fr";
  try {
    const body = await req.json();
    messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    lang = body.lang === "en" ? "en" : "fr";
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const system = buildSystemPrompt(lang);

  // 1) Try the local model (Ollama). Fail fast if it isn't running.
  try {
    // Off-topic guard: keyword fast-path, else ask the model to classify.
    if (!hasTopicSignal(lastUser) && !(await isOnTopic(lastUser))) {
      return new Response(offTopicReply(lang), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Chat-Source": "guard",
        },
      });
    }

    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: true,
        options: { temperature: 0.4 },
        messages: [{ role: "system", content: system }, ...messages],
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok || !res.body) throw new Error(`ollama status ${res.status}`);

    // Transform Ollama's NDJSON stream into a plain-text token stream.
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";
    const reader = res.body.getReader();

    const stream = new ReadableStream<Uint8Array>({
      async pull(controller) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const json = JSON.parse(trimmed);
            const token = json?.message?.content;
            if (token) controller.enqueue(encoder.encode(token));
          } catch {
            /* ignore partial/non-JSON lines */
          }
        }
      },
      cancel() {
        reader.cancel().catch(() => {});
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Chat-Source": "ollama",
      },
    });
  } catch {
    // 2) Fallback: deterministic estimate so the chat always works locally.
    const text = localEstimate(lastUser, lang);
    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Chat-Source": "local",
      },
    });
  }
}
