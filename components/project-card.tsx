"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Project = {
  slug: string;
  title: string;
  theme: string;
  type: string;
  summary: string;
  result: string;
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <Link href={`/projects/${project.slug}`} className="group block border-t border-[var(--border)] pt-5">
      <div className="flex items-center justify-between">
        <p className="eyebrow m-0">{String(index + 1).padStart(2, "0")} / {project.theme}</p>
        <motion.span
          aria-hidden="true"
          className="text-xl text-[var(--primary)]"
          animate={{ x: 0 }}
          whileHover={reduceMotion ? undefined : { x: 4 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      </div>
      <h3 className="mb-3 mt-10 text-2xl leading-tight transition-colors group-hover:text-[var(--primary)] md:text-3xl">{project.title}</h3>
      <p className="body-copy mb-6 max-w-xl text-sm">{project.summary}</p>
      <div className="flex items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <span>{project.type}</span>
        <span>{project.result}</span>
      </div>
      <svg role="img" aria-label="Illustrative line, no project data shown" viewBox="0 0 360 70" className="mt-8 h-14 w-full">
        <path d="M0 56H360" stroke="var(--border)" />
        <motion.path
          d={index % 2 ? "M0 49 58 43 118 48 178 23 238 35 300 15 360 20" : "M0 50 55 42 110 46 165 27 225 31 280 12 360 16"}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileHover={{ pathLength: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      </svg>
      <p className="mb-0 mt-1 text-[10px] text-[var(--muted)]">Illustrative line, no project data shown</p>
    </Link>
  );
}
