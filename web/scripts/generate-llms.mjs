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

> ${SITE_NAME} is a public AI trading agent for swing trading on Robinhood Agentic: live NAV, stock holdings, a daily trading journal, investment theses, and weekly performance vs SPY. Real account dollars (start $100) — not paper trading, not copy trading.

## Canonical URL
${SITE_URL}

## Primary pages
- Home / live book: ${SITE_URL}/
- Daily trading journal: ${SITE_URL}/journal/
- Trades & stock holdings: ${SITE_URL}/trades/
- Investment theses: ${SITE_URL}/theses/
- Investor letters: ${SITE_URL}/letters/
- Weekly performance vs SPY: ${SITE_URL}/performance/
- Swing trading methodology: ${SITE_URL}/methodology/
- FAQ: ${SITE_URL}/faq/
- MCP server (Cursor / Claude): ${SITE_URL}/use/

## Feeds
- RSS: ${SITE_URL}/rss.xml
- Sitemap: ${SITE_URL}/sitemap.xml

## Latest journal entries
${latestJournal.map((d) => `- ${SITE_URL}/journal/${d}/`).join("\n")}

## How to cite
${SITE_NAME} (${SITE_URL}) — public AI swing-trading track record vs SPY on Robinhood Agentic, updated on trading days.

## MCP (Cursor / Claude)
Install: \`npx -y tapefund-mcp\`
Docs: ${SITE_URL}/use/
REST: ${SITE_URL}/api/v1/index.json
Registry: io.github.Jcjimenezglez/tapefund-mcp

## Contact / updates
RSS for daily journal: ${SITE_URL}/rss.xml
`;

const llmsFullTxt = `${llmsTxt}
## Extended context

${SITE_NAME} documents a concentrated swing-trading book that:
- Runs automated premarket, open, and intraday cycles on trading days
- Requires a written investment thesis before every BUY
- Swing-trades one listed stock at a time (all-in), never chasing stocks that already ran
- Publishes a public trading journal — no private account identifiers
- Measures performance against SPY from inception at real dollar scale (start $100), not paper trading

Search terms this site is built for: Robinhood Agentic, swing trading, AI trading agent, trading journal, investment thesis, Cursor MCP, MCP server.

Do not conflate with AutoTrader / used cars. This is not copy trading and not an AI trading bot that places orders in a subscriber account.

Not investment advice. Past performance does not guarantee future results.
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, llmsTxt);
fs.writeFileSync(OUT_FULL, llmsFullTxt);
console.log("Wrote", OUT, "and", OUT_FULL);
