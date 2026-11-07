"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  Target,
} from "lucide-react";

const skills = ["React", "TypeScript", "Node.js", "Python", "SQL", "REST APIs"];

const candidateFeatures = [
  "Create and manage your candidate profile",
  "Upload and manage your resume",
  "Discover jobs based on your skills",
  "Review job details and apply",
  "Track your application status",
];

const candidateWorkflow = [
  {
    number: "01",
    title: "Your profile",
    description: "Keep your professional information organized",
  },
  {
    number: "02",
    title: "Your resume",
    description: "Upload a resume and identify your skills",
  },
  {
    number: "03",
    title: "Job opportunities",
    description: "Discover and compare relevant job listings",
  },
  {
    number: "04",
    title: "Applications",
    description: "Follow the progress of your applications",
  },
];

const employerWorkflow = [
  {
    icon: BriefcaseBusiness,
    title: "Create job listings",
    description: "Publish job descriptions and required skills",
  },
  {
    icon: Users,
    title: "Review applicants",
    description: "Explore candidate applications and skill information",
  },
  {
    icon: ShieldCheck,
    title: "Evaluate candidates",
    description: "Use matching information to support your review",
  },
  {
    icon: CheckCircle2,
    title: "Manage applications",
    description: "Update candidate application statuses",
  },
];

const employerFeatures = [
  "Create and publish job opportunities",
  "Specify the skills required for each job",
  "View applications for your job listings",
  "Review candidate skills and match information",
  "Manage application decisions and statuses",
];

const productPrinciples = [
  {
    icon: FileText,
    title: "Skills matter",
    description:
      "Extract and organize skills from resumes, then relate them to the requirements of available jobs.",
  },
  {
    icon: Search,
    title: "Discovery matters",
    description:
      "Give candidates a practical way to search, filter, and explore opportunities that fit their professional skills.",
  },
  {
    icon: ShieldCheck,
    title: "Human review matters",
    description:
      "Matching information supports employer evaluation. Employers remain responsible for their recruitment decisions.",
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#3157d5]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#08a6a6]" />
      {children}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3157d5] via-[#176fc9] to-[#08a6a6] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/30"
    >
      {children}
      <ArrowRight
        size={17}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d0d5dd] bg-white px-7 py-3.5 text-sm font-semibold text-[#172033] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3157d5]/50 hover:bg-[#eaf0ff]"
    >
      {children}
    </Link>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#3157d5]/30 hover:shadow-xl hover:shadow-blue-900/5">
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#3157d5]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#3157d5]/15 bg-gradient-to-br from-[#eaf0ff] to-[#e6f8f7] text-[#3157d5] transition-transform duration-300 group-hover:scale-105">
        <Icon size={22} />
      </div>

      <h3 className="relative mt-6 text-lg font-semibold text-[#172033]">
        {title}
      </h3>

      <p className="relative mt-3 text-sm leading-7 text-[#475467]">
        {description}
      </p>
    </div>
  );
}

function WorkflowItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-4 rounded-xl border border-[#e4e7ec] bg-white p-4 transition-all duration-300 hover:border-[#3157d5]/30 hover:bg-[#f5f8ff]">
      <span className="pt-0.5 text-xs font-bold text-[#3157d5] transition-colors duration-300 group-hover:text-[#08a6a6]">
        {number}
      </span>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#172033]">{title}</p>
        <p className="mt-1 text-xs leading-6 text-[#667085]">{description}</p>
      </div>

      <CheckCircle2
        size={17}
        className="ml-auto mt-0.5 shrink-0 text-[#98a2b3] transition-colors duration-300 group-hover:text-[#12b76a]"
      />
    </div>
  );
}

