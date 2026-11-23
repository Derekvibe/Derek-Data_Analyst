import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Contact Okoro Emmanuel Nzube about data analysis opportunities." };

export default function ContactPage() {
  return (
    <div className="site-shell py-16 md:py-24">
      <p className="eyebrow">01 / Contact</p>
      <h1 className="page-heading mb-6 mt-5 max-w-4xl">Start with the question your team needs to answer.</h1>
      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_0.7fr]">
        <ContactForm />
        <aside className="border-t border-[var(--border)] pt-5">
          <p className="eyebrow">Other ways to connect</p>
          <ul className="mt-6 grid gap-5 p-0 text-sm">
            <li className="list-none"><span className="block text-xs text-[var(--muted)]">Email</span><span className="mt-1 inline-block text-sm">[ADD EMAIL ADDRESS]</span></li>
            <li className="list-none"><span className="block text-xs text-[var(--muted)]">LinkedIn</span><span className="mt-1 inline-block text-sm">[ADD LINKEDIN PROFILE]</span></li>
            <li className="list-none"><span className="block text-xs text-[var(--muted)]">GitHub</span><span className="mt-1 inline-block text-sm">[ADD GITHUB PROFILE]</span></li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
