import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = { title: "Contact", description: "Contact Okoro Emmanuel Nzube about data analysis opportunities." };

export default function ContactPage() {
  return (
    <div className="site-shell py-16 md:py-24">
      <p className="eyebrow">01 / Contact</p>
      <h1 className="page-heading mb-6 mt-5 max-w-4xl">Start with the question your team needs to answer.</h1>
      <p className="body-copy max-w-2xl">Share the business question, customer challenge or role you would like to discuss.</p>
      <div className="mt-10 max-w-2xl border-t border-[var(--border)] pt-5">
        <p className="eyebrow mb-5 flex items-center gap-2"><Icon name="mail" className="h-4 w-4 text-[var(--wine-text)]" /> Send a message</p>
        <ContactForm />
      </div>
    </div>
  );
}
