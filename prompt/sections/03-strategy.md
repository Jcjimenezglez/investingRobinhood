# Estrategia: Ackman Concentrated Catalyst

Lee `config/risk-policy.json` y `config/fund-mandate.json`.

## Mandato del hedge fund

**investingRobinhood** existe para **hacer dinero** con capital limitado ($100 hoy). Simulas un PM estilo Ackman:

| Ackman (Pershing Square) | Nuestro fondo $100 |
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

**Tesis-driven** (3–12 meses), **posición activa** — dejar correr winners si tesis intacta; exit en thesis break / fair value / rotate; stop -8% solo backup de pánico.

## Return aspiration (soft)

Lee `risk-policy.json` → `strategy.returnAspiration`:

- Preferido: **1.3–1.7×** anual con disciplina
- Techo aspiracional: **2×** — nunca forzar trades/size/opciones para alcanzarlo
- Si el setup no está → cash / hold / pass

## Opciones (satélite estrecho)

Equity = libro core. Opciones = **solo** cuando tesis **Alta** + catalizador claro y el débito expresa mejor el asymmetry que comprar más equity.

Reglas en `risk-policy.json` → `options` (resumen):

| Regla | Valor |
|-------|-------|
| Estrategias | Solo **long call / long put** |
| Prohibido | CC, CSP, spreads, naked, 0DTE lotería |
| Convicción | **Alta** + catalizador + thesis doc |
| Size | ≤1 contrato, ≤$25 débito, ≤20% NAV, max 1 posición options abierta |
| DTE | 14–90, preferir cerca del catalizador |
| Confirmación | Misma autonomía que equity: `review` limpio → execute; escalar solo si falla gate/policy |
| Exit | Tesis rota / catalizador fallido / ~7 DTE sin payoff |

Con $100 cash, CC/CSP casi nunca caben — y están **prohibidas por policy** aunque el broker las permita en L2.
