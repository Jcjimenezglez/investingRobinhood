# Estrategia: Kevin Xu All-In Swing

Lee `config/risk-policy.json`, `config/fund-mandate.json`, `config/kevin-xu-playbook.json`.

## Mandato

**investingRobinhood** existe para **hacer dinero** en cuenta Agentic (~$118 live NAV) con el playbook público de **Kevin Xu**:

| Kevin Xu | Nuestro fondo Agentic |
|----------|----------------------|
| All-in **1** stock a la vez | **Máximo 1** posición equity |
| Solo shares | Solo equity; cash account |
| No margin / no options / no crypto | Igual — hard rules |
| Swing 20–30%, days–weeks | Igual; screenshot rule |
| Buy support + catalyst; never chase | Igual |
| No stop-loss | No GTC stop; exit por target o setup muerto |
| WSB/memes en su historia | **LP overlay: no memes** — calidad que la gente obvia |

## All-in, no three-pack

- **Sí:** desplegar ~92% del NAV en **un** setup Alta.
- **Sí:** vender entero al **+20–30%** o cuando el rumor ya es noticia.
- **Sí:** pasar a cash si no hay setup (no forzar).
- **No:** 3 nombres a la vez (el libro AMZN/MSFT/SPCX es **legado** — flatten next session).
- **No:** hold de trimestres estilo Ackman.

## Proceso (obligatorio antes de BUY)

1. **¿Es un negocio real y líquido?** No meme, no penny, no crypto.
2. **¿La gente lo obvia?** Crowd elsewhere — no el nombre que ya es screenshot de todos.
3. **Catalizador días–semanas** — no tesis 3–12m.
4. **¿Ya corrió?** Si el move hacia el catalyst ya es ≥20%, **PASS** (don't chase).
5. **Support** — RSI/SMA como timing, no como tesis.
6. Memo → `logs/theses/TICKER-YYYY-MM-DD.md`
7. Si hay **otra** posición abierta → venderla primero.
8. `review_equity_order` → `place_equity_order` (shares). **No** colocar stop GTC.

## Universo

`researchUniverse` es hunting ground. Scanner puede añadir calidad overlooked que pase filtros.

**Blocklist memes:** GME, AMC, BBBY, KOSS, EXPR.

**Solo Agentic.** SPCX personal del LP no entra en sizing.

ETFs: no como estrategia. Cash si no hay swing.

## Sizing (~$118 NAV — recalc live)

| Convicción | Deploy |
|------------|--------|
| **Alta** | ~92% NAV (all-in the one name) |
| **Media** | ~60% (starter; prefer wait for Alta) |
| **Baja** | $0 |

Cash mínimo **8%**.

## Horizonte

**Días a semanas.** Xu: “I'm a swing trader. I'm not an investor.”

## Opciones / margen / crypto — OFF

- No `place_option_order`. No upgrade a limited margin para “all-in más grande”.
- Crypto no existe en este fondo.
