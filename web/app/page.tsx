import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavAreaChart } from "@/components/charts/nav-area-chart";
import { PositionsTable } from "@/components/fund/positions-table";
import {
  LandingHero,
  MarketingSection,
  PageShell,
} from "@/components/marketing/section";
import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import {
  getFundSnapshot,
  getNavSeries,
  getPositions,
} from "@/lib/content";
import {
  formatLedgerUsd,
  formatStartingNav,
  scaleUsd,
} from "@/lib/display-money";
import { faqPageJsonLd } from "@/lib/seo";
import { BRAND, SITE_FAQ } from "@/lib/site-config";

const homeFaq = SITE_FAQ.filter((item) =>
  [
    "What is Tapefund?",
    "What is the Tapefund newsletter?",
    "Is Tapefund investment advice?",
    "How does Tapefund compare to the S&P 500?",
  ].includes(item.question),
);

export default function HomePage() {
  const snapshot = getFundSnapshot();
  const navSeries = getNavSeries().map((p) => ({
    ...p,
    nav: scaleUsd(p.nav),
  }));
  const positions = getPositions().filter((p) => p.status === "open");
  const returnLabel = `${snapshot.returnPct >= 0 ? "+" : ""}${snapshot.returnPct.toFixed(2)}%`;

  return (
    <PageShell fullBleed>
      <LandingHero
        brand={BRAND.name}
        title="Stock newsletter with a live track record."
        subtitle="Most stock letters ask you to trust the tip. Tapefund publishes the book — NAV, theses, and performance versus the S&P 500 — so you can see how the picks actually do."
        imageSrc="/images/hero-landing.jpg"
        imageAlt="Research desk with laptop showing a market chart"
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/newsletter/">
                Join Waitlist
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#proof">See the Public Book</Link>
            </Button>
          </>
        }
      />

      <MarketingSection
        title="Stock picks you can audit"
        description={
          <>
            <p>
              Tip sheets are easy to market and hard to verify. Tapefund is built
              the other way around: a concentrated CIO book stays public, updated
              on trading days, and measured against SPY from the same inception
              date.
            </p>
            <p>
              The free site is the scoreboard. The newsletter is for the full
              memo — thesis, sizing, and kill criteria — before and after every
              meaningful change.
            </p>
          </>
        }
      />

      <MarketingSection
        eyebrow="How it works"
        title="Thesis first. Publish the book. Measure vs SPY."
        description={
          <p>
            Every buy starts as a written memo. Positions, cash, and daily
            journals stay on the site. Weekly scorecards publish fund return,
            SPY return, and alpha — so the track record is not a marketing
            claim.
          </p>
        }
      >
        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {[
            {
              step: "01",
              title: "Write the thesis",
              body: "No buy without a memo: financials, earnings catalysts, mispricing, and kill criteria — technicals only for timing.",
            },
            {
              step: "02",
              title: "Keep the book public",
              body: "Open tickers, NAV, cash, and CIO notes update from the live runbook — not a curated highlight reel.",
            },
            {
              step: "03",
              title: "Score it every week",
              body: "Friday scorecards use realized P&L and compare Tapefund to SPY for the period and since inception.",
            },
          ].map((item) => (
            <li key={item.step} className="space-y-3">
              <p className="font-data text-[13px] text-muted-foreground">
                {item.step}
              </p>
              <h3 className="text-heading-20 text-foreground">{item.title}</h3>
              <p className="text-copy-14 text-muted-foreground sm:text-copy-16">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/methodology/">Read Methodology</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/journal/">Daily Journal</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/performance/">Performance</Link>
          </Button>
        </div>
      </MarketingSection>

      <MarketingSection
        id="proof"
        eyebrow="Live proof"
        title="The public book"
        description={
          <p>
            This is the scoreboard anyone can check: current NAV{" "}
            <span className="font-data text-foreground">
              {formatLedgerUsd(snapshot.nav, { digits: 2 })}
            </span>
            , return{" "}
            <span className="font-data text-foreground">{returnLabel}</span> since{" "}
            {formatStartingNav()}, {snapshot.positions} open names, benchmarked
            vs SPY. Updated {snapshot.lastUpdated}.
          </p>
        }
      >
        <div className="surface-panel overflow-hidden">
          <div className="border-b border-border px-5 py-3.5">
            <h3 className="text-label-13 text-muted-foreground">NAV history</h3>
          </div>
          <div className="px-3 py-5 sm:px-5">
            <NavAreaChart data={navSeries} />
          </div>
        </div>

        <div className="surface-panel mt-4 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
            <h3 className="text-label-13 text-muted-foreground">
              Open positions
            </h3>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/trades/">
                All Trades
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
          <div className="px-2 py-2 sm:px-4 sm:py-4">
            <PositionsTable positions={positions} />
          </div>
        </div>
      </MarketingSection>

      <MarketingSection
        eyebrow="Newsletter"
        title="Full theses in the letter"
        description={
          <p>
            The site stays free: NAV, book, journal, and weekly vs SPY. The
            Tapefund letter is where we publish the complete investment memo,
            sizing notes, and weekly picks commentary — Stock Advisor–style,
            backed by the same public track record.
          </p>
        }
      >
        <div className="overflow-hidden rounded-[12px] border border-border">
          <img
            src="/images/newsletter-desk.jpg"
            alt="Laptop and notebook on a research desk"
            className="aspect-[21/9] w-full object-cover sm:aspect-[2.4/1]"
          />
          <div className="flex flex-col gap-4 border-t border-border bg-card px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md space-y-1">
              <p className="text-label-14 text-foreground">
                Join the waitlist
              </p>
              <p className="text-copy-14 text-muted-foreground">
                Email capture opens soon. No spam — just the letter when it
                ships.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/newsletter/">
                Join Waitlist
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection title="FAQ">
        <FaqSection items={homeFaq} title="Common Questions" />
        <Link
          href="/faq/"
          className="mt-6 inline-flex items-center gap-1.5 text-label-14 text-muted-foreground transition-colors hover:text-signal"
        >
          View All Questions
          <ArrowRight className="size-3.5" />
        </Link>
      </MarketingSection>

      <JsonLd data={faqPageJsonLd(homeFaq)} />
    </PageShell>
  );
}
