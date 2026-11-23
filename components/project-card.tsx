"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/icon";

type Project = {
  slug: string;
  title: string;
  theme: string;
  type: string;
  summary: string;
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <Link href={`/projects/${project.slug}`} className="group block border-t border-[var(--border)] pt-5">
      <div className="flex items-center justify-between">
        <p className="eyebrow m-0">{String(index + 1).padStart(2, "0")} / {project.theme}</p>
        <motion.span
          aria-hidden="true"
          className="text-[var(--primary)]"
          animate={{ x: 0 }}
          whileHover={reduceMotion ? undefined : { x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name="arrow-right" className="h-5 w-5" />
        </motion.span>
      </div>
      <h3 className="mb-3 mt-10 text-2xl leading-tight transition-colors group-hover:text-[var(--primary)] md:text-3xl">{project.title}</h3>
      <p className="body-copy mb-6 max-w-xl text-sm">{project.summary}</p>
      <p className="mb-0 text-xs text-[var(--muted)]">{project.type}</p>
    </Link>
  );
}
