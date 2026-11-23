import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "Insights", description: "Notes on marketing, customer and sales analytics." };

const articles = [
  {
    number: "01",
    title: "A campaign return is only as useful as its comparison",
    category: "Marketing analytics",
    body: "A return figure needs a consistent definition of revenue, spend and attribution period. Compare campaigns on the same basis, make the costs visible and show where tracking is incomplete. A clear caveat can be more useful than a precise-looking ratio.",
  },
  {
    number: "02",
    title: "Customer segments should lead to different decisions",
    category: "Customer insight",
    body: "A segmentation is not complete when the groups are named. Each group needs a clear definition, a stable size and a business question it can help answer. If the team would treat every group the same way, the model may not be earning its complexity.",
  },
  {
    number: "03",
    title: "A sales dashboard should explain movement, not just totals",
    category: "Sales analytics",
    body: "Totals tell a team where it landed. A useful view also shows what changed, where the change came from and which comparison is fair. Define the period and denominator, then give readers a short path from the chart to a decision.",
  },
];

export default function InsightsPage() {
  return (
    <div className="site-shell py-16 md:py-24">
      <SectionHeading number="01" label="Insights" title="Notes on reading commercial data well." intro="Short perspectives on marketing, customers and sales measurement." />
      <div className="mt-14">
        {articles.map((article) => (
          <article key={article.number} className="grid gap-5 border-t border-[var(--border)] py-8 md:grid-cols-[100px_0.8fr_1.2fr]">
            <p className="eyebrow m-0 text-[var(--primary)]">{article.number}</p>
            <div><p className="eyebrow">{article.category}</p><h2 className="mb-0 mt-3 text-2xl leading-tight">{article.title}</h2></div>
            <p className="body-copy m-0 max-w-2xl text-sm">{article.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
