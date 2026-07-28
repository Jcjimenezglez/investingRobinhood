# Proposal — Paycheck Compounder (DRAFT, inactive)

**Status:** borrador para activar solo tras gate **C** (`post-earnings-strategy-gate.md`)  
**Nombre propuesto:** `paycheck-compounder`  
**Filosofía:** dinero como **salario semilla** — consistencia, aportes mensuales, sin lotería.

## Objetivo

| Dimensión | Ackman actual | Paycheck propuesto |
|-----------|---------------|--------------------|
| Job | Alpha / thesis / 1.3–1.7× soft anual | **P&L mensual estable** en $ y % modestos |
| Horizonte | 3–12 meses por tesis | Swings **5–20 sesiones** + holds de calidad si edge claro |
| Riesgo | Concentración Alta hasta 50% | Max **25–30%** por nombre; preferir 2–4 ideas |
| Aportes | AUM fijo ~$100 | LP **+$100/mes** (depósito humano en Robinhood) |
| Opciones | Long call/put satélite | **Default off** al inicio (evitar decay / lotería) |
| Éxito | Thesis correct + alpha vs SPY | **Meses verdes ≥6/12** · max drawdown controlado · $ ganados/mes creciendo con AUM |

## Soft targets (no forzar)

- **Mensual:** +1% a +3% del NAV (aspiración). Un mes flat o −1% con reglas respetadas = OK.
- **Anual:** ~1.1×–1.4× sobre capital promedio — **por debajo** del techo Ackman 2× a propósito.
- **Nunca:** chase para “recuperar el mes” con size extra o options 0DTE.

## Mecánica de trading (sin volverse loco)

1. **Universe:** mismo researchUniverse de calidad (liquidez); sin penny stocks.
2. **Setup:** descuento vs calidad + catalizador claro **o** pullback técnico en tendencia alcista de nombre de calidad — documentar mini-thesis (1 página).
3. **Size:** Media ≈ 20–25% NAV; Alta ≈ 30% max; min order $15.
4. **Risk:** stop backup **−5% a −6%** (más tight que −8% Ackman); max 1–2 trades/día; max 4/semana.
5. **Take profit:** parcial **+4% a +8%** permitido (paycheck mode SÍ usa trim mecánico opcional) — resto corre con trailing mental / stop subido a BE.
6. **Earnings:** no abrir posición nueva &lt;3 sesiones antes del print propio; holds existentes → size reducido o hedge solo si policy lo permite.
7. **Cash:** mínimo 15–20% siempre.
8. **Aporte $100/mes:** tratar el depósito como “nómina reinvertida” — desplegar en 2–4 tranches la semana del depósito, no all-in day 1.

## Lo que esto NO es

- Day trading de ruido / scalping.
- Covered calls / CSP (siguen fuera de MCP multi-leg / policy actual; con AUM chico casi no pagan “salario” de verdad).
- Promesa de renta fija. Equity risk permanece.

## Activación (checklist)

Cuando letter #003 diga **C — PIVOT_PAYCHECK**:

1. Renombrar strategy en `config/risk-policy.json` → `paycheck-compounder`
2. Ajustar sizing, stops, returnAspiration, options.enabled=false (fase 1)
3. Reescribir `prompt/sections/03-strategy.md` + `01-identity.md` (CIO paycheck / still disciplined)
4. Actualizar `config/fund-mandate.json` clientMandate
5. Bump `prompt/manifest.json` (ej. 1.9.0)
6. Runbook: añadir review mensual de “paycheck scorecard” ($ P&L del mes)

## Relación con Ackman

No tiramos la disciplina de tesis. Paycheck **hereda**: escribir por qué entramos, kill criteria, no inventar datos.  
Lo que cambia es el **job del capital**: salario compuesto, no concentrated activist alpha.
