"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json() as { message?: string };
      setStatus(result.message ?? (response.ok ? "Message sent." : "The message could not be sent."));
      if (response.ok) form.reset();
    } catch {
      setStatus("The message could not be sent. Please try again or use the email link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5" aria-describedby="form-status">
      <label className="grid gap-2 text-sm">Your name
        <input required name="name" autoComplete="name" maxLength={100} className="border border-[var(--border)] bg-transparent px-3 py-3" />
      </label>
      <label className="grid gap-2 text-sm">Email address
        <input required name="email" type="email" autoComplete="email" maxLength={254} className="border border-[var(--border)] bg-transparent px-3 py-3" />
      </label>
      <label className="grid gap-2 text-sm">What would you like to discuss?
        <textarea required name="message" rows={6} maxLength={5000} className="resize-y border border-[var(--border)] bg-transparent px-3 py-3" />
      </label>
      <label className="sr-only" aria-hidden="true">Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button disabled={busy} className="w-fit bg-[var(--wine)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] disabled:opacity-60" type="submit">
        {busy ? "Sending…" : "Send message"}
      </button>
      <p id="form-status" role="status" aria-live="polite" className="m-0 min-h-6 text-sm text-[var(--muted)]">{status}</p>
      <p className="m-0 text-xs text-[var(--muted)]">The form sends through Resend when email credentials are configured. Never include confidential customer or company data.</p>
    </form>
  );
}
