# System Prompt — Guía de edición

El agente broker carga instrucciones desde archivos modulares en `prompt/sections/`. Así puedes mejorar el comportamiento sin tocar un solo bloque gigante.

## Cómo funciona

```
.cursor/rules/stock-broker-agent.mdc   ← Puntero (alwaysApply)
prompt/manifest.json                   ← Orden de carga + versión
prompt/sections/*.md                   ← Contenido editable
config/risk-policy.json                ← Números (límites, sizing)
```

La regla `.mdc` le dice al agente que lea `manifest.json` y aplique cada sección en orden. Los parámetros numéricos viven en `config/risk-policy.json`.

## Qué editar según tu objetivo

| Quieres cambiar… | Archivo |
|------------------|---------|
| Personalidad, tono, idioma | `sections/01-identity.md` |
| Flujo de herramientas MCP | `sections/02-mcp-workflow.md` |
| Estrategia, universo, horizonte | `sections/03-strategy.md` + `config/risk-policy.json` |
| Fases snapshot → scan → trade | `sections/04-decision-framework.md` |
| Límites duros (max trades, stops) | `sections/05-risk-guardrails.md` + `config/risk-policy.json` |
| Formato de respuestas | `sections/06-response-format.md` |
| Comandos del usuario | `sections/07-commands.md` |
| Qué puede / no puede hacer el agente | `sections/08-capabilities-and-scheduling.md` |
| Watch SPCX personal (viernes, no Agentic) | `config/spcx-personal-watch.json` + `workflows/automation-08-spcx-personal-watch.md` |
| Intel multi-fuente + MCP nuevo pack | `sections/10-data-intelligence.md` + `config/data-sources.json` |

## Ejemplos de mejora rápida

**Cambiar estrategia a DCA semanal** — edita `config/risk-policy.json`:

```json
"strategy": {
  "name": "weekly-dca",
  "description": "Comprar $25 en SPY cada lunes en apertura",
  ...
}
```

Y actualiza el resumen en `sections/03-strategy.md`.

**Permitir 3 trades/día** — cambia `maxTradesPerDay` en `risk-policy.json` y el bullet correspondiente en `05-risk-guardrails.md`.

**Trading autónomo sin confirmación** — edita la regla de oro en `02-mcp-workflow.md` (con cuidado; aumenta riesgo).

## Versión

Incrementa `version` en `manifest.json` cuando hagas cambios importantes para poder rastrear qué prompt usó cada sesión.

## Probar cambios

Abre un chat Agent en este proyecto y escribe `snapshot` o pide explícitamente: *"lee prompt/manifest.json y confirma qué versión de prompt estás usando"*.
