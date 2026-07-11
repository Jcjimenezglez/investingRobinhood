# Automation #6 — Bench Refresh (Saturday 14:00 UTC / 10:00 ET)

**Modo:** research-only — **NO trades** (`place_equity_order` prohibido).

## Pre-flight

1. Leer `prompt/manifest.json` + secciones en `loadOrder`
2. Leer `config/signal-weights.json`, `config/fund-mandate.json`
3. Cuenta **SOLO Agentic** (`agentic_allowed=true`)

## Fase 1 — Posiciones y universo

```
get_accounts → Agentic (agentic_allowed=true)
get_equity_positions → lista de tickers held
```

Excluir tickers en posiciones abiertas del bench.

## Fase 2 — Ranking

Leer el **último** `data/signals/*-universe.json` de la semana en curso (ISO week).

Seleccionar el ticker con **rank #1** que **no** esté en `get_equity_positions`.

Si el #1 está held, tomar el siguiente rank disponible hasta encontrar uno no held.

## Fase 3 — Bench memo

Escribir o actualizar `logs/theses/bench/TICKER-YYYY-MM-DD.md` usando `bench-memo-template.md`.

Incluir:

- Scores del universe JSON (composite + componentes)
- Fundamentals MCP (`get_equity_fundamentals`)
- Earnings timing (`get_earnings_results` o calendar)
- Ackman confluence (`config/ackman-tracker.json`)
- Contexto del book actual (cash, posiciones, por qué bench vs rotate)

## Fase 4 — Output

**NO** `review_equity_order` ni `place_equity_order`.

Commit y push **solo** `logs/theses/bench/` a `main`.

```bash
git add logs/theses/bench/
git commit -m "bench: TICKER YYYY-MM-DD — rank #N unheld candidate memo"
git push origin main
```

## Escalación

Si no hay universe JSON de la semana → HALTED, log en commit message, no inventar ranking.

Si todos los top-10 están held → escribir memo del #1 held con nota "rotation-only" o skip con log explícito (preferir memo del mejor unheld en top-10).
