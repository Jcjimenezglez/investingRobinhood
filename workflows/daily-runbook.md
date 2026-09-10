# Daily Runbook — dual-gate (Ackman quality + Xu timing)

Leer `config/autonomy.json`, `config/risk-policy.json`, `config/fund-mandate.json`, `config/ackman-quality-screen.json`, `config/kevin-xu-playbook.json`, `config/notifications.json`.

El ticker abierto = `get_equity_positions`. No hardcodear un nombre.

## 1. Pre-flight

- [ ] MCP autenticado
- [ ] Solo Agentic cash (`options.enabled=false`, no margin)
- [ ] Si `positions.length > 1` → flatten
- [ ] Si hay 1 nombre: leer su memo en `logs/theses/` y `fallbackIfDualGateFails` si aplica

## 2. Scan

- Signals del día si existen
- `run_scan` + earnings calendar / `get_earnings_results`
- Quotes + **calidad n/6** + vibes + catalyst + **don't-chase**
- **New-entry window:** after AVGO, verified Q **exactly 7 calendar days** (`minDaysBeforeEarnings: 7`, `maxDaysBeforeEarnings: 7`). Under 7 or over 7 = PASS new buy. Already-in HOLD through print. Unverified date = PASS.
- No news-bomb / headline overlay
- 13F **no** es BUY
- Ranking en `logs/intelligence/`

## 3. Decisión

| Estado | Acción |
|--------|--------|
| >1 posición | SELL all |
| 1 posición, P&L ≥ +20% | SELL all |
| 1 posición, setup/calidad muerta | SELL all |
| 1 posición, tesis intacta | HOLD (incluye hold through Q; do not sell because Q is &lt;7d). AVGO stays. |
| 0 posiciones, #1 Alta **y** quality ≥4/6, no chase, **verified Q exactly 7 calendar days** | BUY all-in (~92%) |
| Else | cash / hold |

## 4. Ejecución

BUY: book → review → place. **No stop GTC.**

SELL: tax lots → review → place → scorecard.

## 5. Cron ET

| Hora | Sesión |
|------|--------|
| 8:00 | Research only |
| 9:35 | Hawk el nombre abierto / flatten / all-in dual-gate |
| 12:00 / 15:00 | Hawk — target or kill, no pre-print auto-sell |
| Vie 16:30 | Weekly scorecard vs +20–30% y ritmo ~15%/mes |
| Vie 17:00 | Calibration (pesos Xu; no flatten el swing abierto) |
| Vie 18:00 | SPCX personal watch (info only) |
