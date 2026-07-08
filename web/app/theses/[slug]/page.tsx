import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { MarkdownContent } from "@/components/content/markdown-content";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTheses, getThesis } from "@/lib/content";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

export function generateStaticParams() {
  return getTheses().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const thesis = getThesis(slug);
  if (!thesis) return { title: "Thesis" };
  return pageMetadata({
    title: thesis.title,
    description: `Tapefund investment thesis (${thesis.date}): ${thesis.title}. Full written memo with business quality, mispricing, catalyst, and kill criteria.`,
    path: `/theses/${slug}/`,
    type: "article",
    publishedTime: thesis.date,
    modifiedTime: thesis.date,
  });
}

export default async function ThesisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thesis = getThesis(slug);
  if (!thesis) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-md border border-border">
          <FileText className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {thesis.title}
          </h1>
          <DirectAnswer className="mt-2 text-sm text-muted-foreground tabular-nums">
            {BRAND.name} investment memo published {thesis.date} — written
            before capital deployment with catalyst, fair value, and kill
            criteria.
          </DirectAnswer>
        </div>
      </div>
      <Card className="rounded-lg border-border shadow-none">
        <CardHeader className="sr-only">
          <CardTitle>Memo</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <MarkdownContent content={thesis.content} />
        </CardContent>
      </Card>

      <JsonLd
        data={[
          articleJsonLd({
            title: thesis.title,
            description: `Investment thesis from ${BRAND.name}, ${thesis.date}.`,
            path: `/theses/${slug}/`,
            datePublished: thesis.date,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Theses", path: "/theses/" },
            { name: thesis.title, path: `/theses/${slug}/` },
          ]),
        ]}
      />
    </div>
  );
}
