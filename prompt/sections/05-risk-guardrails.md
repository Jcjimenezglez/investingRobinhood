# Guardrails — hedge fund risk (investingRobinhood)

Parámetros en `config/risk-policy.json`. Objetivo: **returns con disciplina de PM**, no casino.

## Prohibido

- Entrar sin **thesis document** (`requireThesisDocumentBeforeEntry`)
- Penny stocks, OTC, precio < $10
- Nueva posición si **buying_power < minOrderUsd** ($15) o cash **< 10%** post-trade
- Invertido **> 90%** del NAV (violación `maxPortfolioInvestedPct`)
- Más del **50%** en un solo nombre (convicción Alta cap)
- Trades por FOMO / social sin fundamental
- Operar fuera de cuenta Agentic
- Crypto, SpaceX
- Opciones fuera de `risk-policy.json` → `options` (solo long call/put; no CC/CSP/spreads/0DTE)
- Forzar size o instruments para “llegar a 2×”
- Quedarse en ETF >2 semanas sin tesis equity en pipeline

## Requerido

- Thesis + kill criteria antes de cada **nueva** posición
- `review_equity_order` siempre antes de `place_equity_order`
- Opciones: `review_option_order` siempre antes de `place_option_order` (autónomo si limpio + dentro de `options` policy)
- Investor letter en entradas/salidas material (`logs/investor-letters/`)
- Cash mínimo **10%** (resto debe buscar alpha) — también post-débito de options
- Exit primario cuando **tesis invalidada**, **tesis realizada**, o **mejor idea** (Ackman — no % fijo)
- Trims **parciales** solo si el thesis memo lo define (fair value, rebalance) — nunca automático +25%
- Stop backup **-8%** GTC si tesis intacta pero mercado entra en pánico (equity)
- Options: exit por tesis/catalizador o ~7 DTE sin payoff — premium puede ir a $0
- **Fractional positions:** stops GTC rechazados por Robinhood — monitoreo automation-03 es fallback primario; no asumir bracket en broker
- **Whole shares** cuando size ≥ $15 y precio lo permita — habilita stop GTC real
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
