import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";

export const metadata: Metadata = { title: "Resume", description: "Resume and experience of Okoro Emmanuel Nzube." };

export default function ResumePage() {
  const hasCv = existsSync(path.join(process.cwd(), "public", "emmanuel-nzube-cv.pdf"));
  return (
    <div className="site-shell py-16 md:py-24">
      <p className="eyebrow">01 / Resume</p>
      <h1 className="page-heading mb-6 mt-5">Experience and education.</h1>
      <p className="body-copy max-w-2xl">{hasCv ? "View or download the current resume." : "For details about experience and education, get in touch."}</p>
      {hasCv && <div className="mt-10 border border-[var(--border)] bg-[var(--surface)] p-4">
        <iframe title="Emmanuel Nzube resume PDF" src="/emmanuel-nzube-cv.pdf" className="h-[70vh] min-h-[480px] w-full border-0" />
      </div>}
      {hasCv && <a href="/emmanuel-nzube-cv.pdf" download className="mt-5 inline-block bg-[var(--wine)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)]">Download CV</a>}
      <p className="mt-5 text-sm text-[var(--muted)]">For a copy, <Link className="underline underline-offset-4" href="/contact">contact Emmanuel</Link>.</p>
    </div>
  );
}
