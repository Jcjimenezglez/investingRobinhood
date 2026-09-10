# investingRobinhood — Revisión General del Fondo

**Fecha:** 2026-07-07 (martes, pre-market ~7:50 ET)
**Fondo:** investingRobinhood · Cuenta Agentic ••••3029 · Mandato Ackman (concentrated long-only)
**Prompt version:** 1.6.0 · Inception: 2026-06-18 (19 días calendario, 13 sesiones de mercado)

---

## 1. Resumen ejecutivo

| Métrica | Valor |
|---------|-------|
| Capital inicial | $100.00 |
| **NAV actual (live MCP, pre-market 7-jul)** | **$103.00** |
| Retorno desde inception | **+3.0%** |
| SPY mismo período (18-jun → 6-jul close) | +0.47% ($747.76 → $751.28) |
| **Alpha vs SPY** | **~+2.5 pts** |
| Drawdown desde HWM | 0% (límite 15%) |
| Trades ejecutados | 2 compras · 0 ventas · 0 stops disparados |
| Cash | $25.00 (24.3%) — reserva mínima 10% ✅ |

**Veredicto general:** el fondo está funcionando según diseño. Batimos al benchmark sin sobre-operar (cero trades desde la asignación inicial), las tesis están intactas, las 6 automations corren puntuales todos los días, y el ciclo de auto-calibración semanal ya aplicó 2 iteraciones. Los riesgos abiertos son estructurales, no de ejecución: concentración ~75% en un solo factor (cloud/AI) con ambos catalizadores en la misma semana de earnings (~fin de julio), y cobertura de stop limitada a 2 chequeos intradía porque el broker rechaza stops GTC en fraccionales.

---

## 2. Posiciones actuales (marks al cierre 6-jul)

| Ticker | Convicción | Entrada 18-jun | Mark 6-jul | Valor | P&L | Stop backup | Colchón | Tesis |
|--------|-----------|----------------|------------|-------|-----|-------------|---------|-------|
| **AMZN** | Alta | $236.68 (0.190134 sh, $45) | $244.16 | $46.42 | **+3.16%** | $217.75 (−8%) | +12.1% | ✅ INTACTA — HOLD |
| **MSFT** | Media-Alta | $376.41 (0.079700 sh, $30) | $386.74 | $30.82 | **+2.74%** | $346.30 (−8%) | +11.7% | ✅ INTACTA — HOLD |
| Cash | — | — | — | $25.00 | — | — | — | Reserva pre-earnings |

*Pre-market 7-jul: AMZN $245.44 · MSFT $393.10 (+1.6% overnight) — ambas por encima del último cierre.*

### Estado de las tesis

