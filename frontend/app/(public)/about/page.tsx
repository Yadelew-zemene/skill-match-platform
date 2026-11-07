import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  Lightbulb,
  Search,
  Target,
  Users,
  UserRoundSearch,
  Workflow,
} from "lucide-react";

const benefits = [
  {
    icon: UserRoundSearch,
    title: "For candidates",
    description:
      "Present your skills, experience, and capabilities in one professional profile. Discover opportunities that are more relevant to what you can actually do.",
    points: [
      "Build a skills-focused professional profile",
      "Discover relevant job opportunities",
      "Make your capabilities easier to understand",
    ],
    href: "/register",
    linkText: "Create your profile",
    color: "blue",
  },
  {
    icon: BriefcaseBusiness,
    title: "For employers",
    description:
      "Define what a role requires and find candidates whose skills and experience align with those requirements.",
    points: [
      "Describe the skills a role requires",
      "Explore relevant candidate profiles",
      "Make talent discovery more focused",
    ],
    href: "/register",
    linkText: "Find relevant talent",
    color: "teal",
  },
];

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Create a profile",
    description:
      "Candidates provide their skills, education, experience, and professional background. Employers describe their organizations and opportunities.",
  },
  {
    number: "02",
    icon: Target,
    title: "Identify relevant skills",
    description:
      "SkillMatch considers the relationship between candidate capabilities and the skills required by an opportunity.",
  },
  {
    number: "03",
    icon: Search,
    title: "Discover relevant matches",
    description:
      "Candidates can explore suitable opportunities, while employers can discover profiles that align with their requirements.",
  },
];

const principles = [
  {
    icon: Target,
    title: "Skills over labels",
    description:
      "A job title does not tell the whole story. We place greater emphasis on skills, capabilities, and the actual requirements of an opportunity.",
  },
  {
    icon: BrainCircuit,
    title: "AI with a purpose",
    description:
      "AI-assisted analysis should make matching more useful. Technology supports the discovery process rather than replacing human judgment.",
  },
  {
    icon: Users,
    title: "Value for both sides",
    description:
      "A useful talent platform should work for candidates looking for opportunities and employers looking for the right capabilities.",
  },
];

