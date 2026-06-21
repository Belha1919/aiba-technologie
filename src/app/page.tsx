const services = [
  {
    no: "01",
    title: "Web & App Engineering",
    desc: "Production-grade web and mobile products built on modern frameworks — fast, accessible, and made to scale.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    no: "02",
    title: "AI & Automation",
    desc: "Practical AI woven into real workflows: assistants, retrieval, and automations that remove busywork.",
    tags: ["LLMs", "RAG", "Agents"],
  },
  {
    no: "03",
    title: "Cloud & DevOps",
    desc: "Reliable infrastructure, CI/CD, and observability so what you ship stays up and ships often.",
    tags: ["AWS", "Docker", "CI/CD"],
  },
  {
    no: "04",
    title: "Product Design",
    desc: "Interfaces with a point of view — research, systems, and craft that make software feel effortless.",
    tags: ["UX", "Design systems", "Prototyping"],
  },
];

const stats = [
  { value: "8+", label: "Years building software" },
  { value: "40+", label: "Products shipped" },
  { value: "100%", label: "Senior engineering" },
];

const ticker = [
  "Web Engineering",
  "AI Integration",
  "Cloud & DevOps",
  "Product Design",
  "Automation",
  "Data Platforms",
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="text-base font-semibold tracking-tight">aiba</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Technologie
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#services" className="link-underline hover:text-foreground">
              Services
            </a>
            <a href="#approach" className="link-underline hover:text-foreground">
              Approach
            </a>
            <a href="#contact" className="link-underline hover:text-foreground">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="press rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
          >
            Start a project
          </a>
        </div>
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-20 sm:pt-28">
            <p className="rise d1 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              Software &amp; AI engineering studio
            </p>
            <h1 className="rise d2 mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-balance">
              We build technology that moves business forward.
            </h1>
            <p className="rise d3 mt-8 max-w-xl text-lg leading-8 text-muted text-pretty">
              AIBA Technologie partners with teams to design and engineer web
              apps, intelligent automation, and cloud platforms — from first
              prototype to production scale.
            </p>
            <div className="rise d4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="press inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-colors hover:opacity-90"
              >
                Start a project
              </a>
              <a
                href="#services"
                className="press inline-flex h-12 items-center justify-center rounded-full border border-[var(--line-strong)] px-7 text-sm font-medium transition-colors hover:bg-surface"
              >
                Explore our work
              </a>
            </div>

            <dl className="rise d5 mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Capability ticker */}
        <section className="overflow-hidden border-b py-5">
          <div className="flex w-max marquee-track" aria-hidden>
            {[...ticker, ...ticker].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-8 whitespace-nowrap px-8 font-mono text-sm uppercase tracking-[0.18em] text-faint"
              >
                {t}
                <span className="text-foreground/30">/</span>
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="flex flex-col justify-between gap-6 border-b pb-10 md:flex-row md:items-end">
            <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
              What we do, end to end.
            </h2>
            <p className="max-w-sm text-muted">
              One senior team across strategy, design, and engineering — so
              nothing gets lost in the handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {services.map((s, i) => {
              const isLastRow = i >= services.length - 2; // 2-col grid
              const isLeftCol = i % 2 === 0;
              return (
              <article
                key={s.no}
                className={[
                  "row-hover group relative flex flex-col gap-4 py-10 transition-colors hover:bg-surface md:px-8",
                  isLeftCol ? "md:border-r" : "",
                  // bottom hairline on mobile (every item but last) and desktop (first row only)
                  i < services.length - 1 ? "border-b" : "",
                  isLastRow ? "md:border-b-0" : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span className="row-index font-mono text-sm text-faint">
                    {s.no}
                  </span>
                  <span
                    className="row-arrow text-xl text-muted"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                <h3 className="text-2xl font-medium tracking-tight">
                  {s.title}
                </h3>
                <p className="max-w-md leading-7 text-muted">{s.desc}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border px-3 py-1 font-mono text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
              );
            })}
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="border-y bg-surface">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 md:grid-cols-[0.8fr_1fr]">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
              Small team. <br className="hidden sm:block" />
              Serious craft.
            </h2>
            <div className="grid gap-px">
              {[
                {
                  k: "Listen first",
                  v: "We start with your problem, your users, and your constraints — not a template.",
                },
                {
                  k: "Ship in weeks",
                  v: "Tight feedback loops and working software early, so you steer with something real.",
                },
                {
                  k: "Built to last",
                  v: "Tested, documented, and handed over clean — code your team can own and grow.",
                },
              ].map((row, i) => (
                <div
                  key={row.k}
                  className="flex flex-col gap-2 border-t py-7 sm:flex-row sm:gap-10"
                >
                  <div className="flex items-baseline gap-4 sm:w-56 sm:shrink-0">
                    <span className="font-mono text-xs text-faint tabular-nums">
                      0{i + 1}
                    </span>
                    <h3 className="text-lg font-medium">{row.k}</h3>
                  </div>
                  <p className="leading-7 text-muted">{row.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-28">
          <div className="flex flex-col items-start gap-8">
            <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-balance">
              Have something to build? Let&apos;s make it real.
            </h2>
            <p className="max-w-md text-lg leading-8 text-muted">
              Tell us about your project. We&apos;ll get back within one
              business day.
            </p>
            <a
              href="mailto:hello@aiba-technologie.com"
              className="press group inline-flex h-[3.25rem] items-center gap-3 rounded-full bg-foreground px-7 text-base font-medium text-background transition-colors hover:opacity-90"
            >
              hello@aiba-technologie.com
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight">aiba</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Technologie
            </span>
          </div>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} AIBA Technologie. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#services" className="link-underline hover:text-foreground">
              Services
            </a>
            <a href="#contact" className="link-underline hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
