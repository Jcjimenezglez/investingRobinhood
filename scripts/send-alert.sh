#!/usr/bin/env bash
# Envía alerta por email vía Resend API.
# Uso: send-alert.sh <urgent|trade|digest> "<subject>" "<body>"
# Requiere: RESEND_API_KEY en .env o entorno

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TYPE="${1:-digest}"
SUBJECT="${2:-Robinhood Agent Alert}"
BODY="${3:-No body}"

if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env"
  set +a
fi

TO="${NOTIFY_EMAIL:-jcjimenezglez@gmail.com}"
FROM="${NOTIFY_FROM:-onboarding@resend.dev}"
API_KEY="${RESEND_API_KEY:-}"

PREFIX_URGENT="[ROBINHOOD AGENT — ACCIÓN REQUERIDA]"
PREFIX_TRADE="[ROBINHOOD AGENT — Trade]"
PREFIX_DIGEST="[ROBINHOOD AGENT — Resumen]"

case "$TYPE" in
  urgent) FULL_SUBJECT="$PREFIX_URGENT $SUBJECT" ;;
  trade)  FULL_SUBJECT="$PREFIX_TRADE $SUBJECT" ;;
  *)      FULL_SUBJECT="$PREFIX_DIGEST $SUBJECT" ;;
esac

if [[ -z "$API_KEY" ]]; then
  echo "WARN: RESEND_API_KEY not set. Logging alert locally."
  mkdir -p "$ROOT/logs/alerts"
  STAMP="$(date -u +%Y-%m-%dT%H%M%SZ)"
  {
    echo "# $FULL_SUBJECT"
    echo "$BODY"
  } >> "$ROOT/logs/alerts/pending-email-$STAMP.md"
  echo "Saved to logs/alerts/pending-email-$STAMP.md"
  exit 0
fi

# Escape JSON strings minimally
json_escape() {
  python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))'
}

BODY_JSON=$(printf '%s' "$BODY" | json_escape)
SUBJECT_JSON=$(printf '%s' "$FULL_SUBJECT" | json_escape)

PAYLOAD=$(cat <<EOF
{
  "from": "$FROM",
  "to": ["$TO"],
  "subject": $SUBJECT_JSON,
  "html": $BODY_JSON
}
EOF
)

HTTP_CODE=$(curl -sS -o /tmp/resend-response.json -w "%{http_code}" \
  -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

if [[ "$HTTP_CODE" -ge 200 && "$HTTP_CODE" -lt 300 ]]; then
  echo "Email sent ($TYPE): $FULL_SUBJECT"
  cat /tmp/resend-response.json
else
  echo "ERROR: Resend HTTP $HTTP_CODE" >&2
  cat /tmp/resend-response.json >&2
  exit 1
fi
