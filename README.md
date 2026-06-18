# Investing Robinhood — AI Stock Broker Agent

Agente de IA configurado como **broker profesional** para operar acciones vía el [Robinhood Trading MCP](https://agent.robinhood.com/mcp/trading) (Agentic Beta).

Diseñado para testear con **$100** en una cuenta Agentic aislada del resto de tu portfolio.

## Qué hace el agente

| Capacidad | Herramienta MCP |
|-----------|-----------------|
| Buscar tickers | `search`, `get_popular_lists` |
| Cotizaciones y tradability | `get_equity_quotes`, `get_equity_tradability` |
| Ver portfolio | `get_accounts`, `get_portfolio`, `get_equity_positions` |
| Preview de órdenes | `review_equity_order` |
| Ejecutar trades | `place_equity_order` (solo cuenta Agentic) |

## Setup en Cursor

### 1. Conectar el MCP

**Opción A — UI de Cursor**

1. Cursor Settings → Tools & MCPs → Connect
2. Pega: `https://agent.robinhood.com/mcp/trading`
3. Autentica (solo desktop)

**Opción B — Config del proyecto**

Este repo incluye `.cursor/mcp.json` con el servidor preconfigurado. Cursor lo detecta al abrir el proyecto.

### 2. Cuenta Agentic

1. Tras conectar el MCP, Robinhood te guía para abrir la cuenta **Agentic**
2. Deposita **$100** (o el monto que quieras testear)
3. Verifica en la app móvil de Robinhood

> La cuenta Agentic está **separada** de tu portfolio principal. El agente solo puede operar ahí.

### 3. Usar el agente

Abre un chat Agent en este workspace. El system prompt se carga automáticamente desde `.cursor/rules/stock-broker-agent.mdc`.

Comandos de inicio:

```
snapshot     → estado de cuenta
scan         → buscar oportunidades
analiza AAPL → análisis bull/bear de un ticker
trade SPY $25 → preview + ejecución (con confirmación)
```

## Estrategia para $100

Con capital tan pequeño, la estrategia por defecto es **Liquid Momentum Swing**:

- **1–2 posiciones** máximo (no puedes diversificar como un fondo)
- **ETFs + mega caps** (SPY, QQQ, AAPL, MSFT…) — liquidez alta, fractional shares
- **Trades de $10–$40** (10–40% del portfolio)
- **Stop loss -6%**, take profit +12%
- **Reserva de cash ≥15%**
- Horizonte: **2–10 días** (swing, no day-trading agresivo)

Config completa: [`config/risk-policy.json`](config/risk-policy.json)

### Por qué no otras estrategias (por ahora)

| Estrategia | Problema con $100 |
|------------|-------------------|
| Day trading | Comisiones/spreads comen el capital |
| 10+ posiciones | Imposible con $100 |
| Penny stocks | Illiquid, alto riesgo |
| Opciones | Aún no disponible en MCP beta |

## Flujo de seguridad

```
search → quotes → análisis → review_equity_order → [confirmación] → place_equity_order
```

El agente **nunca** salta el paso de `review_equity_order`. Robinhood devuelve warnings pre-trade que debes revisar.

## Estructura del proyecto

```
investingRobinhood/
├── .cursor/
│   ├── mcp.json
│   └── rules/stock-broker-agent.mdc   # Loader (alwaysApply)
├── prompt/
│   ├── manifest.json                  # Versión + orden del prompt
│   ├── README.md                      # Cómo editar el prompt
│   └── sections/                      # System prompt modular (8 archivos)
├── config/risk-policy.json              # Límites numéricos
├── logs/trade-journal.md
├── AGENTS.md
└── README.md
```

### Mejorar el system prompt

Edita archivos en `prompt/sections/`. Guía completa: [`prompt/README.md`](prompt/README.md).

Capacidades y scheduling: [`prompt/sections/08-capabilities-and-scheduling.md`](prompt/sections/08-capabilities-and-scheduling.md).

## Riesgos

Robinhood Agentic Trading es un producto **beta**. Lee los [disclosures oficiales](https://robinhood.com/us/en/support/articles/agentic-trading-overview/):

- Puedes perder todo el capital depositado
- Los agentes de IA pueden cometer errores
- Tú eres responsable de todas las órdenes
- Supervisa la actividad en la app Robinhood (push notifications en cada trade)

## Próximos pasos

1. Conecta el MCP y autentica
2. Deposita $100 en la cuenta Agentic
3. Abre un chat y escribe `snapshot`
4. Cuando estés listo: `scan` → `analiza TICKER` → `trade TICKER $25`
