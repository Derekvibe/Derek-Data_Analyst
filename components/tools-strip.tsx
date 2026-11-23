const tools = ["Excel", "SQL", "Python · pandas", "Power BI", "Tableau"];

export function ToolsStrip() {
  return (
    <section aria-label="Tools" className="overflow-hidden border-y border-[var(--border)] py-5">
      <div className="tool-marquee flex w-max gap-12 pr-12 motion-reduce:animate-none" tabIndex={0}>
        {[...tools, ...tools].map((tool, index) => (
          <span key={`${tool}-${index}`} aria-hidden={index >= tools.length} className="whitespace-nowrap text-sm font-medium text-[var(--muted)]">
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}
