import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { assertPublicSafe, sanitizeForPublic } from "../lib/sanitize";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(__dirname, "..", "public", "api", "v1");
const START = 100;

type Position = {
  ticker: string;
  status: string;
  size_usd: number;
  entry_price: number;
  entry_date: string;
  conviction?: string;
  return_pct?: number;
  exit_date?: string;
  exit_reason?: string;
  notes?: string;
};

function read(rel: string): string {
  const p = path.join(REPO_ROOT, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

function writeJson(rel: string, data: unknown) {
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  const body = `${JSON.stringify(data, null, 2)}\n`;
  assertPublicSafe(body, rel);
  fs.writeFileSync(full, body);
}

function jsonl(rel: string): Position[] {
  return read(rel)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l) as Position);
}

function navFrom(md: string): number | null {
  const m = md.match(/NAV total\*\*\s*\|\s*\*\*\$([\d.]+)/i);
  return m ? Number(m[1]) : null;
}

function allInRules() {
  return {
    strategy: "All-in one listed stock",
    style: "swing trading",
    account: "Robinhood Agentic cash",
    rules: [
      "One equity at a time. Flatten before a new name.",
      "Cash only. No margin, options, crypto, or pennies.",
      "Retail attention plus support plus a near-term catalyst.",
      "Never chase a name that already ran.",
      "Sell around +20–30% or when the rumor is fully news.",
      "No GTC stop-loss. Watch and exit when the setup dies.",
      "Memes are allowed if early.",
    ],
  };
}

const intelDir = path.join(REPO_ROOT, "logs", "intelligence");
const intelFiles = fs.existsSync(intelDir)
  ? fs.readdirSync(intelDir).filter((f) => f.endsWith(".md")).sort()
  : [];

const last = intelFiles[intelFiles.length - 1];
const latestMd = last
  ? read(path.join("logs", "intelligence", last))
  : "";
const nav = latestMd ? navFrom(latestMd) : START;

const positions = jsonl("logs/scorecard/positions.jsonl");
const open = positions.filter((p) => p.status === "open");
const closed = positions.filter((p) => p.status === "closed");

const byDate = new Map<string, { file: string; content: string }[]>();
for (const file of intelFiles) {
  const date = file.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
  if (!date) continue;
  const content = sanitizeForPublic(
    read(path.join("logs", "intelligence", file)),
  );
  const list = byDate.get(date) ?? [];
  list.push({ file, content });
  byDate.set(date, list);
}

fs.rmSync(path.join(OUT, "journal"), { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

writeJson("snapshot.json", {
  nav,
  startingNav: START,
  returnPct: nav == null ? null : ((nav - START) / START) * 100,
  pnlUsd: nav == null ? null : nav - START,
  openNames: open.length,
  closedTrades: closed.length,
  cash: open.length === 0,
  asOf: last ?? null,
});

writeJson(
  "closed-trades.json",
  closed.map((p) => ({
    ticker: p.ticker,
    entry_date: p.entry_date,
    exit_date: p.exit_date,
    size_usd: p.size_usd,
    entry_price: p.entry_price,
    return_pct: p.return_pct,
    exit_reason: p.exit_reason,
    notes: sanitizeForPublic(p.notes ?? ""),
  })),
);

writeJson(
  "holdings.json",
  open.map((p) => ({
    ticker: p.ticker,
    size_usd: p.size_usd,
    entry_price: p.entry_price,
    entry_date: p.entry_date,
    conviction: p.conviction,
    return_pct: p.return_pct,
  })),
);

writeJson(
  "thinking.json",
  last
    ? { file: last, content: sanitizeForPublic(latestMd) }
    : null,
);

writeJson("rules.json", allInRules());

writeJson("credit-usage.json", {
  public: true,
  creditsRemaining: null,
  note: "Public ledger. No key required. Prepaid credits are not billed yet.",
});

const dates = [...byDate.keys()].sort().reverse();
writeJson("journal/index.json", { dates });

for (const [date, sessions] of byDate) {
  writeJson(`journal/${date}.json`, { date, sessions });
}

writeJson("index.json", {
  name: "Tapefund Desk API",
  version: "v1",
  mcp: "npx -y tapefund-mcp",
  tools: {
    get_book_snapshot: "/api/v1/snapshot.json",
    get_closed_trades: "/api/v1/closed-trades.json",
    get_holdings: "/api/v1/holdings.json",
    get_latest_thinking: "/api/v1/thinking.json",
    get_all_in_rules: "/api/v1/rules.json",
    get_journal_day: "/api/v1/journal/{YYYY-MM-DD}.json",
    get_credit_usage: "/api/v1/credit-usage.json",
  },
});

console.log(
  `Wrote desk API ${dates.length} journal days → ${path.relative(REPO_ROOT, OUT)}`,
);
