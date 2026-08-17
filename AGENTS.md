# Stock Broker Agent

Agente modular para trading vía Robinhood MCP. System prompt en `prompt/sections/`.

**Mandato vigente (prompt v2.0.1):** Kevin Xu — all-in one listed stock, vibes + support + catalyst, no crypto/margin/options/pennies. Don't chase.

## Estructura del prompt

```
prompt/
├── manifest.json
├── README.md
└── sections/
config/risk-policy.json
config/fund-mandate.json
config/kevin-xu-playbook.json
```

## Comandos

`go` · `prep` · `snapshot` · `scan` · `analiza TICKER` · `trade TICKER $XX` · `pnl` · `techs TICKER` · `financials TICKER` · `book TICKER` · `taxlots TICKER` · `spcx watch` · `prompt version`

## Mejorar el agente

1. Edita `prompt/sections/`
2. Ajusta `config/risk-policy.json`
3. Sube `version` en `prompt/manifest.json`

## Cursor Cloud specific instructions

This repo has two parts:

- The trading agent itself is prompt/config only (`prompt/`, `config/`, `workflows/`, `data/`, `logs/`). It has no standalone service — it runs through Cursor + the `robinhood-trading` MCP server (`.cursor/mcp.json`). There is nothing to "start" for the agent; it is driven interactively via the commands listed above.
- `web/` is the only runnable application: a Next.js 15 static-export site ("Tapefund") that reads `../logs/` and `../config/` at build time. The agent's markdown/JSON *is* the content — there is no CMS or database.

Dev workflow for `web/` (run all commands from `web/`; standard scripts live in `web/package.json`):

- Dependencies are installed by the update script (`npm ci` in `web/`).
- Run dev server: `npm run dev` (http://localhost:3000). Requires `NEXT_PUBLIC_SITE_URL` for correct absolute URLs; unset it defaults are fine for local dev.
- Build: `NEXT_PUBLIC_SITE_URL=https://tapefund.com npm run build`. The `prebuild` step regenerates `web/public/rss.xml`, `llms.txt`, `llms-full.txt` and runs `scripts/verify-public-content.ts`, which **fails the build** if private/forbidden patterns leak from `logs/` (see `web/lib/sanitize.ts`). Build also runs TypeScript type-checking. This build is the effective quality gate.
- Building locally will show `web/public/{rss.xml,llms.txt,llms-full.txt}` as modified (they are committed but regenerated from current `logs/`). Do not commit these incidental regenerations unless log content actually changed.
- Lint: `npm run lint` is **not usable** — ESLint is not configured/installed, so `next lint` drops into an interactive setup prompt. Do not rely on it; use the build's type-check + content verification instead.
- Node 22 is used (Next.js 15 / React 19). Output is a static export (`web/out/`), so there is no long-running production server — deploy is via Vercel (`vercel.json` at repo root, root dir `web`).
