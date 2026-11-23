import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ScenarioExplorer } from "@/components/scenario-explorer";
import { ParticipationChart, RegisterChart, StateResultTiles, TopStatesChart, ZoneResults } from "@/components/research-charts";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "Our Works",
  description: "Selected case studies and independent research by Okoro Emmanuel Nzube.",
};

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

const topStates = [
  { state: "Lagos", voters: 7488633 },
  { state: "Kano", voters: 6570276 },
  { state: "Kaduna", voters: 4662640 },
  { state: "Katsina", voters: 3876051 },
  { state: "Rivers", voters: 3736434 },
  { state: "Oyo", voters: 3588111 },
  { state: "Delta", voters: 3525988 },
  { state: "Benue", voters: 3057225 },
  { state: "Ogun", voters: 3037981 },
  { state: "Bauchi", voters: 3012547 },
];

const electionRows = readElectionData();
const zoneTotals = Array.from(electionRows.reduce((totals, row) => {
  const values = totals.get(row.zone) ?? { zone: row.zone, apc: 0, pdp: 0, lp: 0, nnpp: 0 };
  values.apc += row.apc;
  values.pdp += row.pdp;
  values.lp += row.lp;
  values.nnpp += row.nnpp;
  totals.set(row.zone, values);
  return totals;
}, new Map<string, { zone: string; apc: number; pdp: number; lp: number; nnpp: number }>()).values());

function readElectionData(): ElectionState[] {
  const csv = readFileSync(join(process.cwd(), "data", "election-2023.csv"), "utf8").trim();
  const [header, ...lines] = csv.split(/\r?\n/);
  const expectedHeader = "state,zone,apc,pdp,lp,nnpp,top4_votes,winner,winning_margin,apc_share_of_top4,pdp_share_of_top4,lp_share_of_top4,nnpp_share_of_top4";
  if (header !== expectedHeader) throw new Error("Election data has an unexpected header.");
  return lines.map((line, index) => {
    const [state, zone, apc, pdp, lp, nnpp, top4Votes, winner, winningMargin, apcShare, pdpShare, lpShare, nnppShare] = line.split(",");
    const votes = [apc, pdp, lp, nnpp].map(Number);
    const total = Number(top4Votes);
    const margin = Number(winningMargin);
    const shares = [apcShare, pdpShare, lpShare, nnppShare].map(Number);
    if (!state || !zone || !winner
      || votes.some((value) => !Number.isInteger(value) || value < 0)
      || !Number.isInteger(total) || total !== votes.reduce((sum, value) => sum + value, 0)
      || !Number.isInteger(margin) || margin < 0
      || shares.some((value, shareIndex) => !Number.isFinite(value) || value < 0 || value > 100
        || Number((votes[shareIndex] / total * 100).toFixed(2)) !== value)) {
      throw new Error(`Election data row ${index + 2} is invalid.`);
    }
    return {
      state,
      zone,
      apc: votes[0],
      pdp: votes[1],
      lp: votes[2],
      nnpp: votes[3],
      top4_votes: total,
      winner,
      winning_margin: margin,
      apc_share_of_top4: shares[0],
      pdp_share_of_top4: shares[1],
      lp_share_of_top4: shares[2],
      nnpp_share_of_top4: shares[3],
    };
  });
}

