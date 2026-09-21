import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* TEXT */}
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
                About SkillMatch
              </p>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Better opportunities start with the right skills.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
                SkillMatch is an intelligent talent-matching platform that helps
                candidates discover relevant opportunities and helps employers
                find people based on what they can actually do.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="rounded-lg bg-[var(--brand)] px-6 py-3 text-center text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
                >
                  Get started
                </Link>

                <Link
                  href="/#how-it-works"
                  className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3 text-center text-sm font-semibold transition hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)]"
                >
                  See how it works
                </Link>
              </div>
            </div>

            {/* PRODUCT VISUAL */}
            <div className="relative">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl shadow-black/20">
                {/* WINDOW HEADER */}
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      SkillMatch
                    </p>

                    <p className="mt-1 text-sm font-semibold">Match analysis</p>
                  </div>

                  <span className="rounded-full border border-[var(--brand)]/20 bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                    AI-assisted
                  </span>
                </div>

                {/* MATCH */}
                <div className="py-7 text-center">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-[var(--brand)]/15">
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[var(--brand)]/10">
                      <span className="text-3xl font-bold text-[var(--brand)]">
                        92%
                      </span>

                      <span className="mt-1 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                        Match
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    Frontend Developer
                  </h3>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Strong alignment with your skill profile
                  </p>
                </div>

                {/* SKILLS */}
                <div className="space-y-3">
                  {[
                    ["React", "94%"],
                    ["TypeScript", "89%"],
                    ["Node.js", "91%"],
                  ].map(([skill, value]) => (
                    <div key={skill}>
                      <div className="mb-1.5 flex justify-between text-xs">
                        <span className="text-[var(--muted)]">{skill}</span>

                        <span className="font-medium text-[var(--foreground)]">
                          {value}
                        </span>
                      </div>

                      <div className="h-1.5 rounded-full bg-[var(--surface-elevated)]">
                        <div
                          className="h-full rounded-full bg-[var(--brand)]"
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROBLEM
      ========================================================= */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
              The problem
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Hiring and job searching are still too dependent on keywords.
            </h2>

            <p className="mt-5 text-base leading-7 text-[var(--muted)]">
              A resume can contain the right experience without using the exact
              words an employer searches for. At the same time, a job
              description can attract applicants who look relevant on paper but
              do not have the skills the role actually requires.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <span className="text-2xl font-bold text-[var(--brand)]">01</span>

              <h3 className="mt-5 text-lg font-semibold">
                Too many applications
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Candidates spend hours searching through roles that may not
                actually fit their skills.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <span className="text-2xl font-bold text-[var(--brand)]">02</span>

              <h3 className="mt-5 text-lg font-semibold">
                Keyword-heavy hiring
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Traditional matching can miss capable candidates because their
                experience is described differently.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <span className="text-2xl font-bold text-[var(--brand)]">03</span>

              <h3 className="mt-5 text-lg font-semibold">Weak signal of fit</h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Job titles alone do not tell the full story of what someone
                knows or can contribute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SOLUTION
      ========================================================= */}
      <section className="border-y border-[var(--border)] bg-[var(--surface-soft)]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            {/* TEXT */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
                Our approach
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Match people by capability, not just by title.
              </h2>

              <p className="mt-5 text-base leading-7 text-[var(--muted)]">
                SkillMatch transforms resumes and job requirements into
                structured skill information, then compares the signals that
                matter to identify stronger matches.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-sm font-bold text-[var(--brand)]">
                    1
                  </div>

                  <div>
                    <h3 className="font-semibold">Understand the candidate</h3>

                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      Extract relevant skills and experience from the
                      candidate's resume.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-sm font-bold text-[var(--brand)]">
                    2
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Understand the opportunity
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      Analyze the skills and requirements associated with the
                      role.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-sm font-bold text-[var(--brand)]">
                    3
                  </div>

                  <div>
                    <h3 className="font-semibold">Measure the fit</h3>

                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      Produce a compatibility score that helps prioritize the
                      most relevant opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PROCESS VISUAL */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="space-y-4">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
                    Candidate
                  </p>

                  <p className="mt-2 font-semibold">Resume</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {["React", "Python", "SQL", "Node.js"].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center text-xl text-[var(--brand)]">
                  ↓
                </div>

                <div className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/5 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--brand)]">
                    SkillMatch engine
                  </p>

                  <p className="mt-2 font-semibold">
                    Compare skills and requirements
                  </p>

                  <div className="mt-4 h-2 rounded-full bg-[var(--surface-elevated)]">
                    <div
                      className="h-full rounded-full bg-[var(--brand)]"
                      style={{ width: "92%" }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                    Compatibility analysis
                  </p>
                </div>

                <div className="flex justify-center text-xl text-[var(--brand)]">
                  ↓
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        Recommended opportunity
                      </p>

                      <p className="mt-1 font-semibold">Frontend Developer</p>
                    </div>

                    <span className="text-xl font-bold text-[var(--brand)]">
                      92%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
              What we believe
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              The right opportunity should be easier to find.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
              <h3 className="text-lg font-semibold">Skills first</h3>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Skills provide a stronger signal of capability than job titles
                alone. SkillMatch puts them at the center of the matching
                experience.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
              <h3 className="text-lg font-semibold">Useful intelligence</h3>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                AI should reduce the work involved in finding a good fit, not
                make the process more complicated.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
              <h3 className="text-lg font-semibold">Better decisions</h3>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                A clear match score and relevant signals help candidates and
                employers focus their attention where it matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-3xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] px-6 py-14 text-center sm:px-12">
            <p className="text-sm font-semibold text-[var(--brand)]">
              Find your next match
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Your skills have value. Find where they fit.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Build your profile, upload your resume, and let SkillMatch help
              you discover opportunities that align with your capabilities.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
              >
                Create your profile
              </Link>

              <Link
                href="/"
                className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--brand)]/40"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
