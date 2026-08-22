# Automation #1 — Pre-Market CIO (8:00 AM ET, lun–vie)

**Modo:** research only — NO órdenes. Ticker-agnostic.

## Pre-flight

1. `prompt/manifest.json` + loadOrder
2. `config/autonomy.json`, `risk-policy.json`, `fund-mandate.json`, `ackman-quality-screen.json`, `kevin-xu-playbook.json`
3. Runbook + autonomous + data-intelligence
4. Solo Agentic. Dual-gate. Nombre abierto = positions. **No flatten AVGO** on this mandate.

## Capas

MCP snapshot + universe quotes + scanner + **earnings dates**. 13F hunting ground only.

Social: atención retail (Xu vibes). Calidad Ackman n/6 en el ranking. Penalizar chase y pennies.

**New-entry window (`entryUniverse`):** verified Q **7–10 calendar days** out, inclusive. Under 7d = not a new buy (HOLD if already in). Over 10d = not a new buy (dead time). No news-bomb / headline overlay.

## Output `logs/intelligence/YYYY-MM-DD-0800-premarket.md`

1. NAV, cash, **position count** (0 o 1)
2. Si 1 nombre: P&L% vs +20–30% y vs ritmo ~15%/mes (si hay reviewDate en fund-mandate). Days-to-Q does **not** force SELL.
3. Ranking: quality n/6 / vibes / catalyst / chase / won't-go-to-zero / **days-to-verified-Q** (tag IN-WINDOW 7–10 / TOO-CLOSE / TOO-FAR / UNVERIFIED)
4. Decision for 9:35: HOLD / SELL-TARGET / SELL-KILL / ALL-IN (ambas capas **y** Q in 7–10d) / CASH
5. Risks — no vender solo porque el Q es mañana; no ALL-IN on NVDA-style Q&lt;7d; no ALL-IN if Q&gt;10d

Commit logs. No `[deploy-site]`.
