import type { Metadata } from "next";
import Link from "next/link";
import { getPositions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trades",
  description:
    "Open and closed positions with entry price, conviction, and return from the investingRobinhood fund.",
};

export default function TradesPage() {
  const positions = getPositions();

  return (
    <>
      <header className="page-header">
        <h1>Trades</h1>
        <p>
          Every position sized by conviction — with thesis links and performance
          vs inception.
        </p>
      </header>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Status</th>
              <th>Entry</th>
              <th>Size</th>
              <th>Conviction</th>
              <th>Return</th>
              <th>Catalyst</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => (
              <tr key={`${p.ticker}-${p.entry_date}`}>
                <td>
                  <Link href={`/trades/${p.ticker.toLowerCase()}/`}>
                    {p.ticker}
                  </Link>
                </td>
                <td>
                  <span className={`badge ${p.status}`}>{p.status}</span>
                </td>
                <td>
                  ${p.entry_price.toFixed(2)}
                  <br />
                  <span className="meta">{p.entry_date}</span>
                </td>
                <td>${p.size_usd.toFixed(0)}</td>
                <td>{p.conviction}</td>
                <td>
                  {p.return_pct !== null
                    ? `${p.return_pct >= 0 ? "+" : ""}${p.return_pct.toFixed(2)}%`
                    : "—"}
                </td>
                <td>{p.catalyst_date ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
