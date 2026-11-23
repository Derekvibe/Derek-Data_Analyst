import Link from "next/link";
import { HeroScene } from "@/components/hero-scene";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ToolsStrip } from "@/components/tools-strip";
import { CvLink } from "@/components/cv-link";
import { Icon } from "@/components/ui/icon";
import projects from "@/data/projects.json";

export default function HomePage() {
  return (
    <>
      <HeroScene />
      <section className="site-shell py-16 md:py-24">
        <SectionHeading
          number="01"
          label="Focus"
          title="Start with the business question."
          intro="Then find the evidence, explain what it means and make the next decision easier."
        />
        <div className="mt-12 grid gap-8 border-t border-[var(--border)] pt-5 md:grid-cols-3">
          <div className="max-w-sm">
            <Icon name="people" className="mb-5 h-5 w-5 text-[var(--wine-text)]" />
            <h3 className="mb-2 mt-0 text-xl">Understand customers</h3>
            <p className="body-copy m-0 text-sm">Find useful patterns in customer behaviour, needs and repeat activity.</p>
          </div>
          <div className="max-w-sm">
            <Icon name="chart" className="mb-5 h-5 w-5 text-[var(--wine-text)]" />
            <h3 className="mb-2 mt-0 text-xl">Measure performance</h3>
            <p className="body-copy m-0 text-sm">Make campaign, sales and service performance easier to assess.</p>
          </div>
          <div className="max-w-sm">
            <Icon name="search" className="mb-5 h-5 w-5 text-[var(--wine-text)]" />
            <h3 className="mb-2 mt-0 text-xl">Find the next step</h3>
            <p className="body-copy m-0 text-sm">Turn analysis into a clear recommendation, with its limits stated.</p>
          </div>
        </div>
      </section>

      <div className="site-shell"><div className="section-rule" /></div>

      <section className="site-shell py-16 md:py-24">
        <SectionHeading
          number="02"
          label="Selected case studies"
          title="Work grounded in real questions."
          intro="Explore customer, marketing, sales and market research projects, with the data source and scope made clear."
        />
        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {projects.slice(0, 4).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
        <Link href="/projects" className="mt-10 inline-flex items-center gap-3 border-b border-[var(--primary)] pb-2 text-sm font-semibold">
          Browse all case studies <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </section>

      <ToolsStrip />

      <section className="site-shell py-16 md:py-24">
        <SectionHeading
          number="03"
          label="How I work"
          title="Question first. Evidence next. Recommendation last."
          intro="Chemical engineering training shaped a process-minded approach to analysis. Conclusions are checked against the source and the business context."
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
            <Link href="/projects" className="border-b border-[var(--primary)] pb-2 text-sm font-semibold">View case studies</Link>
            <CvLink className="border-b border-[var(--border)] pb-2 text-sm font-semibold" />
            <Link href="/contact" className="border-b border-[var(--border)] pb-2 text-sm font-semibold">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
