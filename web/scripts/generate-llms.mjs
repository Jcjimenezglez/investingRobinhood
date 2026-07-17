import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..", "..");
const INTEL_DIR = path.join(REPO_ROOT, "logs", "intelligence");
const OUT = path.join(__dirname, "..", "public", "llms.txt");
const OUT_FULL = path.join(__dirname, "..", "public", "llms-full.txt");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tapefund.com";
const SITE_NAME = "Tapefund";

const files = fs.existsSync(INTEL_DIR)
  ? fs.readdirSync(INTEL_DIR).filter((f) => f.endsWith(".md"))
  : [];

const journalDates = [
  ...new Set(
    files
      .map((f) => f.match(/^(\d{4}-\d{2}-\d{2})/)?.[1])
      .filter(Boolean),
  ),
].sort((a, b) => b.localeCompare(a));

const latestJournal = journalDates.slice(0, 5);

const llmsTxt = `# ${SITE_NAME}

> ${SITE_NAME} is a stock newsletter project with a live public track record vs the S&P 500: NAV, daily CIO journal, trades, investment theses, and weekly performance. Newsletter waitlist at /newsletter/ (email capture opening soon).

## Canonical URL
${SITE_URL}

## Primary pages
- Home / NAV overview: ${SITE_URL}/
- Stock newsletter waitlist: ${SITE_URL}/newsletter/
- Daily journal (CIO cycles): ${SITE_URL}/journal/
- Trades & positions: ${SITE_URL}/trades/
- Investment theses: ${SITE_URL}/theses/
- Investor letters: ${SITE_URL}/letters/
- Weekly performance: ${SITE_URL}/performance/
- Methodology: ${SITE_URL}/methodology/
- FAQ: ${SITE_URL}/faq/

## Feeds
- RSS: ${SITE_URL}/rss.xml
- Sitemap: ${SITE_URL}/sitemap.xml

## Latest journal entries
${latestJournal.map((d) => `- ${SITE_URL}/journal/${d}/`).join("\n")}

## How to cite
${SITE_NAME} (${SITE_URL}) — public stock-picking track record vs SPY, updated on trading days.

## Contact / updates
Newsletter waitlist: ${SITE_URL}/newsletter/
RSS for daily journal: ${SITE_URL}/rss.xml
`;

const llmsFullTxt = `${llmsTxt}
## Extended context

${SITE_NAME} documents a concentrated stock-picking book that:
- Runs automated premarket, open, and intraday cycles on trading days
- Requires a written investment thesis before every BUY
- Uses concentrated Ackman-style sizing (up to 50% in one idea, 10% cash minimum)
- Publishes sanitized public logs — no private account identifiers
- Measures performance against SPY from inception (${SITE_NAME} stock newsletter + live scoreboard)

Strategy keywords: stock newsletter, stock picks, stock recommendations, stock advisor, live track record, vs S&P 500, investment thesis, concentrated portfolio.

Not investment advice. Past performance does not guarantee future results.
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, llmsTxt);
fs.writeFileSync(OUT_FULL, llmsFullTxt);
console.log("Wrote", OUT, "and", OUT_FULL);