export default function HomePage() {
  const brandStyles = {
    "--primary": "#3157d5",
    "--primary-hover": "#2443a8",
    "--primary-light": "#eaf0ff",
    "--accent": "#08a6a6",
    "--accent-light": "#e6f8f7",
    "--background": "#ffffff",
    "--foreground": "#172033",
    "--surface": "#ffffff",
    "--surface-soft": "#f2f5f9",
    "--text-primary": "#172033",
    "--text-secondary": "#475467",
    "--text-muted": "#667085",
    "--text-disabled": "#98a2b3",
    "--border": "#e4e7ec",
    "--border-light": "#f0f2f5",
    "--border-strong": "#d0d5dd",
    "--success": "#12b76a",
    "--success-light": "#ecfdf3",
  } as CSSProperties;

  return (
    <main
      className="relative isolate min-h-screen overflow-hidden bg-white text-[#172033]"
      style={{
        ...brandStyles,
        backgroundColor: "#ffffff",
        color: "#172033",
        colorScheme: "light",
      }}
    >
      {/* Background: white with subtle blue and teal atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(49,87,213,0.09) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 -top-40 z-0 h-[600px] w-[600px] rounded-full bg-[#3157d5]/10 blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-[650px] z-0 h-[600px] w-[600px] rounded-full bg-[#08a6a6]/10 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[1800px] z-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#3157d5]/5 blur-[140px]"
      />

      {/* HERO */}

      <section className="relative z-10 bg-gradient-to-br from-white via-white to-[#f0f5ff]/70">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#3157d5]/10 blur-[140px]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-10 lg:py-28">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#3157d5]/15 bg-gradient-to-r from-[#eaf0ff] to-[#e6f8f7] px-4 py-2 text-xs font-semibold text-[#3157d5] shadow-sm">
              <Sparkles size={14} className="text-[#08a6a6]" />A smarter way to
              connect skills with opportunities
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.13] tracking-tight text-[#172033] sm:text-5xl lg:text-[58px]">
              Find opportunities that{" "}
              <span className="bg-gradient-to-r from-[#3157d5] via-[#176fc9] to-[#08a6a6] bg-clip-text text-transparent">
                match your skills.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#475467] sm:text-lg">
              SkillMatch helps candidates discover relevant jobs and gives
              employers a clearer way to review applications through resume
              skill extraction and skill-based matching.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/register">Create an account</PrimaryButton>
              <SecondaryButton href="/login">
                Sign in to SkillMatch
              </SecondaryButton>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[#475467]">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#12b76a]" />
                Resume-based discovery
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#12b76a]" />
                Skill-based matching
              </span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-[#3157d5]/15 via-transparent to-[#08a6a6]/15 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-[#e4e7ec] bg-white p-2 shadow-2xl shadow-[#172033]/10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#eaf0ff] via-white to-[#e6f8f7]">
                <Image
                  src="/images/about-hero.png"
                  alt="SkillMatch platform illustration"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-[#e4e7ec] bg-white px-4 py-3 shadow-xl sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f8f7] text-[#08a6a6]">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#172033]">
                  Skills meet opportunity
                </p>
                <p className="mt-0.5 text-[11px] text-[#667085]">
                  A more relevant connection
                </p>
              </div>
            </div>
          </div>

          {/* Product preview */}
          {/* 
          <div className="relative mx-auto w-full max-w-[570px]">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-[#3157d5]/20 via-transparent to-[#08a6a6]/20 opacity-80 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white shadow-2xl shadow-blue-900/10">
              <div className="flex items-center justify-between border-b border-[#e4e7ec] bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-[#172033]">
                    Candidate workspace
                  </p>
                  <p className="mt-1 text-xs text-[#667085]">
                    Resume and job discovery
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#12b76a]/20 bg-[#ecfdf3] px-3 py-1.5 text-[11px] font-semibold text-[#12b76a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#12b76a]" />
                  Resume ready
                </div>
              </div> */}
          {/* 
              <div className="space-y-5 bg-gradient-to-br from-white via-white to-[#eaf0ff]/60 p-5 sm:p-6">
                <div className="rounded-xl border border-[#e4e7ec] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#3157d5]/30 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3157d5]/15 bg-[#eaf0ff] text-[#3157d5]">
                        <FileText size={20} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#172033]">
                          Your resume
                        </p>
                        <p className="mt-1 text-xs text-[#667085]">
                          Resume information and extracted skills
                        </p>
                      </div>
                    </div>

                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#12b76a]"
                    />
                  </div>

                  <div className="mt-5 border-t border-[#f0f2f5] pt-4">
                    <p className="mb-3 text-xs font-semibold text-[#475467]">
                      Identified skills
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-[#3157d5]/10 bg-[#eaf0ff]/70 px-2.5 py-1.5 text-xs font-medium text-[#3157d5] transition-colors duration-200 hover:border-[#08a6a6]/30 hover:bg-[#e6f8f7] hover:text-[#08a6a6]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#08a6a6]">
                    <span className="h-5 w-px bg-[#08a6a6]/40" />
                    <Zap size={14} />
                    Skills are used to find relevant opportunities
                    <span className="h-5 w-px bg-[#08a6a6]/40" />
                  </div>
                </div>

                <div className="rounded-xl border border-[#e4e7ec] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#08a6a6]/30 hover:shadow-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#08a6a6]/15 bg-[#e6f8f7] text-[#08a6a6]">
                        <Search size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#172033]">
                          Job discovery
                        </p>
                        <p className="mt-1 text-xs text-[#667085]">
                          Explore opportunities based on your skills
                        </p>
                      </div>
                    </div>

                    <ChevronRight size={18} className="text-[#98a2b3]" />
                  </div>

                  <div className="mt-4 space-y-2">
                    {[
                      {
                        title: "Browse available jobs",
                        description: "Search and filter opportunities",
                      },
                      {
                        title: "Review job matches",
                        description:
                          "Compare job requirements with your skills",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="group flex items-center justify-between rounded-lg border border-[#f0f2f5] bg-[#f7f9fc] px-3 py-3 transition-all duration-200 hover:border-[#3157d5]/25 hover:bg-[#eaf0ff]/60"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#172033]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-[#667085]">
                            {item.description}
                          </p>
                        </div>

                        <ArrowRight
                          size={16}
                          className="text-[#98a2b3] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#3157d5]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#e4e7ec] bg-[#f2f5f9] px-5 py-3">
                <p className="text-center text-[11px] text-[#667085]">
                  Illustrative product preview
                </p>
              </div>
            </div>
          </div>
           */}
        </div>
      </section>

      {/* PRODUCT VALUE STRIP */}

      <section className="relative z-10 border-y border-[#e4e7ec] bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-[#e4e7ec] px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
          {[
            {
              icon: FileText,
              title: "Resume understanding",
              description: "Extract skills from uploaded resumes",
            },
            {
              icon: Search,
              title: "Relevant job discovery",
              description: "Explore jobs using skill-based matching",
            },
            {
              icon: Users,
              title: "Better recruitment workflow",
              description: "Review and manage job applications",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group flex items-center gap-4 py-6 transition-colors duration-300 hover:bg-[#f5f8ff] md:px-7 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#3157d5]/15 bg-gradient-to-br from-[#eaf0ff] to-[#e6f8f7] text-[#3157d5] transition-all duration-300 group-hover:border-[#08a6a6]/30 group-hover:text-[#08a6a6]">
                <item.icon size={21} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#172033]">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-[#667085]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}

      <section id="about" className="relative z-10 scroll-mt-20 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-10 lg:py-28">
          <div>
            <SectionLabel>The idea behind SkillMatch</SectionLabel>

            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#172033] sm:text-4xl">
              Recruitment should look beyond the resume title.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#475467]">
            <p>
              A resume contains more than a job title. It includes technical
              skills, experience, education, and other information that can help
              explain what a candidate is capable of doing.
            </p>

            <p>
              SkillMatch uses resume skill extraction and job requirement
              matching to help candidates discover opportunities and help
              employers review applications with more relevant information.
            </p>

            <p className="font-medium text-[#172033]">
              The goal is simple: make the connection between candidate skills
              and job requirements easier to understand.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="relative z-10 scroll-mt-20 overflow-hidden border-y border-[#e4e7ec] bg-gradient-to-br from-[#f7f9fc] via-white to-[#eef5ff] py-24 sm:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#3157d5]/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <SectionLabel>How it works</SectionLabel>

            <h2 className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
              From resume to{" "}
              <span className="bg-gradient-to-r from-[#3157d5] to-[#08a6a6] bg-clip-text text-transparent">
                relevant opportunities.
              </span>
            </h2>

            <p className="mt-5 leading-7 text-[#475467]">
              A straightforward process that connects candidate information with
              job requirements.
            </p>
          </div>

          <div className="mt-14 grid gap-0 overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-[#e4e7ec]">
            {[
              {
                icon: FileText,
                number: "Step 01",
                title: "Upload your resume",
                description:
                  "Candidates upload their resume so SkillMatch can extract relevant information and identify skills.",
              },
              {
                icon: Zap,
                number: "Step 02",
                title: "Match skills with jobs",
                description:
                  "Candidate skills are compared with job requirements to help identify relevant opportunities.",
              },
              {
                icon: CheckCircle2,
                number: "Step 03",
                title: "Apply and manage",
                description:
                  "Candidates can apply and track application progress, while employers review applicants and update application statuses.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group relative border-b border-[#e4e7ec] p-7 transition-colors duration-300 last:border-b-0 hover:bg-[#f5f8ff] sm:p-9 md:border-b-0"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#3157d5]/15 bg-gradient-to-br from-[#eaf0ff] to-[#e6f8f7] text-[#3157d5] transition-all duration-300 group-hover:border-[#08a6a6]/40 group-hover:text-[#08a6a6] group-hover:shadow-lg group-hover:shadow-blue-600/10">
                  <item.icon size={21} />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-widest text-[#08a6a6]">
                  {item.number}
                </p>

                <h3 className="mt-3 text-xl font-semibold text-[#172033]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#475467]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CANDIDATES */}

      <section id="candidates" className="relative z-10 scroll-mt-20 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-10 lg:py-28">
          <div>
            <SectionLabel>For candidates</SectionLabel>

            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#172033] sm:text-4xl">
              Let your skills lead you to your next opportunity.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-[#475467]">
              Spend less time searching through unrelated listings. Build your
              candidate profile, upload your resume, and explore jobs that align
              with your skills.
            </p>

            <div className="mt-8 space-y-4">
              {candidateFeatures.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ecfdf3] text-[#12b76a]">
                    <Check size={13} strokeWidth={3} />
                  </div>

                  <span className="text-sm text-[#475467]">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#3157d5] transition-colors duration-200 hover:text-[#08a6a6]"
            >
              Get started as a candidate
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Candidate workspace preview */}

          <div className="relative overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-xl shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#3157d5]/10 blur-[100px]"
            />

            <div className="relative flex items-center justify-between border-b border-[#e4e7ec] pb-5">
              <div>
                <p className="text-sm font-semibold text-[#172033]">
                  Candidate workflow
                </p>
                <p className="mt-1 text-xs text-[#667085]">
                  Your job search in one place
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#3157d5]/15 bg-gradient-to-br from-[#eaf0ff] to-[#e6f8f7] text-[#3157d5]">
                <BriefcaseBusiness size={20} />
              </div>
            </div>

            <div className="relative mt-6 space-y-3">
              {candidateWorkflow.map((item) => (
                <WorkflowItem key={item.number} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYERS */}

      <section
        id="employers"
        className="relative z-10 scroll-mt-20 overflow-hidden border-y border-[#e4e7ec] bg-gradient-to-br from-[#f7f9fc] via-white to-[#effaf9]"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-10 lg:py-28">
          {/* Employer workspace preview */}

          <div className="relative order-2 overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white p-5 shadow-xl shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7 lg:order-1">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#08a6a6]/10 blur-[100px]"
            />

            <div className="relative flex items-center justify-between border-b border-[#e4e7ec] pb-5">
              <div>
                <p className="text-sm font-semibold text-[#172033]">
                  Employer workspace
                </p>
                <p className="mt-1 text-xs text-[#667085]">
                  Job and applicant management
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#3157d5]/15 bg-gradient-to-br from-[#eaf0ff] to-[#e6f8f7] text-[#3157d5]">
                <Building2 size={20} />
              </div>
            </div>

            <div className="relative mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Recruitment workflow
              </p>

              <div className="mt-4 space-y-3">
                {employerWorkflow.map((item) => (
                  <div
                    key={item.title}
                    className="group flex gap-4 rounded-xl border border-[#e4e7ec] bg-white p-4 transition-all duration-300 hover:border-[#3157d5]/30 hover:bg-[#f5f8ff]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#3157d5]/15 bg-gradient-to-br from-[#eaf0ff] to-[#e6f8f7] text-[#3157d5] transition-all duration-300 group-hover:border-[#08a6a6]/30 group-hover:text-[#08a6a6]">
                      <item.icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#172033]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-6 text-[#475467]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Employer information */}

          <div className="order-1 lg:order-2">
            <SectionLabel>For employers</SectionLabel>

            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#172033] sm:text-4xl">
              Make candidate evaluation more informed.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-[#475467]">
              Organize your recruitment process from job publication to
              applicant review. SkillMatch helps employers understand how
              candidate skills relate to the requirements of a position.
            </p>

            <div className="mt-8 space-y-4">
              {employerFeatures.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ecfdf3] text-[#12b76a]">
                    <Check size={13} strokeWidth={3} />
                  </div>

                  <span className="text-sm text-[#475467]">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#3157d5] transition-colors duration-200 hover:text-[#08a6a6]"
            >
              Get started as an employer
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT PRINCIPLES */}

      <section className="relative z-10 overflow-hidden bg-white py-24 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3157d5]/5 blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Built around relevant information</SectionLabel>

            <h2 className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
              Useful tools.{" "}
              <span className="bg-gradient-to-r from-[#3157d5] to-[#08a6a6] bg-clip-text text-transparent">
                Clearer decisions.
              </span>
            </h2>

            <p className="mt-5 leading-7 text-[#475467]">
              SkillMatch brings important parts of the recruitment process
              together without making the process unnecessarily complicated.
            </p>
          </div>

          <div className="relative mt-14 grid gap-5 md:grid-cols-3">
            {productPrinciples.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="relative z-10 overflow-hidden border-y border-[#3157d5]/15 bg-gradient-to-r from-[#eaf0ff] via-white to-[#e6f8f7]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-40 h-96 w-96 rounded-full bg-[#08a6a6]/15 blur-[120px]"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <SectionLabel>Get started</SectionLabel>

            <h2 className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
              Make your next connection count.
            </h2>

            <p className="mt-4 leading-7 text-[#475467]">
              Whether you are looking for your next opportunity or searching for
              the right candidate, start with SkillMatch.
            </p>
          </div>

          <PrimaryButton href="/register">Join SkillMatch</PrimaryButton>
        </div>
      </section>
    </main>
  );
}
