# Automation #3 — Intraday Monitor (12:00 PM + 3:00 PM ET, lun–vie)

**Modo:** monitor posiciones + auto-exit en stop/target. Solo horario regular 9:30–16:00 ET.

## Pre-flight

1. Si fuera de 9:30–16:00 ET (lun–vie) → `HOLD — fuera de mercado` y terminar sin órdenes
2. Leer `config/monitoring.json`, `config/risk-policy.json`, `config/autonomy.json`
3. Leer `workflows/monitor-positions.md`
4. Cuenta **SOLO Agentic** (`agentic_allowed=true`)

## Check loop

```
get_accounts → Agentic
get_equity_positions
Si sin posiciones → log snapshot en logs/intelligence/ y terminar
get_equity_quotes → precio por símbolo
```

Por cada posición (`shares_available_for_sells` > 0):

```
entry  = average_buy_price
stop   = entry × 0.92   (-8%, default monitoring.json)
target = entry × 1.25   (+25%)

Si precio <= stop   → AUTO SELL market (toda la posición)
Si precio >= target → AUTO SELL market (toda la posición)
Si no → reportar P&L %, distancia a stop y target
```

## Auto sell (fractional OK)

```
review_equity_order → side=sell, type=market, quantity=shares_available_for_sells
Si order_checks {} → place_equity_order
append logs/trade-journal.md
bash scripts/send-alert.sh trade "AUTO EXIT TICKER" "stop|target, precio, fill"
```

## Escalación — NO vender

- `order_checks` no vacío → `send-alert.sh urgent` + no ejecutar
- MCP auth failure → urgent + no ejecutar

## Output

Escribir `logs/intelligence/YYYY-MM-DD-HHmm-monitor.md` con estado AMZN/MSFT (o lo que haya), P&L, distancia stop/target, exits ejecutados.

Commit y push cambios en `logs/` a `main`.
