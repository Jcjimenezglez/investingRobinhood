import fs from "fs";
import path from "path";
import type {
  ContentItem,
  DeskThinking,
  FundSnapshot,
  ImprovementItem,
  JournalDay,
  JournalSession,
  NavPoint,
  Position,
  TradeReason,
} from "./types";
import { sanitizeForPublic } from "./sanitize";

const REPO_ROOT = path.join(process.cwd(), "..");
const LOGS_ROOT = path.join(REPO_ROOT, "logs");

import { BRAND } from "./site-config";

/** @deprecated Prefer BRAND from site-config for new code */
export const SITE = {
  name: BRAND.name,
  tagline: BRAND.tagline,
  description: BRAND.shortDescription,
  url: BRAND.url,
};

export function sanitizeMarkdown(content: string): string {
  return sanitizeForPublic(content);
}

function readDirSafe(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir);
}

function readFileSafe(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

function parseIntelligenceFilename(filename: string): {
  date: string;
  time: string;
  sessionType: string;
} | null {
  const match = filename.match(
    /^(\d{4}-\d{2}-\d{2})-(\d{4})-(.+)\.md$/,
  );
  if (!match) return null;
  const [, date, time, sessionType] = match;
  return { date, time, sessionType };
}

function extractTitle(content: string): string {
  const line = content.split("\n").find((l) => l.startsWith("# "));
  return line ? line.replace(/^#\s+/, "").trim() : "Session";
}

function extractNav(content: string): number | null {
  const patterns = [
    /NAV total\*\*\s*\|\s*\*\*\$([\d.]+)/i,
    /AUM ~?\$([\d.]+)/i,
    /Current NAV\*\*\s*\|\s*\*\*\$([\d.]+)/i,
    /NAV\*\*\s*\|\s*\*\*\$([\d.]+)/i,
  ];
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) return parseFloat(match[1]);
  }
  return null;
}

function extractDecision(content: string): string | null {
  const holdMatch = content.match(/Decisión[^—]*—\s*\*\*([A-Z]+)\*\*/i);
  if (holdMatch) return holdMatch[1];
  const actionMatch = content.match(/\*\*([A-Z]+)\*\*\s*—/);
  return actionMatch?.[1] ?? null;
}

export function getPositions(): Position[] {
  const raw = readFileSafe(path.join(LOGS_ROOT, "scorecard", "positions.jsonl"));
  if (!raw) return [];
  return raw
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as Position);
}

