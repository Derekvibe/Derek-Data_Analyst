"use client";

import type { ReactNode } from "react";

export type ChartConfig = Record<string, { label: string; color: string }>;

export function ChartContainer({
  children,
  config,
  className = "",
}: {
  children: ReactNode;
  config: ChartConfig;
  className?: string;
}) {
  const variables = Object.fromEntries(
    Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color]),
  ) as React.CSSProperties;

  return (
    <div
      className={`chart-container ${className}`}
      style={{ ...variables, minWidth: 0, width: "100%" }}
      role="img"
      aria-label={Object.values(config).map((item) => item.label).join(", ")}
    >
      {children}
    </div>
  );
}
