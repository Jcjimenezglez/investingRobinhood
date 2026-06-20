#!/usr/bin/env bash
# Fetch free signal layers: SEC search-index + universe skeleton with Ackman merge.
# MCP quotes/fundamentals/earnings must be merged by the agent (no MCP in shell).
#
# Usage:
#   fetch-signals.sh sec [YYYY-MM-DD]     # curl SEC for researchUniverse tickers
#   fetch-signals.sh skeleton [YYYY-MM-DD] # create signals/YYYY-MM-DD-universe.json skeleton
#   fetch-signals.sh all [YYYY-MM-DD]     # sec + skeleton

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DATE="${2:-$(TZ=America/New_York date +%Y-%m-%d)}"
SOURCES="$ROOT/config/data-sources.json"
MANDATE="$ROOT/config/fund-mandate.json"
ACKMAN="$ROOT/config/ackman-tracker.json"
RAW_DIR="$ROOT/data/raw"
SIGNALS_DIR="$ROOT/data/signals"
UA="investingRobinhood research-agent"

mkdir -p "$RAW_DIR" "$SIGNALS_DIR"

read_universe() {
  python3 - <<'PY' "$MANDATE"
import json, sys
with open(sys.argv[1]) as f:
    d = json.load(f)
print("\n".join(d["researchUniverse"]))
PY
}

fetch_sec() {
  local ticker="$1"
  local out="$RAW_DIR/${DATE}-sec-${ticker}.json"
  if [[ -f "$out" ]]; then
    echo "SKIP $ticker (exists)"
    return 0
  fi
  local url="https://efts.sec.gov/LATEST/search-index?q=${ticker}&forms=10-K,10-Q,8-K"
  if curl -sf -A "$UA" -H "Accept: application/json" "$url" -o "$out"; then
    echo "SEC $ticker -> $out"
  else
    echo "WARN: SEC fetch failed for $ticker" >&2
    rm -f "$out"
  fi
  sleep 0.2
}

cmd_sec() {
  while IFS= read -r ticker; do
    [[ -n "$ticker" ]] && fetch_sec "$ticker"
  done < <(read_universe)
}

cmd_skeleton() {
  local out="$SIGNALS_DIR/${DATE}-universe.json"
  python3 - <<PY
import json
from pathlib import Path

root = Path("$ROOT")
date = "$DATE"
mandate = json.loads((root / "config/fund-mandate.json").read_text())
ackman = json.loads((root / "config/ackman-tracker.json").read_text())
holdings = {h["symbol"]: h for h in ackman.get("holdings", [])}
goog = holdings.get("GOOG") or holdings.get("GOOGL")

tickers = []
for sym in mandate["researchUniverse"]:
    h = holdings.get(sym) or (holdings.get("GOOG") if sym == "GOOGL" else None)
    tickers.append({
        "symbol": sym,
        "quote": None,
        "fundamentals": None,
        "ackman_confluence": h is not None and h.get("weightPct", 0) > 0.5,
        "ackman_weight_pct": h.get("weightPct") if h else None,
        "ackman_change": h.get("change") if h else None,
        "scores": None
    })

doc = {
    "date": date,
    "regime": "neutral",
    "generated_by": "fetch-signals.sh skeleton",
    "note": "Agent merges MCP quote/fundamental data and computes scores per config/signal-weights.json",
    "tickers": tickers
}
out = root / "data/signals" / f"{date}-universe.json"
out.write_text(json.dumps(doc, indent=2) + "\n")
print(f"Wrote {out}")
PY
}

CMD="${1:-all}"
case "$CMD" in
  sec) cmd_sec ;;
  skeleton) cmd_skeleton ;;
  all) cmd_sec; cmd_skeleton ;;
  *)
    echo "Usage: $0 {sec|skeleton|all} [YYYY-MM-DD]" >&2
    exit 1
    ;;
esac
