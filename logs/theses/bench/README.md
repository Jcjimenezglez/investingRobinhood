# Bench — ideas fuera del book

Memos cortos (1 página) del **#1 candidato fuera del book** según ranking semanal (`data/signals/*-universe.json`).

**No son tesis completas** — no autorizan entry sin convertir a `logs/theses/TICKER-YYYY-MM-DD.md`.

## Proceso

1. **Automation-06** (sábado 10:00 ET) lee el último `*-universe.json` de la semana
2. Excluye tickers ya en `get_equity_positions`
3. Escribe/actualiza `bench/TICKER-YYYY-MM-DD.md` usando `bench-memo-template.md`
4. Si un name sale del book (earnings exit), el bench está listo para rotación

## Archivos

- `bench-memo-template.md` — plantilla
- `UBER-2026-07-07.md` — bench vigente (rank #2 universe, #1 fuera del book)
