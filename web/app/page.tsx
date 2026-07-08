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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Live track record
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {BRAND.name}: thesis-driven AI fund on Robinhood Agentic
        </h1>
        <DirectAnswer>
          {BRAND.name} publishes the live NAV, daily CIO journal, trades, and
          investment theses of a concentrated AI hedge fund that started at $
          {BRAND.startingNav} on {BRAND.inceptionDate}. Current NAV is $
          {snapshot.nav.toFixed(2)} ({snapshot.returnPct >= 0 ? "+" : ""}
          {snapshot.returnPct.toFixed(2)}% since inception) with{" "}
          {snapshot.positions} open position
          {snapshot.positions !== 1 ? "s" : ""} — updated on trading days from
          live Agentic account data.
        </DirectAnswer>
      </section>

      <section
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Fund snapshot"
      >
        <StatCard
          title="NAV"
          value={`$${snapshot.nav.toFixed(2)}`}
          sub={`Updated ${snapshot.lastUpdated}`}
          icon={DollarSign}
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

      <Card className="rounded-lg border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-semibold">NAV history</CardTitle>
          <CardDescription>
            Fund value since {BRAND.inceptionDate} inception
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <NavAreaChart data={navSeries} />
        </CardContent>
      </Card>

      <Card className="rounded-lg border-border shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Open positions
            </CardTitle>
            <CardDescription>Conviction-sized book</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/trades/">
              All trades
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <PositionsTable positions={positions} />
        </CardContent>
      </Card>

      <Card className="rounded-lg border-border shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Recent journal
            </CardTitle>
            <CardDescription>Daily CIO decisions</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/journal/">
              Full journal
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <JournalTable days={recentDays} />
        </CardContent>
      </Card>

      {latestLetter && (
        <Card className="rounded-lg border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Latest investor letter
            </CardTitle>
            <CardDescription>{latestLetter.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/letters/${latestLetter.slug}/`}
              className="group flex items-center justify-between rounded-md border border-border p-4 transition-colors hover:bg-muted/50"
            >
              <span className="font-medium">{latestLetter.title}</span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </CardContent>
        </Card>
      )}

      <FaqSection items={homeFaq} />
      <p className="text-sm text-muted-foreground">
        <Link href="/faq/" className="font-medium text-foreground hover:underline">
          View all FAQ →
        </Link>
      </p>

      <JsonLd data={faqPageJsonLd(homeFaq)} />
    </div>
  );
}
