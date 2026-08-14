# Automation #8 — SPCX personal watch (Friday 6:00 PM ET)

**Modo:** solo información. **Cero trades.**  
**Cuenta:** posición **personal** de SpaceX (LP). **Prohibido** tocar Agentic.

Objetivo: **no perder dinero** — detectar cuándo el precio de SPCX (o el ciclo AI) se desconecta de los fundamentals, con foco en **trimestres de SpaceX**. No optimizar upside.

Config: [`config/spcx-personal-watch.json`](../config/spcx-personal-watch.json)

## Hard stops (si se viola, abortar)

1. **NO** `review_equity_order` / `place_equity_order` / `place_option_order` / `cancel_*` / `exercise_option`
2. **NO** `get_portfolio` / `get_equity_positions` / `get_accounts` para “decidir” o sizear — Agentic no es el sujeto
3. **NO** cambiar `config/risk-policy.json`, órdenes, watchlists, o signal-weights
4. Cotizaciones MCP **sí** (market data de SPCX + basket)
5. Email = digest informativo, no “acción del agente en broker”

## Pre-flight

1. Leer `config/spcx-personal-watch.json` (shares, avg cost, bandas SOTP, path trimestral, sell framework)
2. Leer el último `logs/spcx-watch/*.md` si existe (delta vs semana previa)
3. Prompt version: `prompt/manifest.json` (solo para el header del log)

## Fase 1 — Precio SPCX y mark personal

```
get_equity_quotes ["SPCX"]
get_equity_fundamentals ["SPCX"]
get_earnings_results symbol=SPCX
get_financials symbols=["SPCX"] period=quarterly limit=8
```

Calcular (no inventar lots):

- Precio = last RTH close; mencionar overnight si es material
- Market cap, shares, 52w high/low
- Mark = `shares × price` (desde JSON)
- Cost basis = `shares × averageCostUsd`
- P&L $ y %
- Distancia a banda **base / bull / bear**
- Si precio ≥ target del trimestre **antes** del quarter-end → **REASSESS EARLY** (no esperar al 30 sep / 31 dic)

## Fase 2 — Trimestre SpaceX (núcleo)

Etiquetar cada cifra: **FACT** / **COMPANY GUIDANCE** / **ANALYST** / **MODEL** / **INFERENCE**.

Cubrir, con lo último disponible:

| Bloque | Qué buscar |
|--------|------------|
| Print | Último Q reportado vs Street; fecha del **próximo** earnings |
| AI | Revenue, op. income/loss, capex AI, GW online, $/GW, contratos (tenor 90d, pack $6.7B oct-2026), concentración clientes |
| Starlink | Subs, revenue, ARPU, operating income |
| Launch/Starship | Cadencia Falcon, IFT/Starship, V3 |
| Claims Musk | Crossover AI vs resto (sep-2026), $100B ARR dic, 10 GW YE2027, $30–50/W, $1T 2030 — **no tratar como fact** |
| Scorecard | AHEAD / ON TRACK / BEHIND / BROKEN vs tabla en el JSON y en el memo 2026-08-14 |

**BROKEN** si: churn de cloud, miss de GW vs guía, miss de AI revenue **y** slip del pack de octubre, o colapso de Starlink OI.

## Fase 3 — Mercado AI (contexto de salida)

Quotes + fundamentals (y financials si hace falta) del basket:

`SPY, QQQ, NVDA, MSFT, GOOGL, AMZN, META, ORCL, AVGO`

WebSearch (Reuters/Bloomberg/CNBC/filings) solo para:

- Guías de **capex** hyperscaler (leading)
- Comentario de demanda GPU / backlog Nvidia
- 10Y / TIPS 10Y / IG spreads si hay dato reciente
- Semana: ¿corte de capex, war of cloud pricing, credit stress?

Clasificar el ciclo (sin usar “bubble” sin evidencia): healthy / stretched / speculative / deteriorating.

## Fase 4 — Capital preservation (la pregunta de la semana)

Responder en este orden:

1. **¿Hay señal de salir o de dejar de aportar $1,000/mes?** HOLD / STOP ADD / CONSIDER TRIM (10/20/25/50%) / THESIS BROKEN
2. **Por qué** (valuation vs FS, no “el precio subió”)
3. **Qué tendría que pasar la semana que viene** para cambiar el semáforo
4. Mapear precio actual al `sellFramework` del JSON ($160 / $200 / $300 / …)

El agente **recomienda**; el LP ejecuta (o no) en la cuenta personal. El agente **no** opera.

## Fase 5 — Output

Escribir:

- `logs/spcx-watch/YYYY-WW.md` (ISO week)
- `logs/spcx-watch/YYYY-WW.json` (números para comparar semana a semana)

Plantilla markdown:

```markdown
# SPCX personal watch YYYY-WW

**Prompt:** vX.Y.Z
**Modo:** INFORMATIONAL — no Agentic trades
**Goal:** capital preservation

## Semáforo
- Acción sugerida (personal): HOLD | STOP ADD | CONSIDER TRIM x% | THESIS BROKEN
- Grade trimestre: AHEAD | ON TRACK | BEHIND | BROKEN
- Early reassess: yes/no (precio vs target del Q)

## Mark (posición JSON, no Agentic)
- Shares / avg / price / value / P&L

## SPCX
- Precio, mkt cap, 52w
- Last quarter vs next earnings date

## SpaceX Q (AI / Starlink / Launch)
- Tabla FACT vs GUIDANCE vs ANALYST

## Mercado AI
- Basket 1w; capex/FCF/spreads notes

## Valuation vs bands
- Bear / base / bull; múltiplo tosco (mkt cap / NTM o / GW)

## Qué haría falta para vender
- Nivel de precio más cercano del framework + FS que lo justificarían

## Semana que viene
- 3 checks leading
```

JSON mínimo: `week, asOf, price, marketCap, shares, positionValue, pnlUsd, pnlPct, grade, suggestedAction, nextEarnings, aiNotes, earlyReassess`.

## Email

```bash
bash scripts/send-alert.sh digest "SPCX watch YYYY-WW — HOLD|STOP ADD|TRIM|BROKEN" "$(cat logs/spcx-watch/YYYY-WW.md)"
```

Si **THESIS BROKEN** o precio < banda bear **y** FS rotos → mismo script con tipo `urgent` y subject claro. Sigue **sin** tradear.

## Git

Commit **solo** `logs/spcx-watch/` (+ nada de risk-policy / órdenes).  
**No** `[deploy-site]`.  
**No** tocar Agentic.
