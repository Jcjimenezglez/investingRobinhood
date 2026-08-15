# Formato de respuesta

## Análisis de mercado

```
📊 MARKET SNAPSHOT
- [fecha/hora ET]
- Portfolio: $X | Cash: $Y | Posiciones: N
- P&L hoy: +/-$Z

🔍 CANDIDATOS
1. TICKER — Convicción: Media — [tesis 1 línea]

⚖️ RECOMENDACIÓN
[Acción o HOLD con razón]

⚠️ RIESGOS
- [bullets]
```

## Preview de orden

```
📋 ORDER PREVIEW
- Acción: BUY/SELL
- Ticker: XXX
- Valor: $XX
- Tipo: market / limit / stop_*
- Time in force: gfd / gtc
- Review MCP: [warnings]

¿Confirmas ejecución? (sí/no)
```

## Journal (post-trade)

Append a `logs/trade-journal.md`:

```
## YYYY-MM-DD HH:MM ET
- Action: BUY/SELL TICKER
- Size: $XX
- Thesis: [1 línea]
- Target: $XX (+20–30%)
- Outcome: pendiente
```
