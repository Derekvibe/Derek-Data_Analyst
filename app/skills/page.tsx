import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "Skills", description: "Data analysis, visualisation, statistics and communication skills." };

const groups = [
  { n: "01", title: "Data wrangling", items: ["Excel", "SQL", "Python with pandas"] },
  { n: "02", title: "Visualisation", items: ["Power BI", "Tableau", "Charts for reports and presentations"] },
  { n: "03", title: "Statistics", items: ["Customer segmentation", "Regression", "A/B testing"] },
  { n: "04", title: "Communication", items: ["Analytical reports", "Presentations", "Business recommendations"] },
];

export default function SkillsPage() {
  return (
    <div className="site-shell py-16 md:py-24">
      <SectionHeading number="01" label="Skills" title="Methods and tools for useful analysis." intro="Tools support the work. The question, data quality and decision context come first." />
      <div className="mt-14">
        {groups.map((group) => (
          <section key={group.n} className="grid gap-5 border-t border-[var(--border)] py-7 md:grid-cols-[100px_0.8fr_1.2fr]">
            <p className="eyebrow m-0">{group.n}</p>
            <h2 className="m-0 text-2xl">{group.title}</h2>
            <ul className="m-0 grid gap-3 p-0 text-sm text-[var(--muted)] sm:grid-cols-2">
              {group.items.map((item) => <li key={item} className="list-none">{item}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <p className="body-copy mt-8 max-w-2xl text-sm">I describe skills through the work I can show, not self-assigned proficiency scores. Add only tools and methods used in the published project examples.</p>
    </div>
  );
}
