import fs from "fs";
import path from "path";
import type {
  ContentItem,
  FundSnapshot,
  JournalDay,
  JournalSession,
  NavPoint,
  Position,
} from "./types";
import { sanitizeForPublic } from "./sanitize";

const REPO_ROOT = path.join(process.cwd(), "..");
const LOGS_ROOT = path.join(REPO_ROOT, "logs");

export const SITE = {
  name: "investingRobinhood",
  tagline: "Ackman-style AI fund — live track record",
  description:
    "Daily journal, trades, and investment theses from a $100 thesis-driven AI hedge fund operating on Robinhood Agentic.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://investingrobinhood.com",
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

export function getFundSnapshot(): FundSnapshot {
  const days = getJournalDays();
  const latest = days[0];
  const positions = getPositions().filter((p) => p.status === "open");

  const nav = latest?.nav ?? 100;
  const returnPct = ((nav - 100) / 100) * 100;

  const cashMatch = latest?.sessions[0]?.content.match(
    /Cash\*\*\s*\|\s*\*\*\$([\d.]+)/,
  );
  const cashPctMatch = latest?.sessions[0]?.content.match(
    /Cash\*\*[^|]*\|[^|]*\(([\d.]+)%\)/,
  );

  return {
    nav,
    returnPct,
    cash: cashMatch ? parseFloat(cashMatch[1]) : 25,
    cashPct: cashPctMatch ? parseFloat(cashPctMatch[1]) : 25,
    positions: positions.length,
    lastUpdated: latest?.date ?? "2026-06-18",
  };
}

export function getNavSeries(): NavPoint[] {
  const days = getJournalDays().slice().reverse();
  const points: NavPoint[] = [{ date: "2026-06-18", nav: 100 }];

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