export default function ResearchPage() {
  const topTenTotal = topStates.reduce((sum, row) => sum + row.voters, 0);
  return (
    <article className="site-shell py-16 md:py-24">
      <p className="eyebrow">01 / Our Works</p>
      <h1 className="page-heading mb-6 mt-5 max-w-4xl">Research that makes the evidence easier to read.</h1>
      <p className="body-copy max-w-3xl">An independent election-data report, with the sources, methods and limits set out alongside the findings.</p>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-[var(--border)] py-4 text-xs text-[var(--muted)]">
        <span>Published: 23 November 2026</span><span>Last updated: 23 November 2026</span><PrintButton />
      </div>
      <nav aria-label="Report contents" className="no-print mt-5 flex flex-wrap gap-x-6 gap-y-3 border-b border-[var(--border)] pb-5 text-sm">
        <a href="#register" className="text-[var(--muted)] hover:text-[var(--foreground)]">Voter register</a>
        <a href="#results" className="text-[var(--muted)] hover:text-[var(--foreground)]">2023 results</a>
        <a href="#polls" className="text-[var(--muted)] hover:text-[var(--foreground)]">Poll evidence</a>
        <a href="#scenario" className="text-[var(--muted)] hover:text-[var(--foreground)]">Scenario explorer</a>
        <a href="#method" className="text-[var(--muted)] hover:text-[var(--foreground)]">Method and sources</a>
      </nav>

      <section id="election-2027" className="scroll-mt-8 py-12 md:py-16">
        <p className="eyebrow">Election research / Nigeria 2027</p>
        <h2 className="mb-4 mt-3 max-w-4xl text-3xl md:text-4xl">What the electorate data shows, and what it cannot tell us.</h2>
        <p className="border-l-2 border-[var(--wine)] bg-[var(--surface)] p-4 text-sm leading-6">
          Independent research for analytical purposes. This brief does not predict a winner or endorse any candidate. Figures come from the sources listed and were retrieved on the dates shown.
        </p>
        <p className="body-copy mt-5 max-w-3xl">Presidential and National Assembly elections are listed for 16 January 2027, with governorship and State Houses of Assembly elections listed for 6 February 2027. The timetable was revised following the Electoral Act 2026. Retrieval date: 23 November 2026.</p>

        <div id="register" className="my-10 grid scroll-mt-8 gap-8 border-y border-[var(--border)] py-6 sm:grid-cols-2 lg:grid-cols-4">
          <Fact value="103,428,715" label="Registered voters in 2027" source="INEC, October 2026 reports" />
          <Fact value="+9,959,707" label="Increase since the 2023 register" source="Calculated from the two register totals" />
          <Fact value="51.75%" label="Male voters on the 2027 register" source="INEC figures reported by cited sources" />
          <Fact value="26.71%" label="2023 votes cast / registered voters" source="INEC declared result totals" />
        </div>
        <div className="grid gap-x-10 gap-y-4 border-b border-[var(--border)] pb-8 text-sm md:grid-cols-2">
          <p className="body-copy m-0">Female voters: 49,900,497 (48.25%). Voters aged 35 and above: about 71.2%; the largest group is ages 35 to 49, with over 43 million.</p>
          <p className="body-copy m-0">Persons with disabilities: 232,658 (0.23%). Final register presentation to political parties: 15 December 2026.</p>
          <p className="body-copy m-0">The final presidential candidate list was reported as 18 tickets, 16 male and 2 female. The three most-discussed tickets named in the supplied brief are APC (Bola Tinubu), ADC (Atiku Abubakar) and NDC (Peter Obi).</p>
          <p className="body-copy m-0">For 2023, 87,209,007 PVCs were collected and 6,259,229 were uncollected, according to Daily Trust reporting cited in the brief.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <RegisterChart />
          <TopStatesChart states={topStates} />
        </div>
        <p className="body-copy mt-4 max-w-3xl">The ten listed states contain {topTenTotal.toLocaleString("en-NG")} voters, 41.15% of the 2027 register. Ekiti (1,055,708), Bayelsa (1,200,691) and the FCT (1,732,043) have the smallest figures among the values supplied for this brief.</p>

        <ParticipationChart />

        <div id="results" className="mt-12 grid scroll-mt-8 gap-12 lg:grid-cols-2">
          <section className="border-t border-[var(--border)] pt-5">
            <h3 className="mb-1 mt-0 text-xl">2023 presidential result, share of valid votes</h3>
            <p className="text-xs text-[var(--muted)]">INEC declared result; values provided in the brief</p>
            <div className="mt-5 space-y-4">
              {[["Tinubu (APC)", 8794726, 36.61, "var(--chart-blue)"], ["Atiku (PDP)", 6984520, 29.07, "var(--chart-amber)"], ["Obi (LP)", 6101533, 25.40, "var(--chart-teal)"], ["Kwankwaso (NNPP)", 1496687, 6.23, "var(--chart-grey)"]].map(([label, votes, share, color]) => (
                <div key={String(label)} tabIndex={0} title={`${label}: ${Number(votes).toLocaleString("en-NG")} votes, ${share}% of valid votes. Source: INEC declared result.`}>
                  <div className="mb-1 flex justify-between gap-2 text-xs"><span>{label}</span><span className="tabular">{share}%</span></div>
                  <div className="h-3 bg-[var(--surface-strong)]"><div className="h-full" style={{ width: `${share}%`, backgroundColor: String(color) }} /></div>
                </div>
              ))}
            </div>
            <p className="body-copy mt-5 text-sm">The data file contains votes for four candidates. Its APC state rows total 8,805,655, which is 10,929 above INEC’s reported national total. This discrepancy remains unresolved and is not concealed.</p>
          </section>
          <ZoneResults zones={zoneTotals} />
        </div>
        <StateResultTiles states={electionRows} />

        <section id="polls" className="mt-12 scroll-mt-8 border-t border-[var(--border)] pt-5">
          <h3 className="mb-1 mt-0 text-xl">Poll evidence, not a leaderboard</h3>
          <p className="body-copy mb-5 text-sm">The reported polls use different methods and populations. Online polls are self-selected, and small or regional samples cannot be treated as national forecasts.</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[740px] border-collapse text-left text-sm">
              <thead><tr className="border-b border-[var(--border)] text-xs text-[var(--muted)]"><th className="py-3 pr-4">Poll</th><th className="py-3 pr-4">Sample and method</th><th className="py-3 pr-4">Reported finding</th><th className="py-3">Reliability note</th></tr></thead>
              <tbody>
                <PollRow name="Oxford-Metro Analytics National Trust Poll" sample="69,110 responses, closed 7 Sep 2026" result="Tinubu 35.41%, Obi 33.86%, Atiku 26.67%" note="Large online trust poll; method needs review and credibility was publicly questioned." />
                <PollRow name="Tinubu Must Go online poll" sample="109,799 respondents, 24-hour online poll" result="Atiku/Amaechi 73.6%, Obi/Kwankwaso 22.3%" note="Self-selected and run by an advocacy movement, not representative." />
                <PollRow name="SBM Intelligence Voter Sentiment Tracker" sample="829 respondents across six zones, wave 1, June 2026" result="Nearly 80% said the country was moving in the wrong direction" note="Small sample; SBM described it as a snapshot, not a forecast." />
                <PollRow name="Yiaga Africa survey" sample="Registered voters; sample size and method require confirmation" result="41% certain to vote and settled; 54% disapprove of the president’s performance" note="Confirm sample size and methodology before publication." />
                <PollRow name="National Patriots survey" sample="Northern Nigeria, reported August 2026" result="Reported acceptability: Tinubu 47%, Atiku 30%, Obi 17%" note="Regional only; methodology unconfirmed, treat as low weight." />
              </tbody>
            </table>
          </div>
          <p className="body-copy mt-4 text-sm">These polls use different samples and methods, so their reported findings are not directly comparable. Methodology details are included where available.</p>
          <blockquote className="mt-6 border-l-2 border-[var(--border)] pl-4 text-sm leading-6 text-[var(--muted)]">The Economist argued in October 2026 that an incumbent could still win despite public discontent. This is a published view, not an endorsement or a forecast made by this brief.</blockquote>
        </section>

        <div id="scenario" className="scroll-mt-8">
          <ScenarioExplorer
            stateVotes={electionRows.map(({ state, zone, apc, pdp, lp, nnpp, top4_votes }) => ({ state, zone, apc, pdp, lp, nnpp, top4_votes }))}
          />
        </div>
        <section id="method" className="mt-12 scroll-mt-8 border-t border-[var(--border)] pt-5">
          <h3 className="mb-3 mt-0 text-xl">How I checked the data</h3>
          <ul className="body-copy space-y-2 text-sm">
            <li>Two published transcriptions of INEC state results were compared row by row. Eight cells were reported as disagreements.</li>
            <li>Corrections listed in the supplied validation notes were applied. PDP, LP and NNPP state totals reconcile to the reported national totals.</li>
            <li>The APC state rows remain 10,929 above INEC’s declared national total. Both transcriptions reportedly match row by row, so this remains an open item pending official state result sheets.</li>
            <li>Reported state winners total 12 APC, 12 PDP, 12 LP (including the FCT) and 1 NNPP.</li>
          </ul>
        </section>

        <div id="sources" className="scroll-mt-8"><SourceList /></div>
        <p className="body-copy mt-6 text-sm"><strong className="text-[var(--foreground)]">Limitations:</strong> polling is sparse and uneven, no official state-level turnout forecast is supplied, and 2023 results may not map to 2027 because candidates and party platforms have changed. Refresh the register analysis after the final register is presented on 15 December 2026. A post-election evidence review is planned after 16 January 2027.</p>
      </section>

    </article>
  );
}

