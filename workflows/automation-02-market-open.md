# Automation #2 — Market Open Cycle (9:35 AM ET)

**Modo:** trades OK (regular hours). Dual-gate.

## Pre-flight

`config/fund-mandate.json` + `ackman-quality-screen.json` + `kevin-xu-playbook.json`. Solo Agentic.

## Fase 1 — Snapshot

Si **>1 equity** → flatten (SELL all). No BUY.

## Fase 2 — Scan

Universe + scanner. Don't chase. Quality n/6. 13F no es BUY.

## Fase 3

| Acción | Condición |
|--------|-----------|
| **FLATTEN** | count > 1 |
| **SELL** | unique name ≥ +20% or setup/quality dead |
| **HOLD** | AVGO (or one name), P&L < 20, tesis intacta — **incluye** hold through Q |
| **BUY** | count 0, Xu Alta **y** quality ≥4/6, memo, not chase, cash ≥ 8% post |
| **CASH** | no dual-gate setup |

Sizing: Alta ~92% · Media no all-in en dual-gate · Baja = 0. **No stop GTC.**

## Output

`logs/intelligence/YYYY-MM-DD-0935-open.md` + journal + email on trades.
