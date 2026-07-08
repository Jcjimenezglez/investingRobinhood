import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How investingRobinhood invests: Ackman-style concentration, thesis-driven entries, catalyst horizons, and risk guardrails on a $100 Agentic account.",
  alternates: { canonical: `${SITE.url}/methodology/` },
};

const universe = [
  "GOOGL",
  "HOOD",
  "AMZN",
  "META",
  "AAPL",
  "MSFT",
  "NVDA",
  "UBER",
  "QSR",
  "BN",
];

export default function MethodologyPage() {
  return (
    <>
      <header className="page-header">
        <h1>Methodology</h1>
        <p>
          A concentrated, thesis-driven AI fund — not day trading, not passive
          index hold.
        </p>
      </header>

      <div className="pillars">
        <article className="pillar">
          <h3>Thesis before capital</h3>
          <p>
            Every BUY requires a written memo: business quality, mispricing,
            catalyst (3–12 months), and kill criteria. No lottery tickets.
          </p>
        </article>
        <article className="pillar">
          <h3>Concentration by conviction</h3>
          <p>
            Up to 50% of the ~$100 fund in a single high-conviction idea.
            Cash minimum 10%. Few names, large weights.
          </p>
        </article>
        <article className="pillar">
          <h3>Exit on thesis break</h3>
          <p>
            We sell when the investment case fails or fair value is reached —
            not on a calendar or arbitrary profit target.
          </p>
        </article>
        <article className="pillar">
          <h3>Daily CIO cycle</h3>
          <p>
            Automated runbook at premarket, market open, and intraday monitors.
            Each session is published in the journal.
          </p>
        </article>
        <article className="pillar">
          <h3>Ackman confluence</h3>
          <p>
            We track Pershing Square 13F for research overlap — extra conviction
            when aligned, stronger independent thesis when not.
          </p>
        </article>
        <article className="pillar">
          <h3>Agentic account only</h3>
          <p>
            All trades execute on a Robinhood Agentic beta account via MCP.
            Full transparency; small AUM by design.
          </p>
        </article>
      </div>

      <h2 className="section-title">Research universe</h2>
      <p className="lead">{universe.join(" · ")}</p>

      <h2 className="section-title">What gets published</h2>
      <ul className="card-list">
        <li>
          <strong>Daily journal</strong>
          <span className="meta">
            CIO cycles with NAV, rankings, and HOLD/BUY/SELL decisions
          </span>
        </li>
        <li>
          <strong>Trades & theses</strong>
          <span className="meta">
            Entry fills, conviction sizing, and full investment memos
          </span>
        </li>
        <li>
          <strong>Weekly performance</strong>
          <span className="meta">NAV scorecard and alpha vs SPY benchmark</span>
        </li>
        <li>
          <strong>Investor letters</strong>
          <span className="meta">
            Major allocation decisions explained to the LP
          </span>
        </li>
      </ul>
    </>
  );
}
