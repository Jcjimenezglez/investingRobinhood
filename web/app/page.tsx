import Link from "next/link";
import { ClosedList, ImprovementList, ReasonList } from "@/components/desk/desk-lists";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getClosedPositions,
  getFundSnapshot,
  getImprovements,
  getLatestThinking,
  getOpenPositions,
  getTradeReasons,
} from "@/lib/content";
import {
  money2,
  signedMoney2,
  signedPct,
  toneClass,
} from "@/lib/display-money";
import { faqPageJsonLd } from "@/lib/seo";
import { BRAND, SITE_FAQ } from "@/lib/site-config";
import { formatConviction } from "@/lib/localize";

const homeFaq = SITE_FAQ.filter((item) =>
  [
    "What is Tapefund?",
    "Is Tapefund paper trading?",
    "Is Tapefund copy trading or an AI trading bot?",
    "How does Tapefund compare to the S&P 500?",
    "Is Tapefund investment advice?",
  ].includes(item.question),
);

function fmtDay(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function HomePage() {
  const snap = getFundSnapshot();
  const open = getOpenPositions();
  const closed = getClosedPositions();
  const thinking = getLatestThinking();
  const reasons = getTradeReasons();
  const improvements = getImprovements();
  const up = snap.pnlUsd >= 0;

  const tiles: [string, string, string, string][] = [
    [
      "Realized P/L",
      signedMoney2(snap.realizedPnlUsd),
      "Locked in from closed Agentic trades.",
      toneClass(snap.realizedPnlUsd),
    ],
    [
      "Open P/L",
      signedMoney2(snap.openPnlUsd),
      "Remaining open P/L so the total stays broker-true.",
      toneClass(snap.openPnlUsd),
    ],
    [
      "Capital deployed",
      money2(snap.deployedUsd),
      "Cost basis of open positions.",
      "blue",
    ],
    [
      "Closed trades",
      String(snap.closedCount),
      snap.winRatePct == null
        ? "Win rate not meaningful yet."
        : `${snap.winRatePct.toFixed(0)}% win rate so far.`,
      "amber",
    ],
  ];
  if (snap.spyReturnPct != null) {
    tiles.push([
      "S&P 500 (SPY)",
      signedPct(snap.spyReturnPct),
      `Buy-and-hold SPY from the first trade day (${fmtDay(snap.firstTradeAt)}), last Friday scorecard.`,
      toneClass(snap.spyReturnPct),
    ]);
  }

  return (
    <>
      <section className="hero" id="performance">
        <div className="panel big-number">
          <div>
            <div className="label">Portfolio value</div>
            <div className="value">{money2(snap.nav)}</div>
            <div className={`answer ${up ? "" : "red"}`}>
              {up ? "Portfolio is up so far" : "Portfolio is down so far"}
            </div>
          </div>
          <div className="muted" id="baselineCopy">
            Started with {money2(BRAND.startingNav)} on a live Robinhood Agentic
            cash account — not paper trading. Last CIO mark {snap.lastUpdated}.
          </div>
        </div>
        <div className="stack">
          <div className="panel metric">
            <div className="label">Total return</div>
            <div className={`n ${toneClass(snap.returnPct)}`}>
              {signedPct(snap.returnPct)}
            </div>
            <div className="muted">
              Since first trade on {fmtDay(snap.firstTradeAt)}.
            </div>
          </div>
          <div className="panel metric">
            <div className="label">vs S&amp;P 500</div>
            <div
              className={`n ${snap.alphaPct == null ? "amber" : toneClass(snap.alphaPct)}`}
            >
              {snap.alphaPct == null ? "n/a" : signedPct(snap.alphaPct)}
            </div>
            <div className="muted">
              {snap.spyReturnPct == null
                ? "Desk return minus SPY over the same window."
                : `Desk return minus SPY. SPY returned ${signedPct(snap.spyReturnPct)} through ${snap.benchmarkAsOf ?? "the last scorecard"}.`}
            </div>
          </div>
          <div className="panel metric">
            <div className="label">Profit or loss</div>
            <div className={`n ${toneClass(snap.pnlUsd)}`}>
              {signedMoney2(snap.pnlUsd)}
            </div>
            <div className="muted">Dollars gained or lost so far.</div>
          </div>
        </div>
      </section>

      <section className="grid" id="metrics">
        {tiles.map(([k, v, s, c]) => (
          <div className="tile" key={k}>
            <div className="k">{k}</div>
            <div className={`v ${c}`}>{v}</div>
            <div className="s">{s}</div>
          </div>
        ))}
      </section>

      <section className="panel section" id="strategy">
        <div className="section-head">
          <div>
            <h2>Swing trading strategy</h2>
            <p>
              One listed stock at a time — swing trading, not day trading —
              on a Robinhood Agentic cash account, with a public trading journal.
            </p>
          </div>
        </div>
        <div className="strategy-grid">
          <article className="strategy-card">
            <h3>The edge it is pursuing</h3>
            <p>
              All-in swing trading on a dedicated Robinhood Agentic cash
              account: one listed stock, retail attention plus support and a
              near-term catalyst. Never chasing stocks that already ran.
            </p>
            <ul>
              <li>One name at a time. Flatten before a new entry.</li>
              <li>Buy near support with a real catalyst in days-to-weeks.</li>
              <li>Sell around +20–30%, or when the rumor is fully news.</li>
              <li>Memes are allowed if early. Already-ran names are not.</li>
            </ul>
          </article>
          <article className="strategy-card">
            <h3>Hard limits and evidence</h3>
            <p>
              Code and mandate — not vibes — decide what the agent is allowed
              to touch.
            </p>
            <ul>
              <li>Shares only. No options, crypto, margin, or pennies.</li>
              <li>No GTC stop-loss. Hawk watch instead.</li>
              <li>Agentic cash account only. No personal book.</li>
              <li>Every session is published in the trading journal.</li>
            </ul>
            <p style={{ marginTop: 14 }}>
              <strong>Learning sample:</strong> {snap.closedCount} closed
              Agentic trades since {fmtDay(snap.firstTradeAt)}. Too small to
              claim a durable edge — the scoreboard stays public anyway.
            </p>
          </article>
        </div>
      </section>

      <section className="panel section" id="holdings-section">
        <div className="section-head">
          <div>
            <h2>Current holdings</h2>
            <div className="muted">
              Each line uses the real Agentic size, never a scaled price.
            </div>
            <p>What is still open and can still change the final result.</p>
          </div>
        </div>
        <div className="holdings">
          {open.length === 0 ? (
            <div className="muted">
              No open holdings right now. Book is cash {money2(snap.cash)} (
              {snap.cashPct.toFixed(0)}%) after the 2026-08-17 flatten, waiting
              on T+1 buying power and a single all-in setup.
            </div>
          ) : (
            open.map((p) => (
              <div className="holding" key={p.ticker}>
                <div>
                  <h3>{p.ticker}</h3>
                  <p>{formatConviction(p.conviction)} conviction</p>
                </div>
                <div className="cell">
                  <div className="k">Cost basis</div>
                  <div className="v">{money2(p.size_usd)}</div>
                </div>
                <div className="cell">
                  <div className="k">Avg cost</div>
                  <div className="v">{money2(p.entry_price)}</div>
                </div>
                <div className="cell">
                  <div className="k">Opened</div>
                  <div className="v">{p.entry_date}</div>
                </div>
                <div className="cell">
                  <div className="k">Open P/L</div>
                  <div className={`v ${toneClass(p.return_pct)}`}>
                    {p.return_pct == null ? "n/a" : signedPct(p.return_pct)}
                  </div>
                </div>
                <div className="cell">
                  <div className="k">Stop zone</div>
                  <div className="v">
                    {p.stop_backup == null ? "n/a" : money2(p.stop_backup)}
                  </div>
                </div>
                <div className="cell">
                  <div className="k">Fair value</div>
                  <div className="v">
                    {p.fair_value_low != null && p.fair_value_high != null
                      ? `${money2(p.fair_value_low)} to ${money2(p.fair_value_high)}`
                      : "n/a"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="panel section" id="thinking-section">
        <div className="section-head">
          <div>
            <h2>What the desk is thinking</h2>
            <p>
              Plain English from the latest CIO session: what it owns, what
              would make it buy or sell, and why it is patient right now.
            </p>
          </div>
        </div>
        <div className="thinking-box">
          {thinking ? (
            <>
              <div className="thinking-head">
                <div>
                  <div className="thinking-stance">{thinking.stance}</div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 26,
                      fontWeight: 700,
                      letterSpacing: "-.04em",
                    }}
                  >
                    {thinking.headline}
                  </div>
                </div>
                <div className="muted">
                  Last checked: {thinking.asOf}
                  <br />
                  {thinking.sessionType} · journal session, not a 15-minute poll
                </div>
              </div>
              <div>
                <strong>In plain English</strong>
                <p style={{ margin: "8px 0 0", lineHeight: 1.55 }}>
                  {thinking.thinking}
                </p>
              </div>
              {thinking.waitingFor.length > 0 && (
                <div>
                  <strong>What would make it do something</strong>
                  <ul className="thinking-list">
                    {thinking.waitingFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="muted">
                {thinking.note}{" "}
                <Link href={`/journal/${thinking.date}/`}>Read the journal</Link>
                .
              </div>
            </>
          ) : (
            <div className="muted">No live thought cycle published yet.</div>
          )}
        </div>
      </section>

      <section className="panel section" id="trades-section">
        <div className="section-head">
          <div>
            <h2>Trade reasoning</h2>
            <p>
              The simple version first, then the technical map behind each
              executed trade.
            </p>
          </div>
        </div>
        <div className="reason-list">
          <ReasonList items={reasons} />
        </div>
      </section>

      <section className="panel section">
        <div className="section-head">
          <div>
            <h2>Closed results</h2>
            <p>Trades that are finished and locked in.</p>
          </div>
        </div>
        <div className="closed-list">
          <ClosedList items={closed} />
        </div>
      </section>

      <section className="panel section" id="improvements-section">
        <div className="section-head">
          <div>
            <h2>What improved</h2>
            <p>
              Public change log from investor letters. Retired experiments stay
              visible instead of being quietly erased.
            </p>
          </div>
        </div>
        <div className="improvement-list">
          <ImprovementList items={improvements} />
        </div>
      </section>

      <JsonLd data={faqPageJsonLd(homeFaq)} />
    </>
  );
}
