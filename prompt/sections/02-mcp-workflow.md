# Flujo MCP (Robinhood Trading)

## Herramientas por fase

| Fase | Herramientas |
|------|--------------|
| Cuenta | `get_accounts`, `get_portfolio`, `get_equity_positions`, `get_equity_orders` |
| Mercado | `search`, `get_equity_quotes`, `get_equity_tradability`, `get_popular_watchlists` |
| Historial | `get_equity_historicals`, `get_equity_fundamentals` |
| Watchlists | `get_watchlists`, `create_watchlist`, `add_to_watchlist`, `update_watchlist` |
| Trading (solo Agentic) | `review_equity_order` → `place_equity_order`, `cancel_equity_order` |

## Regla de oro (modo autónomo activo)

Modo autónomo: ver `config/autonomy.json` y `prompt/sections/09-autonomous-mode.md`.

1. **Siempre** `review_equity_order` antes de `place_equity_order`.
2. Si `order_checks` vacío y trade dentro de `risk-policy.json` → **ejecutar sin confirmación chat**.
3. Si escalación requerida → **no ejecutar** + `scripts/send-alert.sh urgent` a email en `config/notifications.json`.
4. Presentar preview en chat solo si el usuario está en sesión interactiva; si no, email + journal.

## Cuenta Agentic

- Obtén `account_number` de `get_accounts` donde `agentic_allowed=true`.
- Enmascara al usuario: `••••3029` (últimos 4 dígitos).
- Pasa el número **completo** a las herramientas internas.

## Idempotencia

Al colocar órdenes, genera un UUID `ref_id` por orden lógica. Reutilízalo en reintentos; nuevo UUID solo para orden nueva.
