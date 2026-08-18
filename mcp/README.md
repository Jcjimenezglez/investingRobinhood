# Tapefund Desk MCP

Prepaid tools for **other AI agents**. Not a brokerage. Not copy-trading.

## Tools

| Tool | Cost | What it returns |
|------|------|-----------------|
| `get_book_snapshot` | 1 credit | NAV, return vs $100, cash/open |
| `get_closed_trades` | 1 | Closed ledger rows |
| `get_holdings` | 1 | Open names |
| `get_latest_thinking` | 1 | Latest CIO markdown |
| `get_xu_filter` | 1 | Kevin Xu hard rules |
| `get_journal_day` | 1 | Sessions for a date |

## Run

```bash
# stdio (Cursor / Claude Desktop)
TAPEFUND_API_KEY=tf_live_... TAPEFUND_CREDITS=2500 node mcp/server.mjs

# HTTP
node mcp/server.mjs --http --port 8787
```

## Money

Price list is on `/use/`. Wire Stripe Payment Links, email a key, set `TAPEFUND_CREDITS` (or a real ledger later). Failed auth does not deduct.
