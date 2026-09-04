# Dual-gate calibration memo — Week 2026-W36

**Decision:** APPLIED  
**Prompt version:** 2.2.3  
**As of:** 2026-09-04 (Fri 17:00 ET / 21:00 UTC)

## What we learned

Weekly review and suggestions for **2026-W36** are present. Guardrails clear:

- Drawdown from HWM **5.69%** (halt at 20%)
- Week NAV **−5.35%** ($118.95 → $112.59; halt at 8% weekly drop)
- **One completed swing:** AVGO SELL Thu **2026-09-03** @ **$346.4001** (−4.50% / −$4.86) after soft Q4 guide gap
- Book now **CASH** — no open dual-gate name → freeze bias lifted
- Proposed deltas within ±0.03 bound; weights stay in [0.05, 0.40]; sum = 1.0

**Best correlating signal:** `support_not_chase` (+0.6) — refused ORCL/ADBE at wrong day-count and KR exact-7 after the timing exit. **Lesson on catalyst:** print arrived on time, but soft guide made the post-news path a coin-flip; holding into Q was plan, the P&L hurt was timing not quality.

## Weight changes

| Dimension | Was | Now |
|-----------|-----|-----|
| retail_attention_vibes | 0.35 | 0.35 |
| near_term_catalyst | 0.25 | **0.24** |
| support_not_chase | 0.25 | **0.26** |
| wont_go_to_zero | 0.15 | 0.15 |

Sum = 1.0. Conviction floors unchanged (medium 0.55 · high 0.72). Ackman/Pershing quality stays a **checklist**, not a second weight vector. `lastCalibratedWeek` → **2026-W36**. Commit includes `[deploy-site]`.

## Book (session scope)

- **No trades.** Options OFF. No margin. Did not flatten an open name (already cash).
- Julio autopsy / three-gate harden still outranks the next ALL-IN; fallback **standby** until reviewDate **2026-09-19** (process clock).

## Next week

- HOLD cash until dual-gate + exact-7 (min=max=7) + autopsy clear.
- Exact-7 Mon **2026-09-07** (Q on 2026-09-14): live re-scan only.
- Do **not** chase ORCL/ADBE past their 9/03 window.
- Ranking uses updated `config/signal-weights.json` from Monday pre-market.

---

*Kevin Xu Calibration PM · automation-05 · Agentic only · Not financial advice.*