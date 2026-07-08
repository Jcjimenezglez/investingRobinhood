import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { PositionsTable } from "@/components/fund/positions-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPositions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trades",
  description: "Open and closed positions from the investingRobinhood fund.",
};

export default function TradesPage() {
  const positions = getPositions();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-md border border-border">
          <BarChart3 className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Trades</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every position sized by conviction, with thesis links and returns.
          </p>
        </div>
      </div>

      <Card className="rounded-lg border-border shadow-none">
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
    </div>
  );
}
