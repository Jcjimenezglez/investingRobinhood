# Daily Runbook — Autonomous Trading Agent

Ejecutar en cada sesión programada (o manual). Leer `config/autonomy.json`, `config/risk-policy.json`, `config/notifications.json`.

## 1. Pre-flight

- [ ] MCP Robinhood autenticado
- [ ] Cuenta Agentic activa
- [ ] Horario ET correcto para el tipo de sesión
- [ ] Leer `prompt/sections/09-autonomous-mode.md` + `10-data-intelligence.md`

## 2. Scan amplio + Research (Capas 1–5)

- Snapshot MCP
- **Scan de TODO `researchUniverse`** (no asumir AMZN ni ningún nombre fijo): quotes + fundamentals del universo completo
- WebSearch noticias + macro; SEC en top candidatos
- Confluencia Ackman (`config/ackman-tracker.json`)
- Social (peso bajo)
- Escribir **ranking** en `logs/intelligence/YYYY-MM-DD-HHmm.md`

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

## 5. Escalación

Si cualquier trigger en `autonomy.json` → `escalation.requireHumanApprovalWhen`:

```bash
bash scripts/send-alert.sh urgent "Motivo" "Detalle y acción sugerida"
```

## Cron objetivo (ET, lun–vie)

| Hora | Sesión |
|------|--------|
| 8:00 | Research only |
| 9:35 | Full cycle (trades OK) |
| 12:00 | Monitor posiciones |
| 15:00 | Close check + digest |

Configurar en **Cursor Automations** con trigger cron (timezone US/Eastern).
