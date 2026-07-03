"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };
type Lang = "fr" | "en";

const T = {
  fr: {
    title: "AIBA Chat",
    subtitle: "Assistant IA · réponse instantanée",
    greeting:
      "Bonjour 👋 Décrivez votre projet (site, e-commerce, app mobile, SaaS, chatbot…) et je vous donne une estimation de tarif.",
    placeholder: "Décrivez votre projet…",
    open: "Ouvrir le chat d'estimation",
    close: "Fermer",
    send: "Envoyer",
    error: "Une erreur est survenue. Réessayez.",
  },
  en: {
    title: "Price estimate",
    subtitle: "AI assistant · instant reply",
    greeting:
      "Hi 👋 Describe your project (website, e-commerce, mobile app, SaaS, chatbot…) and I'll give you a price estimate.",
    placeholder: "Describe your project…",
    open: "Open the estimate chat",
    close: "Close",
    send: "Send",
    error: "Something went wrong. Please try again.",
  },
};

function getLang(): Lang {
  if (typeof document === "undefined") return "fr";
  return document.documentElement.lang === "en" ? "en" : "fr";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Follow the site's language toggle (page.tsx updates <html lang>).
  useEffect(() => {
    setLang(getLang());
    const obs = new MutationObserver(() => setLang(getLang()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    return () => obs.disconnect();
  }, []);

  const t = T[lang];

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    // placeholder assistant message we stream into
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      if (!res.ok || !res.body) throw new Error("no body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: t.error };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t.close : t.open}
        className="press fixed bottom-5 right-5 z-[70] grid h-14 w-14 place-items-center rounded-full text-white shadow-lg shadow-[rgba(124,45,181,0.5)]"
        style={{
          background:
            "linear-gradient(120deg,#1e9bf0,#7c2db5 52%,#c01a9c)",
        }}
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={t.title}
          className="fixed bottom-24 right-5 z-[70] flex h-[30rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--background-2)] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-white"
              style={{ background: "linear-gradient(120deg,#1e9bf0,#7c2db5,#c01a9c)" }}
            >
              <Sparkles size={16} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{t.title}</p>
              <p className="truncate text-xs text-muted">{t.subtitle}</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Bubble role="assistant" text={t.greeting} />
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} text={m.content} pending={busy && i === messages.length - 1 && m.content === ""} />
            ))}
          </div>

          {/* Input */}
          <form
            className="flex items-center gap-2 border-t border-[var(--line)] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="min-w-0 flex-1 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-violet)]"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={t.send}
              className="press grid h-10 w-10 shrink-0 place-items-center rounded-full text-white disabled:opacity-40"
              style={{ background: "linear-gradient(120deg,#1e9bf0,#7c2db5,#c01a9c)" }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Bubble({
  role,
  text,
  pending,
}: {
  role: "user" | "assistant";
  text: string;
  pending?: boolean;
}) {
  const isUser = role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={[
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-6",
          isUser
            ? "rounded-br-sm bg-[var(--surface-2)] text-foreground"
            : "rounded-bl-sm border border-[var(--line)] bg-[var(--surface)] text-foreground",
        ].join(" ")}
      >
        {pending ? <span className="text-muted">…</span> : text}
      </div>
    </div>
  );
}
