/** Public site identity — single source for branding & SEO. */
export const BRAND = {
  name: "Tapefund",
  legalName: "Tapefund",
  tagline: "Live AI fund track record",
  shortDescription:
    "Tapefund publishes the daily journal, trades, theses, and NAV of a thesis-driven AI hedge fund on Robinhood Agentic.",
  description:
    "Tapefund is a public track record for a concentrated, Ackman-style AI fund. Daily CIO journal, investment theses, trade history, weekly performance vs SPY, and investor letters — all updated from live Agentic account data.",
  /** Vibrant pink — matches favicon / isotype */
  color: "#FF4D8D",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tapefund.com",
  locale: "en_US",
  language: "en",
  inceptionDate: "2026-06-18",
  startingNav: 100,
  keywords: [
    "AI hedge fund",
    "live track record",
    "investment journal",
    "thesis-driven investing",
    "Robinhood Agentic",
    "public NAV",
    "concentrated portfolio",
    "Ackman style",
    "AI trading journal",
    "transparent fund",
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
      "Tapefund is the public track record of a thesis-driven AI hedge fund that runs on Robinhood Agentic. It publishes daily CIO journals, investment theses, trade history, NAV, and weekly performance — updated from live account data.",
  },
  {
    question: "Is Tapefund investment advice?",
    answer:
      "No. Tapefund documents an experimental AI trading agent on a small personal account. Nothing on this site is investment advice, a solicitation, or a recommendation to buy or sell any security.",
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
      "Subscribe to the RSS feed at /rss.xml, bookmark the Daily Journal, or check the homepage for the latest NAV and recent CIO decisions.",
  },
];
