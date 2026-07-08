import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScrollText } from "lucide-react";
import { MarkdownContent } from "@/components/content/markdown-content";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLetter, getLetters, SITE } from "@/lib/content";

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
  return {
    title: letter.title,
    alternates: { canonical: `${SITE.url}/letters/${slug}/` },
  };
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
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-md border border-border">
          <ScrollText className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {letter.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground tabular-nums">
            {letter.date}
          </p>
        </div>
      </div>
      <Card className="rounded-lg border-border shadow-none">
        <CardHeader className="sr-only">
          <CardTitle>Letter</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <MarkdownContent content={letter.content} />
        </CardContent>
      </Card>
    </div>
  );
}
