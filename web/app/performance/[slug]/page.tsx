import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineChart } from "lucide-react";
import { MarkdownContent } from "@/components/content/markdown-content";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWeeklyReport, getWeeklyReports, SITE } from "@/lib/content";

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
  return {
    title: report.title,
    alternates: { canonical: `${SITE.url}/performance/${slug}/` },
  };
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
    </div>
  );
}
