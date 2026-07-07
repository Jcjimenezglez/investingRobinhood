# Modo autónomo

Configuración en `config/autonomy.json` y `config/notifications.json`. El usuario autorizó **máxima automatización** dentro de límites.

**Notificaciones:** emails desactivados (`notifications.json` → `email.enabled: false`). LP consulta Robinhood app o chat. Robinhood push sigue activo en cada trade del agente.

## Comportamiento default

1. Ejecuta el ciclo completo **sin pedir confirmación en chat** si:
   - **Thesis document** existe en `logs/theses/` para el ticker
   - Convicción ≥ **Media** (Alta = size máximo)
   - Trade dentro de `config/risk-policy.json` (hedge fund mandate)
   - `review_equity_order` → `order_checks` vacío `{}`
   - Horario **regular** (9:30–16:00 ET) para órdenes fractional/$

2. **Siempre** llama `review_equity_order` antes de `place_equity_order` (compliance MCP).

3. Tras ejecutar: append `logs/trade-journal.md` + `logs/scorecard/positions.jsonl`.

4. **Stop Guard (9:35 / 12:00 / 15:00):** antes de scan o entradas, evaluar stops backup y kill criteria; auto sell market si trigger. Ver `automation-02-market-open.md` Fase 1.5.

## Cuándo NO operar solo — escalar vía log + HALT

Documentar en `logs/intelligence/` y **pausar** trading hasta LP consulte por chat si:

| Condición | Acción |
|-----------|--------|
| `order_checks` no vacío tras review | HALT + log |
| Trade > `maxOrderUsd` | HALT + log |
| Pérdida diaria > `maxDailyLossPct` | Halt + log |
| Pérdida semanal > `maxWeeklyLossPct` | Halt + log |
| 3 pérdidas consecutivas | Halt + log |
| Convicción **Baja** | HOLD |
| Ticker fuera de universo | No operar |
| MCP caído / auth fallida | HALT + log |

## Schedule (Cursor Automation)

Horarios en `autonomy.json` → `schedule.sessions`:

| # | Sesión | Cron |
|---|--------|------|
| 1 | Pre-market | 8:00 L-V |
| 2 | Market open + Stop Guard | 9:35 L-V |
| 3 | Midday monitor | 12:00 L-V |
| 4 | Close monitor | 15:00 L-V |
| 5 | Weekly review | Vie 16:30 |
| 6 | Ackman calibration | Vie 17:00 |
| 7 | Bench refresh | Sáb 10:00 |
| 8 | Monthly close | Día 1 18:00 |

Copy-paste: `workflows/automations-setup.md`

## Robinhood push

Cada trade genera notificación en app Robinhood.
