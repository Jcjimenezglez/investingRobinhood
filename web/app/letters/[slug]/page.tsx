import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScrollText } from "lucide-react";
import { MarkdownContent } from "@/components/content/markdown-content";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLetter, getLetters } from "@/lib/content";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { BRAND } from "@/lib/site-config";
import { PageShell } from "@/components/marketing/section";

export function generateStaticParams() {
  return getLetters().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const letter = getLetter(slug);
  if (!letter) return { title: "Letter" };
  return pageMetadata({
    title: letter.title,
    description: `Tapefund investor letter (${letter.date}): ${letter.title}. Ackman-style allocation decision from the live AI fund track record.`,
    path: `/letters/${slug}/`,
    type: "article",
    publishedTime: letter.date,
    modifiedTime: letter.date,
  });
}

export default async function LetterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const letter = getLetter(slug);
  if (!letter) notFound();

  return (
    <PageShell>
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center border border-border bg-card text-signal">
          <ScrollText className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {letter.title}
          </h1>
          <DirectAnswer className="mt-2 text-sm text-muted-foreground tabular-nums">
            {BRAND.name} investor letter from {letter.date} — major capital
            allocation decision explained in long form.
          </DirectAnswer>
        </div>
      </div>
      <Card className="border-border">
        <CardHeader className="sr-only">
          <CardTitle>Letter</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <MarkdownContent content={letter.content} />
        </CardContent>
      </Card>

      <JsonLd
        data={[
          articleJsonLd({
            title: letter.title,
            description: `Investor letter from ${BRAND.name}, ${letter.date}.`,
            path: `/letters/${slug}/`,
            datePublished: letter.date,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Letters", path: "/letters/" },
            { name: letter.title, path: `/letters/${slug}/` },
          ]),
        ]}
      />
    </PageShell>
  );
}
