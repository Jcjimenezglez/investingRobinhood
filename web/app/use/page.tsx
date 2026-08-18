import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "MCP server for Cursor and Claude",
  description:
    "Tapefund MCP: npx tapefund-mcp — MCP tools for the public Robinhood Agentic swing-trading book, trading journal, and holdings. Same install pattern as Rosetta. Not a brokerage.",
  path: "/use/",
  keywords: [
    "mcp server",
    "model context protocol",
    "cursor mcp",
    "mcp tools",
    "claude mcp",
    "npx mcp",
  ],
});

const tools = [
  ["get_book_snapshot", "GET /api/v1/snapshot.json", "NAV, cash, return vs $100."],
  ["get_closed_trades", "GET /api/v1/closed-trades.json", "Finished trades."],
  ["get_holdings", "GET /api/v1/holdings.json", "Open names, or empty if cash."],
  ["get_latest_thinking", "GET /api/v1/thinking.json", "Latest CIO journal markdown."],
  ["get_all_in_rules", "GET /api/v1/rules.json", "Hard rules the desk cannot waive."],
  ["get_journal_day", "GET /api/v1/journal/{date}.json", "One published day."],
  ["get_credit_usage", "GET /api/v1/credit-usage.json", "Access status."],
];

const npxSnippet = `{
  "mcpServers": {
    "tapefund": {
      "command": "npx",
      "args": ["-y", "tapefund-mcp"],
      "env": {
        "TAPEFUND_API_URL": "https://tapefund.com"
      }
    }
  }
}`;

export default function UsePage() {
  const restIndex = `${BRAND.url.replace(/\/$/, "")}/api/v1/index.json`;

  return (
    <>
      <section className="panel section">
        <div className="section-head">
          <div>
            <h2>MCP server for agent builders</h2>
            <p>
              Same pattern as Rosetta: an npm stdio MCP that calls HTTPS REST.
              Other agents read this Robinhood Agentic book. They cannot place
              orders and they do not get brokerage credentials.
            </p>
          </div>
        </div>
        <div className="strategy-grid">
          <article className="strategy-card">
            <h3>Install (recommended)</h3>
            <p>
              Local stdio via npm — <code>npx -y tapefund-mcp</code>. No API
              key for the public ledger. Point{" "}
              <code>TAPEFUND_API_URL</code> at this site.
            </p>
            <pre
              style={{
                margin: "14px 0 0",
                padding: 16,
                background: "var(--ink-2)",
                border: "1px solid var(--line)",
                overflow: "auto",
                fontFamily: "var(--font-plex-mono), ui-monospace, monospace",
                fontSize: 12,
                lineHeight: 1.5,
                color: "var(--paper)",
              }}
            >
              {npxSnippet}
            </pre>
          </article>
          <article className="strategy-card">
            <h3>What they do not get</h3>
            <p>Not copy trading. Not a hosted hedge fund. Not Streamable HTTP on this static site.</p>
            <ul>
              <li>No order placement on Tapefund&apos;s Agentic account.</li>
              <li>No credentials or account IDs.</li>
              <li>
                Remote <code>/api/mcp</code> (Rosetta-style Streamable HTTP)
                is not on tapefund.com while the site stays a static export.
                Use npx stdio.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel section">
        <div className="section-head">
          <div>
            <h2>MCP tools</h2>
            <p>
              Each tool is a GET on the public JSON API ({" "}
              <a href={restIndex}>{restIndex}</a>).
            </p>
          </div>
        </div>
        <ul>
          {tools.map(([name, rest, blurb]) => (
            <li key={name}>
              <strong>{name}</strong> — {blurb}{" "}
              <span className="muted">{rest}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
