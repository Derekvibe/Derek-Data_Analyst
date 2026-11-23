import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: "About Okoro Emmanuel Nzube, a Lagos-based data analyst with a chemical engineering background.",
};

export default function AboutPage() {
  return (
    <div className="site-shell">
      <section className="py-16 md:py-24">
        <SectionHeading number="01" label="About" title="A process-minded analyst, focused on business decisions." />
        <div className="mt-14 grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="flex min-h-[300px] items-end border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="m-0 max-w-xs text-sm text-[var(--muted)]">Portrait of Emmanuel to be added.</p>
          </div>
          <div className="max-w-2xl">
            <p className="body-copy mt-0">My background in chemical engineering shaped how I approach analysis: define the question, understand how the process works, check the inputs and test whether the conclusion holds.</p>
            <p className="body-copy">I have worked hands-on with live business data and public datasets to examine customer behaviour, vendor performance and commercial outcomes. I am careful about separating what the data shows from what still needs to be confirmed.</p>
            <p className="body-copy">I am based in Lagos, Nigeria. I am interested in work where market context, customer experience and business performance meet.</p>
            <div className="mt-10 border-t border-[var(--border)] pt-5">
              <p className="eyebrow">How I work</p>
              <ol className="mt-5 grid gap-4 sm:grid-cols-3">
                {["Question first", "Then the data", "Then a recommendation"].map((item, index) => (
                  <li key={item} className="list-none border-t border-[var(--border)] pt-3">
                    <span className="eyebrow text-[var(--primary)]">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mb-0 mt-2 text-sm font-medium">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
