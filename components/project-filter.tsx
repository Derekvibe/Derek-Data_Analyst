"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
type Project = {
  slug: string;
  title: string;
  theme: string;
  type: string;
  summary: string;
  result: string;
};
const themes = ["All", "Customer", "Marketing", "Sales", "Market Research"];

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState("All");
  const filtered = useMemo(() => selected === "All" ? projects : projects.filter((project) => project.theme === selected), [projects, selected]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {themes.map((theme) => (
          <button key={theme} type="button" aria-pressed={selected === theme} onClick={() => setSelected(theme)}
            className={`border px-4 py-2 text-sm transition-colors ${selected === theme ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]" : "border-[var(--border)] bg-transparent text-[var(--muted)] hover:text-[var(--foreground)]"}`}>
            {theme}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2" aria-live="polite">
        {filtered.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </div>
    </>
  );
}
