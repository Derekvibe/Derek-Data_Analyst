import Link from "next/link";
import { HeroScene } from "@/components/hero-scene";
import { KpiCount } from "@/components/kpi-count";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ToolsStrip } from "@/components/tools-strip";
import { CvLink } from "@/components/cv-link";
import projects from "@/data/projects.json";

export default function HomePage() {
  return (
    <>
      <HeroScene />
      <section className="site-shell py-16 md:py-24">
        <SectionHeading
          number="01"
          label="What I do"
          title="Good analysis makes the next decision clearer."
          intro="I work across customer, marketing and sales data to help teams understand what is happening, why it matters and what to do next."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          <KpiCount value="[ADD REAL RESULT]" label="Business outcome from verified analysis" />
          <KpiCount value="[ADD REAL RESULT]" label="Customer or vendor insight" />
          <KpiCount value="[ADD REAL RESULT]" label="Analysis delivered to a team" />
        </div>
        <p className="mt-4 text-xs text-[var(--muted)]">Replace each field with a result that can be verified and shared.</p>
      </section>

      <div className="site-shell"><div className="section-rule" /></div>

      <section className="site-shell py-16 md:py-24">
        <SectionHeading
          number="02"
          label="Selected work"
          title="Questions worth answering."
          intro="A selection of commercial and customer analysis. Findings are shown only when supported by a source and verified output."
        />
        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {projects.slice(0, 4).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
        <Link href="/projects" className="mt-10 inline-flex items-center gap-3 border-b border-[var(--primary)] pb-2 text-sm font-semibold">
          Browse all projects <span aria-hidden="true">→</span>
        </Link>
      </section>

      <ToolsStrip />

      <section className="site-shell py-16 md:py-24">
        <SectionHeading
          number="03"
          label="Approach"
          title="Question first. Data next. Recommendation last."
          intro="An engineering background brings a process-minded approach to messy business questions. Every conclusion is checked against the source and the context."
        />
        <div className="mt-12 grid gap-8 border-t border-[var(--border)] pt-5 md:grid-cols-[1fr_1fr_auto]">
          <p className="body-copy m-0 max-w-lg">From customer segmentation to campaign measurement, I focus on work that helps a team choose a practical next step.</p>
          <p className="body-copy m-0 max-w-lg">I am based in Lagos and interested in market research, customer experience and commercial analytics.</p>
          <Link href="/about" className="self-end text-sm font-semibold text-[var(--primary)]">More about my work →</Link>
        </div>
      </section>

      <section className="site-shell">
        <div className="flex flex-col justify-between gap-8 border-t border-[var(--border)] py-12 md:flex-row md:items-end md:py-16">
          <div>
            <p className="eyebrow">Let’s talk</p>
            <h2 className="mb-0 mt-4 max-w-3xl text-4xl leading-tight md:text-5xl">Have a business question in mind?</h2>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/projects" className="border-b border-[var(--primary)] pb-2 text-sm font-semibold">View projects</Link>
            <CvLink className="border-b border-[var(--border)] pb-2 text-sm font-semibold" />
            <Link href="/contact" className="border-b border-[var(--border)] pb-2 text-sm font-semibold">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
