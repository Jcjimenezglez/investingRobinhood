# Calibration memo — Week 2026-W32

**Decision:** APPLIED

## What we learned

NAV rose **+5.45%** WoW ($113.22 → $119.38) while SPY rose **+3.17%** — the book outperformed the benchmark. Since inception, the fund is **+19.38% vs SPY +3.40%** (+15.98% alpha). Drawdown from HWM is **0.00%** (new high at $119.38). One entry this week: SPCX starter $15 @ $115.04; no trims or exits.

**Which signal explained results best?** `catalyst_proximity_days` (attribution +0.7). SPCX unlock D+1 rebound (+15.7% in 2 sessions) and post-earnings follow-through on AMZN/MSFT validated catalyst timing. `fundamental_quality` (+0.7) held alongside — AMZN Q2/AWS +37% and MSFT Q4/Azure +43% theses intact.

**Was conviction calibrated?** Inverted again. Media-Alta (MSFT, +32.78%) outperformed Alta (AMZN, +16.05%) by ~16.8% since entry — well above the 2% bar, but in the wrong direction for lowering the Alta threshold. MSFT at $499.89 exceeds optional trim $430; SPCX at $133.11 ≈ FV low $130. We **hold conviction thresholds** (medium 0.55 · high 0.72).

**Evidence vs noise?** Modest evidence for a bounded reweight. Catalyst and fundamental signals delivered; mispricing trim signals emerging at fair value. `social_sentiment` delta rejected at policy floor — no predictive edge observed (−0.1 attribution).

## Weight changes (if any)

| Dimension | Was | Now |
|-----------|-----|-----|
| fundamental_quality | 0.35 | 0.35 |
| mispricing_vs_fair_value | 0.25 | **0.26** |
| catalyst_proximity_days | 0.22 | 0.22 |
| ackman_confluence | 0.13 | **0.12** |
| social_sentiment | 0.05 | 0.05 |

*Partial apply: `social_sentiment` −0.01 rejected (minWeightFloor 0.05). Rebalanced via `ackman_confluence` −0.01. Weights sum to 1.0.*

**Thresholds:** unchanged (medium 0.55 · high 0.72)

## Next week

- Ranking uses updated `config/signal-weights.json` from **Monday pre-market**.
- LP deposit deploy: $2k pending + $1,010 cash — size SPCX/TSLA per Ackman gates after memo.
- MSFT trim review: price $499.89 ≥ $430 optional trim — evaluate manual ~33% trim; no auto-exit.
- SPCX trim review: $133.11 ≈ FV low $130 — optional trim per memo if tesis intacta.
- TSLA watchlist: complete memo `logs/theses/TSLA-2026-08-07.md` before BUY.
- Intraday monitor continues automation-03 @ 12:00 / 15:00 ET.

---

*Ackman Calibration PM · automation-05 · Agentic only · No trades executed · Not financial advice.*
