# Robinhood MCP — Cloud Agent / Automations

El MCP funciona en chat local vía `.cursor/mcp.json`. **Cloud Automations no lo heredan automáticamente.**

## Configurar una vez (dashboard)

1. Abre [cursor.com/agents](https://cursor.com/agents) (Cloud Agents)
2. **MCP Servers** → **Add custom server**
3. Nombre: `robinhood-trading`
4. URL: `https://agent.robinhood.com/mcp/trading`
5. Completa OAuth / login Robinhood cuando lo pida
6. Guarda

## En cada Automation

1. Editor de la automation → **Add Tool or MCP**
2. Selecciona **robinhood-trading**
3. Activa **Cloud Agent**
4. Save

Sin este paso, la automation corre sin acceso a quotes, portfolio ni trades.
