import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { PositionsTable } from "@/components/fund/positions-table";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPositions } from "@/lib/content";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Trades",
  description:
    "Tapefund trade history: open and closed positions sized by conviction, with returns, fair value targets, and links to investment theses.",
  path: "/trades/",
});

export default function TradesPage() {
  const positions = getPositions();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center border border-border bg-card text-signal">
          <BarChart3 className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Trades</h1>
          <DirectAnswer className="mt-2">
            {BRAND.name} publishes every position — open and closed — with
            conviction sizing, return since entry, and links to the written
            thesis behind each trade.
          </DirectAnswer>
        </div>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Position history
          </CardTitle>
          <CardDescription>{positions.length} records</CardDescription>
        </CardHeader>
        <CardContent>
          <PositionsTable positions={positions} />
        </CardContent>
      </Card>

      <JsonLd
        data={collectionPageJsonLd({
          name: "Tapefund Trades",
          description: "Position history for the Tapefund AI fund.",
          path: "/trades/",
        })}
      />
    </div>
  );
}
