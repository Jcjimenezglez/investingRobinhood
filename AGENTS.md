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
