"use client";

import { useState } from "react";

type StateRegister = { state: string; voters: number };
type ZoneTotal = { zone: string; apc: number; pdp: number; lp: number; nnpp: number };
type ElectionState = {
  state: string;
  zone: string;
  apc: number;
  pdp: number;
  lp: number;
  nnpp: number;
  top4_votes: number;
  winner: string;
  winning_margin: number;
  apc_share_of_top4: number;
  pdp_share_of_top4: number;
  lp_share_of_top4: number;
  nnpp_share_of_top4: number;
};

function exportCsv(filename: string, rows: Array<Record<string, string | number>>) {
  const headers = Object.keys(rows[0] ?? {});
  const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => {
    const value = String(row[header] ?? "");
    return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  }).join(","))].join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ExportButton({ label, rows, filename }: { label: string; rows: Array<Record<string, string | number>>; filename: string }) {
  return <button type="button" className="no-print border border-[var(--border)] px-3 py-2 text-xs hover:border-[var(--wine-text)]" onClick={() => exportCsv(filename, rows)}>Export {label} CSV</button>;
}

export function RegisterChart() {
  const rows = [
    { year: 2023, registered_voters: 93469008 },
    { year: 2027, registered_voters: 103428715 },
  ];
  const max = rows[1].registered_voters;
  return (
    <section className="border-t border-[var(--border)] pt-5" aria-labelledby="register-chart-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h3 id="register-chart-title" className="mb-1 mt-0 text-xl">The 2027 register is 10.66% larger than in 2023</h3><p className="text-xs text-[var(--muted)]">INEC voter register, national totals</p></div>
        <ExportButton label="register growth" rows={rows} filename="nigeria-register-growth.csv" />
      </div>
      <div className="mt-6 grid gap-5">
        {rows.map((row) => (
          <div key={row.year} className="grid grid-cols-[52px_1fr_auto] items-center gap-3 text-sm" tabIndex={0} title={`${row.year}: ${row.registered_voters.toLocaleString("en-NG")} registered voters. Difference from 2023: ${(row.registered_voters - rows[0].registered_voters).toLocaleString("en-NG")}. Source: INEC reports cited in the brief.`} aria-label={`${row.year}, ${row.registered_voters.toLocaleString("en-NG")} registered voters`}>
            <span>{row.year}</span>
            <div className="h-5 bg-[var(--surface-strong)]">
              <div className="h-full bg-[var(--wine)] motion-safe:animate-[bar-grow_800ms_ease-out_both]" style={{ width: `${(row.registered_voters / max) * 100}%` }} />
            </div>
            <span className="tabular text-xs">{row.registered_voters.toLocaleString("en-NG")}</span>
          </div>
        ))}
      </div>
      <p className="mb-0 mt-4 text-sm text-[var(--muted)]">Change since 2023: +9,959,707 voters.</p>
    </section>
  );
}

export function ParticipationChart() {
  const rows = [
    { stage: "Registered", value: 93469008, percent: 100 },
    { stage: "Accredited", value: 25286616, percent: 25286616 / 93469008 * 100 },
    { stage: "Votes cast", value: 24965218, percent: 24965218 / 93469008 * 100 },
    { stage: "Valid votes", value: 24025940, percent: 24025940 / 93469008 * 100 },
  ];
  return (
    <section className="mt-12 border-t border-[var(--border)] pt-5" aria-labelledby="participation-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h3 id="participation-title" className="mb-1 mt-0 text-xl">Participation narrows at each stage of the 2023 count</h3><p className="text-xs text-[var(--muted)]">Presidential election, 25 February 2023</p></div>
        <ExportButton label="participation" rows={rows.map(({ stage, value, percent }) => ({ stage, value, share_of_register_percent: Number(percent.toFixed(2)) }))} filename="nigeria-2023-participation.csv" />
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {rows.map(({ stage, value, percent }) => (
          <div key={stage} tabIndex={0} title={`${stage}: ${value.toLocaleString("en-NG")}, ${(100 - percent).toFixed(2)}% below registered voters. Source: INEC declared results.`} className="border-t border-[var(--border)] pt-3">
            <p className="m-0 text-sm">{stage}</p><p className="tabular mb-1 mt-2 text-lg font-semibold">{value.toLocaleString("en-NG")}</p>
            <div className="h-2 bg-[var(--surface-strong)]"><div className="h-full bg-[var(--wine)]" style={{ width: `${percent}%` }} /></div>
            <p className="mb-0 mt-2 text-xs text-[var(--muted)]">{percent.toFixed(2)}% of register</p>
          </div>
        ))}
      </div>
      <p className="body-copy mt-4 text-sm">Lagos had more than seven million registered voters in 2023 and fewer than two million actual voters. The supplied source does not include an exact Lagos turnout count, so this is presented as a range statement.</p>
    </section>
  );
}

