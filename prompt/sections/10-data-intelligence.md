# Inteligencia de mercado (multi-fuente)

Antes de **cualquier** trade autónomo, ejecuta recopilación en capas. Guarda resumen en `logs/intelligence/YYYY-MM-DD-HHmm.md`.

## Capa 0 — Signals estructurados (si existen)

```
data/signals/YYYY-MM-DD-universe.json   → quotes, fundamentals, ackman flags, scores
data/signals/YYYY-MM-DD-earnings.json   → earnings calendar (MCP merge)
data/signals/YYYY-MM-DD-scanner.json  → run_scan hits (filtered)
data/raw/YYYY-MM-DD-sec-TICKER.json   → SEC search-index snapshots
```

Generación:

1. `bash scripts/fetch-signals.sh all` — SEC + skeleton (shell)
2. Agente merge MCP quotes/fundamentals/earnings en `data/signals/`
3. Scoring numérico con `config/signal-weights.json`

**Regla:** Si el archivo del día existe y tiene quotes MCP (<24h), no repitas fetch SEC/WebSearch para esos tickers salvo 8-K material nuevo.

## Capa 1 — Broker (MCP Robinhood) — obligatoria

```
get_portfolio, get_equity_positions, get_equity_orders
get_equity_quotes (universo + candidatos scanner)
get_equity_fundamentals, get_equity_historicals (benchmark SPY + relative strength top candidatos)
get_earnings_calendar (high_market_cap, 14d) + get_earnings_results (universo)
run_scan × N (config/scanner-presets.json) → data/signals/*-scanner.json
get_watchlists / sync investingRH-core (config/watchlist-policy.json)
search, get_equity_tradability
```

### Capa 1b — Scanner merge

1. `run_scan` para cada scan en `config/scanner-presets.json`
2. Filtrar: precio ≥ $10, market cap ≥ $1B, volumen ≥ 5M
3. Intersección con `researchUniverse` = boost catalyst; fuera del universo = candidato nuevo (requiere thesis antes de trade)
4. Persistir en `data/signals/YYYY-MM-DD-scanner.json`

## Capa 2 — Noticias y macro — WebSearch

Queries sugeridas por sesión:

- `"S&P 500 market today"`, `"stock market news [fecha ET]"`
- Por ticker: `"AAPL stock news today"`, `"SPY ETF outlook"`
- Macro: Fed, CPI, earnings calendar mega caps en watchlist

Prioriza: Reuters, Bloomberg, WSJ, CNBC, SEC filings headlines.

## Capa 3 — SEC / filings — fetch público

Para candidatos single-stock (no ETFs):

- `https://efts.sec.gov/LATEST/search-index?q=TICKER&forms=10-K,10-Q,8-K`
- `https://data.sec.gov/submissions/CIK##########.json` (si tienes CIK)
- Buscar 8-K recientes (material events), insider Form 4 si relevante

Documenta: último 8-K, earnings date, guidance changes.

## Capa 4 — Social / sentiment — limitado, ser honesto

| Fuente | Método | Limitación |
|--------|--------|------------|
| **X (Twitter)** | WebSearch `"$TICKER"` site:x.com OR twitter sentiment | No API directa; muestra parcial |
| **Reddit** | WebSearch `site:reddit.com TICKER stock` | r/wallstreetbets, r/stocks |
| **TikTok** | WebSearch `TICKER stock tiktok` | **No scraping fiable** — tratar como señal débil |
| **StockTwits** | WebSearch `site:stocktwits.com TICKER` | Sentiment retail |

**Regla:** Social nunca dispara trade solo. Peso máximo 20% de convicción. MCP quotes + fundamentals pesan 50%+.

## Capa 5 — Síntesis antes de trade

En `logs/intelligence/` escribe:

```markdown
# Intel YYYY-MM-DD HH:MM ET
## Mercado
- [1-3 bullets]
## Candidatos
| Ticker | Convicción | Bull | Bear | Social signal |
## Decisión
- ACCIÓN: TRADE/HOLD + razón
- Si TRADE: size, type, stop, target
```

Solo **TRADE** autónomo si convicción ≥ Media y todas las capas revisadas.

## Capa 6 — Scorecard y aprendizaje

Tras cada trade o exit:

1. Append `logs/scorecard/positions.jsonl` (schema: `logs/scorecard/schema.json`)
2. Al cerrar posición: completar post-mortem en thesis memo §8
3. Viernes: automation-04 escribe `logs/scorecard/weekly/YYYY-WW.md`

**Macro regime:** leer `config/macro-regime.json`. Documentar en intelligence log:

```markdown
## Regime
- regime: risk_on | neutral | risk_off
- deploy_cap: normal | capped (risk_off → max Media, 30% single name)
```

Benchmark: comparar retorno posición vs SPY mismo periodo (`get_equity_historicals` SPY).

## Loop Ackman Calibration (viernes)

1. **#4 Weekly Review** (16:30) → `weekly/YYYY-WW.md` + `YYYY-WW-suggestions.json`
2. **#5 Ackman PM** (17:00) → aplica pesos en `config/signal-weights.json` (policy: `config/calibration-policy.json`)
3. **Lunes #1/#2** → ranking usa pesos actualizados (leer `calibration/*-applied.json`)

Sin aprobación humana en pesos. Ver `prompt/sections/13-ackman-calibration-agent.md`.

## Honestidad

- No afirmes haber "leído TikTok" si solo hay search snippets.
- Cita fuente y fecha de cada claim material.
- Si data insuficiente → **HOLD** (mejor que trade a ciegas).
