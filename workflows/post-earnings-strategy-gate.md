# Post-Earnings Strategy Gate — MSFT / AMZN

**Cuándo:** 2026-07-31 ET (después de MSFT 29-pm + AMZN 30-pm + open reaction)  
**Cuenta:** solo Agentic ••••3029  
**Input LP:** letter `logs/investor-letters/002-2026-07-28-lp-paycheck-mandate.md`

## 1. Pre-flight (31-jul)

- [ ] `get_earnings_results` MSFT + AMZN (actual EPS / surprise)
- [ ] Quotes + book NAV + cash
- [ ] Releer thesis kill criteria en `logs/theses/MSFT-2026-06-19.md` y `AMZN-2026-06-19.md`
- [ ] Scorecard append si hubo movimiento material

## 2. Score de catalizador (por ticker)

| Check | Pass | Fail |
|-------|------|------|
| MSFT Azure guide ≥37% CC (kill era &lt;37%) | thesis OK | evaluate exit |
| AMZN AWS growth ≥22% (kill &lt;22% two Q — 1Q soft warn) | thesis OK | soft warn / exit path |
| Márgenes / guide coherentes con FV memo | hold / trim plan | rotate |
| Precio vs stop −8% | encima = alive | stop ya ejecutado |

## 3. Veredicto de libro

Elegir **una**:

| Código | Significado | Acción |
|--------|-------------|--------|
| **A — ACKMAN_CONTINUE** | Catalizadores validan tesis; FV aún atractivo | Seguir `ackman-concentrated-catalyst`; trims solo por memo |
| **B — ACKMAN_TRIM_ROTATE** | Mixto: un nombre OK, otro débil | Exit/trim del débil; cash para próxima idea Ackman **o** seed paycheck |
| **C — PIVOT_PAYCHECK** | LP confirma + tesis gastada o capital mejor en modo salario | Activar `workflows/strategy-paycheck-proposal.md` (editar risk-policy + 03-strategy + bump manifest) |
| **D — DEFENSIVE_CASH** | Ambos prints rompen tesis / risk-off | Reducir a cash ≥50%; pausar nuevas entradas 5 sesiones |

## 4. Regla LP (explícita)

El LP ya señaló preferencia hacia **C** *después* de ver el resultado.  
El CIO **no** pivota en automático el 29/30 — pivota el **31** solo si:

1. LP no revoca la preferencia, **y**
2. El score de catalizador no exige DEFENSIVE puro por drawdown halt, **y**
3. Se documenta letter #003 con el veredicto A/B/C/D.

## 5. Outputs obligatorios el 31

1. `logs/investor-letters/003-2026-07-31-strategy-verdict.md`
2. Si **C**: PR con cambios a `config/risk-policy.json`, `config/fund-mandate.json`, `prompt/sections/03-strategy.md`, bump `prompt/manifest.json`
3. Journal + scorecard actualizados
