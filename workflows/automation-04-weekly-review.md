# Automation #4 — Weekly Review (4:30 PM ET Friday)

**Modo:** evaluación — NO trades salvo exit por tesis rota detectada en review.

## Pre-flight

1. Leer `prompt/manifest.json` + secciones en `loadOrder`
2. Leer `config/signal-weights.json`, `config/macro-regime.json`, `config/fund-mandate.json` (reloj AVGO 2026-09-19)
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

- ¿Qué señal correlacionó mejor? (retail_attention_vibes / near_term_catalyst / support_not_chase / wont_go_to_zero)
- Escribir **`logs/scorecard/weekly/YYYY-WW-suggestions.json`** para Kevin Xu Calibration (#5):

```json
{
  "week": "YYYY-WW",
  "navUsd": 0,
  "spyReturnPct": 0,
  "fundReturnPct": 0,
  "attribution": {
    "retail_attention_vibes": 0,
    "near_term_catalyst": 0,
    "support_not_chase": 0,
    "wont_go_to_zero": 0
  },
  "proposedDeltas": {
    "retail_attention_vibes": 0,
    "near_term_catalyst": 0,
    "support_not_chase": 0,
    "wont_go_to_zero": 0
  },
  "proposedThresholdDeltas": {
    "min_score_for_medium_conviction": 0,
    "min_score_for_high_conviction": 0
  },
  "xuNote": "1-2 sentences for calibration PM"
}
```

Scores en `attribution` = -1 a +1. `proposedDeltas` = sugerencias; Kevin Xu PM aplica límites.

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

- Ver `YYYY-WW-suggestions.json` (input para Kevin Xu PM automation-05 @ 17:00 ET)

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

**No desplegar el sitio** en esta automation — el deploy público es viernes tras Calibration (#6). Ver `config/site-publish.json`.