const colorStyles = {
  blue: {
    icon: "bg-[#eaf0ff] text-[#3157d5]",
    badge: "bg-[#eaf0ff] text-[#3157d5]",
    border: "hover:border-[#3157d5]/30",
  },
  teal: {
    icon: "bg-[#e6f8f7] text-[#078b8b]",
    badge: "bg-[#e6f8f7] text-[#078b8b]",
    border: "hover:border-[#08a6a6]/40",
  },
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#f7f9fc] text-[#172033]">
      {/* HERO */}
      <section className="relative border-b border-[#e4eaf3] bg-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#3157d5]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-1/3 h-[28rem] w-[28rem] rounded-full bg-[#08a6a6]/[0.07] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3157d5]/15 bg-[#eaf0ff] px-3.5 py-2 text-xs font-bold text-[#3157d5]">
              <span className="h-2 w-2 rounded-full bg-[#08a6a6]" />
              ABOUT SKILLMATCH
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-[#172033] sm:text-5xl lg:text-[3.65rem]">
              The right opportunity starts with{" "}
              <span className="bg-gradient-to-r from-[#3157d5] to-[#08a6a6] bg-clip-text text-transparent">
                the right skills.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#475467] sm:text-lg">
              Finding the right job or the right person should be about more
              than matching keywords. SkillMatch brings skills, experience, and
              opportunity requirements closer together to make talent discovery
              more relevant.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#3157d5] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#3157d5]/20 transition-all hover:-translate-y-0.5 hover:bg-[#2443a8] hover:shadow-xl"
              >
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d0d5dd] bg-white px-6 py-3.5 text-sm font-bold text-[#344054] transition-all hover:border-[#3157d5]/40 hover:bg-[#f7f9fc] hover:text-[#3157d5]"
              >
                Explore how it works
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#475467]">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#08a6a6]" />
                Skills-focused discovery
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#08a6a6]" />
                AI-assisted matching
              </span>
            </div>
          </div>

          {/* Product Visual */}
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
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="bg-[#f7f9fc] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#3157d5]">
              The challenge
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#172033] sm:text-4xl">
              Finding a match is about more than finding a keyword.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#475467]">
            <p>
              Candidates have skills that may not be obvious from their job
              titles. Employers have requirements that can be difficult to
              communicate through a short job description.
            </p>

            <p>
              Traditional discovery processes often depend heavily on keywords,
              titles, and manual review. These can be useful signals, but they
              do not always show how someone's actual capabilities relate to a
              role.
            </p>

            <div className="rounded-2xl border border-[#dce6fa] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf0ff] text-[#3157d5]">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#172033]">
                    A different way to approach matching
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#667085]">
                    SkillMatch focuses on the connection between what a person
                    can do and what an opportunity actually needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="border-y border-[#e4eaf3] bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#3157d5]">
              Our approach
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              One platform. Two sides. A shared goal.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#667085]">
              SkillMatch is designed to make the connection between talent and
              opportunity clearer for everyone involved.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              const styles =
                colorStyles[benefit.color as keyof typeof colorStyles];

              return (
                <div
                  key={benefit.title}
                  className={`group rounded-3xl border border-[#e4e7ec] bg-[#f7f9fc] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-[#172033]/5 sm:p-9 ${styles.border}`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.icon}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${styles.badge}`}
                    >
                      {benefit.title}
                    </span>
                  </div>

                  <h3 className="mt-7 text-2xl font-extrabold tracking-tight text-[#172033]">
                    {benefit.title === "For candidates"
                      ? "Make your skills visible."
                      : "Find talent through capabilities."}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#667085]">
                    {benefit.description}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {benefit.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm font-medium text-[#475467]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#08a6a6]" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={benefit.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#3157d5] transition-colors hover:text-[#08a6a6]"
                  >
                    {benefit.linkText}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#f7f9fc] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#3157d5]">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              From skills to meaningful discovery.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#667085]">
              The process is straightforward. Provide the right information,
              identify relevant skills, and explore potential matches.
            </p>
          </div>

          <div className="relative mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-[#e4e7ec] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#3157d5]/30 hover:shadow-xl hover:shadow-[#172033]/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold tracking-widest text-[#3157d5]">
                      STEP {step.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf0ff] text-[#3157d5]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#172033]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#667085]">
                    {step.description}
                  </p>

                  {index !== steps.length - 1 && (
                    <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4e7ec] bg-white text-[#3157d5] md:flex">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="border-y border-[#e4eaf3] bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#3157d5]">
                What guides us
              </p>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#172033] sm:text-4xl">
                Better technology should create better connections.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#667085]">
                Our approach is built around making talent discovery more
                relevant, understandable, and useful for both candidates and
                employers.
              </p>
            </div>

            <div className="space-y-4">
              {principles.map((principle) => {
                const Icon = principle.icon;

                return (
                  <div
                    key={principle.title}
                    className="group flex gap-5 rounded-2xl border border-[#e4e7ec] bg-[#f7f9fc] p-5 transition-all hover:border-[#3157d5]/25 hover:bg-white hover:shadow-lg hover:shadow-[#172033]/5 sm:p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf0ff] text-[#3157d5] transition-colors group-hover:bg-[#3157d5] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#172033]">
                        {principle.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[#667085]">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#f7f9fc] px-6 py-20 sm:py-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2443a8] via-[#3157d5] to-[#078f99] px-7 py-16 text-center shadow-xl shadow-[#3157d5]/15 sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border-[50px] border-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#08a6a6]/30 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm">
              <Workflow className="h-7 w-7" />
            </div>

            <h2 className="mt-7 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Your skills deserve the right opportunity.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/80">
              Whether you are building your career or looking for the right
              talent, start with what matters: skills and capabilities.
            </p>

            <Link
              href="/register"
              className="group mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#2443a8] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#eaf0ff] hover:shadow-xl"
            >
              Join SkillMatch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
