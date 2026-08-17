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
    "Frequently asked questions about Tapefund — a public auto-trader desk with a live Robinhood Agentic track record versus the S&P 500.",
  path: "/faq/",
});

export default function FaqPage() {
  return (
    <PageShell className="space-y-16">
      <Hero
        title="Frequently asked questions"
        body={
          <DirectAnswer className="text-base text-muted-foreground sm:text-lg">
            {BRAND.name} is a public auto-trader desk. This FAQ covers the live
            Agentic book, how performance versus SPY is measured, and that
            dollar figures are unscaled.
          </DirectAnswer>
        }
      />
      <FaqSection items={SITE_FAQ} title="All questions" />
      <JsonLd data={faqPageJsonLd(SITE_FAQ)} />
    </PageShell>
  );
}
