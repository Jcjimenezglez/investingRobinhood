import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Desk MCP",
  description:
    "Prepaid credits so other AI agents can call the Tapefund public desk as an MCP — book, filter, and CIO notes. Not a brokerage.",
  path: "/use/",
});

const packs = [
  {
    name: "Scout",
    price: "$9",
    credits: "500 calls",
    note: "Enough to wire a client and pull the book for a week.",
  },
  {
    name: "Desk",
    price: "$29",
    credits: "2,500 calls",
    note: "Daily CIO cycles in another agent. Default pack.",
  },
  {
    name: "Fund",
    price: "$99",
    credits: "12,000 calls",
    note: "Always-on scanners and research desks.",
  },
];

const tools = [
  ["get_book_snapshot", "NAV, cash, return vs SPY, open count — real Agentic dollars."],
  ["get_closed_trades", "Finished trades with size, return, and exit reason."],
  ["get_holdings", "What is still open. Empty when the book is cash."],
  ["get_latest_thinking", "Latest CIO stance in plain English."],
  ["get_all_in_rules", "Hard rules the desk cannot waive."],
  ["get_journal_day", "One published session by date."],
];

export default function UsePage() {
  const mcpUrl = `${BRAND.url.replace(/\/$/, "")}/use/`;
  const cursorSnippet = `{
  "mcpServers": {
    "tapefund-desk": {
      "command": "node",
      "args": ["mcp/server.mjs"],
      "env": {
        "TAPEFUND_API_KEY": "tf_live_..."
      }
    }
  }
}`;

  return (
    <>
      <section className="panel section">
        <div className="section-head">
          <div>
            <h2>Sell the desk to other agents</h2>
            <p>
              Other AIs can subscribe to this book as an MCP. They pay in
              prepaid credits. They do not get your Robinhood login, and they
              cannot place orders on the Agentic account.
            </p>
          </div>
        </div>
        <div className="strategy-grid">
          <article className="strategy-card">
            <h3>What they buy</h3>
            <p>
              Structured tools: live NAV, closed trades, holdings, the all-in
              rules, and the latest CIO note. Same public ledger as this site,
              machine-readable.
            </p>
            <ul>
              {tools.map(([name, blurb]) => (
                <li key={name}>
                  <strong>{name}</strong> — {blurb}
                </li>
              ))}
            </ul>
          </article>
          <article className="strategy-card">
            <h3>What they do not buy</h3>
            <p>This is not a copy-trading API and not a hosted hedge fund.</p>
            <ul>
              <li>No order placement on Tapefund&apos;s Agentic account.</li>
              <li>No credentials, account IDs, or raw MCP dumps.</li>
              <li>No advice. Past marks are not a promise.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel section">
        <div className="section-head">
          <div>
            <h2>Credits</h2>
            <p>
              One successful tool call = one credit. Failed auth does not
              deduct. Stripe checkout comes next — packs below are the price
              list.
            </p>
          </div>
        </div>
        <div className="grid">
          {packs.map((p) => (
            <div className="tile" key={p.name}>
              <div className="k">{p.name}</div>
              <div className="v">{p.price}</div>
              <div className="s">
                {p.credits}. {p.note}
              </div>
            </div>
          ))}
        </div>
        <p className="muted" style={{ marginTop: 16 }}>
          To take live payments: create three Stripe Payment Links (or a
          metered product) and set <code>STRIPE_CREDITS_PAYMENT_LINK</code>.
          Checkout emails an API key. The MCP server in{" "}
          <code>mcp/server.mjs</code> deducts credits per call.
        </p>
      </section>

      <section className="panel section">
        <div className="section-head">
          <div>
            <h2>Wire it into Cursor / Claude</h2>
            <p>
              Run the server from this repo. Point another agent at it with a
              key. Docs live at {mcpUrl}
            </p>
          </div>
        </div>
        <pre
          style={{
            margin: 0,
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
          {cursorSnippet}
        </pre>
        <p className="muted" style={{ marginTop: 14 }}>
          Local: <code>node mcp/server.mjs</code> (stdio). HTTP:{" "}
          <code>node mcp/server.mjs --http --port 8787</code> then URL{" "}
          <code>http://127.0.0.1:8787/mcp</code>.
        </p>
      </section>
    </>
  );
}
