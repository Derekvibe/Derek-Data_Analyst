import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Customer, marketing, sales and market research case studies by Okoro Emmanuel Nzube.",
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
