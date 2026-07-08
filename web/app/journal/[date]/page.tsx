import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { getJournalDay, getJournalDays, SITE } from "@/lib/content";

export function generateStaticParams() {
  return getJournalDays().map((d) => ({ date: d.date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const day = getJournalDay(date);
  if (!day) return { title: "Journal" };

  const decision = day.decision ? ` — ${day.decision}` : "";
  const nav = day.nav ? ` NAV $${day.nav.toFixed(2)}.` : "";

  return {
    title: `Journal ${date}${decision}`,
    description: `Daily CIO cycle for ${date}.${nav} Thesis-driven decisions from investingRobinhood.`,
    alternates: { canonical: `${SITE.url}/journal/${date}/` },
    openGraph: {
      title: `Journal ${date}${decision}`,
      description: `Fund decisions and market intel for ${date}.`,
      url: `${SITE.url}/journal/${date}/`,
    },
  };
}

export default async function JournalDayPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const day = getJournalDay(date);
  if (!day) notFound();

  return (
    <>
      <header className="page-header">
        <h1>Journal · {date}</h1>
        <p>
          {day.sessions.length} session{day.sessions.length !== 1 ? "s" : ""}
          {day.decision && (
            <>
              {" "}
              · Decision: <strong>{day.decision}</strong>
            </>
          )}
          {day.nav && (
            <>
              {" "}
              · NAV <strong>${day.nav.toFixed(2)}</strong>
            </>
          )}
        </p>
      </header>

      {day.sessions.map((session) => (
        <section key={session.slug} className="session-block">
          <h2>
            {session.time.slice(0, 2)}:{session.time.slice(2)} ET ·{" "}
            {session.sessionType.replace(/-/g, " ")}
          </h2>
          <Markdown content={session.content} />
        </section>
      ))}
    </>
  );
}
