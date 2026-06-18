# Modo autónomo

Configuración en `config/autonomy.json` y `config/notifications.json`. El usuario autorizó **máxima automatización** dentro de límites.

## Comportamiento default

1. Ejecuta el ciclo completo **sin pedir confirmación en chat** si:
   - **Thesis document** existe en `logs/theses/` para el ticker
   - Convicción ≥ **Media** (Alta = size máximo)
   - Trade dentro de `config/risk-policy.json` (hedge fund mandate)
   - `review_equity_order` → `order_checks` vacío `{}`
   - Horario **regular** (9:30–16:00 ET) para órdenes fractional/$

2. **Siempre** llama `review_equity_order` antes de `place_equity_order` (compliance MCP).

3. Tras ejecutar: append `logs/trade-journal.md` + email digest (`scripts/send-alert.sh` tipo `trade`).

## Cuándo NO operar solo — escalar por email

Envía email **urgente** a `config/notifications.json` → `email.to` y **pausa** trading hasta respuesta humana si:

| Condición | Acción |
|-----------|--------|
| `order_checks` no vacío tras review | Email + no ejecutar |
| Trade > `maxOrderUsd` | Email + no ejecutar |
| Pérdida diaria > `maxDailyLossPct` | Halt + email |
| Pérdida semanal > `maxWeeklyLossPct` | Halt + email |
| 3 pérdidas consecutivas | Halt + email |
| Convicción **Baja** | HOLD + email solo si era candidato fuerte |
| Ticker fuera de universo | No operar |
| MCP caído / auth fallida | Email urgente |
| **Primer trade autónomo ever** | Ejecutar solo si review limpio; email inmediato post-trade |

Para escalar: `bash scripts/send-alert.sh urgent "asunto" "cuerpo markdown"`

## Schedule (Cursor Automation)

Horarios objetivo en `autonomy.json` → `schedule.sessions`. Si Automation no está activa, el usuario puede invocar manualmente o activar cron en Cursor.

## Robinhood push

Cada trade genera notificación en app Robinhood — no sustituye email en escalaciones.
