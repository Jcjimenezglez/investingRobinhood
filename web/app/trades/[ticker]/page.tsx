import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { getTickerHistory, getTickers, SITE } from "@/lib/content";

export function generateStaticParams() {
  return getTickers().map((ticker) => ({ ticker: ticker.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const upper = ticker.toUpperCase();
  return {
    title: `${upper} — position & thesis history`,
    description: `Track record for ${upper}: entries, journal mentions, and investment theses from investingRobinhood.`,
    alternates: { canonical: `${SITE.url}/trades/${ticker}/` },
  };
}

export default async function TickerPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const { position, journalMentions, theses } = getTickerHistory(ticker);

  if (!position && journalMentions.length === 0 && theses.length === 0) {
    notFound();
  }

  const upper = ticker.toUpperCase();

  return (
    <>
      <header className="page-header">
        <h1>{upper}</h1>
        <p>Position history, theses, and journal mentions.</p>
      </header>

      {position && (
        <>
          <h2 className="section-title">Position</h2>
          <div className="table-wrap">
            <table className="data-table">
              <tbody>
                <tr>
                  <th>Status</th>
                  <td>{position.status}</td>
                </tr>
                <tr>
                  <th>Entry</th>
                  <td>
                    ${position.entry_price.toFixed(2)} on {position.entry_date}
                  </td>
                </tr>
                <tr>
                  <th>Size</th>
                  <td>${position.size_usd.toFixed(0)}</td>
                </tr>
                <tr>
                  <th>Conviction</th>
                  <td>{position.conviction}</td>
                </tr>
                <tr>
                  <th>Return</th>
                  <td>
                    {position.return_pct !== null
                      ? `${position.return_pct >= 0 ? "+" : ""}${position.return_pct.toFixed(2)}%`
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <th>Fair value</th>
                  <td>
                    {position.fair_value_low && position.fair_value_high
                      ? `$${position.fair_value_low}–$${position.fair_value_high}`
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <th>Stop backup</th>
                  <td>
                    {position.stop_backup
                      ? `$${position.stop_backup.toFixed(2)}`
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <th>Catalyst</th>
                  <td>{position.catalyst_date ?? "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {theses.length > 0 && (
        <>
          <h2 className="section-title">Theses</h2>
          <ul className="card-list">
            {theses.map((t) => (
              <li key={t.slug}>
                <Link href={`/theses/${t.slug}/`}>
                  <strong>{t.title}</strong>
                  <span className="meta">{t.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {journalMentions.length > 0 && (
        <>
          <h2 className="section-title">Recent journal mentions</h2>
          <ul className="card-list">
            {journalMentions.map((m) => (
              <li key={`${m.date}-${m.session}`}>
                <Link href={`/journal/${m.date}/`}>
                  <strong>
                    {m.date} · {m.session}
                  </strong>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
