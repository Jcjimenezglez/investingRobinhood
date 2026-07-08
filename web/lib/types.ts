export interface Position {
  ticker: string;
  entry_date: string;
  entry_price: number;
  size_usd: number;
  conviction: string;
  thesis_path: string;
  catalyst_date: string | null;
  fair_value_low: number | null;
  fair_value_high: number | null;
  status: "open" | "closed";
  stop_backup: number | null;
  exit_date: string | null;
  exit_reason: string | null;
  return_pct: number | null;
  notes: string | null;
}

export interface JournalDay {
  date: string;
  sessions: JournalSession[];
  nav: number | null;
  decision: string | null;
}

export interface JournalSession {
  slug: string;
  title: string;
  sessionType: string;
  time: string;
  content: string;
}

export interface ContentItem {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export interface FundSnapshot {
  nav: number;
  returnPct: number;
  cash: number;
  cashPct: number;
  positions: number;
  lastUpdated: string;
}

export interface NavPoint {
  date: string;
  nav: number;
}
