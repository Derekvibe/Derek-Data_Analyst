import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import projects from "@/data/projects.json";
import { PrintButton } from "@/components/print-button";

type Project = (typeof projects)[number];
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return <ProjectDetails project={project} />;
}

function ProjectDetails({ project }: { project: Project }) {
  const analysisScope = project.slug === "ounjefood-unit-economics"
    ? "The workflow follows three stages: SQL extraction, data checks and analysis in Python, then reporting in Power BI."
    : project.slug === "customer-segmentation"
      ? "Compare recency, frequency and monetary value, then assess whether clustering adds useful distinctions for customer decisions."
      : project.slug === "campaign-performance"
        ? "Explore customer response patterns using the fields available in the public dataset. Spend and revenue are not included."
        : "Review the GDP indicator by year, with its published definition and reporting period kept visible.";
  const sections = [
    ["01", "Business question", project.businessQuestion],
    ["02", "Data source", project.source],
    ["03", "Analysis scope", analysisScope],
    ["04", "Tools", project.tools.join(", ")],
  ];

  return (
    <article className="site-shell py-16 md:py-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/projects" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">← All projects</Link>
        <PrintButton />
      </div>
      <div className="mt-10 max-w-4xl">
        <p className="eyebrow">{project.type} / {project.theme}</p>
        <h1 className="page-heading mb-7 mt-4">{project.title}</h1>
        <p className="body-copy max-w-2xl">{project.summary}</p>
      </div>
      <div className="mt-14">
        {sections.map(([number, title, content]) => (
          <section key={number} className="grid gap-4 border-t border-[var(--border)] py-6 md:grid-cols-[100px_0.7fr_1.3fr]">
            <p className="eyebrow m-0 text-[var(--primary)]">{number}</p>
            <h2 className="m-0 text-xl">{title}</h2>
            <p className="body-copy m-0 max-w-2xl text-sm">{content}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
