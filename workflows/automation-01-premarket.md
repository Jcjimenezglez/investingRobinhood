# Automation #1 — Pre-Market CIO (8:00 AM ET, lun–vie)

**Modo:** research only — NO colocar órdenes.

## Pre-flight

1. Leer `prompt/manifest.json` y todas las secciones en `loadOrder`
2. Leer `config/autonomy.json`, `config/risk-policy.json`, `config/fund-mandate.json`, `config/ackman-tracker.json`
3. Leer `workflows/daily-runbook.md`, `prompt/sections/09-autonomous-mode.md`, `prompt/sections/10-data-intelligence.md`
4. Cuenta **SOLO Agentic** (`agentic_allowed=true`) — ignorar otras cuentas

## Capa 1 — Robinhood (obligatorio)

```
get_accounts → identificar Agentic
get_portfolio, get_equity_positions, get_equity_orders
get_equity_quotes + get_equity_fundamentals: posiciones abiertas + todo researchUniverse
get_popular_watchlists → upcoming earnings
```

## Capa 2 — Mercado

WebSearch: macro del día, Fed, sector tech, earnings próximas 2 semanas.

## Capa 3 — SEC

Para AMZN, MSFT y top 3 candidatos del ranking: 8-K recientes, guidance, material events.

## Capa 4 — Ackman

`config/ackman-tracker.json` — confluencia vs Pershing Square 13F.

## Capa 5 — Social (peso ≤ 20%)

WebSearch Reddit/StockTwits solo como señal débil.

## Output obligatorio

Escribir `logs/intelligence/YYYY-MM-DD-0800-premarket.md`:

1. **Snapshot fund** — cash, P&L, posiciones vs límites risk-policy
2. **AMZN + MSFT** — bull/bear, P&L%, distancia stop (-8%) y target (+25%), ¿tesis intacta?
3. **Ranking universo** (#1–10): convicción, mispricing, catalizador 3–12m, confluencia Ackman
4. **Decisión para sesión 9:35** — HOLD / ADD / ROTATE / EXIT (con sizing si aplica)
5. **Riesgos del día**

## Escalación

Si MCP falla o límites de riesgo breached:

```bash
bash scripts/send-alert.sh urgent "motivo" "detalle"
```

## Post-run

Commit y push cambios en `logs/` al repo `main`.
