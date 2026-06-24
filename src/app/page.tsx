"use client";

import { useEffect, useState, type JSX } from "react";

type Lang = "fr" | "en";

/* ----------------------------- Flags ----------------------------- */
function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden>
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
  );
}

function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden>
      <clipPath id="gb-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#gb-t)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

/* ----------------------------- Icons ----------------------------- */
type IconName =
  | "chatbot"
  | "agent"
  | "share"
  | "invoice"
  | "globe"
  | "cart"
  | "calendar"
  | "store"
  | "mobile"
  | "saas"
  | "mail"
  | "phone"
  | "pin"
  | "arrow";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  const paths: Record<IconName, JSX.Element> = {
    chatbot: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="10" r="0.5" />
        <circle cx="15" cy="10" r="0.5" />
      </>
    ),
    agent: (
      <>
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M12 8V4M9 4h6M9 14h.01M15 14h.01M2 13h2M20 13h2" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
      </>
    ),
    invoice: (
      <>
        <path d="M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
        <path d="M14 2v6h6M9 13h6M9 17h6M9 9h2" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
      </>
    ),
    cart: (
      <>
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M2 3h2l2.6 12.4a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H5.2" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    store: (
      <>
        <path d="M3 9l1.5-5h15L21 9M3 9h18M3 9v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      </>
    ),
    mobile: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
    saas: <path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  };
  return (
    <svg {...common} aria-hidden>
      {paths[name]}
    </svg>
  );
}

/* ----------------------------- Content ----------------------------- */
const navHrefs = ["#accueil", "#services", "#references", "#contact"];

const aiServices: {
  icon: IconName;
  fr: { t: string; d: string };
  en: { t: string; d: string };
}[] = [
  {
    icon: "chatbot",
    fr: {
      t: "Chatbot IA",
      d: "Creation de chatbots intelligents capables d'automatiser les reponses clients.",
    },
    en: {
      t: "AI Chatbot",
      d: "Building intelligent chatbots that automate customer responses.",
    },
  },
  {
    icon: "agent",
    fr: {
      t: "Agent IA",
      d: "Developpement d'agents IA capables d'automatiser des workflows et taches metiers.",
    },
    en: {
      t: "AI Agent",
      d: "Developing AI agents that automate workflows and business tasks.",
    },
  },
  {
    icon: "share",
    fr: {
      t: "Repartage automatique sur reseaux sociaux",
      d: "Publication et partage automatique de contenu sur les reseaux sociaux.",
    },
    en: {
      t: "Automatic social media sharing",
      d: "Automatic publishing and sharing of content across social media.",
    },
  },
  {
    icon: "invoice",
    fr: {
      t: "Facturation Automatique",
      d: "Automatisation des devis et factures grace a l'IA.",
    },
    en: {
      t: "Automated Invoicing",
      d: "Automating quotes and invoices with AI.",
    },
  },
];

const digitalServices: {
  icon: IconName;
  fr: { t: string; d: string };
  en: { t: string; d: string };
}[] = [
  {
    icon: "globe",
    fr: {
      t: "Site vitrine",
      d: "Creation de sites vitrines modernes et optimises SEO.",
    },
    en: { t: "Showcase website", d: "Modern, SEO-optimized showcase websites." },
  },
  {
    icon: "cart",
    fr: {
      t: "E-Commerce",
      d: "Boutiques en ligne professionnelles avec paiement securise.",
    },
    en: {
      t: "E-Commerce",
      d: "Professional online stores with secure payments.",
    },
  },
  {
    icon: "calendar",
    fr: {
      t: "Reservation / Agenda",
      d: "Solutions de reservation et gestion de rendez-vous.",
    },
    en: {
      t: "Booking / Scheduling",
      d: "Booking and appointment management solutions.",
    },
  },
  {
    icon: "store",
    fr: {
      t: "Marketplace",
      d: "Creation de plateformes multi-vendeurs modernes.",
    },
    en: { t: "Marketplace", d: "Modern multi-vendor platform development." },
  },
  {
    icon: "mobile",
    fr: {
      t: "Application mobile",
      d: "Applications Android et iOS modernes et performantes.",
    },
    en: {
      t: "Mobile app",
      d: "Modern, high-performance Android and iOS apps.",
    },
  },
  {
    icon: "saas",
    fr: {
      t: "Logiciel / SaaS",
      d: "Developpement de logiciels metiers et plateformes SaaS.",
    },
    en: {
      t: "Software / SaaS",
      d: "Custom business software and SaaS platforms.",
    },
  },
];

