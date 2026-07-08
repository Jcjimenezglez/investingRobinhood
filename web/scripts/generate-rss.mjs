import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..", "..");
const INTEL_DIR = path.join(REPO_ROOT, "logs", "intelligence");
const OUT = path.join(__dirname, "..", "public", "rss.xml");
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tapefund.com";
const SITE_NAME = "Tapefund";

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const files = fs.readdirSync(INTEL_DIR).filter((f) => f.endsWith(".md"));
const dates = [
  ...new Set(
    files
      .map((f) => f.match(/^(\d{4}-\d{2}-\d{2})/)?.[1])
      .filter(Boolean),
  ),
].sort((a, b) => b.localeCompare(a));

const items = dates.slice(0, 30).map((date) => {
  const link = `${SITE_URL}/journal/${date}/`;
  return `
    <item>
      <title>${escapeXml(`Journal ${date}`)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description>${escapeXml(`CIO cycle for ${date}.`)}</description>
    </item>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Daily journal</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml("Daily CIO journal from Tapefund — a thesis-driven AI fund track record.")}</description>
    <language>en-us</language>${items.join("")}
  </channel>
</rss>`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, xml);
console.log("Wrote", OUT);
