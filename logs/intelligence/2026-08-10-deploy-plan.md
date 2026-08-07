# Deploy Plan — LP Tranche 1 (~$1,000)

**Status:** **CONFIRMED** by LP 2026-08-07  
**Execution:** **2026-08-10 (Mon) 9:35 ET** — automation-02-market-open  
**Prompt version:** 1.8.8  
**Account:** Agentic ••••3029

---

## Tranche 1 — execute Monday

| # | Action | Ticker | Notional | Type | Thesis |
|---|--------|--------|----------|------|--------|
| 1 | **ADD** | **AMZN** | **$525.00** | Market fractional GFD | `logs/theses/AMZN-2026-06-19.md` |
| 2 | **BUY** | **BN** | **$475.00** | Market fractional GFD | `logs/theses/BN-2026-08-07.md` |

**Cash pre-trade:** ~$1,010  
**Cash post-trade (est.):** ~$90 (8% floor on NAV ~$1,120)  
**Trades today limit:** 2 — uses full daily allowance

### Gates (revalidate 8:00 ET Monday)

| Gate | Requirement |
|------|-------------|
| AMZN RSI | < 70 preferred — was **63** Fri |
| BN thesis memo | ✅ `BN-2026-08-07.md` |
| MSFT overbought block | N/A — not buying MSFT |
| `order_checks` empty | Required before `place_equity_order` |
| Regular hours | 9:35 ET only |
| Options | OFF — equity only |

### Workflow Monday

1. **08:00 ET** — pre-market: refresh quotes, RSI AMZN/BN, revalidate gates
2. **09:35 ET** — `review_equity_order` AMZN $525 → if OK → `place_equity_order`
3. **09:35 ET** — `review_equity_order` BN $475 → if OK → `place_equity_order`
4. Post-fill — append `logs/trade-journal.md` + `logs/scorecard/positions.jsonl`
5. Email digest if trades executed (`autonomy.json` executeButNotifyImmediately)

### Estimated post-trade book

| Component | Value (est.) |
|-----------|--------------|
| AMZN | ~$578 (~52% equity) |
| BN | ~$475 (new) |
| MSFT | ~$40 |
| SPCX | ~$16 |
| Cash | ~$90 |
| **NAV** | ~$1,120 |

---

## Tranche 2 — ~$1,000 (when settles)

**Decision deferred** — evaluate on settlement day with fresh data:

| Scenario | Likely action |
|----------|---------------|
| MSFT RSI < 70, tesis intacta | ADD MSFT ~$525 |
| BN Q2 beat (13-ago) | ADD BN or HOLD |
| AMZN pullback < $265 | ADD AMZN |
| UBER estabiliza post-miss | Starter ~$475 |

---

*LP confirmed plan 2026-08-07 · No trades Fri — market closed Sat/Sun*
