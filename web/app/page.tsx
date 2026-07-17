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
import { faqPageJsonLd } from "@/lib/seo";
import { BRAND, SITE_FAQ } from "@/lib/site-config";

const homeFaq = SITE_FAQ.slice(0, 3);

export default function HomePage() {
  const snapshot = getFundSnapshot();
  const navSeries = getNavSeries();
  const recentDays = getJournalDays().slice(0, 10);
  const positions = getPositions().filter((p) => p.status === "open");
  const latestLetter = getLetters()[0];

  return (
    <div className="space-y-7">
      <section className="hud-panel hud-panel-accent hud-scanline relative overflow-hidden px-5 py-7 sm:px-7 sm:py-9">
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="hud-live">
                <span className="hud-live-dot" />
                Live track record
              </span>
              <span className="font-data text-[10px] uppercase tracking-[0.2em] text-violet">
                PR // {BRAND.inceptionDate}
              </span>
            </div>
            <h1 className="hud-title max-w-3xl text-3xl text-foreground sm:text-5xl">
              <span className="text-signal">{BRAND.name}</span>
              <span className="mt-2 block text-xl font-semibold tracking-[0.08em] text-foreground/90 sm:text-3xl">
                Stock newsletter with a live track record
              </span>
            </h1>
            <DirectAnswer className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
              {BRAND.name} publishes a live stock-picking track record vs the
              S&amp;P 500 — NAV, CIO journal, trades, and theses since{" "}
              {BRAND.inceptionDate} (starting ${BRAND.startingNav}). Current NAV
              is ${snapshot.nav.toFixed(2)} (
              {snapshot.returnPct >= 0 ? "+" : ""}
              {snapshot.returnPct.toFixed(2)}% ) with {snapshot.positions} open
              position{snapshot.positions !== 1 ? "s" : ""}. Free scoreboard on
              the site; join the{" "}
              <Link href="/newsletter/" className="hud-link">
                newsletter waitlist
              </Link>{" "}
              for full theses and weekly picks.
            </DirectAnswer>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                size="sm"
                asChild
                className="font-data uppercase tracking-[0.14em]"
              >
                <Link href="/newsletter/">
                  Newsletter waitlist
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="font-data uppercase tracking-[0.14em]"
              >
                <Link href="/performance/">
                  vs SPY
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 border border-border/70 bg-background/40 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="hud-label">System status</span>
              <span className="font-data text-[10px] uppercase tracking-[0.16em] text-signal">
                Online
              </span>
            </div>
            <div className="space-y-2 font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <div className="flex justify-between border-b border-border/60 pb-2">
                <span>NAV sync</span>
                <span className="text-foreground">{snapshot.lastUpdated}</span>
              </div>
              <div className="flex justify-between border-b border-border/60 pb-2">
                <span>Open book</span>
                <span className="text-foreground">{snapshot.positions} names</span>
              </div>
              <div className="flex justify-between">
                <span>Cash floor</span>
                <span className="text-foreground">{snapshot.cashPct.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Fund snapshot"
      >
        <StatCard
          title="NAV"
          value={`$${snapshot.nav.toFixed(2)}`}
          sub={`Updated ${snapshot.lastUpdated}`}
          icon={DollarSign}
          accent
        />
        <StatCard
          title="Return"
          value={`${snapshot.returnPct >= 0 ? "+" : ""}${snapshot.returnPct.toFixed(2)}%`}
          sub={`Since inception ($${BRAND.startingNav})`}
          icon={Percent}
        />
        <StatCard
          title="Cash"
          value={`$${snapshot.cash.toFixed(0)}`}
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

      <HudPanel accent>
        <HudPanelHeader>
          <div>
            <p className="hud-label">Telemetry</p>
            <h2 className="hud-title mt-1 text-base tracking-[0.12em]">
              NAV history
            </h2>
            <p className="mt-1 font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Fund value since {BRAND.inceptionDate} inception
            </p>
          </div>
        </HudPanelHeader>
        <HudPanelBody className="pl-2 pt-4">
          <NavAreaChart data={navSeries} />
        </HudPanelBody>
      </HudPanel>

      <HudPanel>
        <HudPanelHeader>
          <div>
            <p className="hud-label">Book</p>
            <h2 className="hud-title mt-1 text-base tracking-[0.12em]">
              Open positions
            </h2>
            <p className="mt-1 font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Conviction-sized allocation
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="font-data uppercase tracking-[0.14em]">
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
            <p className="hud-label">CIO feed</p>
            <h2 className="hud-title mt-1 text-base tracking-[0.12em]">
              Recent journal
            </h2>
            <p className="mt-1 font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Daily decision log
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="font-data uppercase tracking-[0.14em]">
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
        <HudPanel accent>
          <HudPanelHeader>
            <div>
              <p className="hud-label">Dispatch</p>
              <h2 className="hud-title mt-1 text-base tracking-[0.12em]">
                Latest investor letter
              </h2>
              <p className="mt-1 font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {latestLetter.date}
              </p>
            </div>
          </HudPanelHeader>
          <HudPanelBody>
            <Link
              href={`/letters/${latestLetter.slug}/`}
              className="group flex items-center justify-between border border-border bg-background/35 px-4 py-4 transition-colors hover:border-signal/50 hover:bg-muted/40"
            >
              <span className="font-data text-sm uppercase tracking-[0.08em]">
                {latestLetter.title}
              </span>
              <ArrowRight className="size-4 text-signal transition-transform group-hover:translate-x-0.5" />
            </Link>
          </HudPanelBody>
        </HudPanel>
      )}

      <FaqSection items={homeFaq} />
      <p className="font-data text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link href="/faq/" className="hud-link">
          View all FAQ
          <ArrowRight className="size-3.5" />
        </Link>
      </p>

      <JsonLd data={faqPageJsonLd(homeFaq)} />
    </div>
  );
}
