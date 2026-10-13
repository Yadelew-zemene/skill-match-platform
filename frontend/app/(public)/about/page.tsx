import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Skills first",
    description:
      "We focus on what people can do and what opportunities actually require, rather than relying only on job titles or keywords.",
  },
  {
    icon: Sparkles,
    title: "Useful AI",
    description:
      "AI should simplify the search for relevant opportunities and surface useful signals without making the experience harder to understand.",
  },
  {
    icon: Users,
    title: "Built for both sides",
    description:
      "SkillMatch is designed to help candidates discover relevant roles while helping employers identify people with relevant capabilities.",
  },
];

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Build your profile",
    description:
      "Create your professional profile and provide the skills, experience, education, and other information that represents your capabilities.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Understand the fit",
    description:
      "SkillMatch analyzes candidate profiles and opportunity requirements to identify relevant skills and matching signals.",
  },
  {
    number: "03",
    icon: Search,
    title: "Discover opportunities",
    description:
      "Candidates can focus on opportunities that align with their capabilities, while employers can discover relevant talent more efficiently.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* =========================================================
          GLOBAL ATMOSPHERIC BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Primary indigo glow */}
        <div className="absolute -left-56 -top-48 h-[38rem] w-[38rem] rounded-full bg-[var(--primary)]/10 blur-3xl" />

        {/* Cyan transition glow */}
        <div className="absolute -right-56 top-[16rem] h-[40rem] w-[40rem] rounded-full bg-[var(--accent)]/10 blur-3xl" />

        {/* Middle blended gradient */}
        <div className="absolute left-1/2 top-[30rem] h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5 blur-3xl" />

        {/* Very subtle bottom atmosphere — no strong blur */}
        <div className="absolute bottom-0 left-1/2 h-[24rem] w-[50rem] -translate-x-1/2 bg-gradient-to-t from-[var(--primary)]/[0.025] to-transparent" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        {/* Hero gradient atmosphere */}
        <div className="pointer-events-none absolute left-1/2 top-[-20rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-[var(--primary)]/10 via-[var(--accent)]/8 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            {/* =====================================================
                HERO COPY
            ===================================================== */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary-light)] px-3.5 py-1.5 text-xs font-semibold text-[var(--primary)] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                About SkillMatch
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                Connecting people with opportunities that fit their skills.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
                SkillMatch is a skills-focused talent platform built to make
                discovering relevant opportunities and finding relevant talent
                simpler, more useful, and more accessible.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] hover:shadow-xl hover:shadow-[var(--primary)]/25"
                >
                  Get started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/#how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/80 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:bg-[var(--surface)]"
                >
                  See how it works
                </Link>
              </div>

              {/* Trust signals */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                  Skills-focused matching
                </span>

                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                  AI-assisted discovery
                </span>
              </div>
            </div>

            {/* =====================================================
                PRODUCT IMAGE PLACEHOLDER
            ===================================================== */}
            <div className="relative">
              {/* Image atmosphere */}
              <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[var(--primary)]/15 via-transparent to-[var(--accent)]/15 blur-3xl" />

              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--accent)]/15 blur-2xl" />

              <div className="group relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]/90 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[var(--primary)]/25 hover:shadow-[var(--primary)]/10">
                {/* Gradient top edge */}
                <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-[var(--accent)] opacity-80" />

             
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[var(--primary-light)] via-[var(--surface)] to-[var(--accent-light)]">
                  <Image
                    src="/images/about.png"
                    alt="SkillMatch platform showing candidate and opportunity matching"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />

                  {/* Image overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--foreground)]/10 via-transparent to-transparent" />

                  {/* Placeholder label */}
                  <div className="absolute inset-x-0 bottom-0 flex justify-center p-5">
                    <span className="rounded-full border border-white/30 bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-[var(--text-secondary)] shadow-lg backdrop-blur-md">
                      SkillMatch platform visual
                    </span>
                  </div>
                </div>
              </div>

              {/* Small floating visual signal */}
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]/90 px-3.5 py-2.5 text-xs font-medium text-[var(--text-secondary)] shadow-xl backdrop-blur-md sm:flex">
                <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                Skills → matching → opportunity
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY SKILLMATCH
      ========================================================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-[-12rem] top-20 h-72 w-72 rounded-full bg-[var(--primary)]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                Why SkillMatch
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                The way people are matched with opportunities can be better.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-7 text-[var(--text-secondary)]">
              <p>
                Finding a job or finding the right candidate often starts with
                keywords, job titles, and long lists of applications. Those
                signals can be useful, but they do not always capture the
                capabilities behind someone's experience.
              </p>

              <p>
                SkillMatch puts skills and opportunity requirements closer to
                the center of the matching process.
              </p>

              <p>
                The goal is simple: help candidates and employers spend more
                attention on the opportunities and people that are actually
                relevant.
              </p>

              <div className="pt-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--primary)]/15 bg-[var(--primary-light)] px-4 py-2.5 text-sm font-medium text-[var(--primary)] transition-all duration-300 hover:border-[var(--primary)]/30 hover:shadow-md hover:shadow-[var(--primary)]/5">
                  <Sparkles className="h-4 w-4" />
                  Skills → signals → opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT WE DO
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--surface-soft)]">
        {/* Section transition */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[40rem] -translate-x-1/2 bg-gradient-to-b from-[var(--primary)]/[0.04] to-transparent" />

        <div className="pointer-events-none absolute right-[-10rem] top-[-10rem] h-80 w-80 rounded-full bg-[var(--accent)]/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              What SkillMatch does
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A clearer connection between skills and opportunity.
            </h2>

            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              SkillMatch brings candidate information and opportunity
              requirements together to create useful matching signals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "For candidates",
                text: "Build a profile around your skills and experience, discover relevant opportunities, and understand why a role may fit.",
              },
              {
                icon: Target,
                title: "For employers",
                text: "Describe the capabilities a role requires and discover candidates whose profiles contain relevant signals.",
              },
              {
                icon: BrainCircuit,
                title: "AI-assisted matching",
                text: "Use intelligent analysis to identify relationships between skills, experience, requirements, and opportunities.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/25 hover:shadow-xl hover:shadow-[var(--primary)]/5"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[var(--primary)]/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--primary)]/10 bg-[var(--primary-light)] text-[var(--primary)] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section id="how-it-works" className="relative overflow-hidden">
        <div className="pointer-events-none absolute bottom-[-12rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--primary)]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              How it works
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              From profile to relevant opportunity.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              SkillMatch keeps the experience straightforward while intelligent
              matching works behind the scenes.
            </p>
          </div>

          <div className="relative mt-14">
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-gradient-to-r from-[var(--primary)]/10 via-[var(--primary)]/30 to-[var(--accent)]/10 md:block" />

            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/25 hover:shadow-xl hover:shadow-slate-900/5"
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]/20 bg-[var(--surface)] text-xs font-bold text-[var(--primary)] shadow-sm">
                        {step.number}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-soft)] text-[var(--primary)] transition-colors duration-300 group-hover:bg-[var(--primary-light)]">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRINCIPLES
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--surface-soft)]">
        <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[var(--primary)]/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              Our principles
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Technology should make the process more useful.
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className={`group grid gap-5 p-6 transition-colors duration-300 hover:bg-[var(--surface-soft)] sm:grid-cols-[auto_180px_1fr] sm:items-center sm:p-8 ${
                    index !== principles.length - 1
                      ? "border-b border-[var(--border)]"
                      : ""
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold">{principle.title}</h3>

                  <p className="text-sm leading-6 text-[var(--text-secondary)]">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
          No external blur behind the text.
      ========================================================= */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="group relative overflow-hidden rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)] via-[#5548d8] to-[var(--accent)] px-6 py-14 text-center text-white shadow-2xl shadow-[var(--primary)]/20 transition-all duration-500 sm:px-12">
            {/* =====================================================
                CTA GRADIENT DETAILS

                These are inside the CTA only.
                They do NOT sit behind the page text.
            ===================================================== */}

            {/* Top-right cyan transition */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-125" />

            {/* Bottom-left subtle transition */}
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[var(--accent)]/20 transition-transform duration-700 group-hover:scale-110" />

            {/* Subtle diagonal light transition */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                <Sparkles className="h-6 w-6" />
              </div>

              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Your next opportunity starts with your skills.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75">
                Create your SkillMatch profile and start discovering
                opportunities that align with what you can do.
              </p>

              <div className="mt-8">
                <Link
                  href="/register"
                  className="group/button inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-[var(--primary)] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-xl"
                >
                  Create your profile
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
