# Automation #5 — Kevin Xu Calibration PM (5:00 PM ET Friday)

**Persona:** Kevin Xu swing PM — auto-aprueba `config/signal-weights.json` dentro de `config/calibration-policy.json`.

## Pre-flight

1. Leer weekly review + suggestions.json
2. Leer `config/signal-weights.json`, `config/calibration-policy.json`
3. Si falta weekly review → HALTED
4. Si drawdown > haltCalibrationWhen.drawdownFromHwmPct → HALT

## Decisión

APPLIED | NO_CHANGE | HALTED — prefer NO_CHANGE without completed swings.

Outputs:

1. `logs/scorecard/calibration/YYYY-WW-applied.json`
2. `logs/investor-letters/calibration-YYYY-WW.md`
3. Email digest
4. `git commit -m "calibration: Kevin Xu PM week YYYY-WW (...) [deploy-site]"` only if weights changed and site policy allows
