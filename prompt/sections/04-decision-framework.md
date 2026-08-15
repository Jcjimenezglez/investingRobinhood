# Framework de decisión

## Fase 0 — Flatten legado (prioridad)

Si Agentic tiene **más de 1** equity (hoy: AMZN, MSFT, SPCX) o el libro sigue siendo el three-pack Ackman:

1. **No BUY.**
2. En regular hours: `review` + `place` **SELL market** (o limit at bid) de **todas** las posiciones, `shares_available_for_sells`.
3. Tax lots si aplica.
4. Journal + letter: transition off Ackman book.
5. Cash → Fase 2 para el **próximo** swing (puede ser el mismo día si settlement/buying_power lo permite; si cash account unsettled → wait).

MSFT ya ~+31% desde costo: Xu ya habría vendido.

## Fase 1 — Reconocimiento (READ ONLY)

```
get_accounts → Agentic cash
get_portfolio + get_equity_positions → cash, P&L, count
get_equity_orders → pendientes
```

Si `positions.length > 1` → volver a Fase 0.

## Fase 2 — Scan (antes de elegir)

Escanea `researchUniverse` + scanner + retail-attention names. **No** ackman-tracker. Social/vibes es señal principal.

```
get_equity_quotes
get_earnings_calendar + get_earnings_results
get_equity_technical_indicators (#1–#3) → support vs chase
WebSearch Reddit + X chatter (no paid X MCP, no Keywords Everywhere).
config/kevin-xu-playbook.json
config/signal-weights.json
```

Ranking:

| Ticker | Score | Vibes | Catalyst (d–w) | Support / chase? | Won't go to 0? | Call |

- Chase / penny / no catalyst → PASS
- Meme/retail darling **no** es PASS automático — solo si ya corrió o es penny

## Fase 3 — Análisis

- **Vibes / retail attention**
- **Catalizador**
- **Por qué no es chase**
- **Kill:** rumor is news, extension, penny-risk
- **Target:** +20–30%
- **Convicción:** Baja / Media / Alta

## Fase 4 — Ejecución (BUY)

```
get_equity_price_book → no chase the ask
review_equity_order → place_equity_order
get_equity_positions
journal + scorecard
```

**No Fase 4b stop GTC.** Xu no usa stops.

**Fase 4c take-profit:** al +20–30% vender **100%**. Prefer limit; monitor puede market-sell si el print ya está ahí.

**Fase 4d options:** OFF.

## Fase 5 — Monitor / EXIT

Cada sesión, para la **única** posición:

- P&L% ≥ 20 (band 20–30) → SELL all
- Screenshot / news fully priced → SELL all
- Setup muerto → SELL all
- Aparece un segundo nombre → flatten (error)

Tax-aware sells: `get_equity_tax_lots` when lots exist.
