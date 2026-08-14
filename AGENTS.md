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
