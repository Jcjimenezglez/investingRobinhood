import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  DollarSign,
  LineChart,
  Mail,
  Percent,
} from "lucide-react";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { StatCard } from "@/components/fund/stat-card";
import {
  Hero,
  MarketingSection,
  PageShell,
} from "@/components/marketing/section";
import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getFundSnapshot } from "@/lib/content";
import { formatLedgerUsd, formatStartingNav } from "@/lib/display-money";
import { faqPageJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_FAQ } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Stock Newsletter with Live Track Record vs S&P 500",
  description:
    "Tapefund newsletter waitlist — Stock Advisor–style picks backed by a live public track record vs the S&P 500.",
  path: "/newsletter/",
});

const newsletterFaq = SITE_FAQ.filter((item) =>
  [
    "What is the Tapefund newsletter?",
    "What is free vs what is for the waitlist?",
    "Is Tapefund investment advice?",
  ].includes(item.question),
);

const freeItems = [
  "Live NAV & return",
  "Open positions",
  "Daily journal",
  "Weekly vs SPY",
];

const letterItems = [
  "Full theses",
  "Weekly picks commentary",
  "Sizing notes",
  "Kill criteria",
];

export default function NewsletterPage() {
  const snapshot = getFundSnapshot();
  const returnLabel = `${snapshot.returnPct >= 0 ? "+" : ""}${snapshot.returnPct.toFixed(2)}%`;

  return (
    <PageShell>
      <Hero
        eyebrow={
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[12px] text-muted-foreground">
            Waitlist · opening soon
          </div>
        }
        title="Stock Newsletter"
        subtitle="Live track record vs the S&P 500. Full theses in the letter."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="#waitlist">
                Join Waitlist
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/">View Scoreboard</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="NAV"
          value={formatLedgerUsd(snapshot.nav, { digits: 2 })}
          sub={`Updated ${snapshot.lastUpdated}`}
          icon={DollarSign}
          accent
        />
        <StatCard
          title="Return"
          value={returnLabel}
          sub={`Since ${formatStartingNav()}`}
          icon={Percent}
        />
        <StatCard
          title="Open book"
          value={String(snapshot.positions)}
          sub="Names"
          icon={LineChart}
        />
        <StatCard
          title="Benchmark"
          value="vs SPY"
          sub="Performance page"
          icon={Mail}
        />
      </section>

      <MarketingSection title="Free vs Letter">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="surface-panel p-6">
            <h3 className="text-label-14">On the Site</h3>
            <ul className="mt-4 space-y-2.5">
              {freeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-copy-14 text-muted-foreground"
                >
                  <Check className="size-4 shrink-0 text-foreground" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-panel border-foreground/20 p-6">
            <h3 className="text-label-14">In the Newsletter</h3>
            <ul className="mt-4 space-y-2.5">
              {letterItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-copy-14 text-muted-foreground"
                >
                  <Mail className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection id="waitlist" title="Waitlist">
        <div className="surface-panel max-w-lg p-6">
          <WaitlistForm />
        </div>
      </MarketingSection>

      <MarketingSection title="FAQ">
        <FaqSection items={newsletterFaq} title="Questions" />
      </MarketingSection>

      <p className="text-[12px] text-muted-foreground">
        Not investment advice. Past performance does not guarantee future
        results.
      </p>

      <JsonLd data={faqPageJsonLd(newsletterFaq)} />
    </PageShell>
  );
}
