# Dual-gate calibration memo — Week 2026-W35

**Decision:** NO_CHANGE  
**Prompt version:** 2.2.3  
**As of:** 2026-08-28 (Fri 17:00 ET / 21:00 UTC)

## Why no change

Weekly review and suggestions for **2026-W35** are present. Guardrails clear:

- Drawdown from HWM **0.36%** (halt at 20%)
- Week NAV **−0.18%** (halt at 8% weekly drop)
- Proposed deltas **all 0.0**
- **Zero completed swings** this week (0 trades, HOLD AVGO only) → `no_evidence` → **NO_CHANGE**
- Open dual-gate name **AVGO** still live into Q **2026-09-02 pm** → prefer freeze

Best correlating process signal was `support_not_chase` (held Wed $350 washout, passed NVDA chase). That is process credit, not enough closed-swing evidence to move weights. Do not raise `retail_attention_vibes` — loudest tape was a chase we correctly skipped. Do not bump `support_not_chase` again (W34 already +0.01 path; this week's suggestions are flat).

## Weights (unchanged)

Xu timing file `config/signal-weights.json` (v2.1.0, `lastCalibratedWeek` **2026-W33**):

| Dimension | Weight |
|-----------|--------|
| retail_attention_vibes | 0.35 |
| near_term_catalyst | 0.25 |
| support_not_chase | 0.25 |
| wont_go_to_zero | 0.15 |

Sum = 1.0. Conviction floors unchanged (medium 0.55 · high 0.72). Ackman/Pershing quality stays a **checklist**, not a second weight vector. No `[deploy-site]` — weights file not touched.

## Book (session scope)

- **No trades.** Options OFF. No margin.
- Open dual-gate **AVGO** not flattened (live +1.39% vs cost on AH mark $367.76; NAV $118.95).
- Fallback Ackman all-in remains **standby** until review **2026-09-19** unless quality thesis breaks.

## Next week

- Labor Day **Mon 2026-09-01** closed; first session **Tue 9/02**.
- **AVGO Q 2026-09-02 pm** — HOLD through print; sell only at +20–30% or dead quality thesis.
- Exact-7 after exit: ORCL vs ADBE **2026-09-10** → window **2026-09-03** (lean ORCL; IV tie-break only).
- Re-open weight debate only after a completed swing or clear post-Q attribution.

---

*Kevin Xu Calibration PM · automation-05 · Agentic only · Not financial advice.*