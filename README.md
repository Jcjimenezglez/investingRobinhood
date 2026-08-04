# Investing Robinhood — AI Stock Broker Agent

Agente de IA configurado como **CIO estilo Ackman** para operar acciones vía el [Robinhood Trading MCP](https://agent.robinhood.com/mcp/trading) (Agentic Beta).

Fondo concentrado de **$100** en cuenta Agentic aislada — tesis-driven, catalizador 3–12 meses, sin take-profit mecánico.

## Qué hace el agente

| Capacidad | Herramienta / recurso |
|-----------|----------------------|
| Portfolio y trades | MCP Robinhood (solo Agentic) |
| Scan + ranking numérico | `config/signal-weights.json` + universo en `config/fund-mandate.json` |
| Intel multi-fuente | `prompt/sections/10-data-intelligence.md` + `data/signals/` |
| Medición de outcomes | `logs/scorecard/positions.jsonl` |
| Automatización | Cursor Automations + [`workflows/automation-*.md`](workflows/) |

## Estrategia (Ackman concentrated catalyst)

- **Concentrado por convicción** — tantas posiciones como permita cash útil (≥$15/nombre) · hasta **50%** en convicción Alta
- **Universo:** GOOGL, HOOD, AMZN, META, AAPL, MSFT, NVDA, UBER, QSR, BN, SPCX (SpaceX)
- **Exit:** tesis rota / fair value / rotación — **no** +% fijo automático
- **Stop backup:** -8% GTC (whole shares) o monitoreo intraday (fractional)
- **Objetivo:** retornos absolutos con disciplina PM

Config: [`config/risk-policy.json`](config/risk-policy.json) · Mandato: [`config/fund-mandate.json`](config/fund-mandate.json)

## Setup en Cursor

### 1. Conectar el MCP

**Local:** `.cursor/mcp.json` o Cursor Settings → MCP → `https://agent.robinhood.com/mcp/trading`

**Cloud Automations:** [`workflows/automation-cloud-mcp-setup.md`](workflows/automation-cloud-mcp-setup.md)

### 2. Cuenta Agentic

Deposita **$100**, verifica push notifications en app Robinhood.

### 3. Automations (ET, lun–vie)

| Hora | Workflow |
|------|----------|
| 8:00 | [`automation-01-premarket.md`](workflows/automation-01-premarket.md) |
| 9:35 | [`automation-02-market-open.md`](workflows/automation-02-market-open.md) |
| 12:00, 15:00 | [`automation-03-intraday-monitor.md`](workflows/automation-03-intraday-monitor.md) |
| Vie 16:30 | [`automation-04-weekly-review.md`](workflows/automation-04-weekly-review.md) |

Checklist antes de ausentarte: [`workflows/pre-absence-checklist.md`](workflows/pre-absence-checklist.md)

### 4. Alertas email

Copia `.env.example` → `.env` con `RESEND_API_KEY`. Script: [`scripts/send-alert.sh`](scripts/send-alert.sh)

## Comandos

```
snapshot     → estado de cuenta
scan         → ranking universo completo con scores
go           → ciclo completo + trade #1 si convicción ≥ Media
prep         → research sin ejecutar
journal      → historial trades
prompt version → versión del system prompt
```

## Data pipeline (gratis)

```bash
bash scripts/fetch-signals.sh all   # SEC + skeleton universe
```

El agente merge datos MCP en `data/signals/`. Ver [`data/README.md`](data/README.md).

## Estructura del proyecto

```
investingRobinhood/
├── config/
│   ├── fund-mandate.json
│   ├── risk-policy.json
│   ├── signal-weights.json      # scoring convicción
│   ├── macro-regime.json
│   └── data-sources.json
├── data/signals/                # JSON diario
├── logs/
│   ├── trade-journal.md
│   ├── scorecard/               # positions.jsonl + monthly/weekly
│   ├── theses/
│   └── intelligence/
├── prompt/sections/             # system prompt modular
├── scripts/
│   ├── send-alert.sh
│   └── fetch-signals.sh
└── workflows/                   # runbooks + automations
```

## Mejora continua

1. Trades → `logs/scorecard/positions.jsonl`
2. Viernes → weekly review + sugerencias calibración weights
3. Mensual → `logs/scorecard/monthly/YYYY-MM.md`

Prompt version: ver [`prompt/manifest.json`](prompt/manifest.json) (actual **1.5.0**).

## Public site (`web/`)

Static track record site — reads `logs/` at build time. See [`web/README.md`](web/README.md).

```bash
cd web && npm install && npm run dev
```

Deploy on Vercel with root directory `web` and `NEXT_PUBLIC_SITE_URL` set to your domain.

## Riesgos

Robinhood Agentic es **beta**. Puedes perder todo el capital. Supervisa actividad en app Robinhood.
