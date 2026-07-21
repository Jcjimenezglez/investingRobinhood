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
get_option_positions (nonzero=true)
Si sin equity NI options → log snapshot en logs/intelligence/ y terminar
get_equity_quotes → precio por símbolo (equity)
Leer logs/theses/TICKER-*.md → kill criteria, fair value, trim plan
```

### Equity

Por cada posición (`shares_available_for_sells` > 0):

```
entry = average_buy_price
stop  = entry × 0.92   (-8% backup)

Si precio <= stop → AUTO SELL market (toda la posición) — backup pánico
Si kill criteria del thesis memo cumplido → AUTO SELL market (toda la posición)
Si trim plan en memo (precio ≥ X, vender Y%) → review partial sell manual
Si no → reportar P&L %, distancia a stop backup, tesis vs fair value
```

**No** auto-vender equity por ganancia % fija.

### Options (long call/put)

Por cada posición options abierta — aplicar `risk-policy.options.exitPolicy`:

```
Si tesis invalidada o catalizador fallido → AUTO CLOSE (sell to close) vía review_option_order → place_option_order
Si ~7 DTE o menos sin payoff path claro → AUTO CLOSE
Si no → reportar premium P&L, DTE, estado tesis/catalizador
```

**No** hold a expiry por lotería. **No** abrir options nuevas en esta automation (solo monitor/exit).

## Auto sell equity (fractional OK)

```
review_equity_order → side=sell, type=market, quantity=shares_available_for_sells
Si order_checks {} → place_equity_order
append logs/trade-journal.md
update logs/scorecard/positions.jsonl (status=closed, exit_reason, return_pct)
bash scripts/send-alert.sh trade "AUTO EXIT TICKER" "hard_stop|thesis_break, precio, fill"
```

## Auto close options

```
review_option_order → sell to close (position_effect=close)
Si order_checks {} → place_option_order
append logs/trade-journal.md + scorecard
bash scripts/send-alert.sh trade "AUTO EXIT OPTION" "thesis_break|catalyst_fail|near_expiry, detalle"
```

## Escalación — NO vender

- `order_checks` no vacío → `send-alert.sh urgent` + no ejecutar
- MCP auth failure → urgent + no ejecutar

## Output

Escribir `logs/intelligence/YYYY-MM-DD-HHmm-monitor.md` con estado equity + options, P&L, distancia stop backup / DTE, tesis status, exits ejecutados.

1. **Persistir en disco** — el chat no sustituye el archivo en `logs/intelligence/`.
2. `git add logs/intelligence/ && git commit -m "logs: intelligence YYYY-MM-DD monitor" && git push origin main`

Do not add `[deploy-site]` — see `config/site-publish.json`.
