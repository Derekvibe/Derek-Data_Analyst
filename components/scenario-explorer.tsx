"use client";

import { useMemo, useState } from "react";

const candidates = [
  { key: "apc", name: "Tinubu", color: "var(--chart-blue)" },
  { key: "pdp", name: "Atiku", color: "var(--chart-amber)" },
  { key: "lp", name: "Obi", color: "var(--chart-teal)" },
  { key: "nnpp", name: "Kwankwaso", color: "var(--chart-grey)" },
] as const;

const zones = ["North Central", "North East", "North West", "South East", "South South", "South West"] as const;
type CandidateKey = (typeof candidates)[number]["key"];
type StateVote = { state: string; zone: string; apc: number; pdp: number; lp: number; nnpp: number; top4_votes: number };

function formatNumber(value: number) {
  return Math.round(value).toLocaleString("en-NG");
}

function adjustedShares(row: Pick<StateVote, CandidateKey | "top4_votes">, target: CandidateKey | "", shift: number) {
  const total = row.top4_votes;
  const shares = Object.fromEntries(candidates.map((candidate) => [
    candidate.key,
    total ? row[candidate.key] / total : 0,
  ])) as Record<CandidateKey, number>;

  if (!target || !shift || !total) return shares;

  const original = shares[target];
  const next = Math.max(0, Math.min(1, original + shift / 100));
  const othersTotal = 1 - original;
  for (const candidate of candidates) {
    if (candidate.key !== target) {
      shares[candidate.key] = othersTotal > 0
        ? shares[candidate.key] * ((1 - next) / othersTotal)
        : (1 - next) / (candidates.length - 1);
    }
  }
  shares[target] = next;
  return shares;
}

