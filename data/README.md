# Data pipeline — investingRobinhood

Structured daily signals complement markdown intelligence logs. **Do not duplicate** capas 1–5 in `prompt/sections/10-data-intelligence.md` — this folder stores machine-readable output.

## Layout

```
data/
├── raw/              # SEC JSON snapshots (gitignored if large)
├── signals/          # Daily merged signals (commit)
└── README.md
```

## Daily workflow

1. **Agent (MCP)** — quotes, fundamentals, earnings, scanner → merge into `signals/YYYY-MM-DD-universe.json`, `YYYY-MM-DD-earnings.json`, `YYYY-MM-DD-scanner.json`
2. **Shell** — `bash scripts/fetch-signals.sh sec` → SEC 8-K index per ticker in `data/raw/`
3. **Shell** — `bash scripts/fetch-signals.sh skeleton` → universe skeleton with Ackman confluence flags
4. **Agent** — if `data/signals/{today}-universe.json` exists, read before WebSearch/SEC inline

## Universe JSON shape

```json
{
  "date": "2026-06-20",
  "regime": "neutral",
  "tickers": [
    {
      "symbol": "AMZN",
      "quote": {},
      "fundamentals": {},
      "ackman_confluence": true,
      "ackman_weight_pct": 17.4,
      "scores": {
        "composite": 0.78,
        "fundamental_quality": 0.85,
        "mispricing_vs_fair_value": 0.72,
        "catalyst_proximity_days": 0.80,
        "ackman_confluence": 1.0,
        "social_sentiment": 0.5
      }
    }
  ]
}
```

Scoring weights: `config/signal-weights.json`. Sources: `config/data-sources.json`.

## Scorecard link

After each trade or exit, append `logs/scorecard/positions.jsonl` (schema in `logs/scorecard/schema.json`). Journal remains narrative source of truth.
