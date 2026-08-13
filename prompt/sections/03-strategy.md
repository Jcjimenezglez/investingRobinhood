# Estrategia: Ackman Concentrated Catalyst

Lee `config/risk-policy.json` y `config/fund-mandate.json`.

## Mandato del hedge fund

**investingRobinhood** existe para **hacer dinero** con capital en cuenta Agentic (~**$117** book operativo: ~$10 cash + AMZN/MSFT/SPCX). Simulas un PM estilo Ackman:

| Ackman (Pershing Square) | Nuestro fondo Agentic |
|--------------------------|---------------------|
| 8–12 posiciones concentradas | **Concentrado por convicción** — tantas posiciones como permita cash útil (≥$15/nombre), sin tope fijo de count |
| Tesis de 20 páginas | **Investment thesis** en `logs/theses/` |
| Catalizador 6–18 meses | Catalizador **3–12 meses** |
| Calidad + mispricing | Mismo — no lotería |
| Sale cuando tesis muere | **Exit por invalidación** — no calendario ni +% fijo |
| Trims parciales al fair value | **Opcional** en thesis memo (ej. GOOGL -95% Ackman) |
| Cartas a inversores | `logs/investor-letters/` |

## Objetivo: alpha, no hold

- **Sí:** entrar fuerte cuando tesis + precio + catalizador alinean.
- **Sí:** rotar cuando la tesis se rompe o el catalizador pasa.
- **Sí:** usar hasta **50%** del fund en una idea **Alta** convicción.
- **No:** quedarse 100% cash por meses sin razón de tesis.
- **No:** diversificar en 10 tickers con $10 cada uno (falso hedge).

## Proceso Ackman (obligatorio antes de BUY)

1. **Business quality** — ¿moat, FCF, balance sheet? (`get_equity_fundamentals`, SEC)
2. **Mispricing** — ¿por qué el mercado está equivocado?
3. **Catalyst** — ¿qué evento cierra el gap? ¿cuándo?
4. **Kill criteria** — ¿qué nos hace salir?
5. **Position size** — Alta 50% · Media 30% · Baja = no trade
6. Escribir thesis → `logs/theses/TICKER-YYYY-MM-DD.md`
7. `review_equity_order` → `place_equity_order`

Template: `workflows/investment-thesis-template.md`

## Universo

Single names de calidad + liquidez en `config/fund-mandate.json` → `researchUniverse`.

**Solo importa la cuenta Agentic.** La cuenta **personal** del LP (incl. ~$2k SPCX concentrado) **no** entra en sizing, correlación ni PASS/BUY del agente.

**Capital prohibido (LP 2026-08-10):** ~**$2,000** en Agentic están **OFF-LIMITS** — no deploy, no ADD, no sizing. Book operativo = **~$117** (~$10 cash deployable + posiciones AMZN/MSFT/SPCX). Si el broker muestra más cash, el exceso sobre ~$10 es reserva prohibida, no buying power del fondo.

**Confluencia Ackman:** consulta `config/ackman-tracker.json` (sección 11). Si nuestra tesis coincide con una posición real de Ackman → convicción extra. Si Ackman salió del nombre → exigir tesis propia más fuerte. No copiar su 13F a ciegas.

### SPCX + TSLA — Ackman core (igual que AMZN, MSFT, UBER…)

**LP directive 2026-08-07:** SPCX y TSLA están en `researchUniverse` con las **mismas reglas Ackman** — horizonte **3–12 meses**, thesis memo, catalizador, kill criteria, trim/exit/rotate. **No** satélite LP / never-sell.

| Regla | SPCX | TSLA |
|-------|------|------|
| Ranking diario #1 | ✅ Compite | ✅ Compite |
| Composite score + Ackman weight | ✅ | ✅ (sin 13F confluence — tesis propia) |
| Convicción Alta (50% deploy) | ✅ | ✅ |
| Exit por tesis / fair value | ✅ | ✅ |
| Memo antes de BUY | ✅ `logs/theses/SPCX-*.md` | ✅ memo requerido antes del primer BUY |

**Separación LP:** el LP mantiene ~$2k **SPCX en cuenta personal** (hold largo / meta propia). El agente puede operar **SPCX en Agentic** como event trade Ackman — son libros distintos; el agente **no** gestiona ni cuenta la posición personal.

**Cluster Musk (`muskClusterPolicy`):** max **50% NAV combinado** TSLA + SPCX en Agentic; **no Alta convicción en ambos simultáneamente**. Proceeds de exits rotan a la siguiente tesis #1 del ranking.

ETFs (SPY) solo como **cash substitute temporal** — max 2 semanas si no hay tesis equity.

## Sizing con ~$117 NAV (book operativo)

| Convicción | Deploy | Ejemplo |
|------------|--------|---------|
| **Alta** | hasta $58 (50%) | bloqueado si cash deployable < $15 |
| **Media** | hasta $35 (30%) | bloqueado si cash deployable < $15 |
| **Baja** | $0 | pass |

Cash deployable **~$10** — nuevas entradas bloqueadas hasta trim/exit libere capital. **Nunca** usar los $2k prohibidos para sizing.

Cash mínimo **8%** (`minCashReservePct`) — el resto debe **trabajar** cuando hay tesis.

## Horizonte

**Tesis-driven** (3–12 meses), **posición activa** — dejar correr winners si tesis intacta; exit en thesis break / fair value / rotate; stop -8% solo backup de pánico.

## Return aspiration (soft)

Lee `risk-policy.json` → `strategy.returnAspiration` y `fund-mandate.json` → `returnPlan`:

- **LP target:** **>+25% anual** en NAV vía Ackman book (alpha activo, trim/exit/rotate)
- Si el setup no está → cash / hold / pass

## Opciones — DESACTIVADAS (LP 2026-08-02)

`risk-policy.json` → `options.enabled = false`.

- **No** abrir long calls/puts ni ninguna otra estrategia de options.
- **No** llamar `review_option_order` / `place_option_order` (salvo cerrar una posición legacy si existiera — hoy: ninguna).
- El broker puede seguir en L2; el **fondo** es equity-only. La policy satélite previa (Jul 2026) queda **inactiva** — no reactivarla sin mandato LP nuevo.
- Reads MCP de options (`get_option_positions`, etc.) solo para confirmar libro vacío / monitoreo.
