import type { MetadataRoute } from "next";
import {
  getJournalDays,
  getLetters,
  getTheses,
  getTickers,
  getWeeklyReports,
  SITE,
} from "@/lib/content";

export const dynamic = "force-static";

function safeDate(input: string): Date {
  const match = input.match(/(\d{4}-\d{2}-\d{2})/);
  if (match) {
    const d = new Date(match[1]);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticPages = [
    "",
    "/journal/",
    "/trades/",
    "/theses/",
    "/letters/",
    "/performance/",
    "/methodology/",
    "/faq/",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const journal = getJournalDays().map((d) => ({
    url: `${base}/journal/${d.date}/`,
    lastModified: safeDate(d.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const tickers = getTickers().map((t) => ({
    url: `${base}/trades/${t.toLowerCase()}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const theses = getTheses().map((t) => ({
    url: `${base}/theses/${t.slug}/`,
    lastModified: safeDate(t.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const letters = getLetters().map((l) => ({
    url: `${base}/letters/${l.slug}/`,
    lastModified: safeDate(l.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const weekly = getWeeklyReports().map((w) => ({
    url: `${base}/performance/${w.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...journal,
    ...tickers,
    ...theses,
    ...letters,
    ...weekly,
  ];
}