**AMZN (core #1)** — tesis "capex es capacidad, no trampa": AWS +28% YoY (el más rápido en 15 trimestres), margen operativo AWS 37.7%, backlog $360B+. Ningún kill criteria activado (AWS ≥22%, márgenes OK, catalizador en calendario). Fair value base $270–290 (+14/22% desde entry). Trim opcional ~33% si ≥$285 con AWS ≥25% en Q2. Catalizador: **Q2 earnings ~30-jul** (3 semanas).

**MSFT (core #2)** — tesis "Azure elite con múltiplo comprimido": Azure +40%, AI run rate >$37B, stock aún lejos del high de $555. El lawsuit de junio sigue en modo *monitor* (no hay restatement material = no thesis break). Fair value base $430–450 (+14/19%). Trim opcional ~33% si ≥$430 con guía Azure ≥39%. Catalizador: **Q4 FY26 earnings ~29-jul**.

**Convicción vs resultado:** Media-Alta (MSFT) superó a Alta (AMZN) durante W27; al cierre del 6-jul AMZN retomó la delantera (+3.16% vs +2.74%). Muestra aún demasiado pequeña (n=2, 0 cierres) para calibrar thresholds de convicción — correcto no haberlos tocado.

---

## 3. Rendimiento desde inception

| Hito | NAV | Nota |
|------|-----|------|
| 2026-06-18 | $100.00 | Entradas AMZN $45 + MSFT $30; cash $25 |
| 2026-06-26 (W26) | $98.86 | −1.14% — semana roja, SPY −2.09% (alpha positivo ya) |
| 2026-06-30 | $99.75 | Recuperando |
| 2026-07-03 (W27) | $102.35 | +3.53% WoW — rally hacia ventana de earnings |
| **2026-07-07 (live)** | **$103.00** | **+3.0% inception · HWM** |

Lectura Ackman: en la semana mala no vendimos (tesis intactas, stops lejos) y la paciencia pagó. El alpha viene de selección (los dos nombres rallearon mientras SPY estuvo plano/negativo desde el 18-jun), no de trading.

---

## 4. Automations — estado de salud

Verificado contra el historial de commits del repo (cada run comitea su log). Las 6 automations han corrido **puntuales y sin huecos** todos los días de mercado desde el 22-jun, incluyendo el manejo correcto del festivo 3-jul (HOLD sin órdenes):

| # | Automation | Cron (ET) | Última ejecución | Estado |
|---|-----------|-----------|------------------|--------|
| 1 | Pre-Market brief + señales | 8:00 L-V | 6-jul 8:05 | ✅ Puntual, escribe intel + data/signals |
| 2 | Market Open (full cycle) | 9:35 L-V | 6-jul 9:37 | ✅ Puntual, decisiones HOLD documentadas |
| 3a | Midday Monitor | 12:00 L-V | 6-jul 12:04 | ✅ Puntual, check stops + kill criteria |
| 3b | Pre-Close Monitor | 15:00 L-V | 6-jul 15:03 | ✅ Puntual, journal actualizado |
| 4 | Weekly Review | Vie 16:30 | 3-jul 16:31 | ✅ W26 y W27 generados con suggestions.json |
| 5 | Ackman Calibration | Vie 17:00 | 3-jul 17:01 | ✅ 2/2 APPLIED dentro de policy |

**Pipeline de calibración funcionando de punta a punta:** Weekly Review (W27) → suggestions.json → Ackman PM aplicó deltas acotados (±0.02–0.03, suma=1.0 verificada): subió `catalyst_proximity_days` 0.20→0.22 y `ackman_confluence` 0.12→0.13; recortó `social_sentiment` al floor 0.05 (sin edge observado). Racional documentado en carta de calibración. `signal-weights.json` v1.0.2, `lastCalibratedWeek: 2026-W27`. ✅

**Hoy (7-jul):** aún no corre el pre-market (son ~7:50 ET) — normal.

---

## 5. Qué tenemos bien hecho

1. **Disciplina Ackman real, no cosmética.** Tesis escritas *antes* del capital, con kill criteria explícitos, fair value, plan de trim y bear case. Cero exits mecánicos por %; el sistema aguantó la semana roja de W26 sin pánico.
2. **Infraestructura de proceso completa.** Journal, scorecard estructurado (positions.jsonl con schema), intel logs 4x/día, cartas de inversor, señales diarias versionadas en git. Todo auditable.
3. **Loop de mejora automático.** El fondo se auto-calibra semanalmente con límites duros (max ±0.03/peso/semana, floors/ceilings, halt si drawdown >15%). Dos ciclos aplicados sin violar policy.
4. **Gestión de riesgo dentro de límites.** Cash 24% > mínimo 10%, invertido 76% < máximo 90%, sizing por convicción respetado ($45 Alta / $30 Media-Alta), drawdown 0%.
5. **Alpha positivo con rotación cero.** +2.5 pts sobre SPY en ~3 semanas sin comisiones de sobre-trading.
6. **Manejo correcto de edge cases.** Festivo 3-jul detectado (HOLD, marks del 2-jul), rechazo de stops GTC fraccionales documentado y mitigado con monitores.

---

## 6. Qué falta / riesgos abiertos

Por orden de importancia:

1. **Riesgo de gap entre monitores (el más relevante).** Los stops −8% no existen en el broker (fraccionales rechazan GTC); dependen de chequeos a las 12:00 y 15:00 ET. Un flash-crash a las 10:00 no se detectaría hasta las 12:00, y un gap overnight tampoco tiene protección. `autonomy.json` contempla un cron alternativo cada 15 min (`*/15 10-15 * * 1-5`) que **no está desplegado** en las automations. Mitigación posible: añadir esa automation, o al menos un chequeo a las 10:00 y otro a las 16:00 (close-check que autonomy.json define pero no existe como automation).
2. **Concentración factor único con catalizadores simultáneos.** ~75% del NAV en cloud/AI y ambos earnings caen ~29–30 julio. Si el sector decepciona, las dos posiciones caen juntas. Es una apuesta deliberada (documentada en la tesis MSFT), pero conviene tener decidido *antes* de la semana de earnings el plan si un name gatilla kill criteria parcial (la tesis MSFT ya contempla exit del más débil).
3. **Scorecard mensual 2026-06 incompleto.** Campos "TBD" (SPY del período, max drawdown) nunca rellenados, y quedó con prompt 1.5.0. No hay automation de cierre mensual — el ciclo mensual depende de que alguien se acuerde. Falta crear automation-06 (primer viernes del mes o día 1).
4. **Email digest sin verificar en producción.** Desde inception no ha habido trades, así que `send-alert.sh` (Resend) nunca ha enviado un digest real. El primer email crítico podría fallar justo cuando importa (semana de earnings). Vale un test manual del script. Además `from` sigue en `onboarding@resend.dev` (pendiente dominio verificado).
5. **Plan de despliegue del cash sin codificar.** $25 (24%) esperando "claridad post-earnings" — correcto, pero no hay criterios escritos de qué gatillaría el ADD (la tesis AMZN menciona "ADD ~$25 si Q2 confirma AWS ≥25%"; convendría formalizarlo como plan pre-earnings con niveles).
6. **Muestra estadística insuficiente para la calibración.** 2 posiciones abiertas, 0 cerradas: la atribución de señales semanal es direccional, no estadística. Riesgo de sobre-ajustar pesos con ruido. La policy lo mitiga (deltas pequeños, prefer NO_CHANGE), pero hay que resistir conclusiones fuertes hasta tener cierres.
7. **Universo poco explorado.** De 10 nombres del researchUniverse solo hay tesis de AMZN y MSFT. El scanner corre a diario pero ningún candidato (GOOGL, HOOD, UBER…) ha pasado a memo de tesis. Si un name gatilla exit en earnings, no hay "next best idea" lista para rotar — Ackman siempre tiene el banquillo preparado.
8. **HHH / Ackman tracker infrautilizado.** El mandato permite HHH como único vehículo directo Ackman con tesis propia; no hay análisis hecho. Menor, pero es una herramienta del mandato sin usar.

---

## 7. Próximos pasos recomendados

| Prioridad | Acción | Dónde |
|-----------|--------|-------|
| Alta | Desplegar monitor cada 15 min (o mínimo 10:00 + 16:00) | Nueva automation + `automations-setup.md` |
| Alta | Plan de earnings escrito (escenarios AMZN/MSFT, qué hacer si beat/miss/kill parcial) antes del ~25-jul | `logs/theses/` addendum o memo pre-earnings |
| Media | Test real de `send-alert.sh` (urgent + digest) | Manual, esta semana |
| Media | Automation-06 cierre mensual + completar TBDs de 2026-06 | `workflows/` + `logs/scorecard/monthly/` |
| Media | Tesis corta ("bench memo") del #1 candidato del scanner fuera del book | `logs/theses/` |
| Baja | Dominio verificado en Resend; evaluar HHH | `config/notifications.json` |

---

## 8. Conclusión

En 19 días el fondo pasó de cero a: capital desplegado con tesis documentadas, +3.0% absoluto y +2.5 pts de alpha, 6 automations corriendo sin fallos, y un ciclo de auto-mejora ya iterando. Lo construido está sólido; lo que falta es defensivo (cobertura intradía de stops, plan de earnings, canal de alertas probado) y de profundidad (banquillo de ideas, ciclo mensual). La ventana crítica es la semana del **27–31 de julio**: ahí se validan (o no) las dos tesis a la vez.

---

*Revisión general solicitada por el LP · Datos live vía Robinhood MCP 7-jul-2026 ~7:50 ET · Not financial advice.*
