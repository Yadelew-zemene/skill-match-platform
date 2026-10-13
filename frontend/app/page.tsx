import Link from "next/link";

const opportunities = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Addis Ababa",
    type: "Full-time",
    skills: ["React", "TypeScript", "Next.js"],
    match: "92%",
  },
  {
    title: "Backend Engineer",
    company: "DigitalWorks",
    location: "Remote",
    type: "Full-time",
    skills: ["Node.js", "PostgreSQL", "API"],
    match: "88%",
  },
  {
    title: "Data Analyst",
    company: "Insight Labs",
    location: "Addis Ababa",
    type: "Hybrid",
    skills: ["Python", "SQL", "Power BI"],
    match: "84%",
  },
];

const candidates = [
  {
    initials: "AY",
    name: "Abel Yohannes",
    role: "Frontend Developer",
    experience: "2+ years experience",
    skills: ["React", "TypeScript", "Next.js"],
    availability: "Open to opportunities",
  },
  {
    initials: "MH",
    name: "Mimi Haile",
    role: "Data Analyst",
    experience: "3+ years experience",
    skills: ["Python", "SQL", "Power BI"],
    availability: "Available",
  },
  {
    initials: "DK",
    name: "Dawit Kebede",
    role: "Backend Engineer",
    experience: "4+ years experience",
    skills: ["Node.js", "PostgreSQL", "AWS"],
    availability: "Open to opportunities",
  },
];

const employers = [
  {
    initials: "TN",
    name: "TechNova",
    industry: "Technology",
    openings: 8,
  },
  {
    initials: "DW",
    name: "DigitalWorks",
    industry: "Software & Services",
    openings: 5,
  },
  {
    initials: "IL",
    name: "Insight Labs",
    industry: "Data & Analytics",
    openings: 3,
  },
];

const steps = [
  {
    number: "01",
    title: "Create your profile",
    text: "Add your experience, skills, education, and the type of opportunities you are looking for.",
  },
  {
    number: "02",
    title: "Build the right match",
    text: "SkillMatch structures candidate skills and opportunity requirements so they can be meaningfully compared.",
  },
  {
    number: "03",
    title: "Discover opportunities",
    text: "Explore relevant opportunities or candidates based on skills, requirements, and overall fit.",
  },
];

