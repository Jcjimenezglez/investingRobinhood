import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Eye,
  LineChart,
  ShieldAlert,
  Target,
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
import { DollarSign, Percent } from "lucide-react";

const homeFaq = SITE_FAQ.filter((item) =>
  [
    "What is Tapefund?",
    "What is the Tapefund newsletter?",
    "Is Tapefund investment advice?",
    "How does Tapefund compare to the S&P 500?",
  ].includes(item.question),
);

const problems = [
  {
    icon: ShieldAlert,
    title: "Most people do not have a process",
    body: "They buy headlines, hold losers too long, and never write down why they own something. Without a thesis, every dip becomes a panic decision.",
  },
  {
    icon: Eye,
    title: "Tips are cheap. Proof is rare.",
    body: "Stock newsletters usually sell opinions. Few show a live book, daily decisions, and performance versus the S&P 500 you can audit yourself.",
  },
  {
    icon: Target,
    title: "DIY investing takes time you do not have",
    body: "Friends and busy professionals will not run a research desk. They still want better decisions than random trades — with a clear scoreboard.",
  },
];

const steps = [
  {
    step: "01",
    title: "See the live book",
    body: "NAV, open positions, and return since inception — updated on trading days. No black box.",
  },
  {
    step: "02",
    title: "Read the why",
    body: "Every name needs a written thesis before capital. Kill criteria and catalysts are part of the record.",
  },
  {
    step: "03",
    title: "Measure vs SPY",
    body: "The only question that matters: does this concentrated process beat doing nothing in the S&P 500?",
  },
  {
    step: "04",
    title: "Join the newsletter",
    body: "When the waitlist opens, subscribers get full theses and weekly picks commentary — the depth behind the scoreboard.",
  },
];

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
            Live public track record · since {BRAND.inceptionDate}
          </div>
        }
        title={
          <>
            Most stock advice has no scoreboard.
            <span className="mt-3 block text-muted-foreground">
              Tapefund does.
            </span>
          </>
        }
        subtitle="A concentrated stock-picking process with a live NAV, public trades, and performance versus the S&P 500."
        body={
          <>
            <p>
              If you have ever bought a tip, scrolled Twitter for ideas, or
              held a position without a written reason — you already know the
              problem. Noise is endless. Accountability is not.
            </p>
            <p>
              Tapefund publishes a live book so you can see what is owned, why
              it was bought, and whether the process is beating SPY. The free
              site is the scoreboard. The newsletter is the depth.
            </p>
          </>
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/newsletter/">
                Join the waitlist
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#proof">See live performance</Link>
            </Button>
          </>
        }
      />

      <MarketingSection
        id="problem"
        eyebrow="The problem"
        title="Stock picking fails when nobody keeps score"
        description={
          <>
            <p>
              People do not lose because they lack opinions. They lose because
              there is no process, no written thesis, and no honest comparison
              to a simple alternative: owning the market.
            </p>
            <p>
              Newsletters that only send tickers without a public track record
              ask for trust. Tapefund is built the other way around — proof
              first, then the letter.
            </p>
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <item.icon
                className="size-5 text-muted-foreground"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection
        id="proof"
        eyebrow="Live proof"
        title="The book, not the pitch deck"
        description={
          <p>
            Started at {formatStartingNav()} on {BRAND.inceptionDate}. Current
            NAV {formatLedgerUsd(snapshot.nav, { digits: 2 })} ({returnLabel})
            with {snapshot.positions} open position
            {snapshot.positions !== 1 ? "s" : ""}. Updated on trading days.
          </p>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="NAV"
            value={formatLedgerUsd(snapshot.nav, { digits: 2 })}
            sub={`Updated ${snapshot.lastUpdated}`}
            icon={DollarSign}
            accent
          />
          <StatCard
            title="Return since inception"
            value={returnLabel}
            sub={`Starting capital ${formatStartingNav()}`}
            icon={Percent}
          />
          <StatCard
            title="Benchmark"
            value="vs SPY"
            sub="Weekly scorecards on Performance"
            icon={LineChart}
          />
          <StatCard
            title="Open names"
            value={String(snapshot.positions)}
            sub="Concentrated book"
            icon={BookOpen}
          />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-base font-semibold tracking-tight">
              NAV history
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Fund value since inception
            </p>
          </div>
          <div className="px-3 py-5 sm:px-5">
            <NavAreaChart data={navSeries} />
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Open positions
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Conviction-sized allocation — percentages unchanged from the
                live book
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/trades/">
                Full trade history
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
        id="how"
        eyebrow="How it works"
        title="A simple loop: thesis, size, publish, measure"
        description={
          <p>
            Tapefund follows a concentrated mandate: write the thesis before
            buying, size by conviction, keep a cash floor, and exit when the
            thesis breaks — not when a calendar says so. Everything material
            is published.
          </p>
        }
      >
        <ol className="grid gap-4 sm:grid-cols-2">
          {steps.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-border bg-card p-6"
            >
              <span className="font-data text-xs text-muted-foreground">
                {item.step}
              </span>
              <h3 className="mt-2 text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/methodology/">Read the methodology</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/performance/">Weekly vs SPY</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/journal/">Daily journal</Link>
          </Button>
        </div>
      </MarketingSection>

      <MarketingSection
        id="newsletter"
        eyebrow="Newsletter"
        title="The scoreboard is free. The depth is the letter."
        description={
          <>
            <p>
              Public pages show NAV, the open book, and high-level decisions.
              The Tapefund newsletter is for readers who want full theses,
              sizing rationale, and weekly picks commentary — Stock
              Advisor–style, backed by the live record you can already see.
            </p>
            <p>Email capture is opening soon. Join the waitlist to be first.</p>
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/newsletter/">
              Go to newsletter waitlist
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </MarketingSection>

      <MarketingSection
        id="faq"
        eyebrow="FAQ"
        title="Straight answers"
        description={
          <p>
            Not investment advice. Past performance does not guarantee future
            results. Tapefund documents a concentrated public track record.
          </p>
        }
      >
        <FaqSection items={homeFaq} title="Common questions" />
        <Link
          href="/faq/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          View all FAQ
          <ArrowRight className="size-3.5" />
        </Link>
      </MarketingSection>

      <JsonLd data={faqPageJsonLd(homeFaq)} />
    </PageShell>
  );
}
