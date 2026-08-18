import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, LineChart } from "lucide-react";
import { MarkdownContent } from "@/components/content/markdown-content";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getWeeklyReports } from "@/lib/content";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";
import { PageShell } from "@/components/marketing/section";

export const metadata: Metadata = pageMetadata({
  title: "Performance vs SPY",
  description:
    "Tapefund weekly performance versus the S&P 500 (SPY): live NAV scorecards, alpha, cash, and thesis status every Friday. Real Robinhood Agentic dollars — not paper trading.",
  path: "/performance/",
  keywords: ["fund nav", "realized pnl", "swing trading vs day trading"],
});

export default function PerformancePage() {
  const reports = getWeeklyReports();
  const latest = reports[0];

  return (
    <PageShell>
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center border border-border bg-card text-signal">
          <LineChart className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Performance vs SPY
          </h1>
          <DirectAnswer className="mt-2">
            {BRAND.name} publishes weekly NAV scorecards every Friday: swing
            trading return versus SPY, alpha, cash, and thesis status. Use this
            page to judge whether the book is ahead of buy-and-hold — the sample
            is still small.
          </DirectAnswer>
        </div>
      </div>

      {latest && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Latest · {latest.slug}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownContent content={latest.content} />
          </CardContent>
        </Card>
      )}

      {reports.length > 1 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              All weekly reports
            </CardTitle>
            <CardDescription>{reports.length} weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((r) => (
                  <TableRow key={r.slug}>
                    <TableCell className="font-mono text-sm">{r.slug}</TableCell>
                    <TableCell>{r.title}</TableCell>
                    <TableCell>
                      <Link href={`/performance/${r.slug}/`}>
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <JsonLd
        data={collectionPageJsonLd({
          name: "Tapefund Performance",
          description: "Weekly performance versus SPY for the Tapefund AI trading agent.",
          path: "/performance/",
        })}
      />
    </PageShell>
  );
}
