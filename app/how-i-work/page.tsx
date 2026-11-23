import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "How I Work", description: "A question-led, checked workflow for business analysis." };

const phases = [
  ["01", "Frame the question", "Agree the decision, population, measure and time period with the business team."],
  ["02", "Inspect the data", "Check definitions, coverage, duplicates, missing values and source totals."],
  ["03", "Analyse and test", "Draft queries and analysis scripts, then test assumptions against subsets and edge cases."],
  ["04", "Verify the output", "Spot-check records, reconcile totals to source, re-run the logic and sense-check the result with the business."],
  ["05", "Recommend an action", "State the evidence, limitation and practical next step in a format the team can use."],
];

export default function HowIWorkPage() {
  return (
    <div className="site-shell py-16 md:py-24">
      <SectionHeading number="01" label="How I work" title="A clear question. A checked answer. A useful next step." intro="The method is simple by design. Each stage leaves a record of what was checked and what remains uncertain." />
      <ol className="mt-14 p-0">
        {phases.map(([number, title, description]) => (
          <li key={number} className="grid gap-4 border-t border-[var(--border)] py-6 md:grid-cols-[100px_0.7fr_1.3fr]">
            <span className="eyebrow text-[var(--primary)]">{number}</span>
            <h2 className="m-0 text-xl">{title}</h2>
            <p className="body-copy m-0 max-w-2xl text-sm">{description}</p>
          </li>
        ))}
      </ol>
      <section className="mt-12 border-t border-[var(--border)] pt-7">
        <p className="eyebrow">Worked example</p>
        <h2 className="mt-3 text-3xl">Checking a campaign return calculation</h2>
        <p className="body-copy max-w-3xl">Before comparing channels, confirm that spend and attributed revenue use the same period and attribution window. Reconcile spend to the source export, spot-check campaign rows, re-run the calculation on a small sample, then ask the marketing team whether the result matches how campaigns were actually run. Record any limits before recommending a budget change.</p>
      </section>
      <div className="mt-10 grid items-center gap-4 border border-[var(--border)] p-5 text-center sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] sm:text-left" role="group" aria-label="Analysis verification flow">
        {["Question", "Data", "Checks", "Finding", "Action"].map((step, index) => (
          <div key={step} className="contents">
            <p className="m-0 text-sm font-medium">{step}</p>
            {index < 4 && <span className="text-[var(--primary)]" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
