import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-shell mt-24 border-t border-[var(--border)] py-9">
      <div className="flex flex-col justify-between gap-5 text-sm text-[var(--muted)] md:flex-row md:items-center">
        <p className="m-0">Okoro Emmanuel Nzube · Data analyst · Lagos, Nigeria</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
          <Link href="/projects">Case studies</Link>
          <Link href="/research">Our Works</Link>
          <Link href="/how-i-work">How I work</Link>
          <Link href="/dashboard-lab">Dashboard Lab</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <p className="mb-0 mt-5 text-xs text-[var(--muted)]">© {new Date().getFullYear()} Okoro Emmanuel Nzube</p>
    </footer>
  );
}