export function ScenarioExplorer({ stateVotes }: { stateVotes: StateVote[] }) {
  const [turnout, setTurnout] = useState<Record<string, number>>(
    Object.fromEntries(zones.map((zone) => [zone, 26.71])),
  );
  const [shifts, setShifts] = useState<Record<string, number>>(
    Object.fromEntries(zones.map((zone) => [zone, 0])),
  );
  const [targets, setTargets] = useState<Record<string, CandidateKey | "">>(
    Object.fromEntries(zones.map((zone) => [zone, ""])),
  );

  const result = useMemo(() => {
    const national: Record<CandidateKey, number> = { apc: 0, pdp: 0, lp: 0, nnpp: 0 };
    const byZone: Record<string, Record<CandidateKey, number>> = {};
    for (const zone of zones) byZone[zone] = { apc: 0, pdp: 0, lp: 0, nnpp: 0 };

    for (const row of stateVotes) {
      const change = shifts[row.zone] || 0;
      const shares = adjustedShares(row, targets[row.zone] || "", change);
      const scale = (turnout[row.zone] || 0) / 26.71;
      for (const candidate of candidates) {
        const votes = row.top4_votes * shares[candidate.key] * scale;
        national[candidate.key] += votes;
        byZone[row.zone][candidate.key] += votes;
      }
    }

    const stateThresholds = Object.fromEntries(candidates.map((candidate) => [
      candidate.key,
      stateVotes.filter((row) => {
        const shares = adjustedShares(row, targets[row.zone] || "", shifts[row.zone] || 0);
        return shares[candidate.key] >= 0.25;
      }).length,
    ])) as Record<CandidateKey, number>;
    return { national, byZone, stateThresholds };
  }, [stateVotes, shifts, targets, turnout]);

  function applyPreset(preset: "repeat" | "higher" | "regional") {
    const nextTurnout = Object.fromEntries(zones.map((zone) => [
      zone,
      preset === "repeat" ? 26.71 : preset === "higher" ? 35 : zone.startsWith("South") ? 34 : 29,
    ]));
    setTurnout(nextTurnout);
    if (preset === "repeat") {
      setShifts(Object.fromEntries(zones.map((zone) => [zone, 0])));
      setTargets(Object.fromEntries(zones.map((zone) => [zone, ""])));
    }
  }

  const estimatedTotal = candidates.reduce((sum, candidate) => sum + result.national[candidate.key], 0);

  return (
    <section className="border border-[var(--border)] bg-[var(--surface)] p-5 md:p-8" aria-labelledby="scenario-heading">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">What-if tool</p>
          <h3 id="scenario-heading" className="mb-0 mt-2 text-2xl">Change turnout and vote shares by zone</h3>
        </div>
        <div className="no-print flex flex-wrap gap-2">
          <button type="button" className="border border-[var(--border)] px-3 py-2 text-sm hover:border-[var(--wine-text)]" onClick={() => applyPreset("repeat")}>2023 repeat</button>
          <button type="button" className="border border-[var(--border)] px-3 py-2 text-sm hover:border-[var(--wine-text)]" onClick={() => applyPreset("higher")}>Higher turnout</button>
          <button type="button" className="border border-[var(--border)] px-3 py-2 text-sm hover:border-[var(--wine-text)]" onClick={() => applyPreset("regional")}>Regional swing</button>
        </div>
      </div>

      <p className="mt-4 border-l-2 border-[var(--warning)] pl-4 text-sm leading-6 text-[var(--muted)]">
        Zone-level voter-register and turnout denominators were not included in the supplied results file. The 26.71% default is the 2023 national turnout used as a common scaling reference, not a zone turnout figure. Estimates and threshold counts below use only the four listed candidates.
      </p>

      <div className="mt-7 space-y-5">
        {zones.map((zone) => (
          <fieldset key={zone} className="grid gap-4 border-t border-[var(--border)] pt-4 md:grid-cols-[150px_1fr_1fr_180px] md:items-end">
            <legend className="sr-only">{zone} scenario controls</legend>
            <p className="m-0 text-sm font-medium">{zone}</p>
            <label className="grid gap-2 text-xs text-[var(--muted)]">
              <span className="flex justify-between"><span>Turnout assumption</span><output>{turnout[zone].toFixed(1)}%</output></span>
              <input aria-label={`${zone} turnout assumption`} type="range" min="15" max="60" step="0.5" value={turnout[zone]} onChange={(event) => setTurnout((current) => ({ ...current, [zone]: Number(event.target.value) }))} />
            </label>
            <label className="grid gap-2 text-xs text-[var(--muted)]">
              <span className="flex justify-between"><span>Share change</span><output>{shifts[zone] > 0 ? "+" : ""}{shifts[zone]} pp</output></span>
              <input aria-label={`${zone} candidate share change`} type="range" min="-15" max="15" step="1" value={shifts[zone]} disabled={!targets[zone]} onChange={(event) => setShifts((current) => ({ ...current, [zone]: Number(event.target.value) }))} />
            </label>
            <label className="grid gap-1 text-xs text-[var(--muted)]">
              Candidate receiving share change
              <select className="border border-[var(--border)] bg-[var(--background)] px-2 py-2 text-sm text-[var(--foreground)]" value={targets[zone]} onChange={(event) => setTargets((current) => ({ ...current, [zone]: event.target.value as CandidateKey | "" }))}>
                <option value="">No share shift</option>
                {candidates.map((candidate) => <option key={candidate.key} value={candidate.key}>{candidate.name}</option>)}
              </select>
            </label>
          </fieldset>
        ))}
      </div>

      <div className="mt-8 grid gap-8 border-t border-[var(--border)] pt-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Estimated votes</p>
          <p className="tabular mb-4 mt-2 text-3xl font-semibold">{formatNumber(estimatedTotal)}</p>
          <ul className="space-y-3 p-0">
            {candidates.map((candidate) => (
              <li key={candidate.key} className="flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5" style={{ backgroundColor: candidate.color }} aria-hidden="true" />{candidate.name}</span>
                <span className="tabular">{formatNumber(result.national[candidate.key])}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">States and FCT where each candidate reaches 25% of the four-candidate vote</p>
          <div className="mt-4 space-y-4">
            {candidates.map((candidate) => (
              <div key={candidate.key} className="grid grid-cols-[90px_1fr_55px] items-center gap-3 text-xs">
                <span>{candidate.name}</span>
                <div className="h-2 bg-[var(--surface-strong)]" role="meter" aria-label={`${candidate.name}: number of states and FCT reaching 25 percent`} aria-valuemin={0} aria-valuemax={37} aria-valuenow={result.stateThresholds[candidate.key]}>
                  <div className="h-full" style={{ width: `${(result.stateThresholds[candidate.key] / 37) * 100}%`, backgroundColor: candidate.color }} />
                </div>
                <span className="tabular text-right">{result.stateThresholds[candidate.key]} / 37</span>
              </div>
            ))}
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {zones.map((zone) => {
              const values = result.byZone[zone];
              const ranked = [...candidates].sort((a, b) => values[b.key] - values[a.key]);
              return <p key={zone} className="m-0 border-t border-[var(--border)] pt-2 text-xs text-[var(--muted)]">{zone}: {ranked[0].name} leads listed candidates by {formatNumber(values[ranked[0].key] - values[ranked[1].key])}</p>;
            })}
          </div>
        </div>
      </div>
      <p className="mb-0 mt-6 text-xs text-[var(--muted)]">This is a what-if tool built on 2023 results. It is not a forecast.</p>
    </section>
  );
}
