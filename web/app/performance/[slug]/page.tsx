import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
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
    description: `Weekly fund scorecard — ${report.slug}. NAV, alpha, and position marks.`,
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
    <>
      <header className="page-header">
        <h1>{report.title}</h1>
      </header>
      <Markdown content={report.content} />
    </>
  );
}
