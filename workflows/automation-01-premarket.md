# Automation #1 — Pre-Market CIO (8:00 AM ET, lun–vie)

**Modo:** research only — NO órdenes. Ticker-agnostic.

## Pre-flight

1. `prompt/manifest.json` + loadOrder
2. `config/autonomy.json`, `risk-policy.json`, `fund-mandate.json`, `ackman-quality-screen.json`, `kevin-xu-playbook.json`
3. Runbook + autonomous + data-intelligence
4. Solo Agentic. Dual-gate. Nombre abierto = positions.

## Capas

MCP snapshot + universe quotes + scanner + earnings. 13F hunting ground only.

Social: atención retail (Xu vibes). Calidad Ackman n/6 en el ranking. Penalizar chase y pennies.

## Output `logs/intelligence/YYYY-MM-DD-0800-premarket.md`

1. NAV, cash, **position count** (0 o 1)
2. Si 1 nombre: P&L% vs +20–30% y vs ritmo ~15%/mes (si hay reviewDate en fund-mandate)
3. Ranking: quality n/6 / vibes / catalyst / chase / won't-go-to-zero
4. Decision for 9:35: HOLD / SELL-TARGET / SELL-KILL / ALL-IN (ambas capas) / CASH
5. Risks — no vender solo porque el Q es mañana

Commit logs. No `[deploy-site]`.
