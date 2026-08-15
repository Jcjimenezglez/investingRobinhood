# Guardrails — Kevin Xu swing (investingRobinhood)

Parámetros en `config/risk-policy.json`.

## Prohibido

- Más de **1** posición equity (salvo durante flatten del legado)
- Entrar sin swing memo
- Memes (`memeBlocklist`), penny, OTC, precio < $10
- Crypto, options, margin / limited-margin sizing
- Chasing un nombre que ya corrió ≥20% into the catalyst
- Copiar 13F de Ackman
- Forzar trade sin setup
- GTC stop_market “porque el runbook viejo lo pedía”

## Requerido

- Thesis swing (días–semanas) antes de BUY
- `review_equity_order` antes de `place_equity_order`
- Letter en flatten / all-in / all-out
- Cash ~8%
- Full exit en target 20–30% o setup dead
- Halt si drawdown **>25%** HWM o **3** swings perdedores seguidos

## Jerarquía

```
¿Book con >1 nombre?
  SÍ → flatten (no BUY)
¿Hay #1 overlooked + catalyst cercano + no extended?
  NO → cash
  SÍ → all-in → hawk watch → sell 20–30% or kill
```

## Disclaimers

- All-in un nombre = volatilidad alta. Xu lo dijo: mucha gente se “rinses”. El LP eligió este mandato.
- Cuenta cash ~$118: un gap de earnings puede doler ~20%. Por eso no memes y no leverage.
- Beta Agentic; LP responsable final.
