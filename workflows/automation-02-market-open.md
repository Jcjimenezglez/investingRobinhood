# Automation #2 — Market Open Cycle (9:35 AM ET)

**Modo:** trades OK (regular hours). Dual-gate.

## Pre-flight

`config/fund-mandate.json` + `ackman-quality-screen.json` + `kevin-xu-playbook.json`. Solo Agentic.

Live AVGO (entered 2026-08-19 for 2026-09-02 pm): **HOLD** unless +20–30% or dead thesis. Do not flatten because of the 7–10d entry window.

## Fase 1 — Snapshot

Si **>1 equity** → flatten (SELL all). No BUY.

## Fase 2 — Scan

Universe + scanner + `get_earnings_results` / calendar. Don't chase. Quality n/6. 13F no es BUY.

New BUY filter: verified report date **7–10 calendar days** inclusive (`minDaysBeforeEarnings: 7`, `maxDaysBeforeEarnings: 10`). Unverified date = PASS. No news-bomb overlay.

## Fase 3

| Acción | Condición |
|--------|-----------|
| **FLATTEN** | count > 1 (legacy multi-name only — not AVGO single-name) |
| **SELL** | unique name ≥ +20% or setup/quality dead |
| **HOLD** | one name, P&L < 20, tesis intacta — **incluye** hold through Q even if days-to-Q &lt; 7 |
| **BUY** | count 0, Xu Alta **y** quality ≥4/6, memo, not chase, **verified Q in 7–10 calendar days inclusive**, cash ≥ 8% post |
| **CASH** | no dual-gate setup **or** Q &lt;7d **or** Q &gt;10d **or** date unverified |

Sizing: Alta ~92% · Media no all-in en dual-gate · Baja = 0. **No stop GTC.**

## Output

`logs/intelligence/YYYY-MM-DD-0935-open.md` + journal + email on trades.
