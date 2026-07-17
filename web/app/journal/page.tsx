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

export const metadata: Metadata = pageMetadata({
  title: "Daily journal",
  description:
    "Tapefund daily CIO journal: premarket, market open, and intraday sessions with NAV, market snapshot, and HOLD/BUY/SELL decisions.",
  path: "/journal/",
});

export default function JournalIndexPage() {
  const days = getJournalDays();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center border border-border bg-card text-signal">
          <BookOpen className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Daily journal</h1>
          <DirectAnswer className="mt-2">
            The {BRAND.name} journal archives every CIO cycle — premarket,
            open, and intraday — with live NAV and trading decisions from the
            Agentic account runbook.
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
          name: "Tapefund Daily Journal",
          description:
            "Archive of daily CIO cycles from the Tapefund AI fund.",
          path: "/journal/",
        })}
      />
    </div>
  );
}
