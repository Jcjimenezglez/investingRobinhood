import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CandlestickChart,
  FileText,
  LineChart,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";
import { PageShell } from "@/components/marketing/section";

export const metadata: Metadata = pageMetadata({
  title: "Swing trading methodology",
  description:
    "Tapefund swing trading strategy on Robinhood Agentic: all-in one listed stock, investment thesis before every BUY, never chasing stocks, no crypto/margin/options/pennies. Not day trading.",
  path: "/methodology/",
  keywords: [
    "swing trading strategy",
    "swing trading stocks",
    "chasing stocks",
    "robinhood agentic account",
  ],
});

const pillars = [
  {
    icon: FileText,
    title: "Thesis before capital",
    body: "Every BUY requires a swing memo: won't-go-to-zero, retail vibes, near-term catalyst, don't-chase check.",
  },
  {
    icon: Target,
    title: "All-in one name",
    body: `~92% of the live book in one high-conviction swing. Cash reserve ~8%. Never three names at once.`,
  },
  {
    icon: Shield,
    title: "Sell the swing",
    body: "Target +20–30% or sell when the setup dies / the rumor is fully news. Screenshot rule. No GTC stop-loss.",
  },
  {
    icon: BookOpen,
    title: "Daily trading journal",
    body: "Automated runbook at premarket, open, and intraday. Each session is published as a trading journal entry.",
  },
  {
    icon: Zap,
    title: "All-in rules",
    body: "Shares only. No crypto, margin, options, or pennies. Follow retail attention. Never chasing stocks that already ran.",
  },
  {
    icon: LineChart,
    title: "Agentic account only",
    body: "All trades run on a dedicated Agentic brokerage account. Broker-native market data feeds the CIO; the scoreboard stays public.",
  },
];

/** Broker-native research stack (Jul 2026) — public-facing, no internal tool IDs. */
const researchStack = [
  {
    title: "Earnings calendar & results",
    body: "Upcoming reports and multi-quarter EPS history for catalyst timing and surprise context.",
  },
  {
    title: "Company financials",
    body: "Revenue, profit, and margin trends — the core of quality and mispricing analysis.",
  },
  {
    title: "Technicals (timing only)",
    body: "RSI, MACD, and moving averages as secondary timing checks — never the thesis itself.",
  },
  {
    title: "Level II order book",
    body: "Bid/ask depth before material entries and exits so size respects real liquidity.",
  },
  {
    title: "Realized P&L",
    body: "Closed-trade P&L feeds the weekly scorecard and post-mortems versus SPY.",
  },
  {
    title: "Tax lots",
    body: "Cost basis and short/long-term status inform which lots to close when trimming or exiting.",
  },
];

const universe = [
  "GOOGL",
  "HOOD",
  "AMZN",
  "META",
  "AAPL",
  "MSFT",
  "NVDA",
  "UBER",
  "QSR",
  "BN",
  "SPCX",
  "TSLA",
];

export default function MethodologyPage() {
  return (
    <PageShell>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Swing trading methodology
        </h1>
        <DirectAnswer className="mt-3">
          {BRAND.name} is a public AI trading agent for swing trading stocks —
          not day trading. All-in one listed name on Robinhood Agentic: follow
          retail attention, buy support with a catalyst, sell around +20–30%.
          No crypto, margin, options, or pennies. Never chase.
        </DirectAnswer>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((p) => (
          <Card
            key={p.title}
            className="border-border"
          >
            <CardHeader className="pb-2">
              <div className="mb-2 flex size-9 items-center justify-center border border-border bg-background text-signal">
                <p.icon className="size-4" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-sm font-semibold tracking-tight">
                {p.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {p.body}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <section>
        <h2 className="hud-label">Research universe</h2>
        <p className="mt-3 font-data text-sm tracking-[0.08em]">
          {universe.map((ticker, i) => (
            <span key={ticker}>
              <Link
                href={`/trades/${ticker.toLowerCase()}/`}
                className="text-signal hover:underline"
              >
                {ticker}
              </Link>
              {i < universe.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <CandlestickChart className="size-4 text-signal" strokeWidth={1.5} />
          <h2 className="hud-label !mb-0">Broker research stack</h2>
        </div>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The CIO pulls live market intelligence from the brokerage before every
          ranked scan and trade. Fundamentals and catalysts still drive
          conviction; technicals and the order book refine timing and execution.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchStack.map((item) => (
            <div key={item.title} className="space-y-2 border border-border p-4">
              <h3 className="text-sm font-semibold tracking-tight">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="hud-label">Published daily on {BRAND.name}</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>
            <Link href="/journal/" className="text-signal hover:underline">
              Trading journal
            </Link>{" "}
            — CIO cycles with NAV and HOLD/BUY/SELL decisions
          </li>
          <li>
            <Link href="/trades/" className="text-signal hover:underline">
              Trades & theses
            </Link>{" "}
            — entries, sizing, full memos
          </li>
          <li>
            <Link
              href="/performance/"
              className="text-signal hover:underline"
            >
              Weekly performance
            </Link>{" "}
            — NAV scorecard vs SPY
          </li>
          <li>
            <Link href="/letters/" className="text-signal hover:underline">
              Investor letters
            </Link>{" "}
            — major allocation decisions
          </li>
        </ul>
      </section>

      <JsonLd
        data={collectionPageJsonLd({
          name: "Tapefund swing trading methodology",
          description:
            "Swing trading process for the Tapefund AI trading agent, including broker-native earnings, financials, technicals, and Level II research.",
          path: "/methodology/",
        })}
      />
    </PageShell>
  );
}
