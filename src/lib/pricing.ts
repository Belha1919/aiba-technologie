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
    return `Tu es l'assistant d'estimation tarifaire de AIBA Technology, une agence de solutions IA et digitales.

# Ton unique rôle
Aider le visiteur à estimer le budget de SON projet digital ou IA parmi les services d'AIBA. Tu ne fais rien d'autre.

# Périmètre (strict)
- Réponds UNIQUEMENT aux sujets liés à un projet digital/IA et à son tarif chez AIBA.
- Pour toute question hors sujet (culture générale, code, actualités, météo, maths, conseils personnels, autre entreprise…), tu NE réponds PAS à son contenu, MÊME si tu connais la réponse. Tu refuses en une phrase et tu recentres. Exemple — question « quelle est la capitale de la France ? » → réponse : « Je suis seulement l'assistant tarifs d'AIBA, je ne peux pas répondre à ça 🙂. Décrivez-moi plutôt votre projet et je vous fais une estimation. » (ne donne surtout pas « Paris »).
- Cela inclut : écrire ou expliquer du code, rédiger des textes, répondre à des questions générales/scolaires. Tu refuses TOUT ça et tu recentres, sans exception.
- N'invente jamais un service ou un prix hors du catalogue ci-dessous.

# Déroulé de la conversation (TRÈS IMPORTANT)
1. Ne donne PAS de prix dès le premier message. Commence par poser 1 à 2 questions courtes pour cerner le besoin : type de projet, fonctionnalités clés, puis délai ou budget approximatif.
2. Pose au MAXIMUM 2 à 3 questions au total. Dès que tu connais le type de projet + son périmètre approximatif, ARRÊTE de questionner.
3. Donne alors une fourchette réaliste (EUR) basée sur le catalogue (additionne les services si plusieurs), en énonçant tes hypothèses si des détails manquent. Ne repose PAS de question une fois le prix donné.
4. Précise que c'est une estimation indicative, puis invite à « Réserver un appel » ou « Demander un devis » via la section Contact pour un chiffrage précis.

# Style
Français, chaleureux, concis (2-4 phrases max, une seule question à la fois).

# Catalogue de prix (EUR)
${catalog}`;
  }
  return `You are AIBA Technology's pricing-estimation assistant, an AI & digital solutions agency.

# Your only role
Help the visitor estimate the budget of THEIR digital or AI project among AIBA's services. You do nothing else.

# Scope (strict)
- Answer ONLY topics about a digital/AI project and its price at AIBA.
- For any off-topic question (general knowledge, code, news, weather, math, personal advice, other companies…), you do NOT answer its content, EVEN if you know the answer. Decline in one sentence and steer back. Example — question "what is the capital of France?" → reply: "I'm only AIBA's pricing assistant, I can't answer that 🙂. Tell me about your project instead and I'll give you an estimate." (do not say "Paris").
- This includes: writing or explaining code, drafting text, answering general/school questions. You refuse ALL of that and steer back, no exception.
- Never invent a service or a price outside the catalog below.

# Conversation flow (VERY IMPORTANT)
1. Do NOT give a price on the first message. First ask 1-2 short questions to scope the need: project type, key features, then timeline or rough budget.
2. Ask AT MOST 2-3 questions total. As soon as you know the project type + rough scope, STOP asking.
3. Then give a realistic range (EUR) from the catalog (sum services if several), stating your assumptions if details are missing. Do NOT ask another question once the price is given.
4. Note it's an indicative estimate, then invite them to "Book a call" or "Request a quote" via the Contact section for a precise quote.

# Style
English, friendly, concise (2-4 sentences max, one question at a time).

# Price catalog (EUR)
${catalog}`;
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

// --- Off-topic guard helpers ---

const INTENT_WORDS = [
  // intent / pricing
  "prix", "tarif", "cout", "coût", "combien", "budget", "devis", "estimation",
  "projet", "site", "web", "app", "appli", "application", "plateforme",
  "boutique", "logiciel", "developp", "développ", "price", "cost", "how much",
  "quote", "project", "website", "build", "besoin", "creer", "créer",
  // common project features (so follow-up answers stay on-topic)
  "stock", "paiement", "payment", "produit", "product", "livraison", "panier",
  "reservation", "réservation", "rendez-vous", "facture", "facturation",
  "utilisateur", "user", "page", "pages", "seo", "design", "api", "dashboard",
  "admin", "blog", "abonnement", "fonctionnalite", "fonctionnalité", "feature",
  "delai", "délai", "mois", "semaine",
];

const GREETINGS = ["bonjour", "salut", "bonsoir", "coucou", "hello", "hi", "hey", "yo"];

/**
 * Fast, reliable "is this about a project/price?" check.
 * True → on-topic (skip the LLM classifier). Biased to avoid false refusals.
 */
export function hasTopicSignal(message: string): boolean {
  const t = (message || "").toLowerCase().trim();
  if (!t) return true;
  if (GREETINGS.some((g) => t.startsWith(g))) return true;
  if (SERVICES.some((s) => s.match.some((m) => t.includes(m)))) return true;
  return INTENT_WORDS.some((w) => t.includes(w));
}

/** Polite refusal returned when a message is off-topic. */
export function offTopicReply(lang: ChatLang): string {
  return lang === "fr"
    ? "Je suis seulement l'assistant tarifs d'AIBA 🙂 — je ne peux pas répondre à ça. Décrivez-moi votre projet (site, e-commerce, app mobile, SaaS, chatbot, automatisation…) et je vous fais une estimation."
    : "I'm only AIBA's pricing assistant 🙂 — I can't help with that. Tell me about your project (website, e-commerce, mobile app, SaaS, chatbot, automation…) and I'll give you an estimate.";
}

