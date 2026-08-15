# Daily Runbook — Kevin Xu swing

Leer `config/autonomy.json`, `config/risk-policy.json`, `config/kevin-xu-playbook.json`, `config/notifications.json`.

## 1. Pre-flight

- [ ] MCP autenticado
- [ ] Solo Agentic cash (`options.enabled=false`, no margin)
- [ ] Si `positions.length > 1` → flatten, no research rabbit hole

## 2. Scan

- Signals del día si existen
- `run_scan` + earnings calendar
- Quotes + **vibes** + catalyst + **don't-chase** check
- **No** ackman-tracker
- Ranking Kevin Xu en `logs/intelligence/`

## 3. Decisión

| Estado | Acción |
|--------|--------|
| >1 posición | SELL all (transition) |
| 1 posición, P&L ≥ +20% | SELL all |
| 1 posición, setup muerto | SELL all |
| 0 posiciones, #1 Alta, no chase | BUY all-in (~92%) |
| Else | cash / hold the one name |

## 4. Ejecución

BUY: book → review → place. **No stop GTC.**

SELL: tax lots → review → place → scorecard → cash or next swing.

## 5. Cron ET

| Hora | Sesión |
|------|--------|
| 8:00 | Research only |
| 9:35 | Flatten / all-in / all-out |
| 12:00 / 15:00 | Hawk watch — target or kill |
| Vie 16:30 | Weekly scorecard |
| Vie 17:00 | Kevin Xu calibration |
| Vie 18:00 | SPCX personal watch (info only) |