function Fact({ value, label, source }: { value: string; label: string; source: string }) {
  return <div title={`${label}. ${source}. Retrieved 23 November 2026.`}><p className="tabular m-0 text-2xl font-semibold">{value}</p><p className="mb-1 mt-2 text-sm">{label}</p><p className="m-0 text-xs text-[var(--muted)]">{source}</p></div>;
}

function PollRow({ name, sample, result, note }: { name: string; sample: string; result: string; note: string }) {
  return <tr className="border-b border-[var(--border)] align-top"><th scope="row" className="py-3 pr-4 font-medium">{name}</th><td className="py-3 pr-4 text-[var(--muted)]">{sample}</td><td className="py-3 pr-4">{result}</td><td className="py-3 text-[var(--muted)]">{note}</td></tr>;
}

function SourceList() {
  const sources = [
    ["INEC timetable and revisions", "Nairametrics, Leadership, ThisDay, Premium Times"],
    ["Final candidate list", "TheNigeriaLawyer, Nairametrics, AllAfrica"],
    ["Voter register", "Leadership, Guardian, Tribune, AllAfrica, Blueprint, TheNigeriaLawyer, Daily Trust"],
    ["2023 results", "TheNigeriaLawyer, Legit.ng, Vanguard, Stears"],
    ["Poll reporting", "Legit.ng, Guardian, Vanguard, Nairametrics, ThisDay, Modern Ghana, BusinessDay"],
  ];
  return <section className="mt-12 border-t border-[var(--border)] pt-5"><h3 className="mb-3 mt-0 text-xl">Sources and retrieval dates</h3><ul className="space-y-2 p-0 text-sm">{sources.map(([topic, publishers]) => <li key={topic} className="grid gap-1 border-b border-[var(--border)] py-2 sm:grid-cols-[200px_1fr]"><span>{topic}</span><span className="text-[var(--muted)]">{publishers}. Retrieved 23 November 2026.</span></li>)}</ul><p className="body-copy mt-4 text-xs">Election timetable coverage: Nairametrics, Leadership, ThisDay and Premium Times. The named publishers are listed with each subject and retrieval date.</p></section>;
}
