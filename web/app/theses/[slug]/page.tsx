import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
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
    description: `Investment thesis memo from investingRobinhood — ${thesis.date}.`,
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
    <>
      <header className="page-header">
        <h1>{thesis.title}</h1>
        <p>{thesis.date}</p>
      </header>
      <Markdown content={thesis.content} />
    </>
  );
}
