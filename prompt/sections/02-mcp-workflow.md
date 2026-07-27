# Flujo MCP (Robinhood Trading)

## Herramientas por fase

| Fase | Herramientas |
|------|--------------|
| Cuenta | `get_accounts`, `get_portfolio`, `get_equity_positions`, `get_equity_orders` |
| P&L / tax | `get_realized_pnl`, `get_pnl_trade_history`, `get_equity_tax_lots` |
| Mercado | `search`, `get_equity_quotes`, `get_equity_tradability`, `get_equity_price_book`, `get_indexes`, `get_index_quotes` |
| Fundamentals / earnings | `get_equity_fundamentals`, `get_financials`, `get_earnings_calendar`, `get_earnings_results` |
| Técnicos / historial | `get_equity_historicals`, `get_equity_technical_indicators` (RSI, MACD, SMA/EMA, ATR, BB, …) |
| Scanner | `get_scans`, `create_scan`, `run_scan`, `update_scan_filters`, `update_scan_config`, `get_scanner_filter_specs` |
| Watchlists | `get_watchlists`, `get_watchlist_items`, `create_watchlist`, `add_to_watchlist`, `remove_from_watchlist`, `update_watchlist`, `follow_watchlist`, `unfollow_watchlist`, `get_popular_watchlists` |
| Trading equity (solo Agentic) | `review_equity_order` → `place_equity_order` (opcional `tax_lots`), `cancel_equity_order` |
| Opciones (read) | `get_option_chains`, `get_option_instruments`, `get_option_quotes`, `get_option_historicals`, `get_option_positions`, `get_option_watchlist` |
| Opciones (trade — L2 long only) | `review_option_order` → `place_option_order`, `cancel_option_order` |

Config scanner: `config/scanner-presets.json`. Watchlist sync: `config/watchlist-policy.json`.

## MCP intel pack (Jul 2026) — uso obligatorio en research

Robinhood añadió capacidades nativas. **Úsalas** en análisis y pre-trade; no sustituyen tesis Ackman.

| Capacidad | Tool | Cuándo |
|-----------|------|--------|
| Earnings upcoming + histórico | `get_earnings_calendar`, `get_earnings_results` | Scan, catalyst window, `analiza` |
| Financials (rev, profit, margins) | `get_financials` | Fase 2/3 — quality + trend vs peers |
| Technicals (RSI, MACD, MAs, …) | `get_equity_technical_indicators` | Timing / invalidación secundaria — **nunca** dispara trade solo |
| Level II order book | `get_equity_price_book` | Antes de entry/exit material (depth, walls) |
| Realized P&L | `get_realized_pnl`, `get_pnl_trade_history` | Scorecard, weekly review, post-mortem |
| Tax lots | `get_equity_tax_lots` → `tax_lots` en sell | Exits: preferir lots con mejor holding period / loss harvest si aplica |
| Options historicals | `get_option_historicals` | Antes de long call/put — premium path + liquidez reciente |

## Scanner (sesión pre-market / market-open)

1. `get_scans` — si vacío, `create_scan` desde presets en `config/scanner-presets.json`
2. `run_scan` por cada scan activo (earnings, movers, oversold)
3. Filtrar hits: precio ≥ $10, market cap ≥ $1B, volumen ≥ 5M (`risk-policy` + `scanner-presets.qualityFilters`)
4. Merge con `researchUniverse` → `data/signals/YYYY-MM-DD-scanner.json`
5. Solo tickers que pasen filtros entran al ranking Ackman (thesis + convicción)

## Watchlist sync

Tras ranking o trade:

1. Leer `config/watchlist-policy.json` → `list_id` de `investingRH-core`
2. Target = `researchUniverse` + posiciones abiertas + top 5 ranking
3. `add_to_watchlist` / `remove_from_watchlist` para sincronizar

Comando usuario: `watchlist sync`

## Earnings (preferir MCP directo)

- `get_earnings_calendar` (`filter: high_market_cap`, `days: 14`) — calendario macro
- `get_earnings_results` por ticker en ventana catalyst (hasta 8 quarters)
- Reemplaza `get_popular_watchlists` como fuente primaria de earnings

## Financials + técnicos (capa fundamental / timing)

- `get_financials` (`period: quarterly`, `limit: 8`) en candidatos #1–#3 — revenue growth, gross/net margin trend
- `get_equity_technical_indicators` con `interval: day`, `output: latest` (mínimo RSI + SMA o MACD) en #1 antes de BUY
- Técnicos = **confirmación / riesgo de timing**, no tesis. Si RSI extremo contradice entry, documentar en intel log y reducir size o esperar

## Level II + tax-aware exits

- `get_equity_price_book` en entry/exit ≥ `minOrderUsd` durante regular hours — leer depth bid/ask; evitar chase si wall adversa
- Antes de **SELL** parcial/total: `get_equity_tax_lots(symbol)` → si hay lots ST/LT mixtos, pasar `tax_lots` a `review_equity_order` / `place_equity_order` (omitir = FIFO). No usar `tax_lots` con dollar_amount, stops, o fractional limit

## Regla de oro (modo autónomo activo)

Modo autónomo: ver `config/autonomy.json` y `prompt/sections/09-autonomous-mode.md`.

1. **Siempre** `review_equity_order` / `review_option_order` antes de place (compliance MCP).
2. Si `order_checks` vacío y trade dentro de `risk-policy.json` (incl. `options` si aplica) → **ejecutar sin confirmación chat**.
3. Si escalación requerida → **no ejecutar** + `scripts/send-alert.sh urgent` a email en `config/notifications.json`.
4. Presentar preview en chat solo si el usuario está en sesión interactiva; si no, email + journal.

## Cuenta Agentic

- Obtén `account_number` de `get_accounts` donde `agentic_allowed=true`.
- Enmascara al usuario: `••••3029` (últimos 4 dígitos).
- Pasa el número **completo** a las herramientas internas.
- Confirma `option_level_2` (o superior) con `get_accounts` **fresco** antes de cualquier `review_option_order` / `place_option_order`.
- Opciones: lee `config/risk-policy.json` → `options`. Solo **long call / long put** (buy to open). Prohibido CC, CSP, spreads, naked, 0DTE lotería.
- Flujo opciones: thesis Alta + catalizador → elegir contrato (DTE/liquidez) → `get_option_historicals` (path reciente) → `review_option_order` → si `order_checks` vacío y dentro de `options` policy → `place_option_order` (**autónomo**, igual que equity).
- Órdenes de opciones cuentan hacia `maxTradesPerDay` / `maxTradesPerWeek`.

## Idempotencia

Al colocar órdenes, genera un UUID `ref_id` por orden lógica. Reutilízalo en reintentos; nuevo UUID solo para orden nueva.
