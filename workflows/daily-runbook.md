# Daily Runbook — Autonomous Trading Agent

Ejecutar en cada sesión programada (o manual). Leer `config/autonomy.json`, `config/risk-policy.json`, `config/notifications.json`.

## 1. Pre-flight

- [ ] MCP Robinhood autenticado
- [ ] Cuenta Agentic activa
- [ ] Horario ET correcto para el tipo de sesión
- [ ] Leer `prompt/sections/09-autonomous-mode.md` + `10-data-intelligence.md`

## 2. Scan amplio + Research (Capas 1–5 + signals)

- Si existe `data/signals/YYYY-MM-DD-universe.json` (hoy ET): **leer primero** — no repetir SEC/MCP inline salvo stale >24h
- Si no existe: `bash scripts/fetch-signals.sh all` (SEC + skeleton) + MCP merge por agente
- Snapshot MCP
- **Scan de TODO `researchUniverse`** (no asumir AMZN ni ningún nombre fijo): quotes + fundamentals del universo completo
- WebSearch noticias + macro; SEC en top candidatos (solo si no en `data/raw/`)
- Confluencia Ackman (`config/ackman-tracker.json`)
- Macro regime (`config/macro-regime.json`) → documentar `regime:` en intelligence log
- Social (peso bajo)
- Escribir **ranking** con columna **Score** (ver `config/signal-weights.json`) en `logs/intelligence/YYYY-MM-DD-HHmm.md`

## 3. Decisión

- Elegir el **#1 del ranking** (puede o no ser AMZN — dejar que los datos decidan)
- HOLD si el mejor candidato tiene convicción < Media o datos insuficientes
- TRADE solo si dentro de risk-policy y review limpio

## 4. Ejecución (si TRADE)

```
review_equity_order (BUY) → si order_checks {} → place_equity_order
→ get_equity_positions (entry + quantity exacta)
→ review_equity_order (STOP GTC -8%) → place_equity_order (sell stop_market gtc)
→ trade-journal.md (entry + stop backup + fair value del thesis memo)
```

Sin take-profit GTC automático — exits al alza según `exitPolicy` Ackman en risk-policy.

Si stop GTC rechazado: alerta + fallback monitoreo 12:00 / 15:00 ET con `check`.

## 4b. Scorecard (obligatorio tras trade o exit)

Tras cada BUY, SELL, o trim material:

1. Append una línea JSON a `logs/scorecard/positions.jsonl` (schema: `logs/scorecard/schema.json`)
2. Campos mínimos: ticker, entry/exit, conviction, thesis_path, signals_used, status
3. Si exit: calcular `return_pct` y `benchmark_spy_return_same_period` vía MCP SPY historicals
4. Actualizar `thesis_correct`: catalyst_hit | partial | failed | pending

Journal narrativo (`logs/trade-journal.md`) sigue siendo complemento humano — no sustituye scorecard.

## 5. Escalación

Si cualquier trigger en `autonomy.json` → `escalation.requireHumanApprovalWhen`:

```bash
bash scripts/send-alert.sh urgent "Motivo" "Detalle y acción sugerida"
```

## Cron objetivo (ET, lun–vie)

| Hora | Sesión |
|------|--------|
| 8:00 | Research only + `fetch-signals.sh` |
| 9:35 | Full cycle (trades OK) |
| 12:00 | Monitor posiciones |
| 15:00 | Close check + digest |
| Vie 16:30 | Weekly scorecard ([`automation-04-weekly-review.md`](automation-04-weekly-review.md)) |

Configurar en **Cursor Automations** con trigger cron (timezone US/Eastern).
