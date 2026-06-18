# Framework de decisión

## Fase 1 — Reconocimiento (READ ONLY)

```
get_accounts → identificar Agentic
get_portfolio + get_equity_positions → cash, P&L, buying power
get_equity_orders → órdenes pendientes
```

Entrega snapshot en ~5 líneas: cash, posiciones, P&L, riesgo usado vs. límites.

## Fase 2 — Scan amplio (obligatorio antes de elegir)

**Nunca decidir entre solo 1–3 nombres anclados.** Escanea **todo** `researchUniverse` de `config/fund-mandate.json` (GOOGL, HOOD, AMZN, META, AAPL, MSFT, NVDA, UBER, QSR, BN — incluye los reales de Ackman).

```
get_equity_quotes (todos los del universo)        → precio, cambio %
get_equity_fundamentals (top candidatos)          → P/E, FCF, márgenes, 52w
get_popular_watchlists                            → movers, earnings próximos
get_equity_tradability                            → operabilidad
WebSearch + SEC (top 3)                           → catalizador / mispricing
config/ackman-tracker.json                        → confluencia
```

**Entrega un ranking** (no un solo nombre): tabla con cada candidato, convicción, mispricing, catalizador y confluencia Ackman. Filtros: precio ≥ $10, alta liquidez, calidad.

Solo el **#1 del ranking** pasa a Fase 3/4, y solo si convicción ≥ Media.

## Fase 3 — Análisis

Por candidato:

- **Bull:** 2–3 bullets cuantitativos
- **Bear:** 2–3 riesgos concretos
- **Setup:** entry, stop ($/%), target ($/%), size, R:R
- **Convicción:** Baja / Media / Alta — operar solo Media o Alta

## Fase 4 — Ejecución (BUY)

```
review_equity_order → preview + warnings
place_equity_order → si pasa review y risk-policy
get_equity_positions → cantidad exacta fillada + average_buy_price
append logs/trade-journal.md (entry price)
```

## Fase 4b — Stop GTC -8% (obligatorio tras BUY en `go`)

Parte del mismo `go`, inmediatamente después del fill:

```
stop_price = average_buy_price × (1 - stopLossPct/100)   # default -8%
review_equity_order → side=sell, type=stop_market, quantity=shares_available_for_sells, stop_price, time_in_force=gtc
Si order_checks {} → place_equity_order (mismos params)
Registrar stop en trade-journal + intelligence log
```

**Si el stop GTC falla** (ej. fractional no aceptado en stop):
- Log en `logs/alerts/` + journal
- Fallback: monitoreo manual con `check` a 12:00 y 15:00 ET; vender si ≤ stop backup

**Primary exit por tesis rota** sigue en monitoreo — stop/take-profit GTC son automáticos en el broker.

## Fase 4c — Take-profit GTC +25% (obligatorio tras BUY en `go`)

Inmediatamente después del stop (misma corrida `go`):

```
limit_price = average_buy_price × (1 + takeProfitPct/100)   # default +25%
review_equity_order → side=sell, type=limit, quantity=shares_available_for_sells, limit_price, time_in_force=gtc
Si order_checks {} → place_equity_order
Registrar take-profit en trade-journal
```

**Si el broker rechaza dos órdenes sell GTC** (stop + limit misma cantidad): intentar take-profit primero o stop según `order_checks`; alerta en logs/alerts/ + fallback `check`.

**Si limit GTC falla** (fractional): fallback monitoreo — vender todo en `check` si P&L ≥ +25%.

## Fase 5 — Monitoreo

Cada sesión: posiciones vs. stop/target; exit si aplica; pausar tras 3 pérdidas seguidas.
