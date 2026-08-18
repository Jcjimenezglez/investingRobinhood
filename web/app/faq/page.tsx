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
    "FAQ: Tapefund is a public AI trading agent for swing trading on Robinhood Agentic. Not paper trading, not copy trading. Live NAV versus SPY, trading journal, and MCP tools.",
  path: "/faq/",
  keywords: ["paper trading", "copy trading", "ai trading bot"],
});

export default function FaqPage() {
  return (
    <PageShell className="space-y-16">
      <Hero
        title="Frequently asked questions"
        body={
          <DirectAnswer className="text-base text-muted-foreground sm:text-lg">
            {BRAND.name} is a public AI trading agent for swing trading on
            Robinhood Agentic. This FAQ covers the live book versus SPY, why
            it is not paper trading or copy trading, and how the trading
            journal is published.
          </DirectAnswer>
        }
      />
      <FaqSection items={SITE_FAQ} title="All questions" />
      <JsonLd data={faqPageJsonLd(SITE_FAQ)} />
    </PageShell>
  );
}
