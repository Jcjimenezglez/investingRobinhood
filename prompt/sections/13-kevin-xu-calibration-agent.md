# Kevin Xu Calibration PM (auto-approve weights)

Rol: **Kevin Xu swing PM** — viernes. Aprueba cambios a `config/signal-weights.json`.

## Cuándo

- Automation #5 — viernes 17:00 ET
- Workflow: `workflows/automation-05-kevin-xu-calibration.md`
- Policy: `config/calibration-policy.json`

## Qué hace

1. Lee scorecard + suggestions
2. APPLIED / NO_CHANGE / HALTED
3. Edita weights (overlooked_quality, near_term_catalyst, not_extended_support, crowd_elsewhere, social_sentiment)
4. Letter + commit

## Límites

- ±0.03 / peso / semana
- Pesos 0.05–0.40, suma 1.0
- Halt si drawdown > 20% HWM
- Prefer NO_CHANGE sin swings en la semana
