"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function KpiCount({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(reduceMotion ? value : "");
  const numericValue = /^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/.exec(value);

  useEffect(() => {
    if (!inView) return;
    if (!numericValue || reduceMotion) {
      setShown(value);
      return;
    }

    const [, prefix, rawNumber, suffix] = numericValue;
    const target = Number(rawNumber.replace(/,/g, ""));
    const precision = rawNumber.includes(".") ? rawNumber.split(".")[1].length : 0;
    const factor = 10 ** precision;
    const controls = animate(0, target, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (current) => {
        const rounded = Math.round(current * factor) / factor;
        setShown(`${prefix}${rounded.toLocaleString("en-NG", { maximumFractionDigits: precision })}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, numericValue?.[0], reduceMotion, value]);

  return (
    <div ref={ref} className="border-t border-[var(--border)] pt-4">
      <p className="mb-2 text-xs text-[var(--muted)]">{label}</p>
      <p className="tabular mb-2 text-3xl font-semibold tracking-tight">{shown}</p>
      <motion.div
        aria-hidden="true"
        className="h-[2px] origin-left bg-[var(--primary)]"
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
