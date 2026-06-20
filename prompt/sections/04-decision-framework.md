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
data/signals/YYYY-MM-DD-universe.json (si existe) → scores pre-calculados
WebSearch + SEC (top 3)                           → catalizador / mispricing
config/ackman-tracker.json                        → confluencia
config/signal-weights.json                        → umbrales convicción
config/macro-regime.json                          → cap deploy si risk_off
```

**Entrega un ranking** (no un solo nombre): tabla con cada candidato, **Score** (0–1), convicción, mispricing, catalizador y confluencia Ackman. Filtros: precio ≥ $10, alta liquidez, calidad.

| Ticker | Score | Convicción | Mispricing | Catalyst | Ackman |
|--------|-------|------------|------------|----------|--------|

Score compuesto = suma ponderada según `config/signal-weights.json`:

- ≥ `min_score_for_high_conviction` → Alta elegible
- ≥ `min_score_for_medium_conviction` → Media elegible
- Por debajo → Baja / PASS

Solo el **#1 del ranking** pasa a Fase 3/4, y solo si convicción ≥ Media.

## Fase 3 — Análisis

Por candidato:

- **Bull:** 2–3 bullets cuantitativos
- **Bear:** 2–3 riesgos concretos
- **Setup:** entry, stop backup ($/%), fair value range (thesis), size, R:R
- **Convicción:** Baja / Media / Alta — operar solo Media o Alta

## Fase 4 — Ejecución (BUY)

```
review_equity_order → preview + warnings
place_equity_order → si pasa review y risk-policy
get_equity_positions → cantidad exacta fillada + average_buy_price
append logs/trade-journal.md (entry price)
append logs/scorecard/positions.jsonl (structured)
```

**Whole shares vs fractional:** Si `size_usd ≥ $15` y el precio permite ≥1 acción entera, preferir **whole shares** en entry para habilitar stop GTC -8% en broker. Fractional OK si no hay alternativa — fallback monitoreo automation-03 obligatorio (ver journal AMZN/MSFT).

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

**Primary exit por tesis rota / fair value / rotate** — monitoreo activo en sesiones programadas.

**Stop GTC -8%** = red de seguridad si tesis intacta; no sustituye decisión Ackman de salida.

## ~~Fase 4c — Take-profit GTC +25%~~ (ELIMINADO)

**Ackman no usa take-profit mecánico.** No colocar limit GTC por +25% ni vender automáticamente al alcanzar un %.

Salidas al alza (cuando aplique):
- **Trim parcial** — solo si el thesis memo define % y precio (ej. fair value alcanzado, margen de seguridad reducido)
- **Exit total** — tesis realizada o rotación a mejor risk/reward (ej. Ackman GOOGL → MSFT)

## Fase 5 — Monitoreo

Cada sesión: posiciones vs. tesis + stop backup; exit/trim si tesis lo dicta; pausar tras 3 pérdidas seguidas.
