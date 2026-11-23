"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icon } from "@/components/ui/icon";

const links = [
  ["Our Works", "/research"],
  ["Case studies", "/projects"],
  ["About", "/about"],
  ["Skills", "/skills"],
  ["Contact", "/contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-shell relative z-20 border-b border-[var(--border)]">
      <div className="flex min-h-[76px] items-center justify-between gap-5">
        <Link href="/" className="text-sm font-bold tracking-tight" onClick={() => setOpen(false)}>
          OKORO EMMANUEL NZUBE<span className="ml-2 text-[var(--primary)]">/</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="border border-[var(--border)] bg-transparent p-2"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="grid border-t border-[var(--border)] py-3 lg:hidden">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="py-3 text-sm">
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