export function getJournalDays(): JournalDay[] {
  const intelDir = path.join(LOGS_ROOT, "intelligence");
  const files = readDirSafe(intelDir).filter((f) => f.endsWith(".md"));

  const byDate = new Map<string, JournalSession[]>();

  for (const file of files) {
    const parsed = parseIntelligenceFilename(file);
    if (!parsed) continue;

    const content = readFileSafe(path.join(intelDir, file));
    if (!content) continue;

    const session: JournalSession = {
      slug: file.replace(/\.md$/, ""),
      title: extractTitle(content),
      sessionType: parsed.sessionType,
      time: parsed.time,
      content: sanitizeMarkdown(content),
    };

    const existing = byDate.get(parsed.date) ?? [];
    existing.push(session);
    byDate.set(parsed.date, existing);
  }

  return Array.from(byDate.entries())
    .map(([date, sessions]) => {
      sessions.sort((a, b) => a.time.localeCompare(b.time));
      const primary =
        sessions.find((s) => s.sessionType === "0935-open") ??
        sessions[sessions.length - 1];
      return {
        date,
        sessions,
        nav: extractNav(primary.content),
        decision: extractDecision(primary.content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getJournalDay(date: string): JournalDay | null {
  return getJournalDays().find((d) => d.date === date) ?? null;
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function extractDateFromSlug(slug: string): string {
  const match = slug.match(/(\d{4}-\d{2}-\d{2})/);
  return match?.[1] ?? slug;
}

export function getLetters(): ContentItem[] {
  const dir = path.join(LOGS_ROOT, "investor-letters");
  return readDirSafe(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("calibration"))
    .map((file) => {
      const content = readFileSafe(path.join(dir, file)) ?? "";
      const slug = slugFromFilename(file);
      return {
        slug,
        title: extractTitle(content),
        date: extractDateFromSlug(slug),
        content: sanitizeMarkdown(content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getLetter(slug: string): ContentItem | null {
  return getLetters().find((l) => l.slug === slug) ?? null;
}

export function getTheses(): ContentItem[] {
  const dir = path.join(LOGS_ROOT, "theses");
  return readDirSafe(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const content = readFileSafe(path.join(dir, file)) ?? "";
      const slug = slugFromFilename(file);
      return {
        slug,
        title: extractTitle(content),
        date: extractDateFromSlug(slug),
        content: sanitizeMarkdown(content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getThesis(slug: string): ContentItem | null {
  return getTheses().find((t) => t.slug === slug) ?? null;
}

export function getWeeklyReports(): ContentItem[] {
  const dir = path.join(LOGS_ROOT, "scorecard", "weekly");
  return readDirSafe(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const content = readFileSafe(path.join(dir, file)) ?? "";
      const slug = slugFromFilename(file);
      return {
        slug,
        title: extractTitle(content),
        date: extractDateFromSlug(slug),
        content: sanitizeMarkdown(content),
      };
    })
    .sort((a, b) => b.slug.localeCompare(a.slug));
}

export function getWeeklyReport(slug: string): ContentItem | null {
  return getWeeklyReports().find((w) => w.slug === slug) ?? null;
}

function parseBenchmarkFromWeekly(): {
  spyReturnPct: number | null;
  alphaPct: number | null;
  asOf: string | null;
} {
  const latest = getWeeklyReports()[0];
  if (!latest) {
    return { spyReturnPct: null, alphaPct: null, asOf: null };
  }
  const spy = latest.content.match(
    /SPY same period[^\n|]*\|\s*\*\*([+\-]?\d[\d.]*)%/i,
  );
  const alpha = latest.content.match(
    /Alpha vs SPY[^\n|]*\|\s*\*\*([+\-]?\d[\d.]*)%/i,
  );
  return {
    spyReturnPct: spy ? parseFloat(spy[1]) : null,
    alphaPct: alpha ? parseFloat(alpha[1]) : null,
    asOf: latest.slug,
  };
}

export function getFundSnapshot(): FundSnapshot {
  const days = getJournalDays();
  const latest = days[0];
  const allPositions = getPositions();
  const positions = allPositions.filter((p) => p.status === "open");
  const closed = allPositions.filter((p) => p.status === "closed");
  const start = BRAND.startingNav;
  const realizedPnlUsd = closed.reduce(
    (sum, p) => sum + p.size_usd * ((p.return_pct ?? 0) / 100),
    0,
  );
  const deployedUsd = positions.reduce((sum, p) => sum + p.size_usd, 0);
  const wins = closed.filter((p) => (p.return_pct ?? 0) > 0).length;
  const firstTradeAt =
    allPositions.map((p) => p.entry_date).sort()[0] ?? BRAND.inceptionDate;

  const nav = latest?.nav ?? start;
  const returnPct = ((nav - start) / start) * 100;
  const bench = parseBenchmarkFromWeekly();

  const latestContent =
    latest?.sessions[latest.sessions.length - 1]?.content ??
    latest?.sessions[0]?.content ??
    "";
  const cashMatch = latestContent.match(
    /Cash(?: \(marked\))?\*\*\s*\|\s*\*\*\$([\d.]+)/i,
  );
  const cashPctMatch = latestContent.match(
    /Cash(?: \(marked\))?\*\*[^|]*\|[^|]*\(([\d.]+)%\)/i,
  );

  return {
    nav,
    returnPct,
    pnlUsd: nav - start,
    cash: cashMatch ? parseFloat(cashMatch[1]) : nav,
    cashPct: cashPctMatch
      ? parseFloat(cashPctMatch[1])
      : positions.length === 0
        ? 100
        : 0,
    positions: positions.length,
    lastUpdated: latest?.date ?? BRAND.inceptionDate,
    spyReturnPct: bench.spyReturnPct,
    alphaPct: bench.alphaPct,
    benchmarkAsOf: bench.asOf,
    realizedPnlUsd,
    openPnlUsd: nav - start - realizedPnlUsd,
    deployedUsd,
    closedCount: closed.length,
    winRatePct: closed.length ? (wins / closed.length) * 100 : null,
    firstTradeAt,
  };
}

function stripMd(s: string): string {
  return s.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

export function getLatestThinking(): DeskThinking | null {
  const day = getJournalDays()[0];
  if (!day) return null;
  const session = day.sessions[day.sessions.length - 1] ?? day.sessions[0];
  if (!session) return null;
  const content = session.content;

  const accion = content.match(/\*\*ACCIÓN:\*\*\s*\*\*([^*]+)\*\*/i);
  const razon = content.match(/\*\*Razón:\*\*\s*(.+)/i);
  const hawk = content.match(/\*\*Hawk-watch:\*\*\s*(.+)/i);
  const nextItems = [...content.matchAll(/^\d+\.\s+(.+)$/gm)].map((m) =>
    stripMd(m[1]),
  );

  const stance = accion ? stripMd(accion[1]) : (day.decision ?? "HOLD");
  const thinking = stripMd(razon?.[1] ?? hawk?.[1] ?? "");

  return {
    date: day.date,
    asOf: `${day.date} ${session.time}`,
    sessionType: session.sessionType,
    stance,
    headline: stripMd(session.title),
    thinking:
      thinking ||
      "See the latest journal for the full session.",
    waitingFor: nextItems.slice(0, 6),
    note: "Published from the Agentic CIO runbook. Not a 15-minute live tick — updated each scheduled session.",
  };
}

export function getClosedPositions(): Position[] {
  return getPositions()
    .filter((p) => p.status === "closed")
    .slice()
    .sort((a, b) => (b.exit_date ?? "").localeCompare(a.exit_date ?? ""));
}

export function getOpenPositions(): Position[] {
  return getPositions().filter((p) => p.status === "open");
}

export function getTradeReasons(): TradeReason[] {
  return getClosedPositions().map((p) => {
    const pnl = p.size_usd * ((p.return_pct ?? 0) / 100);
    const proceeds = p.size_usd + pnl;
    const notes = stripMd(p.notes ?? "").replace(/order \[redacted\]/gi, "").trim();
    return {
      ticker: p.ticker,
      title: `${p.ticker} ${p.exit_reason ? "exit" : "trade"}`,
      side: "SELL",
      date: p.exit_date ?? p.entry_date,
      amountUsd: proceeds,
      simple:
        notes ||
        `Closed ${p.ticker} after ${p.entry_date}. Return ${p.return_pct ?? 0}%.`,
      technical: [
        p.exit_reason ? `Exit reason: ${p.exit_reason}` : "",
        `Entry ${p.entry_date} at $${p.entry_price.toFixed(2)} · size $${p.size_usd.toFixed(2)}`,
        p.return_pct != null ? `Realized ${p.return_pct >= 0 ? "+" : ""}${p.return_pct.toFixed(2)}% (${pnl >= 0 ? "+" : ""}$${Math.abs(pnl).toFixed(2)})` : "",
      ].filter(Boolean),
      risk: p.stop_backup
        ? `Backup stop was $${p.stop_backup.toFixed(2)} (not used — Xu book does not place GTC stops).`
        : "No GTC stop. Exit is target, dead setup, or flatten.",
    };
  });
}

export function getImprovements(): ImprovementItem[] {
  return getLetters().map((letter) => {
    const whyMatch = letter.content.match(
      /(?:Why it matters|## What changed)\s*\n+([\s\S]{0,400})/i,
    );
    const summary = letter.content
      .split("\n")
      .map((l) => l.trim())
      .find((l) => l.length > 40 && !l.startsWith("#") && !l.startsWith("*") && !l.startsWith("|"))
      ?? letter.title;
    return {
      date: letter.date,
      status: "live",
      title: letter.title,
      summary: stripMd(summary).slice(0, 280),
      why: stripMd(whyMatch?.[1] ?? "").split("\n")[0] ?? "",
      slug: letter.slug,
    };
  });
}

export function getNavSeries(): NavPoint[] {
  const days = getJournalDays().slice().reverse();
  const points: NavPoint[] = [
    { date: BRAND.inceptionDate, nav: BRAND.startingNav },
  ];

  for (const day of days) {
    if (day.nav !== null) {
      points.push({ date: day.date, nav: day.nav });
    }
  }

  const deduped = new Map<string, number>();
  for (const p of points) deduped.set(p.date, p.nav);
  return Array.from(deduped.entries())
    .map(([date, nav]) => ({ date, nav }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getTickers(): string[] {
  const fromPositions = getPositions().map((p) => p.ticker);
  const mandatePath = path.join(REPO_ROOT, "config", "fund-mandate.json");
  let universe: string[] = [];
  try {
    const mandate = JSON.parse(fs.readFileSync(mandatePath, "utf-8"));
    universe = mandate.researchUniverse ?? [];
  } catch {
    /* ignore */
  }
  return [...new Set([...fromPositions, ...universe])].sort();
}

export function getTickerHistory(ticker: string): {
  position: Position | null;
  journalMentions: { date: string; session: string; excerpt: string }[];
  theses: ContentItem[];
} {
  const upper = ticker.toUpperCase();
  const position =
    getPositions().find((p) => p.ticker === upper) ?? null;
  const theses = getTheses().filter(
    (t) =>
      t.slug.toUpperCase().includes(upper) ||
      t.content.toUpperCase().includes(`# ${upper}`),
  );

  const journalMentions: { date: string; session: string; excerpt: string }[] =
    [];
  for (const day of getJournalDays()) {
    for (const session of day.sessions) {
      if (session.content.includes(upper)) {
        const lines = session.content.split("\n");
        const idx = lines.findIndex((l) => l.includes(upper));
        const excerpt = lines.slice(Math.max(0, idx - 1), idx + 3).join("\n");
        journalMentions.push({
          date: day.date,
          session: session.sessionType,
          excerpt,
        });
      }
    }
  }

  return { position, journalMentions: journalMentions.slice(0, 10), theses };
}
