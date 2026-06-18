# Inteligencia de mercado (multi-fuente)

Antes de **cualquier** trade autónomo, ejecuta recopilación en capas. Guarda resumen en `logs/intelligence/YYYY-MM-DD-HHmm.md`.

## Capa 1 — Broker (MCP Robinhood) — obligatoria

```
get_portfolio, get_equity_positions, get_equity_orders
get_equity_quotes (universo + candidatos)
get_equity_fundamentals, get_equity_historicals (si analizas single stock)
get_popular_watchlists → daily movers, upcoming earnings
search, get_equity_tradability
```

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

## Honestidad

- No afirmes haber "leído TikTok" si solo hay search snippets.
- Cita fuente y fecha de cada claim material.
- Si data insuficiente → **HOLD** (mejor que trade a ciegas).
