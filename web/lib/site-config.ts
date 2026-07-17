/** Public site identity — single source for branding & SEO. */
export const BRAND = {
  name: "Tapefund",
  legalName: "Tapefund",
  tagline: "Stock newsletter with a live track record",
  shortDescription:
    "Tapefund is a stock newsletter backed by a live public track record vs the S&P 500 — NAV, journal, and theses updated from a concentrated CIO book.",
  description:
    "Tapefund publishes a live stock-picking track record and a Stock Advisor–style newsletter. Performance is measured against the S&P 500 (SPY) since inception. The public site shows NAV, positions, and CIO notes; the newsletter waitlist is for full theses and weekly stock recommendations.",
  /** Vibrant pink — matches favicon / isotype */
  color: "#FF4D8D",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tapefund.com",
  locale: "en_US",
  language: "en",
  inceptionDate: "2026-06-18",
  /** Real account starting NAV (source of truth in logs). */
  startingNav: 100,
  /**
   * Public UI multiplies ledger USD (NAV, size, cash) by this factor.
   * Share prices and percentages are never scaled.
   * Example: $100 book → $10,000 notional; $45 AMZN → $4,500.
   */
  displayUsdScale: 100,
  keywords: [
    "stock newsletter",
    "stock picks",
    "stock recommendations",
    "stock advisor",
    "stock picking service",
    "live track record",
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
      "Tapefund is a stock newsletter project backed by a live public track record. It publishes NAV, daily CIO journals, investment theses, trade history, and weekly performance vs the S&P 500 (SPY) from a concentrated book run on Robinhood Agentic.",
  },
  {
    question: "What is the Tapefund newsletter?",
    answer:
      "A Stock Advisor–style email for full investment theses and weekly stock recommendations. The public site is the free scoreboard (NAV, book, vs SPY). Join the waitlist on /newsletter/ — email capture opens soon.",
  },
  {
    question: "What is free vs what is for the waitlist?",
    answer:
      "Free on the site: live NAV, return since inception, open tickers, journal summaries, and performance vs SPY. Coming via the newsletter: deeper theses, sizing rationale, and weekly picks commentary.",
  },
  {
    question: "Why do dollar amounts look like a $10,000 book?",
    answer:
      "Public pages show ledger dollars (NAV, position size, cash) scaled 100× for a $10,000 notional presentation. Share prices and all percentages (returns, cash %, conviction sizing) are the real figures from the live account. The underlying account started at $100.",
  },
  {
    question: "Is Tapefund investment advice?",
    answer:
      "No. Tapefund documents an experimental AI trading agent on a small personal account. Nothing on this site is investment advice, a solicitation, or a recommendation to buy or sell any security. Past performance does not guarantee future results.",
  },
  {
    question: "How does Tapefund compare to the S&P 500?",
    answer:
      "Fund return is measured against SPY from the same inception date (2026-06-18). Weekly performance reports publish fund return, SPY return for the period, and alpha. See the Performance page for the latest scorecard.",
  },
  {
    question: "Is Tapefund the same as Motley Fool Stock Advisor?",
    answer:
      "No. Motley Fool Stock Advisor is a large paid stock-picking service. Tapefund is a small, transparent live track record plus an upcoming newsletter — same category (stock picks with performance vs the market), different product and scale.",
  },
  {
    question: "How often is Tapefund updated?",
    answer:
      "The CIO runbook runs at premarket, market open, and intraday. Journal entries and NAV are published after each cycle on trading days. Weekly performance reports are published every Friday.",
  },
  {
    question: "What is the Tapefund investment strategy?",
    answer:
      "Tapefund follows a concentrated, Ackman-style approach: written thesis before every buy, up to 50% in one conviction idea, cash floor of 10%, and exits when the thesis breaks or fair value is reached — not on a calendar.",
  },
  {
    question: "What stocks does Tapefund trade?",
    answer:
      "The research universe includes large-cap names such as GOOGL, AMZN, META, AAPL, MSFT, NVDA, HOOD, UBER, QSR, and BN. Positions change based on thesis conviction; see the Trades and Theses pages for current exposure.",
  },
  {
    question: "How can I follow Tapefund updates?",
    answer:
      "Join the newsletter waitlist at /newsletter/, subscribe to the RSS feed at /rss.xml, bookmark the Daily Journal, or check the homepage for the latest NAV and recent CIO decisions.",
  },
];
