# Capacidades, límites y scheduling

Referencia para el agente y el usuario. Basado en Robinhood Trading MCP (beta).

## ✅ Puede hacer (vía MCP, cuenta Agentic)

### Lectura (todas las cuentas)

- Portfolio, cash, buying power, posiciones, historial de órdenes
- Cotizaciones, fundamentals, históricos OHLCV
- **Earnings** — `get_earnings_calendar` (mercado) + `get_earnings_results` (ticker, ~8Q)
- **Financials** — `get_financials` (revenue, gross/net profit, margins; quarterly/annual)
- **Technicals** — `get_equity_technical_indicators` (RSI, MACD, SMA/EMA, ATR, Bollinger, VWAP, …)
- **Level II** — `get_equity_price_book` (depth bid/ask, max 4 symbols)
- **Tax lots** — `get_equity_tax_lots` (cost basis, ST/LT por lot abierto)
- **P&L** — `get_realized_pnl` (agregado) + `get_pnl_trade_history` (trade a trade)
- **Options historicals** — `get_option_historicals` (OHLC por contract UUID)
- **Scanner** — `run_scan` / `create_scan` con filtros RSI, volumen, earnings (`config/scanner-presets.json`)
- Búsqueda de símbolos, watchlists (crear, editar, seguir listas curadas)

### Trading (solo cuenta Agentic)

| Tipo | Descripción |
|------|-------------|
| **Market** | Ejecución inmediata; soporta `dollar_amount` (fractional) en regular hours |
| **Limit** | Compra/venta a precio límite o mejor |
| **Stop market** | Se activa al tocar `stop_price`, luego market |
| **Stop limit** | Se activa al tocar stop, luego limit |

| Time in force | Comportamiento |
|---------------|----------------|
| **gfd** | Good for day — expira al cierre |
| **gtc** | Good till cancelled — hasta 90 días |

| Market hours | Ventana |
|--------------|---------|
| `regular_hours` | 9:30–16:00 ET (default) |
| `extended_hours` | Pre 9:00–9:30, after 16:00–18:00 ET |
| `all_day_hours` | Sesión extendida completa |

### “Scheduling” indirecto (órdenes condicionales)

El MCP **no** tiene parámetro “ejecutar el martes a las 9:35”. Sí puedes:

1. **GTC limit buy** — “compra SPY si baja a $730” (espera hasta 90 días)
2. **GTC stop sell** — “vende si SPY cae a $700” (protección)
3. **GFD limit** — orden limit que expira hoy si no se llena

El agente debe explicar la diferencia entre *orden condicional* y *programación por hora*.

## ⚠️ Limitaciones importantes

| Limitación | Detalle |
|------------|---------|
| Fractional / $ orders | Solo **market** + **regular_hours** |
| Extended hours | Whole shares en limit; no fractional en extended |
| Sin datetime schedule | No “comprar mañana 9:31” nativo en MCP |
| Sin recurring MCP | DCA recurrente de Robinhood es app-only (`placed_agent: recurring`) |
| Sin bracket OCO | No hay “stop + target” emparejados en una sola llamada |
| Sin price alerts MCP | Alertas de precio → app Robinhood |
| Stop loss automático | El agente debe **monitorear** en cada sesión o colocar stop order GTC |

## ❌ No disponible vía MCP (app Robinhood)

Según `trading://feature-availability`:

- Crypto, futures, event contracts
- Short selling (requiere cuenta margin no-Agentic)
- Fractional en extended hours
- Recurring investments / DRIP (configurar en app)

## Opciones

**DESACTIVADAS** por LP (2026-08-02): `risk-policy.json` → `options.enabled=false`.  
Broker puede mostrar L2; el fondo **no** opera options (ni long call/put ni CC/CSP/spreads). Equity-only.

## Scheduling del agente (Cursor Automations)

Para **automatizar cuándo el agente actúa** (no cuándo Robinhood ejecuta):

| Método | Qué hace |
|--------|----------|
| **Cursor Automation + cron** | Ej. “Lunes–Viernes 9:35 ET: snapshot + scan + proponer trade” |
| **Chat manual** | Usuario invoca `snapshot`, `trade`, etc. |
| **GTC orders** | Robinhood ejecuta cuando se cumple precio, sin agente presente |

El agente puede sugerir crear una Automation si el usuario quiere revisión diaria programada. Requiere MCP Robinhood conectado y autenticado en Cursor.

### Automation #8 — SPCX personal watch (viernes 18:00 ET)

Memo **informativo** para la posición **personal** de SPCX (`config/spcx-personal-watch.json`, `workflows/automation-08-spcx-personal-watch.md`).

- **No opera** Agentic (ni `review`/`place`/`cancel`)
- Goal: **preservar capital** (cuándo dejar de aportar / considerar salida), no maximizar ganancia
- Foco: trimestre SpaceX (AI GW, AI revenue, Starlink, Starship) + ciclo AI (hyperscaler capex, NVDA, spreads)
- Output: `logs/spcx-watch/YYYY-WW.md` + email digest
- Si el precio toca el target del trimestre **antes** del quarter-end, el memo debe reassess ese viernes (no esperar al 30 sep / 31 dic)

## Matriz rápida: “¿Puedo…?”

| Pregunta | Respuesta |
|----------|-----------|
| ¿Comprar $25 de SPY ahora? | ✅ Market + dollar_amount (regular hours) |
| ¿Comprar SPY si baja a $730? | ✅ GTC limit buy |
| ¿Vender automático si cae 6%? | ❌ Xu: no stop-loss. Hawk monitor; sell on dead setup |
| ¿All-in un nombre ~92%? | ✅ Mandato Kevin Xu, convicción Alta |
| ¿Tres acciones a la vez? | ❌ Flatten |
| ¿Memes / crypto / margin / options? | Memes OK si no chase/penny. Crypto/margin/options ❌ |
| ¿Comprar cada lunes $25? | ⚠️ Automation Cursor + market, o recurring en app |
| ¿Orden a las 9:31 exactas? | ⚠️ Automation cron ~9:31, no timer del broker |
| ¿Day trade 20 veces? | ❌ Guardrails + cash settlement (good-faith); PDT margin abolido 2026 no aplica igual a Agentic cash |
| ¿Long call/put con tesis Alta? | ❌ Options OFF (LP 2026-08-02) |
| ¿Covered call / CSP / spreads? | ❌ Prohibido |
| ¿Ver RSI/MACD/SMA de un ticker? | ✅ `get_equity_technical_indicators` |
| ¿Revenue/márgenes históricos? | ✅ `get_financials` |
| ¿Order book Level II? | ✅ `get_equity_price_book` (max 4) |
| ¿Vender lotes específicos (tax)? | ✅ `get_equity_tax_lots` → `tax_lots` en sell (no con stops/dollar_amount) |
| ¿P&L realizado del mes? | ✅ `get_realized_pnl` / `get_pnl_trade_history` |
| ¿Crypto? | ❌ App only |
