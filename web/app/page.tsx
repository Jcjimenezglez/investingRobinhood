import Link from "next/link";
import { ArrowRight, Banknote, LineChart, Percent, Wallet } from "lucide-react";
import { NavAreaChart } from "@/components/charts/nav-area-chart";
import { PositionsTable } from "@/components/fund/positions-table";
import { StatCard } from "@/components/fund/stat-card";
import {
  MarketingSection,
  PageShell,
} from "@/components/marketing/section";
import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import {
  getFundSnapshot,
  getLatestThinking,
  getNavSeries,
  getPositions,
} from "@/lib/content";
import { formatLedgerUsd } from "@/lib/display-money";
import { faqPageJsonLd } from "@/lib/seo";
import { BRAND, SITE_FAQ } from "@/lib/site-config";

const homeFaq = SITE_FAQ.filter((item) =>
  [
    "What is Tapefund?",
    "Is Tapefund a newsletter?",
    "Are the dollar figures real?",
    "How does Tapefund compare to the S&P 500?",
    "Is Tapefund investment advice?",
  ].includes(item.question),
);

const rules = [
  {
    title: "All-in one name",
    body: "One listed stock at a time. Flatten before a new entry. Cash reserve ~8% when invested.",
  },
  {
    title: "Hard limits",
    body: "Shares only. No crypto, options, margin, or pennies. Don't chase a name that already ran.",
  },
  {
    title: "How it exits",
    body: "Sell around +20–30% or when the setup dies. Earnings are a coin flip. No mechanical stop-loss.",
  },
];

export default function HomePage() {
  const snapshot = getFundSnapshot();
  const navSeries = getNavSeries();
  const open = getPositions().filter((p) => p.status === "open");
  const closed = getPositions().filter((p) => p.status === "closed");
  const thinking = getLatestThinking();
  const returnLabel = `${snapshot.returnPct >= 0 ? "+" : ""}${snapshot.returnPct.toFixed(2)}%`;
  const alphaLabel =
    snapshot.alphaPct !== null
      ? `${snapshot.alphaPct >= 0 ? "+" : ""}${snapshot.alphaPct.toFixed(2)}%`
      : "—";
  const spyLabel =
    snapshot.spyReturnPct !== null
      ? `${snapshot.spyReturnPct >= 0 ? "+" : ""}${snapshot.spyReturnPct.toFixed(2)}% SPY`
      : "same window as the book";

  return (
    <PageShell fullBleed>
      <section className="border-b border-border">
        <div className="container-page space-y-8 py-12 sm:py-16">
          <div className="max-w-2xl space-y-3">
            <p className="text-label-13 text-muted-foreground">
              Robinhood Agentic · since {BRAND.inceptionDate}
            </p>
            <h1 className="text-heading-40 text-foreground sm:text-heading-48">
              {BRAND.name}
            </h1>
            <p className="text-[1.15rem] font-medium tracking-tight text-foreground">
              {BRAND.tagline}
            </p>
            <p className="max-w-xl text-copy-16 text-muted-foreground">
              Live book of the autonomous equity agent. Portfolio value, P&amp;L,
              and trade sizes are the real Agentic cash account — starting{" "}
              {formatLedgerUsd(BRAND.startingNav, { digits: 0 })}. Updated{" "}
              {snapshot.lastUpdated}.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Portfolio value"
              value={formatLedgerUsd(snapshot.nav, { digits: 2 })}
              sub={`${snapshot.cashPct.toFixed(0)}% cash · ${snapshot.positions} open`}
              icon={Wallet}
              accent
            />
            <StatCard
              title="Total return"
              value={returnLabel}
              sub={`Since the first trade, from ${formatLedgerUsd(BRAND.startingNav, { digits: 0 })}.`}
              icon={Percent}
            />
            <StatCard
              title="vs S&P 500"
              value={alphaLabel}
              sub={`Desk return minus SPY (${spyLabel}${snapshot.benchmarkAsOf ? `, ${snapshot.benchmarkAsOf}` : ""}).`}
              icon={LineChart}
            />
            <StatCard
              title="Profit or loss"
              value={formatLedgerUsd(snapshot.pnlUsd, {
                digits: 2,
                signed: true,
              })}
              sub="Dollars gained or lost so far."
              icon={Banknote}
            />
          </div>
        </div>
      </section>

      <MarketingSection
        id="desk"
        eyebrow="Live book"
        title="NAV history"
        description={
          <p>
            Marks from published CIO sessions. Not a scaled demo — this is the
            Agentic ledger.
          </p>
        }
      >
        <div className="surface-panel overflow-hidden">
          <div className="px-3 py-5 sm:px-5">
            <NavAreaChart data={navSeries} />
          </div>
        </div>
      </MarketingSection>

      <MarketingSection
        eyebrow="How the desk tries to win"
        title="The edge, the limits, the sell rule"
        description={
          <p>
            Kevin Xu filter on a dedicated cash account. The methodology page
            is the long version; this is the contract the agent cannot waive.
          </p>
        }
      >
        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {rules.map((item, i) => (
            <li key={item.title} className="space-y-3">
              <p className="font-data text-[13px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-heading-20 text-foreground">{item.title}</h3>
              <p className="text-copy-14 text-muted-foreground sm:text-copy-16">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link href="/methodology/">
              Read methodology
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </MarketingSection>

      <MarketingSection
        eyebrow="Current holdings"
        title="What is still open"
        description={
          <p>
            Names that can still change the final result. Cash is a holding.
          </p>
        }
      >
        <div className="surface-panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
            <h3 className="text-label-13 text-muted-foreground">
              {open.length === 0
                ? `Cash ${formatLedgerUsd(snapshot.cash, { digits: 2 })}`
                : "Open positions"}
            </h3>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/trades/">
                All trades
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
          <div className="px-2 py-2 sm:px-4 sm:py-4">
            {open.length === 0 ? (
              <p className="px-3 py-8 text-sm text-muted-foreground">
                No open equity. The book is 100% cash after flattening, waiting
                for a single-name Xu setup.
              </p>
            ) : (
              <PositionsTable positions={open} />
            )}
          </div>
        </div>
      </MarketingSection>

      {thinking && (
        <MarketingSection
          eyebrow="What the desk is thinking"
          title={thinking.title}
          description={
            <p>
              Latest published session ({thinking.date} · {thinking.sessionType}
              ). Plain English from the live runbook.
            </p>
          }
        >
          <div className="surface-panel space-y-4 px-5 py-6">
            <p className="text-copy-16 text-foreground">{thinking.brief}</p>
            <Button variant="outline" asChild>
              <Link href={`/journal/${thinking.date}/`}>
                Read the journal
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </MarketingSection>
      )}

      <MarketingSection
        eyebrow="Closed results"
        title="Trades that are finished"
        description={
          <p>
            Locked-in outcomes from the Agentic account. Size is the real USD
            put on at entry.
          </p>
        }
      >
        <div className="surface-panel overflow-hidden px-2 py-2 sm:px-4 sm:py-4">
          <PositionsTable positions={closed} />
        </div>
      </MarketingSection>

      <MarketingSection title="FAQ">
        <FaqSection items={homeFaq} title="Common questions" />
        <Link
          href="/faq/"
          className="mt-6 inline-flex items-center gap-1.5 text-label-14 text-muted-foreground transition-colors hover:text-signal"
        >
          View all questions
          <ArrowRight className="size-3.5" />
        </Link>
      </MarketingSection>

      <JsonLd data={faqPageJsonLd(homeFaq)} />
    </PageShell>
  );
}
