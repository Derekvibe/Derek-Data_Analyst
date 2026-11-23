import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import projects from "@/data/projects.json";
import { OunjeFoodStory } from "@/components/ounjefood-story";
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
  const flagship = project.slug === "ounjefood-unit-economics";
  const sections = [
    ["01", "Business question", project.businessQuestion],
    ["02", "Data source", project.source],
    ["03", "Cleaning and validation", "Document field definitions, check missing and duplicated records, reconcile row counts and financial totals to the source, then record exclusions."],
    ["04", "Method", flagship ? "Three-stage workflow: SQL extraction, Python with pandas for cleaning and analysis, and a Power BI dashboard for review." : "Document the analysis method, comparison period and assumptions alongside the verified notebook."],
    ["05", "Key findings", project.result],
    ["06", "Recommendation and action taken", "[ADD VERIFIED RECOMMENDATION AND ACTION TAKEN]"],
    ["07", "Result", project.result],
    ["08", "Tools used", project.tools.join(", ")],
    ["09", "Notebook or repository", "Add a reviewed public notebook or repository link. Do not expose confidential records."],
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
        <p className="mt-6 border-l-2 border-[var(--primary)] pl-4 text-sm text-[var(--muted)]">{project.status}</p>
      </div>
      {flagship && <OunjeFoodStory />}
      <div className="mt-14">
        {sections.map(([number, title, content]) => (
          <section key={number} className="grid gap-4 border-t border-[var(--border)] py-6 md:grid-cols-[100px_0.7fr_1.3fr]">
            <p className="eyebrow m-0 text-[var(--primary)]">{number}</p>
            <h2 className="m-0 text-xl">{title}</h2>
            <p className="body-copy m-0 max-w-2xl text-sm">{content}</p>
          </section>
        ))}
      </div>
      {project.slug !== "ounjefood-unit-economics" && (
        <p className="mt-10 border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
          Illustrative chart area. Add a chart only after its data, labels and source have been checked.
        </p>
      )}
      <p className="mt-8 text-xs text-[var(--muted)]">Source: {project.source}</p>
    </article>
  );
}