const processSteps: {
  no: string;
  fr: { t: string; d: string };
  en: { t: string; d: string };
}[] = [
  {
    no: "01",
    fr: { t: "Analyse", d: "Audit des besoins, cadrage des objectifs et priorites." },
    en: { t: "Analysis", d: "Needs audit, goal setting and prioritization." },
  },
  {
    no: "02",
    fr: {
      t: "Design UX/UI",
      d: "Design d'interfaces futuristes, prototypes et tests utilisateurs.",
    },
    en: {
      t: "UX/UI Design",
      d: "Futuristic interface design, prototypes and user testing.",
    },
  },
  {
    no: "03",
    fr: {
      t: "Developpement",
      d: "Developpement agile avec IA, automatisations et QA.",
    },
    en: {
      t: "Development",
      d: "Agile development with AI, automation and QA.",
    },
  },
  {
    no: "04",
    fr: { t: "Livraison", d: "Mise en ligne, documentation et formation equipe." },
    en: { t: "Delivery", d: "Go-live, documentation and team training." },
  },
  {
    no: "05",
    fr: { t: "Optimisation", d: "Optimisation continue, data et croissance." },
    en: { t: "Optimization", d: "Continuous optimization, data and growth." },
  },
];

const reasons = [
  { fr: "Expertise", en: "Expertise" },
  { fr: "Innovation", en: "Innovation" },
  { fr: "Performance", en: "Performance" },
  { fr: "Accompagnement", en: "Guidance" },
  { fr: "Support", en: "Support" },
];

const stats = [
  { value: "2+", fr: "Projets realises", en: "Projects delivered" },
  { value: "98%", fr: "Satisfaction client", en: "Client satisfaction" },
  { value: "2+", fr: "Annees d'experience", en: "Years of experience" },
];

const t = {
  fr: {
    nav: ["Accueil", "Services", "References", "Contact"],
    bookCall: "Reserver un appel",
    heroLabel: "Votre partenaire digital nouvelle generation.",
    heroPre: "Transformez votre business grace a l'",
    heroAccent: "intelligence artificielle",
    heroPost: " et aux solutions digitales modernes.",
    heroDesc:
      "AIBA Technologie accompagne les entreprises dans leur transformation digitale grace a des solutions IA innovantes, performantes et evolutives.",
    quote: "Demander un devis",
    coreUnit: "Automation Efficiency",
    delivery: "Livraison",
    deliveryVal: "15 jours",
    supportVal: "24/7",
    servicesSub:
      "Des solutions IA et digitales concues pour accelerer votre croissance.",
    aiTitle: "Intelligence Artificielle",
    digitalTitle: "Creation Digitale",
    whyTitle: "Pourquoi nous",
    whySub: "Une equipe experte, creative et oriente resultats.",
    processTitle: "Processus",
    processSub: "Une methode claire pour des livrables premium.",
    contactTitle: "Contact",
    contactSub:
      "Parlons de votre projet et construisons une solution sur mesure.",
    form: {
      name: "Nom",
      phone: "Telephone",
      email: "Email",
      message: "Message",
      send: "Envoyer",
    },
    footer: "© 2026 AIBA Technology · Tous droits reserves",
  },
  en: {
    nav: ["Home", "Services", "References", "Contact"],
    bookCall: "Book a call",
    heroLabel: "Your next-generation digital partner.",
    heroPre: "Transform your business with ",
    heroAccent: "artificial intelligence",
    heroPost: " and modern digital solutions.",
    heroDesc:
      "AIBA Technologie helps companies through their digital transformation with innovative, high-performance and scalable AI solutions.",
    quote: "Request a quote",
    coreUnit: "Automation Efficiency",
    delivery: "Delivery",
    deliveryVal: "15 days",
    supportVal: "24/7",
    servicesSub:
      "AI and digital solutions designed to accelerate your growth.",
    aiTitle: "Artificial Intelligence",
    digitalTitle: "Digital Creation",
    whyTitle: "Why us",
    whySub: "An expert, creative and results-driven team.",
    processTitle: "Process",
    processSub: "A clear method for premium deliverables.",
    contactTitle: "Contact",
    contactSub: "Let's talk about your project and build a tailored solution.",
    form: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      message: "Message",
      send: "Send",
    },
    footer: "© 2026 AIBA Technology · All rights reserved",
  },
} as const;

