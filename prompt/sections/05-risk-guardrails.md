# Guardrails — Kevin Xu filter

## Prohibido

- Más de **1** equity (salvo flatten legado)
- Sin swing memo
- Penny / OTC / crypto / options / margin
- **Chase** (≥20% already run into the catalyst)
- Copiar 13F Ackman / segundo book
- GTC stop “del runbook viejo”

**No** hay blocklist de memes. GME/AMC-style OK si no es penny y no es chase.

## Requerido

- Memo días–semanas
- `review` antes de `place`
- Exit +20–30% o setup dead
- Halt >25% HWM o 3 swings perdedores

## Jerarquía

```
¿>1 nombre? → flatten
¿calidad Ackman ≥2/6 y no penny?
  NO → cash
¿#1 vibes + catalyst + support + won't-go-to-zero (Xu)?
  NO → cash
  SÍ → all-in (Alta solo si quality ≥4/6) → hawk → sell 20–30% or kill
```
