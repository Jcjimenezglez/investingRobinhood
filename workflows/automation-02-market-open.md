# Automation #2 — Market Open Cycle (9:35 AM ET, lun–vie)

**Modo:** ciclo completo — TRADES permitidos (horario regular 9:30–16:00 ET).

## Pre-flight

1. Leer `prompt/manifest.json` + secciones en `loadOrder`
2. Leer `config/autonomy.json`, `config/risk-policy.json`, `config/fund-mandate.json`, `config/ackman-tracker.json`
3. Leer `workflows/daily-runbook.md`, `prompt/sections/09-autonomous-mode.md`
4. Leer el último `logs/intelligence/*-premarket.md` de hoy (sesión 8:00) si existe
5. Cuenta **SOLO Agentic** (`agentic_allowed=true`)

## Fase 1 — Snapshot

```
get_accounts → Agentic
get_portfolio, get_equity_positions, get_equity_orders
```

## Fase 1.5 — Stop Guard (PRIMERO, antes de scan/entradas)

**Objetivo:** actuar gaps overnight y apertura — sin cron nuevo. Misma lógica que automation-03.

```
get_equity_quotes → precio por posición abierta
Leer logs/theses/TICKER-*.md → kill criteria
stop = entry × (1 - config/risk-policy.json → riskControls.stopLossPct / 100)   # default −8%
```

Por cada posición (`shares_available_for_sells` > 0):

| Condición | Acción |
|-----------|--------|
| precio ≤ stop backup | **AUTO SELL market** (toda la posición) — `exit_reason: hard_stop` |
| kill criteria del thesis memo | **AUTO SELL market** — `exit_reason: thesis_break` |
| earnings playbook activo (`logs/theses/earnings-playbook-*.md`) | Aplicar matriz de escenarios antes de improvisar |
| ninguna | continuar a Fase 2 |

```
review_equity_order → side=sell, type=market, quantity=shares_available_for_sells
Si order_checks {} → place_equity_order
append logs/trade-journal.md + update logs/scorecard/positions.jsonl
```

**No** auto-vender por ganancia % fija. Si fractional rechaza stop GTC en broker → confiar en sesiones 9:35 / 12:00 / 15:00 (documentado en trade-journal).

Si se ejecutó exit en esta fase → **no** abrir nuevas posiciones el mismo día salvo rotación explícita en playbook.

## Fase 2 — Scan + intel

- `run_scan` (config/scanner-presets.json) → merge scanner hits con researchUniverse
- `get_equity_quotes` + `get_equity_fundamentals` — universo + candidatos scanner
- `get_earnings_calendar` + `get_earnings_results` para tickers en ventana catalyst
- WebSearch macro + SEC top candidatos
- Confluencia Ackman (`config/ackman-tracker.json`)
- `watchlist sync` → investingRH-core
- Ranking #1–10 con convicción

## Fase 3 — Decisión

| Acción | Condición |
|--------|-----------|
| **HOLD** | Convicción < Media, datos insuficientes, o book OK sin señal |
| **BUY/ADD** | Convicción ≥ Media, thesis en `logs/theses/`, buying_power ≥ minOrderUsd, cash ≥ 10% post-trade, invested ≤ 90% |
| **SELL/EXIT** | Tesis rota, tesis realizada, trim en memo, stop -8% backup, o mejor rotación |

Sizing: Alta 50% · Media 30% · Baja = no trade. Cash mín 10%.

## Fase 4 — Ejecución (si TRADE)

```
review_equity_order → si order_checks {} → place_equity_order
get_equity_positions → entry price exacto
Intentar stop GTC -8% (backup). Sin take-profit mecánico.
Si fractional rechaza GTC → log alerta + fallback monitor
append logs/trade-journal.md
```

## Escalación — NO operar, log en intel + HALT

- `order_checks` no vacío tras review
- Trade > maxOrderUsd
- Pérdida diaria/semanal over limit
- 3 pérdidas consecutivas
- Convicción Baja en candidato fuerte
- Ticker fuera universo
- MCP auth failure

Documentar motivo en `logs/intelligence/YYYY-MM-DD-0935-open.md` bajo sección **Escalación** y **HALT** trading hasta próxima sesión o intervención LP vía chat.

## Output

Escribir `logs/intelligence/YYYY-MM-DD-0935-open.md` con decisión, trades ejecutados o HOLD, y plan resto del día.

1. **Persistir en disco** — el chat no sustituye el archivo en `logs/intelligence/`.
2. `git add logs/intelligence/ && git commit -m "logs: intelligence YYYY-MM-DD 0935 open" && git push origin main`
