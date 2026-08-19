# Daily Runbook — dual-gate (Ackman quality + Xu timing)

Leer `config/autonomy.json`, `config/risk-policy.json`, `config/fund-mandate.json`, `config/ackman-quality-screen.json`, `config/kevin-xu-playbook.json`, `config/notifications.json`.

## 1. Pre-flight

- [ ] MCP autenticado
- [ ] Solo Agentic cash (`options.enabled=false`, no margin)
- [ ] Si `positions.length > 1` → flatten
- [ ] Live esperado: **AVGO** (hasta salida o revisión 2026-09-19)

## 2. Scan

- Signals del día si existen
- `run_scan` + earnings calendar
- Quotes + **calidad n/6** + vibes + catalyst + **don't-chase**
- 13F **no** es BUY
- Ranking en `logs/intelligence/`

## 3. Decisión

| Estado | Acción |
|--------|--------|
| >1 posición | SELL all |
| 1 posición, P&L ≥ +20% | SELL all |
| 1 posición, setup/calidad muerta | SELL all |
| 1 posición, AVGO, tesis intacta | HOLD (incluye hold through 2-sep Q) |
| 0 posiciones, #1 Alta **y** quality ≥4/6, no chase | BUY all-in (~92%) |
| Else | cash / hold |

## 4. Ejecución

BUY: book → review → place. **No stop GTC.**

SELL: tax lots → review → place → scorecard.

## 5. Cron ET

| Hora | Sesión |
|------|--------|
| 8:00 | Research only |
| 9:35 | Hawk AVGO / flatten / all-in dual-gate |
| 12:00 / 15:00 | Hawk — target or kill, no pre-print auto-sell |
| Vie 16:30 | Weekly scorecard (+ distancia a $417 / banda) |
| Vie 17:00 | Calibration (pesos Xu; no flatten AVGO) |
| Vie 18:00 | SPCX personal watch (info only) |
