"use client";

import { useMemo, useState } from "react";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Row = { month: string; channel: string; region: string; category: string; revenue: number; spend: number; orders: number };
const COLORS = ["var(--chart-red)", "var(--chart-charcoal)", "var(--chart-blue)", "var(--chart-grey)", "var(--chart-amber)"];
const formatMoney = (value: number) => `₦${(value / 1000000).toFixed(2)}m`;

export function Dashboard({ rows }: { rows: Row[] }) {
  const [region, setRegion] = useState("All regions");
  const [channel, setChannel] = useState("All channels");
  const [sortAscending, setSortAscending] = useState(false);
  const [sortField, setSortField] = useState<"month" | "region" | "channel" | "revenue">("revenue");
  const reduced = useReducedMotion();
  const filtered = useMemo(
    () => rows.filter((row) => (region === "All regions" || row.region === region) && (channel === "All channels" || row.channel === channel)),
    [rows, region, channel],
  );
  const totalRevenue = filtered.reduce((sum, row) => sum + row.revenue, 0);
  const totalSpend = filtered.reduce((sum, row) => sum + row.spend, 0);
  const totalOrders = filtered.reduce((sum, row) => sum + row.orders, 0);
  const monthly = Object.values(filtered.reduce<Record<string, { month: string; revenue: number; spend: number; orders: number }>>((acc, row) => {
    const current = acc[row.month] ?? { month: row.month, revenue: 0, spend: 0, orders: 0 };
    current.revenue += row.revenue;
    current.spend += row.spend;
    current.orders += row.orders;
    acc[row.month] = current;
    return acc;
  }, {}));
  const channelData = Object.values(filtered.reduce<Record<string, { name: string; revenue: number; spend: number }>>((acc, row) => {
    const current = acc[row.channel] ?? { name: row.channel, revenue: 0, spend: 0 };
    current.revenue += row.revenue;
    current.spend += row.spend;
    acc[row.channel] = current;
    return acc;
  }, {}));
  const topChannel = [...channelData].sort((a, b) => b.revenue - a.revenue)[0];
  const peakMonth = [...monthly].sort((a, b) => b.revenue - a.revenue)[0];
  const sortedRows = [...filtered].sort((a, b) => {
    const first = a[sortField];
    const second = b[sortField];
    const comparison = typeof first === "number" && typeof second === "number"
      ? first - second
      : String(first).localeCompare(String(second));
    return sortAscending ? comparison : -comparison;
  });
  const animation = !reduced;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-5 border-y border-[var(--border)] py-5">
        <div>
          <p className="eyebrow mb-3">Sample data · Synthetic</p>
          <h2 className="m-0 text-2xl">Filter the sample view</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="grid gap-1 text-xs text-[var(--muted)]">Region
            <select className="min-w-36 border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]" value={region} onChange={(event) => setRegion(event.target.value)}>
              {["All regions", ...new Set(rows.map((row) => row.region))].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-xs text-[var(--muted)]">Channel
            <select className="min-w-36 border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]" value={channel} onChange={(event) => setChannel(event.target.value)}>
              {["All channels", ...new Set(rows.map((row) => row.channel))].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {[["Sample revenue", formatMoney(totalRevenue)], ["Sample marketing spend", formatMoney(totalSpend)], ["Sample orders", totalOrders.toLocaleString("en-NG")]].map(([label, value]) => (
          <div key={label} className="border-t border-[var(--border)] pt-4">
            <p className="m-0 text-sm text-[var(--muted)]">{label}</p>
            <p className="tabular mb-0 mt-3 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <ChartPanel title={peakMonth ? `Sample revenue peaks in ${peakMonth.month}` : "No sample revenue in this selection"} subtitle="Revenue by month, synthetic values">
          <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--chart-red)" } }}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthly} margin={{ left: 0, right: 12, top: 12, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
                <YAxis tickFormatter={formatMoney} tickLine={false} axisLine={false} width={66} tick={{ fill: "var(--muted)", fontSize: 11 }} />
                <Tooltip formatter={(value) => formatMoney(Number(value))} contentStyle={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                <Line type="monotone" dataKey="revenue" stroke="var(--chart-red)" strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={animation} animationDuration={750} animationEasing="ease-out" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartPanel>
        <ChartPanel title={topChannel ? `${topChannel.name} ${channelData.length > 1 ? "contributes the most sample revenue" : "is the selected channel"}` : "No sample revenue in this selection"} subtitle="Revenue and spend by channel, synthetic values">
          <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--chart-red)" }, spend: { label: "Spend", color: "var(--chart-blue)" } }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={channelData} margin={{ left: 0, right: 8, top: 12, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
                <YAxis tickFormatter={formatMoney} tickLine={false} axisLine={false} width={66} tick={{ fill: "var(--muted)", fontSize: 11 }} />
                <Tooltip formatter={(value) => formatMoney(Number(value))} contentStyle={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="var(--chart-red)" radius={[2, 2, 0, 0]} isAnimationActive={animation} animationDuration={750} animationEasing="ease-out" />
                <Bar dataKey="spend" name="Spend" fill="var(--chart-blue)" radius={[2, 2, 0, 0]} isAnimationActive={animation} animationDuration={750} animationEasing="ease-out" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartPanel>
        <ChartPanel title={topChannel ? `${topChannel.name} ${channelData.length > 1 ? "accounts for the largest share of sample revenue" : "is the selected channel"}` : "No sample revenue in this selection"} subtitle="Share of sample revenue by channel">
          <ChartContainer config={{ channel: { label: "Revenue share by channel", color: "var(--chart-red)" } }}>
            <ResponsiveContainer width="100%" height={270}>
              <PieChart>
                <Pie data={channelData} dataKey="revenue" nameKey="name" innerRadius={66} outerRadius={98} paddingAngle={3} isAnimationActive={animation} animationDuration={800} animationEasing="ease-out">
                  {channelData.map((item, index) => <Cell key={item.name} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value) => formatMoney(Number(value))} contentStyle={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartPanel>
        <ChartPanel title="Compare sample transactions" subtitle="Select a table heading to change the sort order">
          <div className="max-h-[270px] overflow-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="sticky top-0 bg-[var(--background)] text-xs text-[var(--muted)]">
                <tr>{(["month", "region", "channel", "revenue"] as const).map((field) => <th key={field} className="border-b border-[var(--border)] px-2 py-3 font-medium" aria-sort={sortField === field ? (sortAscending ? "ascending" : "descending") : "none"}><button type="button" className="text-left" onClick={() => {
                  if (sortField === field) setSortAscending((current) => !current);
                  else { setSortField(field); setSortAscending(field !== "revenue"); }
                }}>{field[0].toUpperCase() + field.slice(1)}{sortField === field ? (sortAscending ? " ↑" : " ↓") : ""}</button></th>)}</tr>
              </thead>
              <tbody>
                {sortedRows.map((row, index) => <tr key={`${row.month}-${row.region}-${row.channel}-${index}`} className="border-b border-[var(--border)]">
                  <td className="px-2 py-3">{row.month}</td><td className="px-2 py-3">{row.region}</td><td className="px-2 py-3">{row.channel}</td><td className="px-2 py-3">{formatMoney(row.revenue)}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </ChartPanel>
      </div>
    </div>
  );
}

function ChartPanel({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      className="min-w-0 border-t border-[var(--border)] pt-4"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <h3 className="mb-1 mt-0 text-xl">{title}</h3>
      <p className="mb-4 text-xs text-[var(--muted)]">{subtitle}</p>
      {children}
    </motion.section>
  );
}
