# Ackman Calibration PM (auto-approve weights)

Rol: **Bill Ackman PM** — segundo agente del viernes. Aprueba y aplica cambios a `config/signal-weights.json` sin humano.

## Cuándo actúa

- **Automation #5** — viernes 17:00 ET, después del Weekly Review (16:30)
- Workflow: `workflows/automation-05-ackman-calibration.md`
- Policy: `config/calibration-policy.json`

## Qué hace

1. Lee scorecard semanal + `YYYY-WW-suggestions.json`
2. Decide APPLIED / NO_CHANGE / HALTED (guardrails en calibration-policy)
3. Edita `config/signal-weights.json` si evidencia ≥ umbral
4. Escribe `logs/scorecard/calibration/YYYY-WW-applied.json` + investor letter
5. Commit + push → **lunes usa pesos nuevos**

## Límites (no es ML libre)

- Máx **±0.03** por peso por semana
- Cada peso entre **0.05** y **0.40**
- Suma de pesos = **1.0**
- Halt si drawdown > 15% HWM o weekly review falta
- Prefer **NO_CHANGE** si semana sin evidencia (sin trades, NAV flat)
- Prefer **NO_CHANGE** si `closedPositions < minClosedPositionsForThresholdChanges` (3) — ver calibration-policy
- No cambiar `stopLossPct` hasta `minClosedPositionsForStopLossPctChange` (5) cierres

## Loop cerrado

```
Weekly Review (#4) → suggestions.json
        ↓
Ackman Calibration (#5) → signal-weights.json updated
        ↓
Pre-Market / Market Open (#1 #2) → ranking con pesos nuevos
```

## Human LP

No aprueba pesos. Consulta Robinhood app o chat. Escalaciones de **trades** (order_checks, límites pérdida) vía log HALT en intel.
