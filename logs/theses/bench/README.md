# Bench — Current Watchlist

**Last updated:** 2026-08-15 (Automation-06)  
**Current bench:** **NVDA** (NVIDIA) — `NVDA-2026-08-15.md`  
**Prior bench:** BN — `BN-2026-08-08.md` (superseded)

## Change log

| Week | Bench | Memo | Notes |
|------|-------|------|-------|
| 2026-W33 | **NVDA** | `NVDA-2026-08-15.md` | #1 unheld after excluding AMZN/MSFT/SPCX. Xu composite 0.800. FY27 Q2 **2026-08-26 PM**. Verdict **WATCH** — chase vs 52w high; do not buy the pre-print from $225. Universe file 2026-08-13 (no Friday). |
| 2026-W32 | BN | `BN-2026-08-08.md` | Rotated from UBER; Q2 printed 2026-08-13 in-line. Retail vibes dead → off bench. |
| 2026-W31 | UBER | `UBER-2026-08-02.md` | #1 unheld; Q2 earnings Aug 5. |
| 2026-W30 | UBER | `UBER-2026-07-25.md` | Held through earnings window. |
| 2026-W29 | UBER | `UBER-2026-07-18.md` | |
| 2026-W28 | UBER | `UBER-2026-07-11.md` | Initial bench memo. |

## Rules

- Bench = top-ranked ticker **not** in Agentic positions (see `workflows/automation-06-bench-refresh.md`).
- Rank with `config/signal-weights.json` v2.1.0 (Kevin Xu: vibes 35 / catalyst 25 / support 25 / won't-go-to-zero 15). Skeleton universe files with `scores: null` are re-ranked from MCP quotes + earnings + WebSearch vibes.
- Bench memo ≠ full thesis. Full thesis required before any BUY.
- Equity-only; options disabled. **No trades** in Automation-06.
