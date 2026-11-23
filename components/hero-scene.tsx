"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const points = "0,238 130,208 252,220 370,148 492,167 615,105 739,126 865,59 1000,79 1140,27 1280,48";

export function HeroScene() {
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <section
      className="relative min-h-[640px] overflow-hidden bg-[#0f1115] text-white md:min-h-[690px]"
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
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-75"
        viewBox="0 0 1280 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#42464e" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="1280" height="600" fill="url(#grid)" />
        <motion.polyline
          points={points}
          fill="none"
          stroke="#e34850"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: 1, x: offset.x, y: offset.y }}
          transition={{ pathLength: { duration: 1.8, ease: "easeOut" }, opacity: { duration: 1 }, x: { duration: 0.3 }, y: { duration: 0.3 } }}
        />
        {points.split(" ").map((point, index) => {
          const [cx, cy] = point.split(",");
          return (
            <motion.circle
              key={point}
              cx={cx}
              cy={cy}
              r="4"
              fill="#e34850"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, x: offset.x, y: offset.y }}
              transition={{ delay: reduceMotion ? 0 : 0.16 * index, duration: 0.3 }}
            />
          );
        })}
      </svg>
      <div className="site-shell relative flex min-h-[640px] flex-col justify-between py-12 md:min-h-[690px] md:py-16">
        <p className="eyebrow text-white/65">Data analyst · Lagos, Nigeria</p>
        <div className="max-w-5xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.17em] text-white/70">Analysis for decisions</p>
          <h1 className="display-heading mb-8 max-w-5xl font-semibold">
            I turn data into decisions for marketing and business teams.
          </h1>
          <p className="max-w-xl text-base leading-7 text-white/70 md:text-lg">
            Market research, customer insight and commercial analysis, grounded in clear evidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-3 bg-[var(--wine)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)]" href="/projects">
              View projects <span aria-hidden="true">→</span>
            </a>
            <a className="inline-flex items-center border border-white/40 px-5 py-3 text-sm font-semibold text-white" href="/contact">
              Contact Emmanuel
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/20 pt-4 text-xs text-white/60">
          <span>Evidence before recommendation</span>
          <span>01 / Lagos</span>
        </div>
      </div>
    </section>
  );
}
