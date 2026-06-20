# Automation #4 — Weekly Review (4:30 PM ET Friday)

**Modo:** evaluación — NO trades salvo exit por tesis rota detectada en review.

## Pre-flight

1. Leer `prompt/manifest.json` + secciones en `loadOrder`
2. Leer `config/signal-weights.json`, `config/macro-regime.json`
3. Leer `logs/scorecard/positions.jsonl`, `logs/trade-journal.md`
4. Cuenta **SOLO Agentic** (`agentic_allowed=true`)

## Fase 1 — Snapshot

```
get_accounts → Agentic
get_portfolio, get_equity_positions
get_equity_historicals SPY (benchmark same period as open positions)
```

## Fase 2 — Scorecard review

Por cada fila en `logs/scorecard/positions.jsonl`:

- Actualizar `return_pct` unrealized si `status=open`
- Comparar vs `benchmark_spy_return_same_period` (calcular si null)
- ¿Convicción Alta (AMZN) vs Media-Alta (MSFT) — relative performance

## Fase 3 — Signal attribution

Leer intelligence logs de la semana + `data/signals/*-universe.json` si existen.

Responder:

- ¿Qué señal correlacionó mejor? (fundamentals / catalyst / ackman_confluence)
- ¿Sugerencia de ajuste a `config/signal-weights.json`? (**solo sugerencia** — humano aprueba)

## Fase 4 — Output

Escribir `logs/scorecard/weekly/YYYY-WW.md` (ISO week):

```markdown
# Weekly scorecard YYYY-WW

## NAV
- Start AUM: $100
- Current NAV: $___
- SPY same period: ___%

## Positions
| Ticker | Conviction | Return % | vs SPY | Thesis status |

## Actions this week
- Trades / holds / exits

## Calibration suggestions
- [ ] signal-weights: ...

## Next week focus
- Catalysts / earnings dates
```

## Email digest

```bash
bash scripts/send-alert.sh digest "Weekly scorecard YYYY-WW" "$(cat logs/scorecard/weekly/YYYY-WW.md)"
```

Incluir link a `logs/scorecard/positions.jsonl` y último monthly si existe.

## Escalación

Si drawdown > `maxDrawdownFromHighWaterMarkPct` en risk-policy → `send-alert.sh urgent` + halt per autonomy.json.

Commit cambios en `logs/scorecard/` a `main`.
