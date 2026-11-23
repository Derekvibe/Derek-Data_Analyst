"use client";

export function PrintButton() {
  return <button type="button" className="no-print border border-[var(--border)] px-3 py-2 text-sm hover:border-[var(--wine-text)]" onClick={() => window.print()}>Print / Save as PDF</button>;
}
