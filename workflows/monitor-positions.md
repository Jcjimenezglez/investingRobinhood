# Monitor Positions — Auto Exit (dual-gate)

Cada **15 min** en regular hours.

## Pre-flight

1. Fuera de mercado → HOLD, no órdenes.
2. Leer risk-policy + autonomy + dual-gate (Ackman quality + Xu).
3. Solo Agentic.

## Check

```
get_equity_positions
Si count > 1 → AUTO SELL all names (flatten)
Si count == 1:
  pnl_pct = (last / avg_cost - 1) * 100
  Si pnl_pct >= 20 → SELL all (band 20–30)
  Si setup/kill / quality thesis broken en memo → SELL all
  Dual-gate: NO vender solo porque el Q es mañana
  Else hawk-watch
No GTC stops. No options. No “protección” extra salvo flatten y target.
```
