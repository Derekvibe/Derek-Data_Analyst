"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";

export function HeroScene() {
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const stages = [
    { x: 134, y: 76, title: "Customer", detail: "Understand people" },
    { x: 300, y: 178, title: "Evidence", detail: "Measure what matters" },
    { x: 134, y: 280, title: "Decision", detail: "Choose a next step" },
  ];

  return (
    <section
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
      onMouseMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setOffset({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 5,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 5,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <div className="site-shell grid min-h-[610px] items-center gap-12 py-16 md:min-h-[660px] md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <p className="eyebrow mb-7 flex items-center gap-2"><span className="text-[var(--wine-text)]"><Icon name="pin" className="inline-block h-4 w-4 align-[-3px]" /></span>Lagos, Nigeria <span aria-hidden="true">/</span> Data analyst</p>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.17em] text-[var(--wine-text)]">Customer insight · Market research · Commercial analysis</p>
          <h1 className="mb-7 max-w-3xl text-[clamp(3rem,5.4vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            Clear analysis.<br className="hidden sm:block" /> Better decisions.
          </h1>
          <p className="max-w-xl text-base leading-7 text-[var(--muted)] md:text-lg">
            I help marketing and business teams understand their customers, measure performance and decide what to do next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-3 bg-[var(--wine)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--wine-hover)]" href="/projects">
              Explore case studies <Icon name="arrow-right" className="h-4 w-4" />
            </a>
            <a className="inline-flex items-center gap-2 border border-[var(--border)] px-5 py-3 text-sm font-semibold transition-colors hover:border-[var(--wine-text)]" href="/contact">
              <Icon name="mail" className="h-4 w-4" /> Get in touch
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[500px]">
          <svg aria-hidden="true" className="h-auto w-full" viewBox="0 0 440 360">
            <defs>
              <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M32 0H0V32" fill="none" stroke="var(--border)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="440" height="360" fill="url(#hero-grid)" opacity="0.62" />
            <motion.path
              d="M80 76 C190 76 196 178 300 178 C196 178 190 280 80 280"
              fill="none"
              stroke="var(--wine)"
              strokeWidth="2"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1, x: offset.x, y: offset.y }}
              transition={{ pathLength: { duration: 1.2, ease: "easeOut" }, x: { duration: 0.3 }, y: { duration: 0.3 } }}
            />
            {stages.map((stage, index) => (
              <motion.g
                key={stage.title}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, x: offset.x, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.25 + index * 0.18, duration: 0.35 }}
              >
                <circle cx={stage.x} cy={stage.y} r="23" fill="var(--surface)" stroke="var(--wine)" strokeWidth="1.5" />
                <circle cx={stage.x} cy={stage.y} r="4" fill="var(--wine-text)" />
                <text x={stage.x + (index === 1 ? 34 : -36)} y={stage.y - 7} textAnchor={index === 1 ? "start" : "end"} fill="var(--foreground)" fontSize="13" fontFamily="Inter, sans-serif">{stage.title}</text>
                <text x={stage.x + (index === 1 ? 34 : -36)} y={stage.y + 12} textAnchor={index === 1 ? "start" : "end"} fill="var(--muted)" fontSize="10" fontFamily="Inter, sans-serif">{stage.detail}</text>
              </motion.g>
            ))}
          </svg>
          <p className="mt-3 text-right text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">A clear path from question to action</p>
        </div>
      </div>
    </section>
  );
}
