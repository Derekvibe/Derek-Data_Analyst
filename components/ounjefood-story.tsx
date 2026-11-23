"use client";

import { useEffect, useState } from "react";

const steps = [
  { heading: "Start with the source", text: "Confirm the population, time period, field definitions and missing records before interpreting the totals.", bars: [30, 75, 43, 61, 20], focus: -1 },
  { heading: "Clean and validate", text: "Remove confirmed duplicates, reconcile totals to source records and document any exclusions.", bars: [28, 62, 48, 55, 25], focus: -1 },
  { heading: "Compare customer and vendor groups", text: "Review segments with definitions and denominators that make comparisons fair.", bars: [36, 57, 48, 71, 31], focus: -1 },
  { heading: "Locate loss drivers", text: "Highlight verified contributors to loss only after each figure is traced to its source.", bars: [35, 29, 71, 45, 28], focus: 2 },
  { heading: "Show the adjusted view", text: "Compare the after-adjustment result to a clearly defined baseline and record what changed.", bars: [34, 36, 40, 45, 49], focus: -1 },
];

export function OunjeFoodStory() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    document.querySelectorAll<HTMLElement>("[data-story-step]").forEach((element, index) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(index);
      }, { threshold: 0.55 });
      observer.observe(element);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const step = steps[active];
  return (
    <section className="mt-14 border-y border-[var(--border)] py-8">
      <p className="eyebrow">The analysis, step by step</p>
      <p className="mb-8 max-w-2xl text-sm text-[var(--muted)]">This diagram is illustrative only. It contains no OunjeFood findings or measured values.</p>
      <ol className="mb-10 grid gap-5 p-0 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center" aria-label="Three-stage analysis pipeline">
        <li className="list-none border-t border-[var(--border)] pt-3">
          <span className="eyebrow text-[var(--primary)]">01 / SQL</span>
          <p className="mb-0 mt-2 text-sm font-medium">Extract and scope the records</p>
        </li>
        <li className="hidden text-[var(--primary)] md:block" aria-hidden="true">→</li>
        <li className="list-none border-t border-[var(--border)] pt-3">
          <span className="eyebrow text-[var(--primary)]">02 / Python · pandas</span>
          <p className="mb-0 mt-2 text-sm font-medium">Clean, validate and analyse</p>
        </li>
        <li className="hidden text-[var(--primary)] md:block" aria-hidden="true">→</li>
        <li className="list-none border-t border-[var(--border)] pt-3">
          <span className="eyebrow text-[var(--primary)]">03 / Power BI</span>
          <p className="mb-0 mt-2 text-sm font-medium">Review the findings in a dashboard</p>
        </li>
      </ol>
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="order-2 space-y-3 lg:order-1">
          {steps.map((item, index) => (
            <div key={item.heading} data-story-step={index} className="flex min-h-[190px] flex-col justify-center border-t border-[var(--border)] py-6">
              <p className="eyebrow text-[var(--primary)]">Step {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mb-2 mt-2 text-2xl">{item.heading}</h3>
              <p className="body-copy m-0 max-w-lg text-sm">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="order-1 h-fit border border-[var(--border)] bg-[var(--surface)] p-5 lg:sticky lg:top-8 lg:order-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Illustrative view · Not project data</p>
              <h3 className="mb-0 mt-2 text-xl">{step.heading}</h3>
            </div>
            <span className="text-xs text-[var(--muted)]">{String(active + 1).padStart(2, "0")} / 05</span>
          </div>
          <div className="mt-8 flex h-48 items-end gap-3 border-b border-l border-[var(--border)] px-4 pb-0">
            {step.bars.map((height, index) => (
              <div key={`${active}-${index}`} className="relative flex-1" style={{ height: `${height}%` }}>
                <div className={`absolute inset-0 origin-bottom transition-transform duration-700 ease-out ${step.focus === index ? "bg-[var(--primary)]" : "bg-[var(--chart-blue)]"}`} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-[var(--muted)]"><span>Group A</span><span>Group B</span><span>Group C</span><span>Group D</span><span>Group E</span></div>
          <p className="mb-0 mt-5 text-xs text-[var(--muted)]">{step.text}</p>
        </div>
      </div>
    </section>
  );
}
