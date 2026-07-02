// Pricing catalog + estimation engine for the AIBA assistant.
// Prices are illustrative ranges in EUR — adjust to your real rates.

export type ChatLang = "fr" | "en";

type Service = {
  key: string;
  match: string[];
  fr: string;
  en: string;
  min: number;
  max: number;
};

export const SERVICES: Service[] = [
  {
    key: "site",
    match: ["site vitrine", "vitrine", "site web", "website", "showcase", "landing", "portfolio"],
    fr: "Site vitrine",
    en: "Showcase website",
    min: 800,
    max: 2500,
  },
  {
    key: "ecommerce",
    match: ["e-commerce", "ecommerce", "boutique", "shop", "store", "vente en ligne", "panier"],
    fr: "E-Commerce",
    en: "E-Commerce",
    min: 2500,
    max: 8000,
  },
  {
    key: "booking",
    match: ["reservation", "réservation", "agenda", "rendez-vous", "booking", "appointment", "calendrier"],
    fr: "Réservation / Agenda",
    en: "Booking / Scheduling",
    min: 1500,
    max: 5000,
  },
  {
    key: "marketplace",
    match: ["marketplace", "multi-vendeur", "multivendeur", "place de marché"],
    fr: "Marketplace",
    en: "Marketplace",
    min: 8000,
    max: 25000,
  },
  {
    key: "mobile",
    match: ["application mobile", "app mobile", "mobile", "ios", "android", "appli", "flutter"],
    fr: "Application mobile",
    en: "Mobile app",
    min: 6000,
    max: 20000,
  },
  {
    key: "saas",
    match: ["saas", "logiciel", "software", "plateforme métier", "abonnement"],
    fr: "Logiciel / SaaS",
    en: "Software / SaaS",
    min: 10000,
    max: 40000,
  },
  {
    key: "chatbot",
    match: ["chatbot", "chat bot", "bot", "assistant"],
    fr: "Chatbot IA",
    en: "AI Chatbot",
    min: 1500,
    max: 6000,
  },
  {
    key: "agent",
    match: ["agent ia", "agent", "workflow", "automatisation ia"],
    fr: "Agent IA",
    en: "AI Agent",
    min: 3000,
    max: 12000,
  },
  {
    key: "automation",
    match: ["automatisation", "facturation", "facture", "devis", "réseaux sociaux", "social media"],
    fr: "Automatisation",
    en: "Automation",
    min: 1000,
    max: 5000,
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/** System prompt: turns the local model into AIBA's pricing assistant. */
export function buildSystemPrompt(lang: ChatLang): string {
  const catalog = SERVICES.map(
    (s) => `- ${lang === "fr" ? s.fr : s.en}: ${fmt(s.min)} – ${fmt(s.max)}`
  ).join("\n");

  if (lang === "fr") {
    return `Tu es l'assistant d'estimation de AIBA Technology, une agence de solutions IA et digitales.
Ton rôle : aider le visiteur à obtenir une estimation de tarif pour son projet.
Règles :
- Réponds toujours en français, de façon concise et chaleureuse (2-4 phrases).
- Pose 1 question de clarification si le besoin est vague (type de projet, fonctionnalités, délai).
- Donne une fourchette de prix réaliste basée sur ce catalogue (EUR) :
${catalog}
- Additionne les fourchettes si le projet combine plusieurs services.
- Précise que c'est une estimation indicative et invite à « Réserver un appel » ou « Demander un devis » pour un chiffrage précis.
- N'invente pas de prix hors catalogue ; reste dans ces ordres de grandeur.`;
  }
  return `You are AIBA Technology's estimation assistant, an AI & digital solutions agency.
Your role: help visitors get a price estimate for their project.
Rules:
- Always answer in English, concise and friendly (2-4 sentences).
- Ask 1 clarifying question if the need is vague (project type, features, timeline).
- Give a realistic price range based on this catalog (EUR):
${catalog}
- Sum the ranges if the project combines several services.
- Note it's an indicative estimate and invite them to "Book a call" or "Request a quote" for a precise quote.
- Do not invent prices outside the catalog; stay within these orders of magnitude.`;
}

/** Deterministic fallback used when the local model (Ollama) is unavailable. */
export function localEstimate(message: string, lang: ChatLang): string {
  const text = (message || "").toLowerCase();
  const hits = SERVICES.filter((s) => s.match.some((m) => text.includes(m)));

  if (hits.length === 0) {
    return lang === "fr"
      ? "Pour vous donner une estimation, dites-moi quel type de projet vous voulez : site vitrine, e-commerce, application mobile, SaaS, chatbot IA, automatisation… ?"
      : "To give you an estimate, tell me what kind of project you have in mind: showcase website, e-commerce, mobile app, SaaS, AI chatbot, automation…?";
  }

  const min = hits.reduce((a, s) => a + s.min, 0);
  const max = hits.reduce((a, s) => a + s.max, 0);
  const names = hits.map((s) => (lang === "fr" ? s.fr : s.en)).join(" + ");

  if (lang === "fr") {
    return `Pour un projet **${names}**, comptez environ **${fmt(min)} – ${fmt(
      max
    )}** (estimation indicative, hors options). Le prix final dépend des fonctionnalités et du délai.\n\nPour un chiffrage précis, réservez un appel ou demandez un devis via la section Contact. 🚀`;
  }
  return `For a **${names}** project, expect roughly **${fmt(min)} – ${fmt(
    max
  )}** (indicative estimate, options excluded). The final price depends on features and timeline.\n\nFor a precise quote, book a call or request a quote in the Contact section. 🚀`;
}
