import Link from "next/link";
import { NavChart } from "@/components/nav-chart";
import {
  getFundSnapshot,
  getJournalDays,
  getLetters,
  getNavSeries,
  getPositions,
} from "@/lib/content";

export default function HomePage() {
  const snapshot = getFundSnapshot();
  const navSeries = getNavSeries();
  const recentDays = getJournalDays().slice(0, 7);
  const positions = getPositions().filter((p) => p.status === "open");
  const latestLetter = getLetters()[0];

  const returnClass =
    snapshot.returnPct >= 0 ? "positive" : "negative";

  return (
    <>
      <section className="hero">
        <div>
          <h1>Live track record of a thesis-driven AI fund</h1>
          <p className="lead">
            investingRobinhood documents every decision from a $100 concentrated
            portfolio on Robinhood Agentic — written theses, daily CIO cycles,
            and Ackman-style discipline.
          </p>
        </div>

        <div className="stats">
          <div className="stat">
            <label>NAV</label>
            <strong>${snapshot.nav.toFixed(2)}</strong>
          </div>
          <div className="stat">
            <label>Return since inception</label>
            <strong className={returnClass}>
              {snapshot.returnPct >= 0 ? "+" : ""}
              {snapshot.returnPct.toFixed(2)}%
            </strong>
          </div>
          <div className="stat">
            <label>Cash</label>
            <strong>
              ${snapshot.cash.toFixed(0)} ({snapshot.cashPct.toFixed(0)}%)
            </strong>
          </div>
          <div className="stat">
            <label>Open positions</label>
            <strong>{snapshot.positions}</strong>
          </div>
        </div>

        <NavChart data={navSeries} />
      </section>

      <h2 className="section-title">Open positions</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Entry</th>
              <th>Size</th>
              <th>Conviction</th>
              <th>Return</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => (
              <tr key={p.ticker}>
                <td>
                  <Link href={`/trades/${p.ticker.toLowerCase()}/`}>
                    {p.ticker}
                  </Link>
                </td>
                <td>
                  ${p.entry_price.toFixed(2)} · {p.entry_date}
                </td>
                <td>${p.size_usd.toFixed(0)}</td>
                <td>{p.conviction}</td>
                <td>
                  {p.return_pct !== null
                    ? `${p.return_pct >= 0 ? "+" : ""}${p.return_pct.toFixed(2)}%`
                    : "—"}
                </td>
                <td>
                  <span className="badge open">{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Recent journal</h2>
      <ul className="card-list">
        {recentDays.map((day) => (
          <li key={day.date}>
            <Link href={`/journal/${day.date}/`}>
              <span>
                <strong>{day.date}</strong>
                {day.decision && (
                  <>
                    {" "}
                    <span className={`badge ${day.decision.toLowerCase()}`}>
                      {day.decision}
                    </span>
                  </>
                )}
              </span>
              <span className="meta">
                {day.sessions.length} session
                {day.sessions.length !== 1 ? "s" : ""}
                {day.nav ? ` · NAV $${day.nav.toFixed(2)}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {latestLetter && (
        <>
          <h2 className="section-title">Latest investor letter</h2>
          <ul className="card-list">
            <li>
              <Link href={`/letters/${latestLetter.slug}/`}>
                <strong>{latestLetter.title}</strong>
                <span className="meta">{latestLetter.date}</span>
              </Link>
            </li>
          </ul>
        </>
      )}
    </>
  );
}
