import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { JournalTable } from "@/components/fund/journal-table";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJournalDays } from "@/lib/content";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";
import { PageShell } from "@/components/marketing/section";

export const metadata: Metadata = pageMetadata({
  title: "Daily trading journal",
  description:
    "Tapefund daily trading journal: premarket, open, and intraday CIO sessions with live Robinhood Agentic NAV and HOLD/BUY/SELL decisions. Not a private log — a public stock trading journal.",
  path: "/journal/",
  keywords: ["trading journal", "daily trading journal", "stock journal"],
});

export default function JournalIndexPage() {
  const days = getJournalDays();

  return (
    <PageShell>
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center border border-border bg-card text-signal">
          <BookOpen className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Daily trading journal
          </h1>
          <DirectAnswer className="mt-2">
            The {BRAND.name} trading journal archives every CIO cycle —
            premarket, open, and intraday — with live NAV and swing-trading
            decisions from the Robinhood Agentic account. This is a public
            journal, not a private notebook.
          </DirectAnswer>
        </div>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {days.length} trading days
          </CardTitle>
          <CardDescription>Sorted newest first</CardDescription>
        </CardHeader>
        <CardContent>
          <JournalTable days={days} />
        </CardContent>
      </Card>

      <JsonLd
        data={collectionPageJsonLd({
          name: "Tapefund daily trading journal",
          description:
            "Archive of daily CIO trading-journal cycles from the Tapefund AI trading agent.",
          path: "/journal/",
        })}
      />
    </PageShell>
  );
}
