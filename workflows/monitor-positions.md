# Monitor Positions — Auto Exit (Kevin Xu)

Cada **15 min** en regular hours.

## Pre-flight

1. Fuera de mercado → HOLD, no órdenes.
2. Leer risk-policy + autonomy + kevin-xu-playbook.
3. Solo Agentic.

## Check

```
get_equity_positions
Si count > 1 → AUTO SELL all names (flatten)
Si count == 1:
  pnl_pct = (last / avg_cost - 1) * 100
  Si pnl_pct >= 20 → SELL all (band 20–30)
  Si earnings hoy/mañana (get_earnings_calendar / memo) → prefer SELL before print (Xu coin flip); MUST sell if already +20–30%
  Si setup/kill en memo → SELL all
  Else hawk-watch
No GTC stops. No options.
```
