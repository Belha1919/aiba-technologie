"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type JSX,
} from "react";
import Image from "next/image";
import { Search, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";
import { NotchNav } from "@/components/ui/notch-nav";

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

/* --------------------- Count-up (on scroll into view) --------------------- */
function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const [n, setN] = useState(match ? 0 : target);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const dur = 1100;
        const start = performance.now();
        const tick = (t: number) => {
          // clamp to [0,1] — throttled tabs can hand back a rAF timestamp < start
          const p = Math.min(Math.max((t - start) / dur, 0), 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
          setN(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // `value`/`target` are primitives → stable across renders (unlike the regex match object)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, target]);

  return (
    <span ref={ref} className={className}>
      {match ? n + suffix : value}
    </span>
  );
}

/* ----------------------------- Content ----------------------------- */
const navHrefs = ["#accueil", "#services", "#references", "#processus", "#contact"];

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

type ProcessNode = {
  id: number;
  icon: ElementType;
  status: "completed" | "in-progress" | "pending";
  energy: number;
  relatedIds: number[];
  fr: { title: string; date: string; content: string };
  en: { title: string; date: string; content: string };
};

const processTimeline: ProcessNode[] = [
  {
    id: 1,
    icon: Search,
    status: "completed",
    energy: 100,
    relatedIds: [2],
    fr: {
      title: "Analyse",
      date: "Étape 01",
      content: "Audit des besoins, cadrage des objectifs et priorites.",
    },
    en: {
      title: "Analysis",
      date: "Step 01",
      content: "Needs audit, goal setting and prioritization.",
    },
  },
  {
    id: 2,
    icon: PenTool,
    status: "completed",
    energy: 85,
    relatedIds: [1, 3],
    fr: {
      title: "Design UX/UI",
      date: "Étape 02",
      content: "Design d'interfaces futuristes, prototypes et tests utilisateurs.",
    },
    en: {
      title: "UX/UI Design",
      date: "Step 02",
      content: "Futuristic interface design, prototypes and user testing.",
    },
  },
  {
    id: 3,
    icon: Code2,
    status: "in-progress",
    energy: 65,
    relatedIds: [2, 4],
    fr: {
      title: "Developpement",
      date: "Étape 03",
      content: "Developpement agile avec IA, automatisations et QA.",
    },
    en: {
      title: "Development",
      date: "Step 03",
      content: "Agile development with AI, automation and QA.",
    },
  },
  {
    id: 4,
    icon: Rocket,
    status: "pending",
    energy: 40,
    relatedIds: [3, 5],
    fr: {
      title: "Livraison",
      date: "Étape 04",
      content: "Mise en ligne, documentation et formation equipe.",
    },
    en: {
      title: "Delivery",
      date: "Step 04",
      content: "Go-live, documentation and team training.",
    },
  },
  {
    id: 5,
    icon: TrendingUp,
    status: "pending",
    energy: 20,
    relatedIds: [4],
    fr: {
      title: "Optimisation",
      date: "Étape 05",
      content: "Optimisation continue, data et croissance.",
    },
    en: {
      title: "Optimization",
      date: "Step 05",
      content: "Continuous optimization, data and growth.",
    },
  },
];

const projects: {
  id: string;
  url: string;
  tags: string[];
  fr: { name: string; category: string; desc: string; cta: string };
  en: { name: string; category: string; desc: string; cta: string };
}[] = [
  {
    id: "fromscratch",
    url: "https://from-scratch.app",
    tags: ["Next.js", "AI", "Full-stack", "SaaS"],
    fr: {
      name: "FromScratch",
      category: "SaaS · Plateforme IA",
      desc: "Plateforme de creation d'applications et de sites web par l'IA : l'utilisateur decrit son idee en langage naturel, et la plateforme genere un produit full-stack complet.",
      cta: "Voir le projet",
    },
    en: {
      name: "FromScratch",
      category: "SaaS · AI platform",
      desc: "An AI platform that turns a plain-language idea into a complete full-stack app or website — describe it, and it gets built.",
      cta: "View project",
    },
  },
];

const stats = [
  { value: "2+", fr: "Projets realises", en: "Projects delivered" },
  { value: "98%", fr: "Satisfaction client", en: "Client satisfaction" },
  { value: "2+", fr: "Annees d'experience", en: "Years of experience" },
];

const tickerItems = [
  "Intelligence Artificielle",
  "Automatisation",
  "Chatbots IA",
  "Agents IA",
  "Sites Web",
  "E-Commerce",
  "Applications Mobiles",
  "SaaS",
];

const t = {
  fr: {
    nav: ["Accueil", "Services", "References", "Processus", "Contact"],
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
    whyTitle: "References",
    whySub: "Des projets concrets que nous avons concus et developpes.",
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
    nav: ["Home", "Services", "References", "Process", "Contact"],
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
    whyTitle: "References",
    whySub: "Real projects we have designed and built.",
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

/* helper: typed CSS var style */
const v = (i: number): CSSProperties => ({ ["--i"]: i } as CSSProperties);

/* ----------------------------- Page ----------------------------- */
export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const c = t[lang];
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("accueil");

  const navItems = navHrefs.map((href, i) => ({
    value: href.slice(1),
    label: c.nav[i],
  }));

  const handleNavChange = (value: string) => {
    setActiveSection(value);
    document
      .getElementById(value)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Scroll-spy: highlight the nav item for the section currently in view
  useEffect(() => {
    const ids = navHrefs.map((h) => h.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Scroll-reveal + pointer spotlight + header/scroll-progress
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    // 1) Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    revealEls.forEach((el) => io.observe(el));

    // 2) Pointer spotlight on cards (rAF-throttled)
    let raf = 0;
    const onMove = (ev: PointerEvent) => {
      const card = (ev.target as HTMLElement)?.closest<HTMLElement>(".card");
      if (!card) return;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        card.style.setProperty("--my", `${ev.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // 3) Header condense + scroll progress
    let raf2 = 0;
    const onScroll = () => {
      if (raf2) return;
      raf2 = requestAnimationFrame(() => {
        raf2 = 0;
        const y = window.scrollY;
        headerRef.current?.classList.toggle("scrolled", y > 8);
        const h =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? Math.min(y / h, 1) : 0;
        progressRef.current?.style.setProperty("--p", `${p}`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      {/* Scroll progress */}
      <div ref={progressRef} className="scroll-progress" aria-hidden />

      {/* Header */}
      <header
        ref={headerRef}
        className="site-header sticky top-0 z-50 border-b border-[var(--line)] bg-background/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#accueil" className="press flex items-center">
            <Image
              src="/aiba-logo.png"
              alt="AIBA"
              width={130}
              height={63}
              priority
              className="h-10 w-auto"
            />
          </a>
          <NotchNav
            items={navItems}
            value={activeSection}
            onValueChange={handleNavChange}
            ariaLabel={lang === "fr" ? "Navigation principale" : "Primary"}
            className="hidden md:block"
          />
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
              <p className="rise d1 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {c.heroLabel}
              </p>
              <h1 className="rise d2 mt-6 text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
                {c.heroPre}
                <span className="text-grad">{c.heroAccent}</span>
                {c.heroPost}
              </h1>
              <p className="rise d3 mt-7 max-w-xl text-lg leading-8 text-muted text-pretty">
                {c.heroDesc}
              </p>
              <div className="rise d4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            <div className="rise d5 grid gap-4" data-reveal>
              <div className="card ring-grad rounded-2xl p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  AI Intelligence Core
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  <CountUp value="96%" />{" "}
                  <span className="text-muted">{c.coreUnit}</span>
                </p>
                <div
                  className="progress mt-4"
                  data-reveal
                  style={{ ["--val"]: "96%" } as CSSProperties}
                >
                  <span />
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

        {/* Capability marquee */}
        <section className="overflow-hidden border-b border-[var(--line)] py-5">
          <div className="marquee-mask">
            <div className="marquee-track">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-6 whitespace-nowrap px-6 font-mono text-sm uppercase tracking-[0.18em] text-faint"
                >
                  {item}
                  <span
                    className="inline-block h-1 w-1 rounded-full"
                    style={{ background: "var(--accent-violet)" }}
                    aria-hidden
                  />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-24">
          <h2
            className="reveal text-3xl font-semibold tracking-tight sm:text-4xl"
            data-reveal
          >
            {c.nav[1]}
          </h2>
          <p className="reveal mt-3 max-w-xl text-muted" data-reveal style={v(1)}>
            {c.servicesSub}
          </p>

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
              {aiServices.map((s, i) => (
                <article
                  key={s.icon}
                  className="card reveal p-6"
                  data-reveal
                  style={v(i % 2)}
                >
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
              {digitalServices.map((s, i) => (
                <article
                  key={s.icon}
                  className="card reveal p-6"
                  data-reveal
                  style={v(i % 3)}
                >
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
            <h2
              className="reveal text-3xl font-semibold tracking-tight sm:text-4xl"
              data-reveal
            >
              {c.whyTitle}
            </h2>
            <p className="reveal mt-3 max-w-xl text-muted" data-reveal style={v(1)}>
              {c.whySub}
            </p>

            {/* Dynamic project cards */}
            <div className="mt-12 grid gap-6">
              {projects.map((p, i) => (
                <article
                  key={p.id}
                  className="card reveal group overflow-hidden md:grid md:grid-cols-2"
                  data-reveal
                  style={v(i)}
                >
                  {/* Preview: real screenshot in a browser frame */}
                  <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden p-8">
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(120% 90% at 50% 12%, rgba(30,155,240,0.30), transparent 62%)",
                      }}
                      aria-hidden
                    />
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={p[lang].name}
                      className="relative block w-full max-w-md overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[#05060d] shadow-2xl transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="ml-3 truncate font-mono text-[10px] text-faint">
                          from-scratch.app
                        </span>
                      </div>
                      <Image
                        src="/projects/fromscratch.png"
                        alt="FromScratch — apercu du site"
                        width={2560}
                        height={1600}
                        className="block h-auto w-full"
                      />
                    </a>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-center gap-4 border-t border-[var(--line)] p-8 md:border-l md:border-t-0">
                    <span className="w-fit rounded-full border border-[var(--line)] px-3 py-1 font-mono text-xs text-accent">
                      {p[lang].category}
                    </span>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {p[lang].name}
                    </h3>
                    <p className="leading-7 text-muted">{p[lang].desc}</p>
                    <ul className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-xs text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="press group/link mt-1 inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground"
                    >
                      {p[lang].cta}
                      <span className="transition-transform group-hover/link:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Proof stats */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((s, i) => (
                <div
                  key={s.en}
                  className="card reveal flex items-center justify-between p-6"
                  data-reveal
                  style={v(i)}
                >
                  <span className="text-muted">{s[lang]}</span>
                  <CountUp
                    value={s.value}
                    className="text-2xl font-semibold tabular-nums text-grad"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processus — modern horizontal stepper */}
        <section id="processus" className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="text-center">
            <h2
              className="reveal text-3xl font-semibold tracking-tight sm:text-4xl"
              data-reveal
            >
              {c.processTitle}
            </h2>
            <p
              className="reveal mx-auto mt-3 max-w-xl text-muted"
              data-reveal
              style={v(1)}
            >
              {c.processSub}
            </p>
          </div>

          <div className="relative mt-16">
            {/* Connecting track that draws in (desktop only) */}
            <span
              className="proc-track absolute left-[10%] right-[10%] top-7 hidden h-[2px] lg:block"
              style={{ background: "var(--grad)", opacity: 0.6 }}
              data-reveal
              aria-hidden
            />
            <ol className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
              {processTimeline.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li
                    key={s.id}
                    className="proc-step reveal flex flex-col items-center text-center"
                    data-reveal
                    style={v(i)}
                  >
                    <span className="proc-badge">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                    <span className="mt-5 font-mono text-xs tracking-[0.2em] text-faint">
                      0{i + 1}
                    </span>
                    <h3 className="mt-1 text-base font-medium">
                      {s[lang].title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {s[lang].content}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-[var(--line)] bg-[var(--background-2)]"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <h2
              className="reveal text-3xl font-semibold tracking-tight sm:text-4xl"
              data-reveal
            >
              {c.contactTitle}
            </h2>
            <p className="reveal mt-3 max-w-xl text-muted" data-reveal style={v(1)}>
              {c.contactSub}
            </p>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Info card */}
              <div className="card ring-grad reveal p-8" data-reveal>
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
              <form className="card reveal p-8" data-reveal style={v(1)}>
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
