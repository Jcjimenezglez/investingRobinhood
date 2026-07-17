import Link from "next/link";
import { ArrowRight, DollarSign, Layers, Percent, Wallet } from "lucide-react";
import { NavAreaChart } from "@/components/charts/nav-area-chart";
import { JournalTable } from "@/components/fund/journal-table";
import { PositionsTable } from "@/components/fund/positions-table";
import { StatCard } from "@/components/fund/stat-card";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import {
  HudPanel,
  HudPanelBody,
  HudPanelHeader,
} from "@/components/ui/hud-panel";
import {
  getFundSnapshot,
  getJournalDays,
  getLetters,
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

const homeFaq = SITE_FAQ.slice(0, 3);

export default function HomePage() {
  const snapshot = getFundSnapshot();
  const navSeries = getNavSeries().map((p) => ({
    ...p,
    nav: scaleUsd(p.nav),
  }));
  const recentDays = getJournalDays().slice(0, 10);
  const positions = getPositions().filter((p) => p.status === "open");
  const latestLetter = getLetters()[0];
  const returnLabel = `${snapshot.returnPct >= 0 ? "+" : ""}${snapshot.returnPct.toFixed(2)}%`;

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-600" />
          Live track record · since {BRAND.inceptionDate}
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {BRAND.name}
          <span className="mt-3 block text-2xl font-medium text-muted-foreground sm:text-3xl">
            Stock newsletter with a live track record
          </span>
        </h1>
        <DirectAnswer className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Live NAV, CIO journal, trades, and theses vs the S&amp;P 500. Started at{" "}
          {formatStartingNav()} on {BRAND.inceptionDate}. Current NAV{" "}
          {formatLedgerUsd(snapshot.nav, { digits: 2 })} ({returnLabel}) with{" "}
          {snapshot.positions} open position
          {snapshot.positions !== 1 ? "s" : ""}. Join the{" "}
          <Link href="/newsletter/" className="font-medium text-foreground underline-offset-4 hover:underline">
            newsletter waitlist
          </Link>{" "}
          for full theses and weekly picks.
        </DirectAnswer>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/newsletter/">
              Newsletter waitlist
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/performance/">Performance vs SPY</Link>
          </Button>
        </div>
      </section>

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
          sub={`Since inception (${formatStartingNav()})`}
          icon={Percent}
        />
        <StatCard
          title="Cash"
          value={formatLedgerUsd(snapshot.cash, { digits: 0 })}
          sub={`${snapshot.cashPct.toFixed(0)}% of book`}
          icon={Wallet}
        />
        <StatCard
          title="Positions"
          value={String(snapshot.positions)}
          sub="Open names"
          icon={Layers}
        />
      </section>

      <HudPanel>
        <HudPanelHeader>
          <div>
            <p className="text-sm text-muted-foreground">Performance</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              NAV history
            </h2>
          </div>
        </HudPanelHeader>
        <HudPanelBody className="pl-2 pt-4">
          <NavAreaChart data={navSeries} />
        </HudPanelBody>
      </HudPanel>

      <HudPanel>
        <HudPanelHeader>
          <div>
            <p className="text-sm text-muted-foreground">Book</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              Open positions
            </h2>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/trades/">
              All trades
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </HudPanelHeader>
        <HudPanelBody>
          <PositionsTable positions={positions} />
        </HudPanelBody>
      </HudPanel>

      <HudPanel>
        <HudPanelHeader>
          <div>
            <p className="text-sm text-muted-foreground">Journal</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              Recent decisions
            </h2>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/journal/">
              Full journal
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </HudPanelHeader>
        <HudPanelBody>
          <JournalTable days={recentDays} />
        </HudPanelBody>
      </HudPanel>

      {latestLetter && (
        <HudPanel>
          <HudPanelHeader>
            <div>
              <p className="text-sm text-muted-foreground">Letters</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight">
                Latest investor letter
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {latestLetter.date}
              </p>
            </div>
          </HudPanelHeader>
          <HudPanelBody>
            <Link
              href={`/letters/${latestLetter.slug}/`}
              className="group flex items-center justify-between rounded-lg border border-border px-4 py-4 transition-colors hover:bg-muted/50"
            >
              <span className="text-sm font-medium">{latestLetter.title}</span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </HudPanelBody>
        </HudPanel>
      )}

      <section className="space-y-4">
        <FaqSection items={homeFaq} />
        <Link
          href="/faq/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          View all FAQ
          <ArrowRight className="size-3.5" />
        </Link>
      </section>

      <JsonLd data={faqPageJsonLd(homeFaq)} />
    </div>
  );
}
