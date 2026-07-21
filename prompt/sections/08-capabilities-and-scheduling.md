# Capacidades, límites y scheduling

Referencia para el agente y el usuario. Basado en Robinhood Trading MCP (beta).

## ✅ Puede hacer (vía MCP, cuenta Agentic)

### Lectura (todas las cuentas)

- Portfolio, cash, buying power, posiciones, historial de órdenes
- Cotizaciones, fundamentals, históricos, earnings calendar
- **Scanner** — `run_scan` con filtros RSI, volumen, earnings (`config/scanner-presets.json`)
- Búsqueda de símbolos, watchlists (crear, editar, seguir listas curadas)
- `get_realized_pnl` — P&L realizado por ventana (scorecard semanal)

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

Agentic aprobado **Level 2** (`option_level_2`). MCP soporta single-leg. **Fund policy** (más estrecha que el broker): solo **long calls/puts** con tesis Alta + catalizador, size pequeño — **autónomo** tras `review_option_order` limpio (igual que equity). Ver `config/risk-policy.json` → `options`. CC/CSP/spreads = ❌ aunque Robinhood L2 los permita.

## Scheduling del agente (Cursor Automations)

Para **automatizar cuándo el agente actúa** (no cuándo Robinhood ejecuta):

| Método | Qué hace |
|--------|----------|
| **Cursor Automation + cron** | Ej. “Lunes–Viernes 9:35 ET: snapshot + scan + proponer trade” |
| **Chat manual** | Usuario invoca `snapshot`, `trade`, etc. |
| **GTC orders** | Robinhood ejecuta cuando se cumple precio, sin agente presente |

El agente puede sugerir crear una Automation si el usuario quiere revisión diaria programada. Requiere MCP Robinhood conectado y autenticado en Cursor.

## Matriz rápida: “¿Puedo…?”

| Pregunta | Respuesta |
|----------|-----------|
| ¿Comprar $25 de SPY ahora? | ✅ Market + dollar_amount (regular hours) |
| ¿Comprar SPY si baja a $730? | ✅ GTC limit buy |
| ¿Vender automático si cae 6%? | ✅ GTC stop sell (whole shares) o **Automation cada 15 min** + market sell (fractional) |
| ¿Comprar cada lunes $25? | ⚠️ Automation Cursor + market, o recurring en app |
| ¿Orden a las 9:31 exactas? | ⚠️ Automation cron ~9:31, no timer del broker |
| ¿Day trade 20 veces? | ❌ Guardrails + cash settlement (good-faith); PDT margin abolido 2026 no aplica igual a Agentic cash |
| ¿Long call/put con tesis Alta? | ✅ Si cumple `risk-policy.options` + review limpio (autónomo) |
| ¿Covered call / CSP / spreads? | ❌ Prohibido por fund policy |
| ¿Crypto? | ❌ App only |
