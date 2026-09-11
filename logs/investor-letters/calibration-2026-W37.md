# Dual-gate calibration memo — Week 2026-W37

**Decision:** NO_CHANGE  
**Prompt version:** 2.2.3  
**As of:** 2026-09-11 (Fri 17:00 ET / 21:07 UTC)

## Why no change

Weekly review and suggestions for **2026-W37** are present. Guardrails clear:

- Drawdown from HWM **5.69%** (halt at 20%)
- Week NAV **0.00%** ($112.59 → $112.59; halt at 8% weekly drop)
- Proposed deltas **all 0.0**
- **Zero completed swings** this week (0 trades, flat cash) → `no_evidence` → **NO_CHANGE**
- No open dual-gate name (cash after AVGO exit W36) — freeze bias from open swing does not apply; evidence rule still blocks a move

Best correlating process signal was `support_not_chase` (+0.8) — refused ORCL/ADBE into/through print and killed BRTX (penny). That is process credit, not closed-swing attribution. Do not bump `support_not_chase` again (W36 already +0.01 / −0.01 near_term_catalyst). Do not raise `retail_attention_vibes` — loudest tape was a chase we correctly skipped.

## Weights (unchanged)

Xu timing file `config/signal-weights.json` (v2.1.0, `lastCalibratedWeek` **2026-W36**):

| Dimension | Weight |
|-----------|--------|
| retail_attention_vibes | 0.35 |
| near_term_catalyst | 0.24 |
| support_not_chase | 0.26 |
| wont_go_to_zero | 0.15 |

Sum = 1.0. Conviction floors unchanged (medium 0.55 · high 0.72). Ackman/Pershing quality stays a **checklist**, not a second weight vector. No `[deploy-site]` — weights file not touched (backup Friday deploy Action still available).

## Book (session scope)

- **No trades.** Options OFF. No margin. Did not flatten an open name (already cash).
- Julio autopsy / three-gate harden still outranks the next ALL-IN; fallback **standby** until reviewDate **2026-09-19** (process clock).

## Next week

- HOLD cash until dual-gate + exact-7 (min=max=7) + autopsy clear (~**2026-09-19**).
- Post-pause exact-7 lean: **NKE** Q **2026-10-01 pm** → window **2026-09-24** (prefer vs COST same day on washout). Research AZO/KBH 9/22 and MU 9/30 when windows land.
- Re-open weight debate only after a completed swing or clear attribution.

---

*Kevin Xu Calibration PM · automation-05 · Agentic only · Not financial advice.*