const valueProps = [
  {
    number: "01",
    title: "Structured skills",
    text: "Turn experience into a clearer representation of capabilities.",
  },
  {
    number: "02",
    title: "Relevant opportunities",
    text: "Surface opportunities that align with a candidate's skills and goals.",
  },
  {
    number: "03",
    title: "Meaningful discovery",
    text: "Help organizations look beyond simple keyword matching.",
  },
  {
    number: "04",
    title: "AI-assisted understanding",
    text: "Use AI where it helps transform unstructured information into useful matching signals.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative isolate overflow-hidden border-b border-[var(--border)]">
          {/* Ambient background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="skillmatch-pulse-glow absolute left-[-120px] top-[-180px] h-[430px] w-[430px] rounded-full bg-[var(--primary)]/[0.10] blur-[120px]" />

            <div className="skillmatch-float-slow absolute right-[-150px] top-[80px] h-[440px] w-[440px] rounded-full bg-[var(--accent)]/[0.09] blur-[130px]" />

            <div className="absolute left-1/2 top-[25%] h-[400px] w-[650px] -translate-x-1/2 rounded-full bg-[var(--primary)]/[0.035] blur-[130px]" />

            <div className="skillmatch-float absolute bottom-[-170px] left-[42%] h-[330px] w-[330px] rounded-full bg-gradient-to-br from-[var(--primary)]/[0.07] to-[var(--accent)]/[0.05] blur-[100px]" />
          </div>

          {/* Decorative grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
            {/* Hero content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                Skills-first opportunity matching
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.03] tracking-[-0.05em] text-[var(--text-primary)] sm:text-6xl lg:text-[68px]">
                Find opportunities that
                <span className="skillmatch-gradient-text block sm:inline">
                  {" "}
                  fit your skills.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                SkillMatch helps people discover relevant opportunities and
                helps organizations find talent based on skills and fit—not just
                keywords.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="skillmatch-gradient-bg skillmatch-shimmer group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/25 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                >
                  Find opportunities
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </Link>

                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-soft)] hover:shadow-md"
                >
                  Find talent
                  <span className="text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </div>

              {/* Principles */}
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Skills-first
                </span>

                <span className="flex items-center gap-2">
                  <CheckIcon />
                  AI-assisted
                </span>

                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Built for both sides
                </span>
              </div>

              {/* Small discovery hint */}
              <div className="mt-9 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["AY", "MH", "DK"].map((initials) => (
                    <div
                      key={initials}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--background)] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[9px] font-bold text-white"
                    >
                      {initials}
                    </div>
                  ))}
                </div>

                <p className="text-xs leading-5 text-[var(--text-muted)]">
                  Example profiles showing how
                  <br />
                  skill-based discovery can work.
                </p>
              </div>
            </div>

            {/* Product preview */}
            <div className="relative lg:pl-4">
              <div
                aria-hidden="true"
                className="skillmatch-pulse-glow absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-r from-[var(--primary)]/[0.12] to-[var(--accent)]/[0.10] blur-3xl"
              />

              <div className="skillmatch-glow relative rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/95 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.1rem] border border-[var(--border)] bg-[var(--background)]">
                  {/* Browser header */}
                  <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--border-strong)]" />
                        <span className="h-2 w-2 rounded-full bg-[var(--border-strong)]" />
                        <span className="h-2 w-2 rounded-full bg-[var(--border-strong)]" />
                      </div>

                      <div className="hidden h-7 w-32 rounded-md bg-[var(--surface-soft)] sm:block" />
                    </div>

                    <div className="h-7 w-7 rounded-full bg-[var(--primary-light)]" />
                  </div>

                  {/* Preview header */}
                  <div className="border-b border-[var(--border)] px-5 py-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium text-[var(--text-muted)]">
                          Recommended for you
                        </p>

                        <p className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                          Opportunities
                        </p>
                      </div>

                      <span className="rounded-full border border-[var(--primary)]/10 bg-[var(--primary-light)] px-2.5 py-1 text-[11px] font-semibold text-[var(--primary)]">
                        Skills matched
                      </span>
                    </div>

                    {/* Search bar */}
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
                      <SearchIcon />

                      <span className="text-xs text-[var(--text-muted)]">
                        Search by role, skill, or opportunity...
                      </span>
                    </div>
                  </div>

                  {/* Opportunities */}
                  <div className="space-y-3 p-4">
                    {opportunities.map((job, index) => (
                      <div
                        key={job.title}
                        className={`group rounded-xl border bg-[var(--surface)] p-4 transition-all duration-300 ${
                          index === 0
                            ? "border-[var(--primary)]/30 shadow-sm hover:-translate-y-1 hover:shadow-lg"
                            : "border-[var(--border)] hover:-translate-y-1 hover:border-[var(--primary)]/20 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 gap-3">
                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-xs font-bold text-[var(--primary)] transition-all duration-300 group-hover:scale-105">
                              {job.company.slice(0, 2).toUpperCase()}

                              <span className="absolute -right-3 -top-3 h-7 w-7 rounded-full bg-white/40 blur-md transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">
                                {job.title}
                              </h3>

                              <p className="mt-0.5 truncate text-xs text-[var(--text-muted)]">
                                {job.company} · {job.location}
                              </p>
                            </div>
                          </div>

                          <span className="shrink-0 rounded-full border border-[var(--success)]/15 bg-[var(--success-light)] px-2.5 py-1 text-xs font-bold text-[var(--success)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_18px_rgb(34_197_94_/_0.18)]">
                            {job.match}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md bg-[var(--surface-soft)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)] transition-colors duration-200 group-hover:bg-[var(--primary-light)]/60"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-[var(--border-light)] pt-3">
                          <span className="text-[11px] text-[var(--text-muted)]">
                            {job.type}
                          </span>

                          <span className="text-[11px] font-semibold text-[var(--primary)] transition-all duration-200 group-hover:translate-x-1">
                            View opportunity →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating match card */}
              <div className="skillmatch-float absolute -bottom-6 -left-6 hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--success-light)] text-[var(--success)]">
                    <CheckIcon />
                  </div>

                  <div>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Match signal
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">
                      Skills + requirements
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating skill card */}
              <div className="skillmatch-float-slow absolute -right-4 top-10 hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 shadow-lg lg:block">
                <p className="text-[10px] font-medium text-[var(--text-muted)]">
                  Relevant skills
                </p>

                <div className="mt-2 flex gap-1.5">
                  <span className="rounded-md bg-[var(--primary-light)] px-2 py-1 text-[10px] font-semibold text-[var(--primary)]">
                    React
                  </span>

                  <span className="rounded-md bg-[var(--accent-light)] px-2 py-1 text-[10px] font-semibold text-[var(--accent)]">
                    TypeScript
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            VALUE STRIP
        ====================================================== */}
        <section className="relative border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="mx-auto grid max-w-7xl divide-y divide-[var(--border)] px-5 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
            <ValueStripItem
              number="01"
              title="Skills first"
              text="Make capabilities easier to understand."
            />

            <ValueStripItem
              number="02"
              title="Meaningful matching"
              text="Compare skills with actual opportunity requirements."
            />

            <ValueStripItem
              number="03"
              title="Built for both sides"
              text="One platform for candidates and employers."
            />
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section
          id="how-it-works"
          className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] py-20 lg:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[var(--primary)]/[0.045] blur-[120px]"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                How SkillMatch works
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
                From skills to the
                <span className="skillmatch-gradient-text">
                  {" "}
                  right opportunity.
                </span>
              </h2>

              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                A straightforward process designed to make discovering talent
                and opportunities more relevant.
              </p>
            </div>

            <div className="relative mt-12 grid gap-4 md:grid-cols-3">
              {/* Connecting line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-px bg-gradient-to-r from-[var(--primary)]/10 via-[var(--primary)]/40 to-[var(--accent)]/10 md:block"
              />

              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="skillmatch-glow group relative rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
                >
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-xs font-bold text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    {step.number}
                  </div>

                  <h3 className="mt-7 text-lg font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {step.text}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="absolute right-[-13px] top-11 z-20 hidden h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] md:flex">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            OPPORTUNITIES
        ====================================================== */}
        <section
          id="discover"
          className="relative overflow-hidden border-b border-[var(--border)] py-20 lg:py-24"
        >
          <div
            aria-hidden="true"
            className="skillmatch-float-slow pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-[var(--accent)]/[0.045] blur-[110px]"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                  Discover
                </span>

                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
                  Opportunities matched to skills.
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                  Example opportunities showing how matching can become part of
                  the discovery experience.
                </p>
              </div>

              <Link
                href="/register"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
              >
                Explore opportunities
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {opportunities.map((job) => (
                <div
                  key={job.title}
                  className="skillmatch-gradient-border skillmatch-glow group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-xs font-bold text-[var(--primary)] transition-all duration-300 group-hover:scale-105">
                        {job.company.slice(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-[var(--success)]/15 bg-[var(--success-light)] px-2 py-1 text-[11px] font-bold text-[var(--success)] transition-all duration-300 group-hover:scale-105">
                      {job.match}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span>{job.location}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />
                    <span>{job.type}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-[var(--border)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)] transition-all duration-200 group-hover:border-[var(--primary)]/15 group-hover:bg-[var(--primary-light)]/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)]/40 hover:text-[var(--primary)]"
                  >
                    View opportunity
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRightIcon />
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CANDIDATES
        ====================================================== */}
        <section
          id="candidates"
          className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface-soft)] py-20 lg:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--primary)]/[0.05] blur-[110px]"
          />

          <div
            aria-hidden="true"
            className="skillmatch-float-slow pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[var(--accent)]/[0.05] blur-[110px]"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                  For candidates
                </span>

                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
                  Let your skills
                  <span className="skillmatch-gradient-text">
                    {" "}
                    speak for you.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                  Build a structured profile that makes your experience,
                  capabilities, and goals easier to understand.
                </p>
              </div>

              <Link
                href="/register"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
              >
                Create your profile
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {candidates.map((candidate) => (
                <div
                  key={candidate.name}
                  className="skillmatch-gradient-border skillmatch-glow group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-sm font-bold text-white shadow-sm transition-all duration-300 group-hover:scale-105">
                      {candidate.initials}

                      <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-white/30 blur-sm" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">
                        {candidate.name}
                      </h3>

                      <p className="mt-0.5 truncate text-xs text-[var(--text-secondary)]">
                        {candidate.role}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[var(--text-muted)]">
                    {candidate.experience}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-[var(--surface-soft)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)] transition-colors duration-200 group-hover:bg-[var(--primary-light)]/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-[var(--border-light)] pt-4 text-xs font-medium text-[var(--success)]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-50" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                    </span>

                    {candidate.availability}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            EMPLOYERS
        ====================================================== */}
        <section
          id="employers"
          className="relative overflow-hidden border-b border-[var(--border)] py-20 lg:py-24"
        >
          <div
            aria-hidden="true"
            className="skillmatch-pulse-glow pointer-events-none absolute right-[-180px] top-20 h-96 w-96 rounded-full bg-[var(--primary)]/[0.05] blur-[120px]"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                  For employers
                </span>

                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
                  Build teams around the
                  <span className="skillmatch-gradient-text">
                    {" "}
                    skills you need.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                  Define your requirements, publish opportunities, and discover
                  candidates with relevant capabilities.
                </p>
              </div>

              <Link
                href="/register"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
              >
                Start hiring
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {employers.map((employer) => (
                <div
                  key={employer.name}
                  className="skillmatch-gradient-border skillmatch-glow group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-sm font-bold text-[var(--primary)] transition-all duration-300 group-hover:scale-105">
                      {employer.initials}

                      <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white/40 blur-md" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                        {employer.name}
                      </h3>

                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {employer.industry}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3 transition-colors duration-300 group-hover:border-[var(--primary)]/15">
                      <p className="text-xl font-bold text-[var(--text-primary)]">
                        {employer.openings}
                      </p>

                      <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                        Example openings
                      </p>
                    </div>

                    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3 transition-colors duration-300 group-hover:border-[var(--accent)]/20">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        Skills
                      </p>

                      <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                        Role requirements
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[var(--border-light)] pt-4">
                    <span className="text-xs text-[var(--text-muted)]">
                      Example organization
                    </span>

                    <span className="text-xs font-semibold text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">
                      View profile →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            WHY SKILLMATCH
        ====================================================== */}
        <section className="relative overflow-hidden bg-[var(--surface-soft)] py-20 lg:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-160px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--primary)]/[0.05] blur-[130px]"
          />

          <div
            aria-hidden="true"
            className="skillmatch-float-slow pointer-events-none absolute right-[-150px] top-20 h-[400px] w-[400px] rounded-full bg-[var(--accent)]/[0.045] blur-[120px]"
          />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                Why SkillMatch
              </span>

              <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
                A better way to understand skills and
                <span className="skillmatch-gradient-text"> opportunity.</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                Instead of treating a resume or job description as a simple
                collection of keywords, SkillMatch structures the information
                that matters for matching.
              </p>

              <Link
                href="/about"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
              >
                Learn how SkillMatch works
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            <div className="grid gap-3">
              {valueProps.map((item) => (
                <div
                  key={item.title}
                  className="skillmatch-glow group flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[10px] font-bold text-[var(--primary)] transition-all duration-300 group-hover:scale-110">
                    {item.number}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="relative isolate overflow-hidden border-t border-[var(--border)] bg-[var(--surface)] py-24 lg:py-32">
          {/* Large ambient glows */}
          <div
            aria-hidden="true"
            className="skillmatch-pulse-glow absolute left-1/2 top-1/2 h-[500px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[var(--primary)]/[0.09] via-[var(--accent)]/[0.07] to-[var(--primary)]/[0.09] blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="skillmatch-float-slow absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--primary)]/[0.05] blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="skillmatch-float absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-[var(--accent)]/[0.06] blur-[110px]"
          />

          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              Get started with SkillMatch
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.05em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              Your next opportunity
              <span className="skillmatch-gradient-text block">
                starts with your skills.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
              Create your profile, make your skills visible, and start
              discovering opportunities that fit what you can actually do.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="skillmatch-gradient-bg skillmatch-shimmer group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/25"
              >
                Create your profile
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-7 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-soft)] hover:shadow-md"
              >
                Learn more
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <CheckIcon />
                Skills-first
              </span>

              <span className="flex items-center gap-1.5">
                <CheckIcon />
                AI-assisted
              </span>

              <span className="flex items-center gap-1.5">
                <CheckIcon />
                Candidate + employer
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   VALUE STRIP
========================================================= */

function ValueStripItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group flex items-start gap-4 px-0 py-7 md:px-8 lg:py-8">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[10px] font-bold text-[var(--primary)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--primary)] group-hover:text-white">
        {number}
      </span>

      <div>
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   ICONS
========================================================= */

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M11 5L16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="text-[var(--success)]"
    >
      <path
        d="M4 10.5L8 14.5L16 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-[var(--text-muted)]"
    >
      <circle
        cx="8.75"
        cy="8.75"
        r="5.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m12.75 12.75 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
