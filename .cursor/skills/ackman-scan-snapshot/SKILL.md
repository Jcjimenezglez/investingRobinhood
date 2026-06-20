---
name: ackman-scan-snapshot
description: >-
  CIO Ackman scan and snapshot for investingRobinhood Agentic fund. Runs Robinhood
  MCP portfolio read, full researchUniverse ranking, SEC/macro intel, Ackman 13F
  confluence, and structured output. Use when the user says scan, snapshot, CIO
  brief, pre-market review, ranking universo, or Ackman-style market snapshot.
disable-model-invocation: true
---

# Ackman Scan + Snapshot

CIO workflow for **investingRobinhood** ($100 Agentic, Ackman mandate). Read this skill **immediately** when invoked.

## Config (read first)

1. `prompt/manifest.json` — load all sections in `loadOrder`
2. `config/fund-mandate.json`, `config/risk-policy.json`, `config/ackman-tracker.json`
3. `config/autonomy.json`, `config/monitoring.json` (if positions exist)
4. Latest `logs/intelligence/*.md` if present (automation pre-market / open runs)

**Account:** Agentic only (`agentic_allowed=true`). Never trade or report on other accounts.

## Command routing

| User says | Mode | Trades |
|-----------|------|--------|
| `snapshot` | Snapshot only | No |
| `scan` | Snapshot + full universe scan | No |
| `scan` + trade intent | Scan then offer #1 for Fase 3 | Only if user confirms |
| `prep` | Same as scan, explicit NO-GO default | No |

---

## Mode A — `snapshot` (Fase 1)

### MCP (required)

```
get_accounts → Agentic account_number
get_portfolio, get_equity_positions, get_equity_orders
get_equity_quotes (open positions only)
```

### Compute per position

```
entry = average_buy_price
stop  = entry × (1 - stopLossPct/100)   # default 8 from risk-policy — backup only
fair_value = from logs/theses/ memo (not mechanical +25%)
pnl_pct = (price / entry - 1) × 100
```

### Also report

- Cash vs `minCashReservePct`, buying_power vs `minOrderUsd`, invested vs `maxPortfolioInvestedPct`
- P&L day on portfolio (quotes vs adjusted_previous_close)
- Distance to stop backup per position; fair value vs price from thesis memo
- Last automation intel file (1–2 bullets) if exists
- **No** full universe scan unless user also asked `scan`

### Output format

Use template from `prompt/sections/06-response-format.md` — **MARKET SNAPSHOT** block only (skip CANDIDATOS ranking unless positions need thesis check).

---

## Mode B — `scan` (Fase 1 + 2)

Run **Mode A** first, then:

### MCP — full universe

All tickers in `config/fund-mandate.json` → `researchUniverse`:

```
get_equity_quotes (all)
get_equity_fundamentals (all, batch ≤10)
get_equity_tradability (Agentic account)
get_popular_watchlists → upcoming earnings
```

### Intelligence layers

| Layer | Source |
|-------|--------|
| Macro | WebSearch: market today, Fed, sector tech |
| SEC | Top 3 candidates: 8-K, guidance |
| Ackman | `config/ackman-tracker.json` confluence |
| Social | WebSearch, max 20% convicción weight |

### Ranking table (required)

Every ticker in universe — columns:

| # | Ticker | Convicción | Mispricing | Catalizador 3–12m | Ackman |

Filters: price ≥ $10, liquid, tradable Agentic.

**Rules:**

- GOOGL degraded if Ackman exited (see tracker `confluenceWithFundMemo`)
- Only #1 with convicción ≥ Media passes to trade discussion
- Insufficient deployable cash (< minOrderUsd or cash < 10% post-trade) → HOLD / ADD existing only / ROTATE / EXIT

### Output format

Full `06-response-format.md` template: SNAPSHOT + **CANDIDATOS** + **RECOMENDACIÓN** + **RIESGOS**.

### Persist intel

Write `logs/intelligence/YYYY-MM-DD-HHmm.md` with summary (same content as chat, condensed). Do not skip if user didn't ask — scan always logs.

---

## Canvas (optional)

If output is data-heavy (full ranking 10 rows + positions), prefer **`/canvas`** per canvas skill: fund dashboard with stats, allocation, ranking. Skip canvas for quick snapshot.

---

## Escalation

If MCP fails or risk limits breached:

```bash
bash scripts/send-alert.sh urgent "motivo" "detalle"
```

---

## Do not

- Scan only 1–3 tickers — always full `researchUniverse`
- Trade on `scan`/`snapshot` without explicit user `trade` / `go` / autonomy session
- Copy Ackman 13F mechanically — confluence only
- Claim social sources not actually searched

## Related commands

- `analiza TICKER` → Fase 3 deep dive on one name
- `trade TICKER $XX` → Fase 4 with review_equity_order
- `go` → full cycle including execution (market hours)

See `workflows/daily-runbook.md` and `workflows/automation-01-premarket.md` for automation parity.
