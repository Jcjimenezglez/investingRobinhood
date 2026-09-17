# Automation #2 — Market Open Cycle (9:35 AM ET)

**Modo:** trades OK (regular hours). Dual-gate.

## Pre-flight

`config/fund-mandate.json` + `ackman-quality-screen.json` + `kevin-xu-playbook.json`. Solo Agentic.

Live AVGO (entered 2026-08-19 for 2026-09-02 pm): **HOLD** until +20–30% or dead thesis. Do not flatten because the new-entry window is exactly 7d.

## Fase 1 — Snapshot

Si **>1 equity** → flatten (SELL all). No BUY.

## Fase 2 — Scan

Universe + scanner + `get_earnings_results` / calendar. Don't chase. Quality n/6. 13F no es BUY.

New BUY filter (after AVGO): verified report date **exactly 7 calendar days** (`minDaysBeforeEarnings: 7`, `maxDaysBeforeEarnings: 7`). Under 7 or over 7 = PASS. Unverified date = PASS. No news-bomb overlay.

## Fase 3

| Acción | Condición |
|--------|-----------|
| **FLATTEN** | count > 1 (legacy multi-name only — not AVGO single-name) |
| **SELL** | unique name ≥ +20% or setup/quality dead |
| **HOLD** | one name, P&L < 20, tesis intacta — **incluye** hold through Q even if days-to-Q ≠ 7 |
| **BUY** | count 0, Xu Alta **y** quality ≥4/6, memo, not chase, **verified Q exactly 7 calendar days**, cash ≥ 8% post |
| **CASH** | no dual-gate setup **or** days-to-Q ≠ 7 **or** date unverified |

Sizing: Alta ~92% · Media no all-in en dual-gate · Baja = 0. **No stop GTC.**

## Output

`logs/intelligence/YYYY-MM-DD-0935-open.md` + journal + email on trades.
