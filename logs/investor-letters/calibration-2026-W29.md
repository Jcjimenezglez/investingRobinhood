# Calibration memo — Week 2026-W29

**Decision:** NO_CHANGE

## What we learned

This was a **zero-trade, pre-earnings week** with meaningful relative performance but insufficient evidence to reweight. NAV moved **+99bps** ($102.36 → $103.38) while SPY fell **−124bps** — the book outperformed the benchmark WoW. Since inception the fund remains **+3.38% vs SPY −0.61%** (+399bps alpha). Wed's HWM at $105.46 (+5.5% vs start) validated catalyst proximity into the late-July earnings window before Friday profit-taking pulled NAV back.

**Which signal explained results best?** `catalyst_proximity_days` and `ackman_confluence` (attribution +0.8 each). Earnings windows tightened to ~12–14 days; MSFT ranked #1 in our universe all week; AMZN held #4 with max 13F add (+19.2%). Both theses are intact with earnings imminent.

**Was conviction calibrated?** Directionally yes, but marginally inverted. Media-Alta (MSFT) led Alta (AMZN) by ~18bps since entry (+4.63% vs +4.45%) — well below the 2% bar for threshold moves. We **hold conviction thresholds** (medium 0.55 · high 0.72) until post-earnings outcomes.

**Evidence vs noise?** Noise for weight changes. Zero trades, zero exits, and WoW NAV move +0.99% (<1%) triggers our `no_evidence` rule. Weekly review proposed modest boosts to catalyst and mispricing, but trimming `social_sentiment` would breach the 0.05 weight floor, and proposed deltas net +0.02 without rebalance. Ackman discipline: **few decisions, high conviction** — we wait for earnings, not one quiet week.

## Weight changes (if any)

| Dimension | Was | Now |
|-----------|-----|-----|
| fundamental_quality | 0.34 | 0.34 |
| mispricing_vs_fair_value | 0.26 | 0.26 |
| catalyst_proximity_days | 0.22 | 0.22 |
| ackman_confluence | 0.13 | 0.13 |
| social_sentiment | 0.05 | 0.05 |

*No changes applied. Proposed deltas reviewed and rejected per `no_evidence` policy rule and minWeightFloor violation.*

**Thresholds:** unchanged (medium 0.55 · high 0.72)

## Next week

- Ranking continues with current `config/signal-weights.json` from **Monday pre-market**.
- Hold ~24% cash pre-earnings; no adds until post-earnings clarity.
- Watch AMZN Q2 (~30 Jul) and MSFT Q4 FY26 (~29 Jul) earnings windows.
- Intraday monitor continues automation-03 @ 12:00 / 15:00 ET.
- Revisit weights after earnings attribution in W30 review.

---

*Ackman Calibration PM · automation-05 · Agentic only · No trades executed · Not financial advice.*
