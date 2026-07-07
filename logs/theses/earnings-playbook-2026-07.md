# Earnings Playbook — Jul 2026 (AMZN + MSFT)

**Fund:** investingRobinhood · Agentic ••••3029  
**Written:** 2026-07-07 (antes de ventana 27–31 jul)  
**Prompt version:** 1.7.0  
**Refs:** `config/risk-policy.json` → `cashDeploymentPlan` · `logs/theses/AMZN-2026-06-19.md` · `logs/theses/MSFT-2026-06-19.md`

---

## Contexto de concentración

| Campo | Valor |
|-------|-------|
| Book factor | ~75% cloud/AI (AMZN + MSFT) |
| Cash disponible | $25 (24%) |
| Catalizadores | AMZN Q2 ~30-jul · MSFT Q4 FY26 ~29-jul |
| Riesgo | Ambos earnings misma semana — correlación alta |

**Regla Ackman:** si ambos bajo presión y uno gatilla kill parcial → **exit del más débil**, hold del otro. No hold por inercia.

---

## Matriz AMZN Q2 (~30-jul)

| Escenario | AWS growth | Margen AWS | Acción agente | Cash |
|-----------|------------|------------|---------------|------|
| **BEAT** | ≥ 25% YoY | ≥ 35% op margin | **HOLD** · evaluar **ADD** hasta $25 si tesis intacta y post-trade cash ≥ 10% | Deploy según `cashDeploymentPlan.scenarios.AMZN_post_Q2_beat` |
| **IN-LINE** | 22–25% YoY | 30–35% | **HOLD** · sin ADD | Mantener $25 cash |
| **MISS** | < 22% YoY | < 30% sin causa one-time | **FULL EXIT** market · `exit_reason: thesis_break` | Cash libre para rotación |

**Kill criteria parcial AMZN:** AWS < 22% un trimestre = monitor; **dos trimestres consecutivos < 22%** = full exit (tesis §5).

**Trim opcional (no automático):** si BEAT y precio ≥ $285 con AWS ≥ 25% → trim ~33% según tesis AMZN §6.

---

## Matriz MSFT Q4 FY26 (~29-jul)

| Escenario | Azure guide (CC) | Azure actual Q3 | Acción agente | Cash |
|-----------|------------------|-----------------|---------------|------|
| **BEAT** | ≥ 39% | ≥ 38% | **HOLD** · ADD opcional $15–25 si AMZN ya sized y cash ≥ 10% post-trade | `cashDeploymentPlan.scenarios.MSFT_post_Q4_beat` |
| **IN-LINE** | 37–39% | 35–38% | **HOLD** · sin ADD | Mantener cash |
| **MISS** | < 37% | < 35% dos Q | **FULL EXIT** · `exit_reason: thesis_break` | Cash libre |

**Kill criteria parcial MSFT:** Azure < 35% dos trimestres consecutivos O Q4 guide < 37% = exit. Lawsuit sin restatement material = monitor only.

**Trim opcional:** precio ≥ $430 con guide ≥ 39% → trim ~33% según tesis MSFT §6.

---

## Regla de kill parcial (ambos bajo presión)

Orden de prioridad si **ambos** reportan en la misma semana y hay señales mixtas:

1. **Comparar severidad** — ¿cuál gatilla kill criteria completo vs parcial?
2. **Exit el más débil primero** (market sell total posición):
   - AMZN miss (< 22% AWS) + MSFT in-line → exit AMZN, hold MSFT
   - MSFT miss (< 37% guide) + AMZN in-line → exit MSFT, hold AMZN
   - Ambos miss → exit **MSFT primero** (convicción Media-Alta < Alta AMZN), luego evaluar AMZN en sesión siguiente
3. **Hold el más fuerte** — no vender winner por correlación del sector
4. **Post-exit cash** — bench memo #1 (`logs/theses/bench/`) o ADD al survivor si playbook beat

```
Prioridad convicción en empate: AMZN (Alta) > MSFT (Media-Alta)
Prioridad en rotación post-doble-miss: bench UBER/META según ranking semanal
```

---

## Qué hace cada automation esa semana

| Sesión | Cron | Comportamiento |
|--------|------|----------------|
| Pre-market 8:00 | L-V | Intel earnings calendar; flag tickers en ventana; **sin trades** |
| **Market Open 9:35** | L-V | **1)** Stop Guard · **2)** Si earnings overnight → aplicar matriz arriba (no improvisar) · **3)** ADD/EXIT per playbook · **4)** Scan solo si cash libre post-decisión |
| Midday 12:00 | L-V | Stop + kill criteria; si earnings intraday reaction rompe stop → auto sell |
| Close 15:00 | L-V | Igual midday; journal si hubo acción |
| Weekly Review | Vie 16:30 | Scorecard post-earnings; attribution actualizada |
| Ackman Calibration | Vie 17:00 | Prefer NO_CHANGE si 0 cierres nuevos; si hubo exit, evaluar señales |

**Día de earnings (T+0):** la sesión 9:35 del día siguiente (o 9:35 mismo día si report after-hours previo) ejecuta la fila de la matriz. No esperar al monitor de las 12:00 para exits por thesis break.

---

## Plan de cash post-earnings (resumen)

Ver `config/risk-policy.json` → `cashDeploymentPlan`:

| Resultado combinado | Cash action |
|--------------------|-------------|
| Ambos BEAT | ADD AMZN hasta $25 si no sized; luego evaluar MSFT add |
| Un BEAT, un IN-LINE | HOLD winner; sin ADD al in-line |
| Un EXIT, un HOLD | Cash del exit + $25 = deploy a survivor ADD o bench #1 con nueva tesis |
| Ambos EXIT | 100% cash → bench #1 (UBER/META) requiere thesis memo completo antes de entry |

---

## Checklist pre-earnings (LP / agente)

- [x] Playbook escrito antes del 25-jul
- [ ] Bench memo vigente en `logs/theses/bench/` (automation-06 sábados)
- [ ] Stops backup verificados: AMZN $217.75 · MSFT $346.30
- [ ] `positions.jsonl` actualizado post-cualquier acción

---

*Not financial advice. Ejecutar solo en cuenta Agentic.*
