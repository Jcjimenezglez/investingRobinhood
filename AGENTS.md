# Stock Broker Agent

Agente modular para trading vía Robinhood MCP. System prompt en `prompt/sections/`.

## Estructura del prompt

```
prompt/
├── manifest.json              ← versión + orden de carga
├── README.md                  ← guía de edición
└── sections/
    ├── 01-identity.md
    ├── 02-mcp-workflow.md
    ├── 03-strategy.md
    ├── 04-decision-framework.md
    ├── 05-risk-guardrails.md
    ├── 06-response-format.md
    ├── 07-commands.md
    └── 08-capabilities-and-scheduling.md  ← qué puedes / no puedes hacer

config/risk-policy.json        ← números (límites, sizing)
.cursor/rules/stock-broker-agent.mdc  ← loader (alwaysApply)
```

## Comandos

`snapshot` · `scan` · `analiza TICKER` · `trade TICKER $XX` · `pnl` · `techs TICKER` · `financials TICKER` · `book TICKER` · `taxlots TICKER` · `spcx watch` · `prompt version`

Viernes 18:00 ET: automation **SPCX personal watch** (`workflows/automation-08-spcx-personal-watch.md`) — memo informativo, **cero trades Agentic**.

## Mejorar el agente

1. Edita el `.md` relevante en `prompt/sections/`
2. Ajusta números en `config/risk-policy.json` si aplica
3. Sube `version` en `prompt/manifest.json`
4. Nuevo chat → `prompt version` para verificar

Ver `prompt/README.md` y `prompt/sections/08-capabilities-and-scheduling.md` para scheduling y límites MCP.

## Cursor Cloud specific instructions

The only runnable/buildable application in this repo is the public track-record site in `web/` (Next.js 15, static export). The trading agent itself is prompt/config content (`prompt/`, `config/`, `workflows/`) consumed externally by Cursor + the Robinhood Trading MCP — there is no in-repo trading server/daemon to start, and live trading requires an authenticated Robinhood Agentic account that is not available in CI/cloud.

Working directory for all site commands is `web/`. Standard scripts are in `web/package.json` (`dev`, `build`, `start`, `lint`); dependency install is plain `npm install` in `web/` (Node 22 / npm 10 work fine).

Non-obvious caveats:
- `npm run build` requires `NEXT_PUBLIC_SITE_URL` to be set (e.g. `NEXT_PUBLIC_SITE_URL=https://tapefund.com npm run build`). Its `prebuild` step generates RSS/llms files and runs `scripts/verify-public-content.ts`, which **fails the build** if private patterns (account numbers, order UUIDs, internal paths, etc.) leak into published content. A build failure here may mean a content/sanitization issue, not a code bug.
- The site reads `../logs/` and `../data/` at build time (no CMS/API). Pages like `/journal`, `/trades`, `/theses`, `/performance` are generated from those committed markdown/JSONL files, so changing site content usually means editing those source files.
- `npm run lint` (`next lint`) is **not usable non-interactively**: no ESLint config is committed, so it prompts to set one up. Skip it (or configure ESLint intentionally) rather than treating it as a passing/failing check.
- `next dev` serves on `http://localhost:3000`.
