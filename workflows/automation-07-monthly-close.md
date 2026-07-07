# Automation #7 — Monthly Close (1st of month, 6:00 PM ET)

**Modo:** evaluación — **NO trades**.

**Periodo:** mes calendario anterior (ej. run 1-ago 18:00 ET → scorecard de julio completo).

## Pre-flight

1. Leer `prompt/manifest.json` + secciones en `loadOrder`
2. Leer `logs/scorecard/positions.jsonl`, `logs/trade-journal.md`
3. Leer weekly scorecards del mes (`logs/scorecard/weekly/`)
4. Cuenta **SOLO Agentic** (`agentic_allowed=true`)

## Fase 1 — Snapshot

```
get_accounts → Agentic
get_portfolio, get_equity_positions
get_equity_historicals SPY (first trading day → last trading day of prior month, interval=day)
```

Calcular:

- NAV start / end del mes (desde trade-journal + MCP marks)
- Fund return % del mes
- SPY return % del mes (open primer día → close último día)
- Alpha vs SPY
- Max drawdown del mes (desde HWM intra-mes)
- Trades ejecutados (count buy/sell/exit)

## Fase 2 — Thesis outcomes

Por cada fila en `positions.jsonl` con actividad en el mes:

- Positions opened / closed
- Catalyst hit rate (si aplica)
- Avg hold days (closed positions)
- Alta vs Media-Alta relative alpha

## Fase 3 — Automation uptime

Contar commits en `logs/intelligence/` del mes por sesión (premarket, open, monitor, weekly).

## Fase 4 — Output

Escribir `logs/scorecard/monthly/YYYY-MM.md`:

```markdown
# Monthly scorecard — YYYY-MM

## NAV summary
| Metric | Value |
| Starting AUM | |
| End NAV | |
| Month return | |
| SPY month | |
| Alpha | |
| Max drawdown | |

## Positions (end of month)
## Thesis outcomes
## Automation uptime
## Next month focus
```

## Escalación

Si drawdown mes > `maxDrawdownFromHighWaterMarkPct` → log HALT note en monthly file (LP consulta chat).

Commit:

```bash
git add logs/scorecard/monthly/
git commit -m "scorecard: monthly YYYY-MM close"
git push origin main
```
