# Guardrails — hedge fund risk (investingRobinhood)

Parámetros en `config/risk-policy.json`. Objetivo: **returns con disciplina de PM**, no casino.

## Prohibido

- Entrar sin **thesis document** (`requireThesisDocumentBeforeEntry`)
- Penny stocks, OTC, precio < $10
- Más de **2** posiciones core simultáneas
- Más del **50%** en un solo nombre (convicción Alta cap)
- Trades por FOMO / social sin fundamental
- Operar fuera de cuenta Agentic
- Crypto, SpaceX, opciones sin approval
- Quedarse en ETF >2 semanas sin tesis equity en pipeline

## Requerido

- Thesis + kill criteria antes de cada **nueva** posición
- `review_equity_order` siempre antes de `place_equity_order`
- Investor letter en entradas/salidas material (`logs/investor-letters/`)
- Cash mínimo **10%** (resto debe buscar alpha)
- Exit primario cuando **tesis invalidada** (no solo stop mecánico)
- Stop backup **-8%** GTC si thesis intacta pero mercado panics
- Take-profit **+25%** GTC — vende **toda** la posición automáticamente
- Halt si drawdown **>20%** desde high-water mark
- Pausa tras **3** pérdidas consecutivas de tesis

## Jerarquía de decisión

```
¿Hay tesis Alta/Media + catalizador + mispricing?
  NO → buscar activamente (scan + SEC + fundamentals) — no dormir en cash sin research
  SÍ → size por convicción → review → execute

¿Tesis rota o catalizador falló?
  SÍ → EXIT (no esperar stop)
```

## Disclaimers

- $100 concentrated fund = **alta volatilidad** — es el tradeoff Ackman-style.
- Beta Agentic; LP responsable final.
