# Calibration memo — Week 2026-W28

**Decision:** NO_CHANGE

## What we learned

This was a **zero-trade, pre-earnings consolidation week**. NAV moved −6bps ($102.42 → $102.36) while SPY gained +82bps — the book gave back a sliver of relative ground into the late-July catalyst window. Since inception the fund remains **+2.36% vs SPY +0.95%** (+141bps alpha), but week-over-week action was too quiet to justify reweighting.

**Which signal explained results best?** `ackman_confluence` (attribution +0.8) and `catalyst_proximity_days` (+0.7). MSFT ranked #1 in our universe all week; AMZN held #4 with max 13F add (+19.2%). Both theses are intact with earnings ~21 days out — the catalyst runway tightened, but NAV did not confirm with meaningful movement.

**Was conviction calibrated?** Yes, directionally. Alta (AMZN) now leads Media-Alta (MSFT) by ~134bps since entry (+3.65% vs +2.31%), still below the 2% bar for threshold moves. We **hold conviction thresholds** (medium 0.55 · high 0.72) until post-earnings outcomes.

**Evidence vs noise?** Noise. Zero trades, zero exits, NAV move <1% WoW triggers our `no_evidence` rule. Weekly review proposed modest boosts to catalyst and mispricing, but trimming `social_sentiment` would breach the 0.05 weight floor. Ackman discipline: **few decisions, high conviction** — we wait for earnings, not one flat week.

## Weight changes (if any)

| Dimension | Was | Now |
|-----------|-----|-----|
| fundamental_quality | 0.34 | 0.34 |
| mispricing_vs_fair_value | 0.26 | 0.26 |
| catalyst_proximity_days | 0.22 | 0.22 |
| ackman_confluence | 0.13 | 0.13 |
| social_sentiment | 0.05 | 0.05 |

*No changes applied. Proposed deltas reviewed and rejected per `no_evidence` policy rule.*

**Thresholds:** unchanged (medium 0.55 · high 0.72)

## Next week

- Ranking continues with current `config/signal-weights.json` from **Monday pre-market**.
- Hold ~24% cash pre-earnings; no adds until post-earnings clarity.
- Watch AMZN Q2 (~30 Jul) and MSFT Q4 FY26 (~29 Jul) earnings windows.
- Intraday monitor continues automation-03 @ 12:00 / 15:00 ET.
- Revisit weights after earnings attribution in W29/W30 review.

---

*Ackman Calibration PM · automation-05 · Agentic only · No trades executed · Not financial advice.*
