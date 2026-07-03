# Calibration memo — Week 2026-W27

**Decision:** APPLIED

## What we learned

This was another **zero-trade week** — we held AMZN (Alta) and MSFT (Media-Alta) through a +3.53% NAV recovery while SPY gained +1.12% over the same Mon–Thu window. Since inception the fund is **+2.35% vs SPY −0.40%**, producing **+275bps of alpha**. Discipline and catalyst timing did the work.

**Which signal explained results best?** `ackman_confluence` (attribution +0.8) and `catalyst_proximity_days` (+0.6). MSFT ranked #1 in our universe all week; AMZN held #4 with a max 13F add (+19.2%). Both names rallied into the late-July earnings window — the catalyst runway tightened to ~26–27 days and the book responded.

**Was conviction calibrated?** Partially. Media-Alta (MSFT) outperformed Alta (AMZN) by ~115bps since entry (+3.52% vs +2.37%). That remains below our 2% threshold for moving conviction bars. We **hold thresholds** until Q2 earnings (~late Jul) settle the Alta vs Media-Alta question.

**Evidence vs noise?** Enough to act modestly. Zero trades, but NAV moved >1% WoW and attribution was directionally clear. Social sentiment showed no predictive edge (−0.1). We trim it to the policy floor; we do not overhaul a two-name book on one recovery week.

## Weight changes

| Dimension | Was | Now |
|-----------|-----|-----|
| fundamental_quality | 0.36 | **0.34** |
| mispricing_vs_fair_value | 0.25 | **0.26** |
| catalyst_proximity_days | 0.20 | **0.22** |
| ackman_confluence | 0.12 | **0.13** |
| social_sentiment | 0.07 | **0.05** |

*Rebalance: proposed deltas netted +0.02; `fundamental_quality` absorbed −0.02 to preserve sum = 1.0. `social_sentiment` at minWeightFloor.*

**Thresholds:** unchanged (medium 0.55 · high 0.72)

## Next week

- Ranking uses updated `config/signal-weights.json` from **Monday pre-market**.
- Hold ~24% cash pre-earnings; no adds until post-earnings clarity.
- Watch AMZN / MSFT earnings windows (~30 Jul / ~29 Jul).
- Intraday monitor continues automation-03 @ 12:00 / 15:00 ET.
- Jul 3 market holiday — marks from Jul 2 close.

---

*Ackman Calibration PM · automation-05 · Agentic only · No trades executed · Not financial advice.*
