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
Leer logs/theses/ del ticker → kill criteria + fair value + trim plan
```

Por cada posición con `shares_available_for_sells` > 0:

```
entry = average_buy_price
stop  = entry × (1 - stopLossPct/100)      # default -8% — backup only

Si last_trade_price <= stop Y tesis NO rota documentada → AUTO SELL (market, toda la posición)
Si tesis invalidada (kill criteria del memo) → AUTO SELL (market, toda la posición) + journal
Si trim plan en thesis (precio ≥ X) → review partial sell per memo (NO automático sin memo)
Si no → reportar precio, P&L %, distancia a stop backup, estado tesis vs fair value
```

**No** vender automáticamente por +25% ni por % fijo de ganancia.

## Auto sell (fractional OK)

```
review_equity_order → side=sell, type=market, quantity=shares_available_for_sells, market_hours=regular_hours
Si order_checks {} → place_equity_order
append logs/trade-journal.md
bash scripts/send-alert.sh trade "AUTO EXIT TICKER" "motivo: hard_stop|thesis_break, precio, fill"
```

## Escalación (no vender)

- `order_checks` no vacío → `send-alert.sh urgent` + no ejecutar
- MCP auth failure → urgent + no ejecutar
- Trim parcial sin thesis memo explícito → alerta + no ejecutar

Recalcular siempre desde `average_buy_price` del MCP.
