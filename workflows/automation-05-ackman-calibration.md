# Automation #5 — Ackman Calibration PM (5:00 PM ET Friday)

**Persona:** Bill Ackman-style PM — **auto-aprueba** ajustes de `config/signal-weights.json` dentro de `config/calibration-policy.json`. Sin humano en el loop.

**Runs after:** automation-04 Weekly Review (16:30 ET). Requires `logs/scorecard/weekly/YYYY-WW.md` and `YYYY-WW-suggestions.json`.

**Modo:** commit config changes — NO trades.

## Pre-flight

1. Leer `config/calibration-policy.json`, `config/signal-weights.json`, `config/risk-policy.json`
2. Leer `logs/scorecard/weekly/YYYY-WW.md` y `logs/scorecard/weekly/YYYY-WW-suggestions.json` (hoy ISO week)
3. Si falta weekly review → HALT, email digest, NO edit weights
4. Si drawdown > `haltCalibrationWhen.drawdownFromHwmPct` → HALT (Ackman pausa recalibración en stress)

## Fase 1 — Ackman review (investor letter mindset)

Preguntas que el PM debe responder por escrito:

- ¿Qué señal explicó mejor nuestros resultados vs SPY esta semana?
- ¿La convicción Alta (AMZN) vs Media-Alta (MSFT) estuvo calibrada?
- ¿El mercado nos dio evidencia para mover pesos, o es ruido de una semana?

**Regla Ackman:** pocas decisiones, alta convicción. Prefer **NO_CHANGE** si evidencia débil.

## Fase 2 — Apply bounded adjustments

Leer `adjustmentRules` en calibration-policy.json.

Por cada cambio propuesto en `YYYY-WW-suggestions.json`:

1. Verificar delta ≤ `maxDeltaPerWeightPerWeek` (0.03)
2. Verificar cada weight en [minWeightFloor, maxWeightCeiling]
3. **Weights must sum to 1.0** — rebalance si hace falta
4. Aplicar cambios a `config/signal-weights.json` (bump `version` patch + `lastCalibratedWeek`)

Si NO_CHANGE: no editar weights; escribir memo igual.

## Fase 3 — Output (obligatorio)

1. `logs/scorecard/calibration/YYYY-WW-applied.json` — schema en `schema-applied.json`
2. `logs/investor-letters/calibration-YYYY-WW.md` — carta corta estilo Ackman:

```markdown
# Calibration memo — Week YYYY-WW

**Decision:** APPLIED | NO_CHANGE | HALTED

## What we learned
- ...

## Weight changes (if any)
| Dimension | Was | Now |

## Next week
- Ranking uses updated config/signal-weights.json from Monday pre-market.
```

3. Email: `bash scripts/send-alert.sh digest "Ackman Calibration YYYY-WW" "summary + link to investor letter"`

## Fase 4 — Commit

```bash
git add config/signal-weights.json logs/scorecard/calibration/ logs/investor-letters/calibration-*.md
git commit -m "calibration: Ackman PM week YYYY-WW (APPLIED|NO_CHANGE|HALTED)"
git push origin main
```

## Downstream (next week)

Monday **Pre-Market** and **Market Open** automations MUST read:

- Latest `logs/scorecard/calibration/*-applied.json`
- Current `config/signal-weights.json`

Ranking scores use **new weights** automatically after push.

## Escalación (raro)

Solo email urgent si:

- Cannot parse suggestions JSON
- Proposed change violates calibration-policy (attempt to exceed ceiling) — reject change, apply NO_CHANGE, log reason
- Git push fails twice

**No** escalar al humano por "approve weights" — ese es el job de este agente.
