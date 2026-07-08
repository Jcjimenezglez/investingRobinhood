import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { JournalTable } from "@/components/fund/journal-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJournalDays } from "@/lib/content";

export const metadata: Metadata = {
  title: "Daily journal",
  description:
    "Daily CIO cycles, market snapshots, and trading decisions from the investingRobinhood AI fund.",
};

export default function JournalIndexPage() {
  const days = getJournalDays();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-md border border-border">
          <BookOpen className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Daily journal</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Premarket, open, and intraday monitor sessions from the CIO runbook.
          </p>
        </div>
      </div>

      <Card className="rounded-lg border-border shadow-none">
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
    </div>
  );
}
