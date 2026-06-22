# Automation #3 — Intraday Monitor (12:00 PM + 3:00 PM ET, lun–vie)

**Modo:** monitor posiciones + auto-exit solo en **hard stop -8%** o **tesis rota**. Sin take-profit mecánico (+25% eliminado — estilo Ackman).

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
Leer logs/theses/TICKER-*.md → kill criteria, fair value, trim plan
```

Por cada posición (`shares_available_for_sells` > 0):

```
entry = average_buy_price
stop  = entry × 0.92   (-8% backup)

Si precio <= stop → AUTO SELL market (toda la posición) — backup pánico
Si kill criteria del thesis memo cumplido → AUTO SELL market (toda la posición)
Si trim plan en memo (precio ≥ X, vender Y%) → review partial sell manual
Si no → reportar P&L %, distancia a stop backup, tesis vs fair value
```

**No** auto-vender por ganancia % fija.

## Auto sell (fractional OK)

```
review_equity_order → side=sell, type=market, quantity=shares_available_for_sells
Si order_checks {} → place_equity_order
append logs/trade-journal.md
update logs/scorecard/positions.jsonl (status=closed, exit_reason, return_pct)
bash scripts/send-alert.sh trade "AUTO EXIT TICKER" "hard_stop|thesis_break, precio, fill"
```

## Escalación — NO vender

- `order_checks` no vacío → `send-alert.sh urgent` + no ejecutar
- MCP auth failure → urgent + no ejecutar

## Output

Escribir `logs/intelligence/YYYY-MM-DD-HHmm-monitor.md` con estado posiciones, P&L, distancia stop backup, tesis status, exits ejecutados.

1. **Persistir en disco** — el chat no sustituye el archivo en `logs/intelligence/`.
2. `git add logs/intelligence/ && git commit -m "logs: intelligence YYYY-MM-DD monitor" && git push origin main`
