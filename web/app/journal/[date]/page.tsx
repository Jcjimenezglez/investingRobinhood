import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { MarkdownContent } from "@/components/content/markdown-content";
import { DecisionBadge } from "@/components/fund/decision-badge";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJournalDay, getJournalDays } from "@/lib/content";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

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
  const navPart = day.nav ? ` NAV $${day.nav.toFixed(2)}.` : "";
  const description = `Tapefund CIO journal for ${date}${decision}.${navPart} ${day.sessions.length} session(s): market snapshot, thesis review, and trading decision from the live Agentic fund.`;
  return pageMetadata({
    title: `Journal ${date}${decision}`,
    description,
    path: `/journal/${date}/`,
    type: "article",
    publishedTime: `${date}T16:00:00-04:00`,
    modifiedTime: `${date}T16:00:00-04:00`,
  });
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
            <h1 className="text-2xl font-semibold tracking-tight">
              Journal {date}
            </h1>
            <DirectAnswer className="mt-2 text-sm text-muted-foreground">
              {BRAND.name} CIO cycle for {date}
              {day.decision ? ` — decision: ${day.decision}` : ""}
              {day.nav ? `, NAV $${day.nav.toFixed(2)}` : ""}.{" "}
              {day.sessions.length} published session
              {day.sessions.length !== 1 ? "s" : ""} below.
            </DirectAnswer>
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

      <JsonLd
        data={[
          articleJsonLd({
            title: `Journal ${date}${day.decision ? ` — ${day.decision}` : ""}`,
            description: `CIO journal for ${date} from ${BRAND.name}.`,
            path: `/journal/${date}/`,
            datePublished: date,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal/" },
            { name: date, path: `/journal/${date}/` },
          ]),
        ]}
      />
    </div>
  );
}
