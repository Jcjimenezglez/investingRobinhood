# Stock Broker Agent

Agente modular para trading vía Robinhood MCP. System prompt en `prompt/sections/`.

**Mandato vigente (prompt v2.2.3):** dual-gate — calidad **Ackman/Pershing** + timing **Xu**. All-in **una** listed stock. Live: **AVGO**. Revisión **19-sep-2026** vs ritmo MSFT (~15%/mes). Si no sale: Ackman all-in **un** nombre (nunca 2+). Sin GTC stop. Hold through Q permitido.

## Libro y capas

| Capa | Archivo | Rol |
|------|---------|-----|
| Calidad | `config/ackman-quality-screen.json` · `prompt/sections/12-ackman-quality-screen.md` | ≥4/6 para all-in. 13F no es BUY |
| Timing | `config/kevin-xu-playbook.json` | Un nombre, no chase, soporte + catalizador |
| Números | `config/risk-policy.json` | ~92% all-in, 8% cash, +20–30% exit |
| Reloj AVGO | `config/fund-mandate.json` → `fallbackIfDualGateFails` | Review 2026-09-19 |

## Estructura del prompt

```
prompt/
├── manifest.json
├── README.md
└── sections/
config/risk-policy.json
config/fund-mandate.json
config/kevin-xu-playbook.json
config/ackman-quality-screen.json
```

## Comandos

`go` · `prep` · `snapshot` · `scan` · `analiza TICKER` · `trade TICKER $XX` · `pnl` · `techs TICKER` · `financials TICKER` · `book TICKER` · `taxlots TICKER` · `spcx watch` · `prompt version`

## Mejorar el agente

1. Edita `prompt/sections/`
2. Ajusta `config/risk-policy.json` / `config/fund-mandate.json`
3. Sube `version` en `prompt/manifest.json`

## Cursor Cloud specific instructions

This repo has two parts:

- The trading agent itself is prompt/config only (`prompt/`, `config/`, `workflows/`, `data/`, `logs/`). It has no standalone service — it runs through Cursor + the `robinhood-trading` MCP server (`.cursor/mcp.json`). There is nothing to "start" for the agent; it is driven interactively via the commands listed above.
- `web/` is the only runnable application: a Next.js 15 static-export site ("Tapefund") that reads `../logs/` and `../config/` at build time. The agent's markdown/JSON *is* the content — there is no CMS or database.

Dev workflow for `web/` (run all commands from `web/`; standard scripts live in `web/package.json`):

- Dependencies are installed by the update script (`npm ci` in `web/`).
- Run dev server: `npm run dev` (http://localhost:3000). Requires `NEXT_PUBLIC_SITE_URL` for correct absolute URLs; unset it defaults are fine for local dev.
- Build: `NEXT_PUBLIC_SITE_URL=https://tapefund.com npm run build`. The `prebuild` step regenerates `web/public/rss.xml`, `llms.txt`, `llms-full.txt` and runs `scripts/verify-public-content.ts`, which **fails the build** if private/forbidden patterns leak from `logs/` (see `web/lib/sanitize.ts`). Build also runs TypeScript type-checking. This build is the effective quality gate.
- Building locally will show `web/public/{rss.xml,llms.txt,llms-full.txt,api/v1/**}` as modified (they are committed but regenerated from current `logs/`). Do not commit incidental regenerations unless log or MCP API content actually changed.
- Public site and Desk MCP copy must **not** name Kevin Xu. Describe the book as an **all-in strategy** (one listed stock, quality + timing, never chase). Internal `prompt/`, `config/`, and `workflows/` keep mandate names. `web/lib/sanitize.ts` redacts the name from published logs.
- Public SEO: never use **auto trader / AutoTrader** (car classifieds). Prefer **Robinhood Agentic**, **swing trading**, **AI trading agent**, **trading journal**, **investment thesis**, **MCP server**. Say explicitly this is not paper trading and not copy trading.
- `packages/tapefund-mcp` is the public MCP (Rosetta pattern: npm stdio client + HTTPS JSON). Generate REST with `npx tsx scripts/generate-desk-api.ts` from `web/` (also in `prebuild`). Smoke: `cd packages/tapefund-mcp && npm install && npm test` after generating `web/public/api/v1`. Cursor config is `npx -y tapefund-mcp` with `TAPEFUND_API_URL=https://tapefund.com`. There is no hosted Streamable HTTP `/api/mcp` while the site remains `output: "export"`. Do not create Stripe products on the Rosetta Stripe account.
- Lint: `npm run lint` is **not usable** — ESLint is not configured/installed, so `next lint` drops into an interactive setup prompt. Do not rely on it; use the build's type-check + content verification instead.
- Node 22 is used (Next.js 15 / React 19). Output is a static export (`web/out/`), so there is no long-running production server — deploy is via Vercel (`vercel.json` at repo root, root dir `web`).
- **Always merge the PR** when the work is done (do not leave it open as draft-only). Use a merge commit unless the user specifies otherwise.
