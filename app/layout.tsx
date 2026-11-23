import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.vercel.app"),
  title: {
    default: "Okoro Emmanuel Nzube | Data Analyst",
    template: "%s | Okoro Emmanuel Nzube",
  },
  description: "Market research, customer insight and commercial analysis for marketing and business teams. Based in Lagos, Nigeria.",
  openGraph: {
    title: "Okoro Emmanuel Nzube | Data Analyst",
    description: "Turning evidence into clear decisions for marketing and business teams.",
    type: "website",
    locale: "en_NG",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--background)] focus:p-3">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