/* ----------------------------- Page ----------------------------- */
export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const c = t[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#accueil" className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-grad">
              AIBA
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Technology
            </span>
          </a>
          <nav className="hidden items-center gap-9 text-sm text-muted md:flex">
            {navHrefs.map((href, i) => (
              <a
                key={href}
                href={href}
                className="link-underline hover:text-foreground"
              >
                {c.nav[i]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLang((l) => (l === "fr" ? "en" : "fr"))}
              aria-label={
                lang === "fr" ? "Switch to English" : "Passer en francais"
              }
              title={lang === "fr" ? "Switch to English" : "Passer en francais"}
              className="press flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground"
            >
              {lang === "fr" ? (
                <FlagFR className="h-3.5 w-5 rounded-[2px]" />
              ) : (
                <FlagGB className="h-3.5 w-5 rounded-[2px]" />
              )}
              {lang === "fr" ? "FR" : "EN"}
            </button>
            <a
              href="#contact"
              className="press btn-ring hidden rounded-full px-4 py-2 text-sm font-medium sm:inline-flex"
            >
              {c.bookCall}
            </a>
          </div>
        </div>
      </header>

      <main id="accueil" className="relative flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--line)]">
          <div className="aurora" aria-hidden />
          <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 pb-24 pt-20 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {c.heroLabel}
              </p>
              <h1 className="mt-6 text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
                {c.heroPre}
                <span className="text-grad">{c.heroAccent}</span>
                {c.heroPost}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted text-pretty">
                {c.heroDesc}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="press btn-ring inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold"
                >
                  {c.bookCall}
                </a>
                <a
                  href="#contact"
                  className="press btn-ring inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium"
                >
                  {c.quote}
                </a>
              </div>
            </div>

            {/* Hero cards */}
            <div className="grid gap-4">
              <div className="card ring-grad rounded-2xl p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  AI Intelligence Core
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  96% <span className="text-muted">{c.coreUnit}</span>
                </p>
                <div className="progress mt-4">
                  <span style={{ width: "96%" }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">
                    {c.delivery}
                  </p>
                  <p className="mt-2 text-xl font-semibold">{c.deliveryVal}</p>
                </div>
                <div className="card p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">
                    Support
                  </p>
                  <p className="mt-2 text-xl font-semibold">{c.supportVal}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {c.nav[1]}
          </h2>
          <p className="mt-3 max-w-xl text-muted">{c.servicesSub}</p>

          {/* AI block */}
          <div className="mt-14">
            <div className="flex items-end justify-between border-b border-[var(--line)] pb-4">
              <h3 className="text-2xl font-medium tracking-tight">
                {c.aiTitle}
              </h3>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                AI Stack
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {aiServices.map((s) => (
                <article key={s.icon} className="card p-6">
                  <div className="flex items-start gap-4">
                    <span className="icon-chip shrink-0">
                      <Icon name={s.icon} />
                    </span>
                    <div>
                      <h4 className="font-medium">{s[lang].t}</h4>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {s[lang].d}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Digital block */}
          <div className="mt-16">
            <div className="flex items-end justify-between border-b border-[var(--line)] pb-4">
              <h3 className="text-2xl font-medium tracking-tight">
                {c.digitalTitle}
              </h3>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Digital Products
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {digitalServices.map((s) => (
                <article key={s.icon} className="card p-6">
                  <span className="icon-chip">
                    <Icon name={s.icon} />
                  </span>
                  <h4 className="mt-4 font-medium">{s[lang].t}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {s[lang].d}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi nous */}
        <section
          id="references"
          className="border-y border-[var(--line)] bg-[var(--background-2)]"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {c.whyTitle}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{c.whySub}</p>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div className="card p-8">
                <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {reasons.map((r) => (
                    <li
                      key={r.en}
                      className="flex items-center gap-3 text-lg"
                    >
                      <span
                        className="h-5 w-[2px] rounded-full"
                        style={{ background: "var(--grad)" }}
                        aria-hidden
                      />
                      {r[lang]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4">
                {stats.map((s) => (
                  <div
                    key={s.en}
                    className="card flex items-center justify-between p-6"
                  >
                    <span className="text-muted">{s[lang]}</span>
                    <span className="text-2xl font-semibold tabular-nums text-grad">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Processus */}
        <section className="mx-auto w-full max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {c.processTitle}
          </h2>
          <p className="mt-3 max-w-xl text-muted">{c.processSub}</p>

          <ol className="relative mt-16 space-y-10 md:space-y-0">
            <span
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
              style={{ background: "var(--grad)", opacity: 0.5 }}
              aria-hidden
            />
            {processSteps.map((p, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={p.no}
                  className="relative md:grid md:grid-cols-2 md:gap-12 md:py-6"
                >
                  <div
                    className={[
                      "flex items-start gap-5",
                      left ? "md:col-start-1" : "md:col-start-2",
                    ].join(" ")}
                  >
                    <span className="font-mono text-3xl font-bold text-faint">
                      {p.no}
                    </span>
                    <div className="card flex-1 p-6">
                      <h3 className="text-lg font-medium">{p[lang].t}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {p[lang].d}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-[var(--line)] bg-[var(--background-2)]"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {c.contactTitle}
            </h2>
            <p className="mt-3 max-w-xl text-muted">{c.contactSub}</p>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Info card */}
              <div className="card ring-grad p-8">
                <h3 className="text-xl font-semibold">AIBA Technology</h3>
                <ul className="mt-6 space-y-4 text-sm">
                  <li className="flex items-center gap-3 text-muted">
                    <span className="icon-chip h-9 w-9">
                      <Icon name="mail" />
                    </span>
                    contact@aiba-technologie.com
                  </li>
                  <li className="flex items-center gap-3 text-muted">
                    <span className="icon-chip h-9 w-9">
                      <Icon name="phone" />
                    </span>
                    +33 6 00 00 00 00
                  </li>
                  <li className="flex items-center gap-3 text-muted">
                    <span className="icon-chip h-9 w-9">
                      <Icon name="pin" />
                    </span>
                    Paris, France
                  </li>
                </ul>
              </div>

              {/* Form */}
              <form className="card p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    className="field"
                    type="text"
                    placeholder={c.form.name}
                    aria-label={c.form.name}
                  />
                  <input
                    className="field"
                    type="tel"
                    placeholder={c.form.phone}
                    aria-label={c.form.phone}
                  />
                </div>
                <input
                  className="field mt-4"
                  type="email"
                  placeholder={c.form.email}
                  aria-label={c.form.email}
                />
                <textarea
                  className="field mt-4 min-h-32 resize-y"
                  placeholder={c.form.message}
                  aria-label={c.form.message}
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="press btn-grad inline-flex h-11 items-center gap-2 rounded-full px-7 text-sm font-semibold"
                  >
                    {c.form.send}
                    <Icon name="arrow" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-8 text-center text-sm text-muted">
          {c.footer}
        </div>
      </footer>
    </div>
  );
}
