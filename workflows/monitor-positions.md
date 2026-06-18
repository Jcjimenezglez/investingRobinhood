# Monitor Positions — Auto Exit (Cursor Automation)

Ejecutar cada **15 min** en **regular hours** (9:30–16:00 ET, lun–vie).

## Pre-flight

1. Si fuera de horario de mercado → responder `HOLD — fuera de mercado` y **no** operar.
2. Leer `config/monitoring.json`, `config/risk-policy.json`, `config/autonomy.json`.
3. Solo cuenta **Agentic** (`agentic_allowed=true`).

## Check loop

```
get_accounts → cuenta Agentic
get_equity_positions → posiciones abiertas
Si sin posiciones → log snapshot + terminar
get_equity_quotes → precio actual por símbolo
```

Por cada posición con `shares_available_for_sells` > 0:

```
entry = average_buy_price
stop  = entry × (1 - stopLossPct/100)      # default -8%
target = entry × (1 + takeProfitPct/100)   # default +25%

Si last_trade_price <= stop  → AUTO SELL (market, toda la posición)
Si last_trade_price >= target → AUTO SELL (market, toda la posición)
Si no → reportar precio, P&L %, distancia a stop/target
```

## Auto sell (fractional OK)

```
review_equity_order → side=sell, type=market, quantity=shares_available_for_sells, market_hours=regular_hours
Si order_checks {} → place_equity_order
append logs/trade-journal.md
bash scripts/send-alert.sh trade "AUTO EXIT TICKER" "motivo: stop|target, precio, fill"
```

## Escalación (no vender)

- `order_checks` no vacío → `send-alert.sh urgent` + no ejecutar
- MCP auth failure → urgent + no ejecutar

## Posición conocida (2026-06-18)

| Ticker | Entry | Stop -8% | Target +25% |
|--------|-------|----------|-------------|
| AMZN | $236.68 | $217.75 | $295.85 |

Recalcular siempre desde `average_buy_price` del MCP — la tabla es referencia.
