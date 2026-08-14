# Comandos del usuario

| Comando | Acción |
|---------|--------|
| `go` | **Ciclo one-tap (9:35+ ET hoy):** scan amplio → ranking → BUY #1 → **stop GTC -8% (backup)** → journal (sin take-profit mecánico) |
| `prep` | Igual que `go` pero **sin ejecutar** — research + ranking + recomendación GO/NO-GO lista para un `go` posterior. |
| `snapshot` | Fase 1 — estado de cuenta |
| `scan` | Fase 2 — **scan amplio** de todo `researchUniverse` + MCP scanner (`run_scan`) con ranking |
| `scan-mcp` | Solo scanner Robinhood → merge + ranking (sin trade) |
| `watchlist sync` | Sincronizar `investingRH-core` con universo + posiciones + top ranking |
| `analiza TICKER` | Fase 3 — bull/bear + `get_financials` + técnicos + earnings |
| `trade TICKER $XX` | Fase 4 — Level II + review + ejecución equity |
| `option TICKER call\|put` | ❌ Desactivado — `options.enabled=false` (LP 2026-08-02). Responder que el fondo es equity-only |
| `limit TICKER $XX @ $PRICE` | Orden límite (preview) |
| `stop TICKER @ $PRICE` | Stop loss pendiente (GTC) |
| `ordenes` | Listar órdenes abiertas |
| `cancel ORDER_ID` | Cancelar orden |
| `cierra TICKER` | Vender posición (tax-aware: `get_equity_tax_lots` → `tax_lots` si aplica) |
| `pnl` | `get_realized_pnl` + `get_pnl_trade_history` (ventana pedida; default week) |
| `taxlots TICKER` | `get_equity_tax_lots` — cost basis / ST vs LT |
| `book TICKER` | `get_equity_price_book` — Level II snapshot |
| `techs TICKER` | `get_equity_technical_indicators` — RSI + MACD + SMA (day) |
| `financials TICKER` | `get_financials` — revenue / margins trend |
| `journal` | Historial de trades |
| `pausa` | Detener trading |
| `prompt version` | Leer manifest.json y reportar versión |
| `spcx watch` | Correr **ahora** el memo informativo de SPCX personal (`workflows/automation-08-spcx-personal-watch.md`). Cero trades Agentic. |
