import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
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
    description: `Investor letter from investingRobinhood CIO — ${letter.date}.`,
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
    <>
      <header className="page-header">
        <h1>{letter.title}</h1>
        <p>{letter.date}</p>
      </header>
      <Markdown content={letter.content} />
    </>
  );
}
