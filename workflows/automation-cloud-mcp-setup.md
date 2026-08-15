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

## Verificación post-setup

Tras conectar MCP en Cloud y crear Automations:

1. Ejecutar manualmente en chat: `snapshot` → debe devolver cuenta Agentic live
2. Confirmar que la automation 9:35 escribe `logs/intelligence/` con precios MCP (no marks Yahoo)
3. Test email: `bash scripts/send-alert.sh digest "MCP verification" "Cloud MCP OK"`
4. Completar [`workflows/pre-absence-checklist.md`](pre-absence-checklist.md) antes de ausentarte

**Automations a activar** (prompt = contenido del workflow homónimo):

| Cron (ET) | Workflow |
|-----------|----------|
| 8:00 lun–vie | `automation-01-premarket.md` |
| 9:35 lun–vie | `automation-02-market-open.md` |
| 12:00 + 15:00 lun–vie | `automation-03-intraday-monitor.md` |
| 16:30 vie | `automation-04-weekly-review.md` |
| 17:00 vie | `automation-05-kevin-xu-calibration.md` |
| 18:00 vie | `automation-08-spcx-personal-watch.md` (**info only**, no Agentic orders) |

## X MCP — Cloud Agent / Automations

Hosted: **`https://api.x.com/mcp`**. Docs: [docs.x.com/tools/mcp](https://docs.x.com/tools/mcp).

Esto es lo que Xu usa como “terminally online”. **No** uses Keywords Everywhere.

### Dashboard (Cloud Automations)

1. [cursor.com/agents](https://cursor.com/agents) → **MCP Servers** → **Add custom server**
2. Nombre: `xapi` (o `X`)
3. URL: `https://api.x.com/mcp`
4. Auth: OAuth / Bearer de tu **X Developer App** (pay-per-use; cada tool call cobra API). No pegues tokens en el repo.
5. En **cada** automation de research (8:00, 9:35): **Add Tool or MCP** → `xapi`

### Desktop (opcional)

OAuth via `xurl` (no commitear `CLIENT_SECRET`):

```json
"xapi": {
  "command": "npx",
  "args": ["-y", "@xdevplatform/xurl", "mcp", "https://api.x.com/mcp"],
  "env": { "CLIENT_ID": "...", "CLIENT_SECRET": "..." }
}
```

App-only read:

```json
"xapi": {
  "url": "https://api.x.com/mcp",
  "headers": { "Authorization": "Bearer YOUR_APP_ONLY_BEARER_TOKEN" }
}
```

Hasta que el servidor aparezca en el tool list del agente, el CIO declara X MCP **offline** y usa WebSearch como fallback débil.
