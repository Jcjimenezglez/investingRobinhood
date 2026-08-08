# TICKER — Bench Memo

**Fund:** investingRobinhood  
**Date:** YYYY-MM-DD  
**Status:** **BENCH** (not deployed)  
**Universe rank:** **#N** (composite **X.XXX**) — **#1 unheld** (held tickers excluded)  
**PM conviction (bench):** Alta / Media / Baja  
**Proposed size (if promoted):** $XX–YY (% of AUM)  
**Catalyst timeline:** [next catalyst] · [secondary catalyst]

**Ackman confluence:** [yes/no + 13F context]  
**Prompt version:** X.Y.Z (equity-only; options OFF) · **Signal weights:** vX.X.X  
**Universe source:** `data/signals/YYYY-MM-DD-universe.json` · **Regime:** neutral/bull/bear

---

### 1. Why on bench (ranking context)

- **Held tickers excluded:** [list]
- **Signal scores** (`config/signal-weights.json`):

| Component (weight) | Score |
|--------------------|-------|
| Fundamental quality (35%) | X.XX |
| Mispricing vs fair value (26%) | X.XX |
| Catalyst proximity (22%) | X.XX |
| Ackman confluence (12%) | X.XX |
| Social sentiment (5%) | X.XX |
| **Composite** | **X.XXX** |

- **vs current book:** NAV · Cash % · open positions summary

**Technical timing overlay** (not in composite score):

| Indicator | Value | Read |
|-----------|-------|------|
| RSI (14d) | X.X | |
| MACD | Histogram X.XX | |
| 50 SMA | $XX.XX | Price above/below SMA |

---

### 2. Business quality (Ackman: "great business")

[1 paragraph — moat, cash generation, management]

---

### 3. Why mispriced (variant perception)

- **Market believes:** …
- **We believe:** …
- **Evidence:** …

---

### 4. Catalyst

| Catalyst | Expected date | Impact if right |
|----------|---------------|-----------------|
| … | … | … |

---

### 5. Valuation sketch / price of interest

- **Current price:** $XX.XX
- **52-week range:** $XX – $XX
- **Our fair value range (12 mo, base):** $XX – $XX
- **Bull case fair value:** $XX – $XX
- **Bear / reassessment zone:** $XX – $XX
- **Entry zone of interest:** $XX–XX

---

### 6. Kill criteria (draft — promote to full thesis before BUY)

- [ ] …

---

### 7. Bear case (what kills us)

1. …

---

### 8. Promotion criteria (bench → full thesis → trade)

| Gate | Status |
|------|--------|
| Bench memo written | ✅ |
| Full thesis in `logs/theses/TICKER-YYYY-MM-DD.md` | ❌ required before BUY |
| Cash ≥ minCashReservePct | |
| Conviction ≥ Media (0.55) | |
| Catalyst window | |
| Options policy | ✅ equity-only |

**Veredicto:** WATCH / ROTATION_CANDIDATE / PASS

*Automation-06 bench refresh · Agentic only · Not financial advice.*
