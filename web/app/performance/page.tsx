import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/markdown";
import { getWeeklyReport, getWeeklyReports } from "@/lib/content";

export const metadata: Metadata = {
  title: "Performance",
  description:
    "Weekly NAV scorecards, alpha vs SPY, and position marks from investingRobinhood.",
};

export default function PerformancePage() {
  const reports = getWeeklyReports();
  const latest = reports[0];

  return (
    <>
      <header className="page-header">
        <h1>Performance</h1>
        <p>Weekly scorecards with NAV, alpha vs SPY, and thesis status.</p>
      </header>

      {latest && (
        <>
          <h2 className="section-title">Latest week · {latest.slug}</h2>
          <Markdown content={latest.content} />
        </>
      )}

      {reports.length > 1 && (
        <>
          <h2 className="section-title">All weekly reports</h2>
          <ul className="card-list">
            {reports.map((r) => (
              <li key={r.slug}>
                <Link href={`/performance/${r.slug}/`}>
                  <strong>{r.title}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
