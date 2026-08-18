# tapefund-mcp

MCP server for [Tapefund](https://tapefund.com) — the public Robinhood Agentic
swing-trading book, trading journal, holdings, and all-in rules. For Cursor,
Claude Desktop, and other MCP clients.

Install from npm: `npx -y tapefund-mcp` (current **0.1.0**).

MCP Registry name: `io.github.Jcjimenezglez/tapefund-mcp`.

This is **not a brokerage**. Tools are read-only. They do not place orders and
they do not expose Robinhood credentials.

## Install

Add to `.cursor/mcp.json` (Cursor) or Claude Desktop config:

```json
{
  "mcpServers": {
    "tapefund": {
      "command": "npx",
      "args": ["-y", "tapefund-mcp"],
      "env": {
        "TAPEFUND_API_URL": "https://tapefund.com"
      }
    }
  }
}
```

No API key is required for the public ledger. Optional `TAPEFUND_API_KEY` is
accepted (`X-API-Key` / `Authorization: Bearer`) for when billing ships.

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TAPEFUND_API_URL` | No | `https://tapefund.com` | Tapefund origin (REST JSON under `/api/v1/`) |
| `TAPEFUND_API_KEY` | No | — | Optional prepaid key (not enforced on public JSON yet) |

## Tools

| Tool | REST | Description |
|------|------|-------------|
| `get_book_snapshot` | `GET /api/v1/snapshot.json` | NAV, return vs $100, cash/open |
| `get_closed_trades` | `GET /api/v1/closed-trades.json` | Closed ledger rows |
| `get_holdings` | `GET /api/v1/holdings.json` | Open names |
| `get_latest_thinking` | `GET /api/v1/thinking.json` | Latest CIO markdown |
| `get_all_in_rules` | `GET /api/v1/rules.json` | All-in hard rules |
| `get_journal_day` | `GET /api/v1/journal/{date}.json` | Sessions for a date |
| `get_credit_usage` | `GET /api/v1/credit-usage.json` | Access / credit status |

Same pattern as [rosetta-mcp](https://www.npmjs.com/package/rosetta-mcp): stdio
MCP client over HTTPS REST. Tapefund’s site is a static export, so REST is
public JSON (no `/api/mcp` Streamable HTTP on tapefund.com yet).

## Publish

`tapefund-mcp` is meant to ship from GitHub Actions
(`.github/workflows/publish-tapefund-mcp.yml`).

1. Bump `version` in `package.json`, `server.json`, and `VERSION` in `src/index.ts`.
2. Merge to `main`.
3. Add an npm Automation token as repo secret `NPM_TOKEN`, **or** a trusted
   publisher: user `Jcjimenezglez`, repo `investingRobinhood`, workflow
   `publish-tapefund-mcp.yml`.
4. Run **Actions → Publish tapefund-mcp → Run workflow**.

Or from this directory after `npm login`:

```bash
npm publish
```

## Docs

- [MCP setup](https://tapefund.com/use/)
- [Public REST](https://tapefund.com/api/v1/index.json)

## License

MIT
