# Calibration memo — Week 2026-W30

**Decision:** APPLIED

## What we learned

This was a **zero-trade week** with a meaningful giveback into the earnings window. NAV fell **−3.75%** WoW ($103.38 → $99.50) while SPY fell **−1.10%** — the book underperformed the benchmark on the week. Since inception, however, the fund remains **−0.50% vs SPY −1.19%** (+69bps alpha). Drawdown from HWM is **5.65%**, well inside the 15% calibration halt limit.

**Which signal explained results best?** `mispricing_vs_fair_value` (attribution +0.7). Pre-earnings pullbacks restored ~14–16% margin of safety vs thesis fair value bands — AMZN at $232 vs $270–290, MSFT at $382 vs $430–450 — without triggering trim criteria or invalidating fundamentals.

**Was conviction calibrated?** Partially inverted. Media-Alta (MSFT, +1.42%) outperformed Alta (AMZN, −1.95%) by ~337bps since entry — above the 2% bar for threshold review. Both theses remain intact with stops not hit. We **hold conviction thresholds** (medium 0.55 · high 0.72) until post-earnings outcomes; lowering the Alta bar pre-print would be premature.

**Evidence vs noise?** Sufficient for a modest, bounded reweight. Zero trades and zero exits, but WoW NAV move −3.75% exceeds the 1% `no_evidence` threshold. The mispricing signal gave us actionable insight: the selloff improved margin of safety without breaking thesis. Catalyst proximity weight trimmed given pre-earnings volatility cost. Social sentiment delta rejected — already at policy floor.

## Weight changes (if any)

| Dimension | Was | Now |
|-----------|-----|-----|
| fundamental_quality | 0.34 | 0.34 |
| mispricing_vs_fair_value | 0.26 | **0.27** |
| catalyst_proximity_days | 0.22 | **0.21** |
| ackman_confluence | 0.13 | 0.13 |
| social_sentiment | 0.05 | 0.05 |

*Partial apply: `social_sentiment` −0.01 rejected (minWeightFloor 0.05). Net delta zero — weights sum to 1.0.*

**Thresholds:** unchanged (medium 0.55 · high 0.72)

## Next week

- Ranking uses updated `config/signal-weights.json` from **Monday pre-market**.
- Hold ~25% cash through earnings; no adds until post-print clarity.
- MSFT Q4 FY26 earnings ~29 Jul; AMZN Q2 ~30 Jul.
- Intraday monitor continues automation-03 @ 12:00 / 15:00 ET.
- Revisit conviction thresholds after earnings attribution in W31 review.

---

*Ackman Calibration PM · automation-05 · Agentic only · No trades executed · Not financial advice.*
