import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineChart } from "lucide-react";
import { MarkdownContent } from "@/components/content/markdown-content";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWeeklyReport, getWeeklyReports } from "@/lib/content";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

export function generateStaticParams() {
  return getWeeklyReports().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = getWeeklyReport(slug);
  if (!report) return { title: "Weekly performance" };
  return pageMetadata({
    title: report.title,
    description: `Tapefund weekly performance (${report.slug}): NAV scorecard, return vs SPY, alpha, and thesis status from the live AI fund.`,
    path: `/performance/${slug}/`,
    type: "article",
    publishedTime: report.slug,
  });
}

export default async function WeeklyReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getWeeklyReport(slug);
  if (!report) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-md border border-border">
          <LineChart className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {report.title}
          </h1>
          <DirectAnswer className="mt-2 text-sm text-muted-foreground">
            {BRAND.name} weekly scorecard for {report.slug} — NAV, benchmark
            return vs SPY, alpha, and open thesis status.
          </DirectAnswer>
        </div>
      </div>
      <Card className="rounded-lg border-border shadow-none">
        <CardHeader className="sr-only">
          <CardTitle>Report</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <MarkdownContent content={report.content} />
        </CardContent>
      </Card>

      <JsonLd
        data={[
          articleJsonLd({
            title: report.title,
            description: `Weekly performance report from ${BRAND.name}, ${report.slug}.`,
            path: `/performance/${slug}/`,
            datePublished: report.slug,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Performance", path: "/performance/" },
            { name: report.slug, path: `/performance/${slug}/` },
          ]),
        ]}
      />
    </div>
  );
}
