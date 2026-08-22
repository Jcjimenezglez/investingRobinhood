# Estrategia: calidad Ackman + timing Xu

Lee `config/risk-policy.json`, `config/fund-mandate.json`, `config/kevin-xu-playbook.json`, `config/ackman-quality-screen.json`.

**Capa 1 (Ackman):** calidad ≥4/6. **Capa 2 (Xu):** no chase + catalizador + un nombre. All-in **solo si ambas** pasan. Hold through Q / ~1 mes+ permitido en ese caso.

**New-entry universe (LP 2026-08-22):** upcoming earnings **only**. Verified report date **7–10 calendar days** inclusive. Under 7d → not a new buy (HOLD if already in). Over 10d → not a new buy (dead time). Unverified date → PASS. **No** news-bomb / headline overlay. **AVGO stays.**

## Su filtro (el que usamos)

| Kevin Xu | Agentic |
|----------|---------|
| All-in **1** stock | Máximo 1 equity |
| No margin / options / crypto / pennies | Igual |
| Terminally online — vibes, no DCF | Scanner + Reddit + WebSearch de X (sin MCP de pago). No Keywords Everywhere |
| Buy support + catalyst | Igual |
| Never chase | PASS si ya corrió ≥20% into the event |
| Sell 20–30% **antes del Q** si el run-up ya lo dio | All-out; el print es coin flip |
| No stop-loss | No GTC stop |
| GME early (él lo hizo) | Permitido si pasa las reglas de arriba |

Darling retail / meme: **in** si pasa Xu (early) **y** calidad ≥2/6 (no penny). Calidad ≥4/6 + Xu Alta = all-in. 13F **no** es overlay de BUY.

## All-in

- ~92% Alta en **un** nombre.
- Flatten AMZN/MSFT/SPCX next session (legado Ackman).
- Cash si no hay setup.

## Pre-Q run-up (Xu)

Si el mercado **espera un Q bueno**, la acción suele subir **días antes** del report. Ese drift **es** el swing.

- Comprar en soporte **solo** si el print verificado está **7–10 días** calendario inclusive.
- Si ya vas **+20–30%** → **vender**, aunque el earnings sea mañana. No hace falta el print.
- Si ya estás dentro y el Q cae bajo 7d → **HOLD** through the print (no vender porque el Q está cerca).
- Si el nombre **ya** subió ≥20% into the Q → **PASS** (llegaste tarde; eso era el move).
- Q &gt;10d → **PASS** new buy (dead time).

## Proceso antes de BUY

1. Checklist Ackman ≥2/6 (Alta pide ≥4/6). 13F no autoriza.
2. ¿Puede ir a **cero overnight**? Options/crypto/penny → PASS.
3. ¿Hay **atención retail / vibes** + catalizador días–semanas?
4. ¿Está en **soporte**, no chase?
5. Memo → flatten other names → `review` → `place` shares. **No stop.**

## Universo

Seed `researchUniverse` = watchlist only. **NEW BUY** = `entryUniverse` in `config/fund-mandate.json`: verified Q 7–10 calendar days inclusive. Precio ≥ $5, no penny. NVDA-style Q&lt;7d is not a new buy.

## Sizing

Alta ~92% · Media ~60% · Baja $0. Cash 8%.
