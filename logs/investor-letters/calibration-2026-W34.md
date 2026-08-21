# Dual-gate calibration memo — Week 2026-W34

**Decision:** HALTED  
**Prompt version:** 2.2.3  
**As of:** 2026-08-21 (Fri 17:00 ET / 21:01 UTC)

## Why we halted

Today's Weekly Review files are **missing**:

- `logs/scorecard/weekly/2026-W34.md`
- `logs/scorecard/weekly/2026-W34-suggestions.json`

`config/calibration-policy.json` → `haltCalibrationWhen.missingWeeklyReview` is **true**. Dual-gate calibration does not invent attribution. Latest available scorecard is **2026-W33** (review date 2026-08-14); that is last week's book, not this week's evidence.

## Weights (unchanged)

Xu timing file `config/signal-weights.json` (v2.1.0, `lastCalibratedWeek` **2026-W33**):

| Dimension | Weight |
|-----------|--------|
| retail_attention_vibes | 0.35 |
| near_term_catalyst | 0.25 |
| support_not_chase | 0.25 |
| wont_go_to_zero | 0.15 |

Sum = 1.0. Conviction floors unchanged (medium 0.55 · high 0.72). Ackman/Pershing quality stays a **checklist** (`config/ackman-quality-screen.json`), not a second weight vector.

## Book (session scope)

- **No trades.** Options OFF. No margin.
- Open dual-gate name **not flattened** this session.
- Fallback Ackman all-in remains **standby** until review **2026-09-19** unless the quality thesis breaks.

## Next week

- Run Weekly Review first so `2026-W34` or `2026-W35` scorecard + suggestions exist.
- Prefer **NO_CHANGE** while a dual-gate swing is still open and completed-swing evidence is weak.
- Bounded apply remains max **±0.03** per timing weight per week, floors 0.05–0.40.

---

*Dual-gate Calibration PM · automation-05 · Agentic only · Not financial advice.*
