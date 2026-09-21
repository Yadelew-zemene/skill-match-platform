"use client";

import Link from "next/link";

const skills = [
  ["React", "94%"],
  ["TypeScript", "89%"],
  ["Node.js", "91%"],
  ["SQL", "82%"],
];

const steps = [
  {
    number: "01",
    title: "Build your profile",
    text: "Upload your resume and turn your experience into a structured skill profile.",
  },
  {
    number: "02",
    title: "Understand the fit",
    text: "SkillMatch analyzes skills and requirements to identify meaningful compatibility.",
  },
  {
    number: "03",
    title: "Discover your match",
    text: "Find opportunities or talent based on what actually matters: skills and fit.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          {/* SINGLE SUBTLE AMBIENT GLOW */}
          <div className="pointer-events-none absolute left-1/2 top-[-350px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--brand)]/[0.045] blur-[140px]" />

          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:pb-28 lg:pt-28">
            {/* HERO COPY */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                Intelligent skill matching
              </p>

              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Find the{" "}
                <span className="text-[var(--brand)]">right match.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
                Connect people with opportunities through skills that actually
                matter.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--brand)] px-6 py-3.5 font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
                >
                  Find opportunities
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3.5 font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-elevated)]"
                >
                  Hire talent
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--muted-foreground)]">
                <span>✓ Skill-based</span>
                <span>✓ AI-assisted</span>
                <span>✓ Opportunity-focused</span>
              </div>
            </div>

            {/* PRODUCT PREVIEW */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-2xl shadow-black/30">
                {/* APP HEADER */}
                <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />

                    <span className="text-sm font-semibold">SkillMatch</span>
                  </div>

                  <span className="text-xs text-[var(--muted-foreground)]">
                    Match analysis
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  {/* MATCH HEADER */}
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                        Strong match
                      </p>

                      <h3 className="mt-2 text-xl font-semibold">
                        Frontend Developer
                      </h3>

                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        Candidate skill profile
                      </p>
                    </div>

                    <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border-4 border-[var(--brand)]/20 bg-[var(--brand)]/[0.08]">
                      <span className="text-lg font-bold text-[var(--brand)]">
                        92%
                      </span>
                    </div>
                  </div>

                  {/* SKILLS */}
                  <div className="mt-8 space-y-5">
                    {skills.map(([skill, score]) => (
                      <div key={skill}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-[var(--foreground)]">
                            {skill}
                          </span>

                          <span className="text-[var(--muted-foreground)]">
                            {score}
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full bg-[var(--brand)]"
                            style={{ width: score }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* MATCHED SKILLS */}
                  <div className="mt-7 border-t border-[var(--border)] pt-6">
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                      Matched skills
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "TypeScript",
                        "Node.js",
                        "REST API",
                        "SQL",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-2.5 py-1.5 text-xs text-[var(--muted)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            VALUE STRIP
        ====================================================== */}
        <section className="border-b border-[var(--border)] bg-[var(--surface-soft)]">
          <div className="mx-auto grid max-w-7xl sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Skills",
                text: "Understand what candidates can actually do.",
              },
              {
                number: "02",
                title: "Matching",
                text: "Connect people with relevant opportunities.",
              },
              {
                number: "03",
                title: "Intelligence",
                text: "Turn resumes into useful hiring signals.",
              },
            ].map((item, index) => (
              <div
                key={item.number}
                className={`px-6 py-8 lg:px-8 ${
                  index !== 0
                    ? "border-t border-[var(--border)] sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <span className="text-xs font-bold tracking-[0.15em] text-[var(--brand)]">
                  {item.number}
                </span>

                <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section
          id="how-it-works"
          className="border-b border-[var(--border)] py-24 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                How it works
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
                From experience to opportunity.
              </h2>

              <p className="mt-5 text-base leading-7 text-[var(--muted)]">
                SkillMatch turns resumes, skills, and job requirements into
                structured information that can be meaningfully compared.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 transition hover:border-[var(--border-strong)]"
                >
                  <span className="text-sm font-bold text-[var(--brand)]">
                    {step.number}
                  </span>

                  <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FOR BOTH SIDES
        ====================================================== */}
        <section className="bg-[var(--surface-soft)] py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                One platform
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
                Built for both sides of the opportunity.
              </h2>

              <p className="mt-5 leading-7 text-[var(--muted)]">
                Whether you're building your career or building a team,
                SkillMatch starts with skills.
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {/* CANDIDATES */}
              <div
                id="candidates"
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10"
              >
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand)]">
                  For candidates
                </span>

                <h3 className="mt-5 text-3xl font-bold tracking-tight">
                  Make your skills visible.
                </h3>

                <p className="mt-5 max-w-lg leading-7 text-[var(--muted)]">
                  Build a structured profile from your experience, understand
                  your strengths, and discover opportunities that align with
                  what you can do.
                </p>

                <Link
                  href="/register"
                  className="mt-8 inline-flex rounded-lg bg-[var(--brand)] px-5 py-3 font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
                >
                  Create candidate account
                </Link>
              </div>

              {/* EMPLOYERS */}
              <div
                id="employers"
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10"
              >
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  For employers
                </span>

                <h3 className="mt-5 text-3xl font-bold tracking-tight">
                  Find talent that fits.
                </h3>

                <p className="mt-5 max-w-lg leading-7 text-[var(--muted)]">
                  Define the skills your roles require and discover candidates
                  based on relevant capabilities rather than relying only on
                  keywords.
                </p>

                <Link
                  href="/register"
                  className="mt-8 inline-flex rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-5 py-3 font-semibold text-[var(--foreground)] transition hover:border-white/20"
                >
                  Start hiring
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHY SKILLMATCH
        ====================================================== */}
        <section className="border-b border-[var(--border)] py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                Why SkillMatch
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
                Stop matching people by keywords alone.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-[var(--muted)]">
                Resumes and job descriptions contain more information than a
                list of matching words. SkillMatch focuses on the underlying
                skills and requirements to create a more useful picture of
                compatibility.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                "Structured skill profiles",
                "Skill-based opportunity discovery",
                "AI-assisted resume understanding",
                "Candidate-to-job compatibility",
              ].map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/[0.1] text-xs font-bold text-[var(--brand)]">
                    {index + 1}
                  </span>

                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand)]/[0.035] blur-[120px]" />

          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              Start with the right skills
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
              The right skills deserve the right opportunity.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-[var(--muted)]">
              Build your profile, discover opportunities, or find the talent
              your team needs.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--brand)] px-7 py-3.5 font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
              >
                Get started
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-7 py-3.5 font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-elevated)]"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface-soft)]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            {/* BRAND */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-black text-[#080A0D]">
                  S
                </div>

                <span className="text-xl font-bold tracking-tight">
                  Skill<span className="text-[var(--brand)]">Match</span>
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">
                Intelligent skill-based matching for people and opportunities.
              </p>
            </div>

            {/* PLATFORM */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                Platform
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/#how-it-works"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  How it works
                </Link>

                <Link
                  href="/#candidates"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  Candidates
                </Link>

                <Link
                  href="/#employers"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  Employers
                </Link>
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                Company
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/about"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  About
                </Link>

                <Link
                  href="/contacts"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  Contact
                </Link>

                <Link
                  href="/login"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} SkillMatch. All rights reserved.</p>

            <p>Built around skills. Designed for opportunity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
