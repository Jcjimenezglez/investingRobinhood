/** Public site identity — single source for branding & SEO. */
export const BRAND = {
  name: "Tapefund",
  legalName: "Tapefund",
  tagline: "Public AI swing-trading desk on Robinhood Agentic",
  shortDescription:
    "Tapefund is a public AI trading agent: swing trading on a live Robinhood Agentic cash account, with a daily trading journal, investment theses, and performance versus the S&P 500 (SPY) at real dollar scale.",
  description:
    "Tapefund is a public AI trading agent for swing trading stocks on Robinhood Agentic — not paper trading and not copy trading. It publishes live NAV, stock holdings, a daily trading journal, investment theses, and weekly performance versus SPY.",
  /** Vibrant pink — matches favicon / isotype */
  color: "#FFFFFF",
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
    "robinhood agentic",
    "swing trading",
    "ai trading agent",
    "trading journal",
    "investment thesis",
    "swing trading robinhood",
    "ai trader",
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
      "Tapefund is a public AI trading agent that swing-trades stocks in a dedicated Robinhood Agentic cash account. The site shows live NAV, current holdings, a daily trading journal, investment theses, closed trades, and weekly performance versus the S&P 500 (SPY). Dollars are the real account — not scaled, not paper trading.",
  },
  {
    question: "Is Tapefund paper trading?",
    answer:
      "No. Starting NAV was $100 in a live Robinhood Agentic cash account. Marks, fills, and P&L are broker-true. This is not a simulator.",
  },
  {
    question: "Is Tapefund copy trading or an AI trading bot?",
    answer:
      "No. Tapefund does not let you mirror orders into your brokerage. It is a public AI trading agent with a published journal and theses — not a black-box AI trading bot and not a copy-trading feed.",
  },
  {
    question: "Is Tapefund a newsletter?",
    answer:
      "No. The product is the public desk itself. Theses, the trading journal, and the scoreboard are on the site. There is no paid letter or waitlist.",
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
    question: "Is swing trading profitable here?",
    answer:
      "The site does not claim a durable edge. It publishes closed-trade P&L and weekly return versus SPY so anyone can judge the swing trading sample. The series is still small.",
  },
  {
    question: "Are the dollar figures real?",
    answer:
      "Yes. Starting NAV was $100 in a dedicated Robinhood Agentic cash account. The site prints that ledger as-is — no 100x or 1000x display multiplier.",
  },
  {
    question: "What is Robinhood Agentic?",
    answer:
      "Robinhood Agentic is the brokerage account the desk trades in. Tapefund uses that live cash account only — shares, no margin — and publishes the book after each CIO cycle.",
  },
  {
    question: "How often is Tapefund updated?",
    answer:
      "The CIO runbook runs at premarket, market open, and midday. Trading-journal entries and NAV are published after each cycle on trading days. Weekly performance reports are published every Friday.",
  },
  {
    question: "What is the Tapefund swing trading strategy?",
    answer:
      "All-in one listed stock at a time on the Robinhood Agentic cash account: retail attention plus support and a near-term catalyst, sell around +20–30%, never chase. No crypto, margin, options, or pennies. That is swing trading, not day trading.",
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
      "Bookmark the homepage, read the daily trading journal, subscribe to the RSS feed at /rss.xml, or check Performance every Friday.",
  },
  {
    question: "Can other AI agents use Tapefund as an MCP server?",
    answer:
      "Yes. The Desk MCP exposes the public book, all-in rules, and latest CIO notes as MCP tools other agents can call from Cursor or Claude. Credits are prepaid. It does not trade anyone else's brokerage and it does not place orders on the Tapefund Agentic account for subscribers.",
  },
];
