# Calibration memo — Week 2026-W31

**Decision:** APPLIED

## What we learned

This was a **zero-trade week** with outsized NAV appreciation driven by earnings catalysts. NAV rose **+13.79%** WoW ($99.50 → $113.22) while SPY rose **+1.06%** — the book materially outperformed the benchmark. Since inception, the fund is **+13.22% vs SPY −0.10%** (+13.32% alpha). Drawdown from HWM is **0.00%** (new high at $113.22).

**Which signal explained results best?** `catalyst_proximity_days` (attribution +0.8). Dual earnings beats — MSFT Q4 FY26 EPS $4.74 vs est $4.23 (Jul 29 AMC), AMZN Q2 EPS $5.75 vs est $1.82 (Jul 30 AMC) — delivered +16.8% and +15.5% single-day moves. Catalyst timing validated.

**Was conviction calibrated?** Partially inverted again. Media-Alta (MSFT, +23.56%) outperformed Alta (AMZN, +14.74%) by ~8.8% since entry — well above the 2% bar, but in the wrong direction for lowering the Alta threshold. Both theses remain intact; MSFT at $465 exceeds optional trim zone ($430). We **hold conviction thresholds** (medium 0.55 · high 0.72).

**Evidence vs noise?** Strong evidence for bounded reweight. Zero trades and zero exits, but WoW NAV move +13.79% far exceeds the 1% `no_evidence` threshold. Catalyst and fundamental signals delivered; social sentiment delta rejected at policy floor.

## Weight changes (if any)

| Dimension | Was | Now |
|-----------|-----|-----|
| fundamental_quality | 0.34 | **0.35** |
| mispricing_vs_fair_value | 0.27 | **0.25** |
| catalyst_proximity_days | 0.21 | **0.22** |
| ackman_confluence | 0.13 | 0.13 |
| social_sentiment | 0.05 | 0.05 |

*Partial apply: `social_sentiment` −0.01 rejected (minWeightFloor 0.05). Rebalanced via `mispricing_vs_fair_value` −0.02. Weights sum to 1.0.*

**Thresholds:** unchanged (medium 0.55 · high 0.72)

## Next week

- Ranking uses updated `config/signal-weights.json` from **Monday pre-market**.
- MSFT trim review: price $465.10 ≥ $430 optional trim — evaluate manual ~33% trim; no auto-exit.
- AMZN post-Q2: monitor AWS growth; optional trim at $285 not reached.
- Intraday monitor continues automation-03 @ 12:00 / 15:00 ET.
- Cash 22.1%; ADD only if new high-conviction thesis passes gates.

---

*Ackman Calibration PM · automation-05 · Agentic only · No trades executed · Not financial advice.*
