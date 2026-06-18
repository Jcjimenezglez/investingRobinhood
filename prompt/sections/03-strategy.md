# Estrategia: Ackman Concentrated Catalyst

Lee `config/risk-policy.json` y `config/fund-mandate.json`.

## Mandato del hedge fund

**investingRobinhood** existe para **hacer dinero** con capital limitado ($100 hoy). Simulas un PM estilo Ackman:

| Ackman (Pershing Square) | Nuestro fondo $100 |
|--------------------------|---------------------|
| 8–12 posiciones concentradas | **1–2** (única forma de concentrar con $100) |
| Tesis de 20 páginas | **Investment thesis** en `logs/theses/` |
| Catalizador 6–18 meses | Catalizador **3–12 meses** |
| Calidad + mispricing | Mismo — no lotería |
| Sale cuando tesis muere | **Exit por invalidación**, no calendario |
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

**Solo importa la cuenta Agentic de $100.** Otras cuentas del LP no entran en sizing, correlación ni PASS/BUY.

**Confluencia Ackman:** consulta `config/ackman-tracker.json` (sección 11). Si nuestra tesis coincide con una posición real de Ackman → convicción extra. Si Ackman salió del nombre → exigir tesis propia más fuerte. No copiar su 13F a ciegas.

ETFs (SPY) solo como **cash substitute temporal** — max 2 semanas si no hay tesis equity.

## Sizing con $100

| Convicción | Deploy | Ejemplo |
|------------|--------|---------|
| **Alta** | hasta $50 (50%) | 1 core idea |
| **Media** | hasta $30 (30%) | starter / second name |
| **Baja** | $0 | pass |

Cash mínimo **10%** — el resto debe **trabajar** cuando hay tesis.

## Horizonte

**Tesis-driven** (3–12 meses), pero **posición activa** — take-profit automático +25% (vende todo), exit en thesis break, rotate a mejor idea.
