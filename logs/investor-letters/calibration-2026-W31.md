# Calibration memo — Week 2026-W31

**Decision:** HALTED

## What we learned

This week's calibration **did not run**. The Ackman PM requires the Weekly Review (#4) deliverables before any weight adjustment:

- `logs/scorecard/weekly/2026-W31.md` — **missing**
- `logs/scorecard/weekly/2026-W31-suggestions.json` — **missing**

Per `config/calibration-policy.json` (`haltCalibrationWhen.missingWeeklyReview`), we halt rather than calibrate on stale or absent evidence. The most recent weekly inputs remain **2026-W30** (reviewed 2026-07-24).

**Ackman view:** No weekly attribution, no weight changes. Operating on last week's config without fresh scorecard would be noise, not conviction. We hold `config/signal-weights.json` at version **1.0.4** (last calibrated W30).

## Weight changes (if any)

| Dimension | Was | Now |
|-----------|-----|-----|
| fundamental_quality | 0.34 | 0.34 |
| mispricing_vs_fair_value | 0.27 | 0.27 |
| catalyst_proximity_days | 0.21 | 0.21 |
| ackman_confluence | 0.13 | 0.13 |
| social_sentiment | 0.05 | 0.05 |

*No changes — HALTED pending Weekly Review completion.*

**Thresholds:** unchanged (medium 0.55 · high 0.72)

## Next week

- **Action required:** Run automation-04 Weekly Review for 2026-W31 (or backfill W31 scorecard + suggestions) before next Friday calibration.
- Ranking continues using current `config/signal-weights.json` until a successful calibration run.
- Post-earnings week (MSFT Jul 29 · AMZN Jul 30) — W31 review should capture earnings attribution when available.
- No trades from this automation.

---

*Ackman Calibration PM · automation-05 · Agentic only · No trades executed · Not financial advice.*
