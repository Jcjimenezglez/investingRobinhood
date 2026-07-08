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

export const metadata: Metadata = pageMetadata({
  title: "Performance",
  description:
    "Tapefund weekly performance: NAV scorecards, return vs SPY benchmark, alpha, and thesis status updates every Friday.",
  path: "/performance/",
});

export default function PerformancePage() {
  const reports = getWeeklyReports();
  const latest = reports[0];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-md border border-border">
          <LineChart className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Performance</h1>
          <DirectAnswer className="mt-2">
            {BRAND.name} publishes weekly NAV scorecards every Friday with return
            vs the SPY benchmark, alpha, cash allocation, and thesis status for
            each open position.
          </DirectAnswer>
        </div>
      </div>

      {latest && (
        <Card className="rounded-lg border-border shadow-none">
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
        <Card className="rounded-lg border-border shadow-none">
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
          description: "Weekly performance reports for the Tapefund AI fund.",
          path: "/performance/",
        })}
      />
    </div>
  );
}
