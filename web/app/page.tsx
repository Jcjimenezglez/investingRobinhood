import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  DollarSign,
  LineChart,
  Percent,
} from "lucide-react";
import { NavAreaChart } from "@/components/charts/nav-area-chart";
import { PositionsTable } from "@/components/fund/positions-table";
import { StatCard } from "@/components/fund/stat-card";
import {
  Hero,
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
    <PageShell>
      <Hero
        eyebrow={
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-600" />
            Live since {BRAND.inceptionDate}
          </div>
        }
        title={BRAND.name}
        subtitle="Stock picks with a live track record vs the S&P 500."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/newsletter/">
                Join waitlist
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#book">View book</Link>
            </Button>
          </>
        }
      />

      <section
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Fund snapshot"
      >
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
          title="Benchmark"
          value="vs SPY"
          sub="Weekly scorecards"
          icon={LineChart}
        />
        <StatCard
          title="Positions"
          value={String(snapshot.positions)}
          sub="Open names"
          icon={BookOpen}
        />
      </section>

      <MarketingSection id="book" title="Live book">
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              NAV history
            </h3>
          </div>
          <div className="px-3 py-5 sm:px-5">
            <NavAreaChart data={navSeries} />
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Open positions
            </h3>
            <Button variant="outline" size="sm" asChild>
              <Link href="/trades/">
                All trades
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
          <div className="px-2 py-2 sm:px-4 sm:py-4">
            <PositionsTable positions={positions} />
          </div>
        </div>
      </MarketingSection>

      <MarketingSection title="How it works">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Thesis first",
              body: "Written memo before every buy.",
            },
            {
              title: "Publish the book",
              body: "NAV, trades, and journal stay public.",
            },
            {
              title: "Measure vs SPY",
              body: "Weekly scorecards on Performance.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/methodology/">Methodology</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/performance/">Performance</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/journal/">Journal</Link>
          </Button>
        </div>
      </MarketingSection>

      <MarketingSection title="Newsletter">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md space-y-1">
            <p className="text-base font-semibold tracking-tight">
              Full theses & weekly picks
            </p>
            <p className="text-sm text-muted-foreground">
              Free scoreboard on the site. Waitlist for the letter.
            </p>
          </div>
          <Button asChild>
            <Link href="/newsletter/">
              Join waitlist
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </MarketingSection>

      <MarketingSection title="FAQ">
        <FaqSection items={homeFaq} title="Common questions" />
        <Link
          href="/faq/"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </MarketingSection>

      <JsonLd data={faqPageJsonLd(homeFaq)} />
    </PageShell>
  );
}
