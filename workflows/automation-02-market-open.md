# Automation #2 — Market Open Cycle (9:35 AM ET)

**Modo:** trades OK (regular hours).

## Pre-flight

Kevin Xu mandate. `config/kevin-xu-playbook.json`. Solo Agentic.

## Fase 1 — Snapshot

Si **>1 equity** → Fase flatten (SELL all). No BUY.

## Fase 2 — Scan

Universe + scanner. Don't chase. No 13F.

## Fase 3

| Acción | Condición |
|--------|-----------|
| **FLATTEN** | count > 1 (AMZN/MSFT/SPCX legacy) |
| **SELL** | unique name ≥ +20% or setup dead |
| **BUY** | count 0, #1 Alta, memo, not extended, cash ≥ 8% post |
| **CASH** | no setup |
| **HOLD** | one name, P&L < 20, setup intact |

Sizing: Alta ~92% · Media ~60% · Baja = 0. **No stop GTC.**

## Output

`logs/intelligence/YYYY-MM-DD-0935-open.md` + journal + email on trades.
