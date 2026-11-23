import type { Metadata } from "next";
import ProjectFilter from "@/components/project-filter";
import projects from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Projects",
  description: "Customer, marketing, sales and market research case studies by Okoro Emmanuel Nzube.",
};

export default function ProjectsPage() {
  return (
    <div className="site-shell py-16 md:py-24">
      <p className="eyebrow">01 / Projects</p>
      <h1 className="page-heading mb-6 mt-5 max-w-4xl">Analysis with a business question behind it.</h1>
      <p className="body-copy max-w-2xl">Sources and publication status are stated openly. Any bracketed result is a prompt for verified project evidence, not a reported finding.</p>
      <ProjectFilter projects={projects} />
    </div>
  );
}
