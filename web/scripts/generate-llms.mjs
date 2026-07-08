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

> ${SITE_NAME} publishes the live track record of a thesis-driven AI hedge fund on Robinhood Agentic: daily CIO journal, NAV, trades, investment theses, weekly performance, and investor letters.

## Canonical URL
${SITE_URL}

## Primary pages
- Home / NAV overview: ${SITE_URL}/
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
${SITE_NAME} (${SITE_URL}) — public AI fund track record, updated on trading days.

## Contact / updates
Subscribe via RSS at ${SITE_URL}/rss.xml for daily journal updates.
`;

const llmsFullTxt = `${llmsTxt}
## Extended context

${SITE_NAME} is an experimental transparency project documenting an AI CIO agent that:
- Runs automated premarket, open, and intraday cycles on trading days
- Requires a written investment thesis before every BUY
- Uses concentrated Ackman-style sizing (up to 50% in one idea, 10% cash minimum)
- Publishes sanitized public logs — no private account identifiers

Strategy keywords: thesis-driven investing, concentrated portfolio, live NAV, public track record, Robinhood Agentic, AI hedge fund journal.

Not investment advice. Past performance does not guarantee future results.
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, llmsTxt);
fs.writeFileSync(OUT_FULL, llmsFullTxt);
console.log("Wrote", OUT, "and", OUT_FULL);
