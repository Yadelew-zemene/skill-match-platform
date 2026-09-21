import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-soft)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4 lg:px-8">
        {/* BRAND */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-black text-[#080A0D]">
              S
            </div>

            <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              Skill<span className="text-[var(--brand)]">Match</span>
            </span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">
            Intelligent skill-based talent matching that connects people with
            opportunities that fit.
          </p>
        </div>

        {/* PLATFORM */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--foreground)]">
            Platform
          </h3>

          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link
                href="/"
                className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/#how-it-works"
                className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                How it works
              </Link>
            </li>

            <li>
              <Link
                href="/#candidates"
                className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                Candidates
              </Link>
            </li>

            <li>
              <Link
                href="/#employers"
                className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                Employers
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--foreground)]">
            Company
          </h3>

          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link
                href="/about"
                className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/contacts"
                className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                href="/login"
                className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                Sign in
              </Link>
            </li>

            <li>
              <a
                href="mailto:support@skillmatch.ai"
                className="text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* CONTACT / COPYRIGHT */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <p>© {new Date().getFullYear()} SkillMatch.</p>

            <span className="hidden text-white/20 sm:block">•</span>

            <p>Addis Ababa, Ethiopia</p>
          </div>

          <p>Built around skills. Designed for opportunity.</p>
        </div>
      </div>
    </footer>
  );
}
