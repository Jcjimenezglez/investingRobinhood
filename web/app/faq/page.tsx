import type { Metadata } from "next";
import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { Hero, PageShell } from "@/components/marketing/section";
import { faqPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND, SITE_FAQ } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about Tapefund — a stock newsletter with a live public track record versus the S&P 500.",
  path: "/faq/",
});

export default function FaqPage() {
  return (
    <PageShell className="space-y-16">
      <Hero
        title="Frequently asked questions"
        body={
          <DirectAnswer className="text-base text-muted-foreground sm:text-lg">
            {BRAND.name} is a public scoreboard and upcoming newsletter for
            concentrated stock picking. This FAQ covers what the site is, what
            is free, how performance versus SPY works, and how to follow
            updates.
          </DirectAnswer>
        }
      />
      <FaqSection items={SITE_FAQ} title="All questions" />
      <JsonLd data={faqPageJsonLd(SITE_FAQ)} />
    </PageShell>
  );
}
