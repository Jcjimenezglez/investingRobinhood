import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { MarkdownContent } from "@/components/content/markdown-content";
import { DecisionBadge } from "@/components/fund/decision-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  return {
    title: `Journal ${date}${decision}`,
    description: `CIO cycle for ${date}.`,
    alternates: { canonical: `${SITE.url}/journal/${date}/` },
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

  const defaultTab = day.sessions[0]?.slug ?? "";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-md border border-border">
            <Calendar className="size-5" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{date}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {day.sessions.length} session
              {day.sessions.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DecisionBadge decision={day.decision} />
          {day.nav && (
            <span className="text-sm font-medium tabular-nums">
              NAV ${day.nav.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-muted/50 p-1">
          {day.sessions.map((session) => (
            <TabsTrigger
              key={session.slug}
              value={session.slug}
              className="text-xs data-[state=active]:bg-background"
            >
              {session.time.slice(0, 2)}:{session.time.slice(2)} ·{" "}
              {session.sessionType.replace(/-/g, " ")}
            </TabsTrigger>
          ))}
        </TabsList>
        {day.sessions.map((session) => (
          <TabsContent key={session.slug} value={session.slug}>
            <Card className="rounded-lg border-border shadow-none">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  {session.title}
                </CardTitle>
                <CardDescription>
                  {session.time.slice(0, 2)}:{session.time.slice(2)} ET
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MarkdownContent content={session.content} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
