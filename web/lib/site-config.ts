/** Public site identity — single source for branding & SEO. */
export const BRAND = {
  name: "Tapefund",
  legalName: "Tapefund",
  tagline: "Public auto-trader desk",
  shortDescription:
    "Tapefund is a public auto-trader desk: live Robinhood Agentic NAV, holdings, journals, and performance versus the S&P 500 — shown at real dollar scale.",
  description:
    "Tapefund publishes the live book of an autonomous equity desk on Robinhood Agentic. Portfolio value, P&L, closed trades, and CIO notes are real account figures versus SPY since inception — not a scaled marketing NAV.",
  /** Vibrant pink — matches favicon / isotype */
  color: "#E04B16",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tapefund.com",
  locale: "en_US",
  language: "en",
  inceptionDate: "2026-06-18",
  /** Real account starting NAV (source of truth in logs). */
  startingNav: 100,
  /**
   * Public UI uses ledger USD as-is (NAV, size, cash).
   * Share prices and percentages are never scaled.
   */
  displayUsdScale: 1,
  keywords: [
    "public auto trader",
    "live track record",
    "Robinhood Agentic",
    "vs S&P 500",
    "investment thesis",
    "concentrated portfolio",
    "public NAV",
  ],
  social: {
    // Add handles when available
    twitter: undefined as string | undefined,
  },
} as const;

export type FaqItem = { question: string; answer: string };

export const SITE_FAQ: FaqItem[] = [
  {
    question: "What is Tapefund?",
    answer:
      "Tapefund is a public auto-trader desk. It shows the live Robinhood Agentic book: NAV, cash, holdings, daily CIO journals, theses, closed trades, and weekly performance versus the S&P 500 (SPY). Dollar amounts are the real account — they are not scaled.",
  },
  {
    question: "Is Tapefund a newsletter?",
    answer:
      "No. The product is the public desk itself. Theses, journals, and the scoreboard are on the site. There is no paid letter or waitlist.",
  },
  {
    question: "Is Tapefund investment advice?",
    answer:
      "No. Nothing on this site is investment advice, a solicitation, or a recommendation to buy or sell any security. Past performance does not guarantee future results.",
  },
  {
    question: "How does Tapefund compare to the S&P 500?",
    answer:
      "Fund return is measured against SPY from the same inception date (2026-06-18). Weekly performance reports publish fund return, SPY return for the period, and alpha. See the Performance page for the latest scorecard.",
  },
  {
    question: "Are the dollar figures real?",
    answer:
      "Yes. Starting NAV was $100 in a dedicated Robinhood Agentic cash account. The site prints that ledger as-is — no 100x or 1000x display multiplier.",
  },
  {
    question: "How often is Tapefund updated?",
    answer:
      "The CIO runbook runs at premarket, market open, and midday. Journal entries and NAV are published after each cycle on trading days. Weekly performance reports are published every Friday.",
  },
  {
    question: "What is the Tapefund investment strategy?",
    answer:
      "Tapefund follows Kevin Xu's swing filter: all-in one listed stock at a time, retail vibes plus support and a near-term catalyst, sell around +20–30%, never chase, no crypto, margin, options, or pennies.",
  },
  {
    question: "What market data does the CIO use?",
    answer:
      "Broker-native research: earnings calendars and results, company financials (revenue, profit, margins), technical indicators for timing only (RSI, MACD, moving averages), Level II order-book depth before material trades, realized P&L for scorecards, and tax-lot data on equity exits. Thesis quality still drives buys — indicators do not.",
  },
  {
    question: "What stocks does Tapefund trade?",
    answer:
      "The research universe includes large-cap names such as GOOGL, AMZN, META, AAPL, MSFT, NVDA, HOOD, UBER, QSR, and BN. Positions change based on thesis conviction; see the Trades and Theses pages for current exposure.",
  },
  {
    question: "How can I follow Tapefund updates?",
    answer:
      "Bookmark the homepage, read the Daily Journal, subscribe to the RSS feed at /rss.xml, or check Performance every Friday.",
  },
];
