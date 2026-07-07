# Automation #6 — Bench Refresh (Saturday 10:00 AM ET)

**Modo:** research-only — **NO trades**.

## Pre-flight

1. Leer `prompt/manifest.json` + secciones en `loadOrder`
2. Leer `config/signal-weights.json`, `config/fund-mandate.json`, `config/ackman-tracker.json`
3. Leer `logs/theses/bench/bench-memo-template.md`

## Fase 1 — Ranking

```
get_equity_positions → tickers en book (excluir del bench)
```

Buscar el último `data/signals/*-universe.json` de la semana (preferir viernes; si no, jueves/miércoles).

Del ranking `tickers[]` ordenado por `rank`:

1. Saltar símbolos ya en posiciones abiertas
2. Tomar el **#1 fuera del book** (composite score más alto no held)
3. Si no hay universe file → `get_equity_quotes` + fundamentals del researchUniverse y rankear con `config/signal-weights.json`

## Fase 2 — Bench memo

Escribir o actualizar `logs/theses/bench/TICKER-YYYY-MM-DD.md`:

- Business quality (1 párrafo)
- Mispricing sketch
- Catalyst + fechas
- Price of interest
- Veredicto: WATCH / ROTATION_CANDIDATE / PASS

**No** escribir thesis completa — eso requiere sesión dedicada o market-open con convicción ≥ Media.

## Fase 3 — Output

Si bench cambió vs semana anterior → nota en `logs/theses/bench/README.md` (último vigente).

Commit:

```bash
git add logs/theses/bench/
git commit -m "bench: refresh TICKER week YYYY-WW"
git push origin main
```

## Escalación

- MCP failure → log y exit sin escribir
- Sin candidatos fuera del book → mantener memo anterior, log "no change"
