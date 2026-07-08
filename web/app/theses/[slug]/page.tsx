import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { MarkdownContent } from "@/components/content/markdown-content";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTheses, getThesis, SITE } from "@/lib/content";

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
  return {
    title: thesis.title,
    alternates: { canonical: `${SITE.url}/theses/${slug}/` },
  };
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
          <p className="mt-1 text-sm text-muted-foreground tabular-nums">
            {thesis.date}
          </p>
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
    </div>
  );
}
