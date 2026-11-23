import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-shell mt-24 border-t border-[var(--border)] py-9">
      <div className="flex flex-col justify-between gap-5 text-sm text-[var(--muted)] md:flex-row md:items-center">
        <p className="m-0">Okoro Emmanuel Nzube · Data analyst · Lagos, Nigeria</p>
        <div className="flex gap-5">
          <Link href="/contact">Contact</Link>
          <Link href="/resume">Resume</Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
