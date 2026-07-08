import type { Metadata } from "next";
import Link from "next/link";
import { getJournalDays } from "@/lib/content";

export const metadata: Metadata = {
  title: "Daily journal",
  description:
    "Daily CIO cycles, market snapshots, and trading decisions from the investingRobinhood AI fund.",
};

export default function JournalIndexPage() {
  const days = getJournalDays();

  return (
    <>
      <header className="page-header">
        <h1>Daily journal</h1>
        <p>
          One page per trading day — premarket, open, and intraday monitor
          sessions from the autonomous CIO runbook.
        </p>
      </header>

      <ul className="card-list">
        {days.map((day) => (
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
                {day.sessions.map((s) => s.sessionType).join(" · ")}
                {day.nav ? ` · NAV $${day.nav.toFixed(2)}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
