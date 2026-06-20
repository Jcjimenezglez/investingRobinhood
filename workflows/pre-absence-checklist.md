# Pre-absence checklist — investingRobinhood

Usar antes de ausentarte 1+ semanas. Consolida checks de [`daily-runbook.md`](daily-runbook.md), [`automation-cloud-mcp-setup.md`](automation-cloud-mcp-setup.md), y [`config/autonomy.json`](../config/autonomy.json).

## Ops (bloqueante)

- [ ] MCP Robinhood autenticado en **Cursor desktop** (chat local `snapshot` OK)
- [ ] MCP `robinhood-trading` en [cursor.com/agents](https://cursor.com/agents) con OAuth (Cloud Automations)
- [ ] **6 Automations** activas, timezone **US/Eastern**:
  - [ ] 8:00 — [`automation-01-premarket.md`](automation-01-premarket.md)
  - [ ] 9:35 — [`automation-02-market-open.md`](automation-02-market-open.md)
  - [ ] 12:00 + 15:00 — [`automation-03-intraday-monitor.md`](automation-03-intraday-monitor.md)
  - [ ] Vie 16:30 — [`automation-04-weekly-review.md`](automation-04-weekly-review.md)
  - [ ] Vie 17:00 — [`automation-05-ackman-calibration.md`](automation-05-ackman-calibration.md)
- [ ] `.env` con `RESEND_API_KEY` (local); Cloud secrets si aplica
- [ ] Test: `bash scripts/send-alert.sh digest "Test pre-absence" "OK if you receive this"`

## Portfolio

- [ ] Posiciones ≤ 2 (`config/risk-policy.json`)
- [ ] Cash ≥ 10%
- [ ] Thesis doc vigente por posición abierta en `logs/theses/`
- [ ] `logs/scorecard/positions.jsonl` actualizado (status open/closed)
- [ ] Fractional positions: monitoreo automation-03 activo (stops GTC no disponibles)

## Data pipeline

- [ ] `bash scripts/fetch-signals.sh all` ejecutado al menos una vez (SEC + skeleton)
- [ ] Agente sabe leer `data/signals/` (prompt §10)

## Al volver

1. Leer `logs/scorecard/weekly/` y `logs/trade-journal.md`
2. `snapshot` manual — confirmar NAV vs scorecard
3. Revisar `logs/intelligence/` por gaps de automation

## Referencia rápida

| Recurso | Path |
|---------|------|
| Scorecard schema | `logs/scorecard/schema.json` |
| Signal weights | `config/signal-weights.json` |
| Calibration policy | `config/calibration-policy.json` |
| Ackman PM workflow | `workflows/automation-05-ackman-calibration.md` |
| Macro regime | `config/macro-regime.json` |
| Runbook diario | `workflows/daily-runbook.md` |
