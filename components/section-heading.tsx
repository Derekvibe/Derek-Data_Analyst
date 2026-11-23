"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SectionHeading({
  number,
  label,
  title,
  intro,
}: {
  number: string;
  label: string;
  title: string;
  intro?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="grid gap-5 md:grid-cols-[100px_1fr_0.7fr] md:gap-8"
    >
      <p className="eyebrow">{number} / {label}</p>
      <h2 className="m-0 max-w-3xl text-4xl leading-[1.05] md:text-5xl">{title}</h2>
      {intro ? <p className="body-copy m-0 max-w-lg self-end">{intro}</p> : <span />}
    </motion.div>
  );
}
