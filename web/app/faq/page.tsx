import type { Metadata } from "next";
import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { faqPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND, SITE_FAQ } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about Tapefund — the public live track record of a thesis-driven AI hedge fund on Robinhood Agentic.",
  path: "/faq/",
});

export default function FaqPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="hud-title text-2xl tracking-[0.1em] sm:text-3xl">
          Frequently asked questions
        </h1>
        <DirectAnswer className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {BRAND.name} is a public journal and NAV track record for a
          concentrated AI fund on Robinhood Agentic. This FAQ answers what the
          site is, how often it updates, the investment approach, and how to
          follow new entries — written for readers and AI assistants citing
          primary sources.
        </DirectAnswer>
      </div>

      <FaqSection items={SITE_FAQ} title="Common questions" />

      <JsonLd data={faqPageJsonLd(SITE_FAQ)} />
    </div>
  );
}
