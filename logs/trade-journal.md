# Trade Journal — Robinhood Agentic Account

Registro de operaciones ejecutadas por el agente.

---

## 2026-06-18 — GO #1 — AMZN entry (go command)

| Campo | Valor |
|-------|-------|
| **Cuenta** | Agentic ••••3029 |
| **Acción** | BUY AMZN |
| **Tipo** | Market fractional |
| **Notional** | $45.00 |
| **Fill** | 0.190134 sh @ **$236.68** |
| **Order ID** | 6a33f41f-0e4e-4012-90e7-d2b5d023e058 |
| **Convicción** | Alta |
| **Tesis** | logs/theses/001-comparative-AMZN-2026-06-18.md |
| **Ackman confluencia** | #2 posición, +19.2% add Q1 2026 |

### Brackets planificados (fallback agente)

| Tipo | Precio | Estado |
|------|--------|--------|
| Stop -8% | **$217.75** | ❌ Rechazado — fractional no soporta stop GTC/GFD |
| Take-profit +25% | **$295.85** | ❌ Rechazado — limit no acepta fractional |

**Monitoreo:** `check` a **12:00** y **15:00 ET** — vender market si ≤ $217.75 o ≥ $295.85.

**Post-trade:** Cash ~$55 | Equity AMZN ~$45 | Total ~$100

---

## 2026-06-18 — GO #2 — MSFT entry ✅

| Campo | Valor |
|-------|-------|
| **Cuenta** | Agentic ••••3029 |
| **Acción** | BUY MSFT |
| **Tipo** | Market fractional |
| **Notional** | $30.00 |
| **Fill** | 0.079700 sh @ **$376.41** |
| **Order ID** | 6a3408ad-afb0-4649-9cbd-dde6b579b920 |
| **Convicción** | Media-Alta |
| **Tesis** | logs/theses/003-MSFT-2026-06-18.md |
| **Ackman confluencia** | NEW position 15.3% Q1 2026 |

### Niveles MSFT (Automation / alertas app)

| Tipo | Precio |
|------|--------|
| Stop −8% | **$346.30** |
| Trim 1/3 +15% | **$432.87** |
| Target +20% | **$451.69** |

Brackets GTC: ❌ fractional — monitoreo Automation + alertas manuales.

**Post-trade book:** AMZN ~$45 + MSFT ~$30 + Cash ~$25 ≈ **$100**

<!-- El agente appendea entradas aquí después de cada trade -->
