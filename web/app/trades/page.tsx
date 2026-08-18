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
import { PageShell } from "@/components/marketing/section";

export const metadata: Metadata = pageMetadata({
  title: "Trades and stock holdings",
  description:
    "Tapefund stock holdings and closed trades from the live Robinhood Agentic account: real dollar size, returns, and links to each investment thesis. Not copy trading.",
  path: "/trades/",
  keywords: ["stock holdings", "closed trades", "current holdings"],
});

export default function TradesPage() {
  const positions = getPositions();

  return (
    <PageShell>
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center border border-border bg-card text-signal">
          <BarChart3 className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Trades and holdings
          </h1>
          <DirectAnswer className="mt-2">
            {BRAND.name} publishes every Robinhood Agentic position — open stock
            holdings and closed trades — at real dollar size, with conviction,
            return since entry, and the investment thesis behind each swing.
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
          description: "Position history and stock holdings for the Tapefund AI trading agent.",
          path: "/trades/",
        })}
      />
    </PageShell>
  );
}