export function TopStatesChart({ states }: { states: StateRegister[] }) {
  const max = Math.max(...states.map((item) => item.voters));
  const rows = states.map((row) => ({ state: row.state, registered_voters: row.voters, share_of_register_percent: Number(((row.voters / 103428715) * 100).toFixed(2)) }));
  return (
    <section className="border-t border-[var(--border)] pt-5" aria-labelledby="top-states-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h3 id="top-states-title" className="mb-1 mt-0 text-xl">Ten states account for 41.15% of registered voters</h3><p className="text-xs text-[var(--muted)]">2027 register, share of 103,428,715</p></div>
        <ExportButton label="state register" rows={rows} filename="nigeria-2027-top-states.csv" />
      </div>
      <div className="mt-6 space-y-3">
        {states.map((row) => (
          <div key={row.state} className="grid grid-cols-[76px_1fr_125px] items-center gap-3 text-xs" tabIndex={0} title={`${row.state}: ${row.voters.toLocaleString("en-NG")} registered voters, ${((row.voters / 103428715) * 100).toFixed(2)}% of the national register. Source: INEC figures cited in the brief.`} aria-label={`${row.state}, ${row.voters.toLocaleString("en-NG")} registered voters, ${((row.voters / 103428715) * 100).toFixed(2)} percent of national register`}>
            <span>{row.state}</span>
            <div className="h-3 bg-[var(--surface-strong)]"><div className="h-full bg-[var(--wine)]" style={{ width: `${(row.voters / max) * 100}%` }} /></div>
            <span className="tabular text-right">{row.voters.toLocaleString("en-NG")} <span className="text-[var(--muted)]">({((row.voters / 103428715) * 100).toFixed(2)}%)</span></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ZoneResults({ zones }: { zones: ZoneTotal[] }) {
  const candidates = [
    { key: "apc" as const, label: "Tinubu", color: "var(--chart-blue)" },
    { key: "pdp" as const, label: "Atiku", color: "var(--chart-amber)" },
    { key: "lp" as const, label: "Obi", color: "var(--chart-teal)" },
    { key: "nnpp" as const, label: "Kwankwaso", color: "var(--chart-grey)" },
  ];
  const rows = zones.map((zone) => ({ zone: zone.zone, ...Object.fromEntries(candidates.map((candidate) => [candidate.label, zone[candidate.key]])) }));
  const max = Math.max(...zones.map((zone) => candidates.reduce((sum, candidate) => sum + zone[candidate.key], 0)));
  return (
    <section className="border-t border-[var(--border)] pt-5" aria-labelledby="zone-results-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h3 id="zone-results-title" className="mb-1 mt-0 text-xl">The 2023 vote differed sharply by geopolitical zone</h3><p className="text-xs text-[var(--muted)]">Four leading candidates, derived from the state-level file</p></div>
        <ExportButton label="zone results" rows={rows} filename="nigeria-2023-zone-results.csv" />
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
        {candidates.map((candidate) => <span key={candidate.key} className="flex items-center gap-2"><i className="h-2.5 w-2.5" style={{ backgroundColor: candidate.color }} aria-hidden="true" />{candidate.label}</span>)}
      </div>
      <div className="mt-5 space-y-4">
        {zones.map((zone) => {
          const total = candidates.reduce((sum, candidate) => sum + zone[candidate.key], 0);
          let offset = 0;
          return (
            <div key={zone.zone} tabIndex={0} aria-label={`${zone.zone} results by listed candidate. Total ${total.toLocaleString("en-NG")}. Source: compiled INEC declared state results.`} title={`${zone.zone}: ${total.toLocaleString("en-NG")} votes among the four listed candidates. Source: compiled INEC declared state results.`}>
              <div className="mb-1 flex justify-between text-xs"><span>{zone.zone}</span><span className="tabular text-[var(--muted)]">{total.toLocaleString("en-NG")}</span></div>
              <div className="flex h-4 overflow-hidden bg-[var(--surface-strong)]">
                {candidates.map((candidate) => {
                  const width = (zone[candidate.key] / max) * 100;
                  const segment = <div key={candidate.key} style={{ width: `${width}%`, backgroundColor: candidate.color, marginLeft: offset === 0 ? 0 : undefined }} />;
                  offset += width;
                  return segment;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function StateResultTiles({ states }: { states: ElectionState[] }) {
  const [view, setView] = useState<"winner" | "margin" | "zone">("winner");
  const winnerColors: Record<string, string> = {
    APC: "var(--chart-blue)",
    PDP: "var(--chart-amber)",
    LP: "var(--chart-teal)",
    NNPP: "var(--chart-grey)",
  };
  const zoneColors: Record<string, string> = {
    "North Central": "var(--chart-blue)",
    "North East": "var(--chart-amber)",
    "North West": "var(--chart-grey)",
    "South East": "var(--chart-teal)",
    "South South": "var(--chart-charcoal)",
    "South West": "var(--chart-amber)",
  };
  const rows = states.map(({ state, zone, apc, pdp, lp, nnpp, top4_votes, winner, winning_margin, apc_share_of_top4, pdp_share_of_top4, lp_share_of_top4, nnpp_share_of_top4 }) => ({ state, zone, apc, pdp, lp, nnpp, top4_votes, winner, winning_margin, apc_share_of_top4, pdp_share_of_top4, lp_share_of_top4, nnpp_share_of_top4 }));
  const maxMargin = Math.max(...states.map((row) => row.winning_margin));
  const parties = ["APC", "PDP", "LP", "NNPP"];
  return (
    <section className="mt-12 border-t border-[var(--border)] pt-5" aria-labelledby="state-tiles-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h3 id="state-tiles-title" className="mb-1 mt-0 text-xl">State results show different regional patterns</h3><p className="text-xs text-[var(--muted)]">Alphabetical result tiles, not a geographic map; margins and winners derive from the supplied four-candidate file</p></div>
        <ExportButton label="state results" rows={rows} filename="nigeria-2023-state-results.csv" />
      </div>
      <div className="no-print mt-4 flex flex-wrap gap-2" role="group" aria-label="State result tile view">
        {(["winner", "margin", "zone"] as const).map((option) => (
          <button key={option} type="button" aria-pressed={view === option} className={`border px-3 py-2 text-xs ${view === option ? "border-[var(--wine-text)] text-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted)]"}`} onClick={() => setView(option)}>
            {option === "winner" ? "2023 winner" : option === "margin" ? "Margin size" : "Geopolitical zone"}
          </button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7">
        {states.map((row) => {
          const leadingParty = row.winner.split(" ")[0];
          const marginLevel = row.winning_margin / maxMargin;
          const marginShade = Math.round(64 + marginLevel * 79).toString(16).padStart(2, "0");
          const background = view === "zone" ? zoneColors[row.zone] : view === "margin"
            ? `#${marginShade}${marginShade}${marginShade}`
            : winnerColors[leadingParty];
          const foreground = view === "winner"
            ? leadingParty === "APC" ? "#f1eded" : "#0b0b0d"
            : view === "zone"
              ? row.zone === "North Central" ? "#f1eded" : "#0b0b0d"
              : marginLevel < 0.55 ? "#f1eded" : "#0b0b0d";
          const exactVotes = `${row.state}, ${row.zone}. Four-candidate vote total ${row.top4_votes.toLocaleString("en-NG")}. Votes: APC ${row.apc.toLocaleString("en-NG")} (${row.apc_share_of_top4.toFixed(2)}%), PDP ${row.pdp.toLocaleString("en-NG")} (${row.pdp_share_of_top4.toFixed(2)}%), LP ${row.lp.toLocaleString("en-NG")} (${row.lp_share_of_top4.toFixed(2)}%), NNPP ${row.nnpp.toLocaleString("en-NG")} (${row.nnpp_share_of_top4.toFixed(2)}%). Winner ${row.winner}, margin ${row.winning_margin.toLocaleString("en-NG")}. Source: compiled INEC declared state results.`;
          return <div key={row.state} tabIndex={0} title={exactVotes} aria-label={exactVotes} className="flex min-h-14 items-center justify-center border border-[var(--background)] px-1 text-center text-[10px] font-medium" style={{ backgroundColor: background, color: foreground }}>{row.state}</div>;
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
        {view === "zone"
          ? Object.entries(zoneColors).map(([label, color]) => <span key={label} className="flex items-center gap-2"><i className="h-2.5 w-2.5" style={{ backgroundColor: color }} aria-hidden="true" />{label}</span>)
          : view === "margin"
            ? <span>Neutral grey tiles darken as the winning margin increases; hover or focus for the exact margin.</span>
            : parties.map((label) => <span key={label} className="flex items-center gap-2"><i className="h-2.5 w-2.5" style={{ backgroundColor: winnerColors[label] }} aria-hidden="true" />{label}</span>)}
      </div>
      <p className="body-copy mt-4 text-xs">No party colors or brand wine are used to represent candidates. State shares are calculated from the four listed candidates only. Complete valid-vote totals are required for an authoritative constitutional threshold count.</p>
    </section>
  );
}
