#!/usr/bin/env bash
# Create Vercel project + production deploy for investingRobinhood web/
# Requires: VERCEL_TOKEN (https://vercel.com/account/tokens)
set -euo pipefail

: "${VERCEL_TOKEN:?Set VERCEL_TOKEN}"

TEAM_ID="team_G5P8bHVuaNrZnDYe2Xr7oXL2"
PROJECT_NAME="${VERCEL_PROJECT_NAME:-investing-robinhood}"
SITE_URL="https://${PROJECT_NAME}.vercel.app"
REPO="jcjimenezglez/investingRobinhood"

echo "→ Creating project ${PROJECT_NAME} (root: web/)..."

HTTP=$(curl -sS -o /tmp/vercel-project.json -w "%{http_code}" \
  -X POST "https://api.vercel.com/v11/projects?teamId=${TEAM_ID}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"${PROJECT_NAME}\",
    \"framework\": \"nextjs\",
    \"rootDirectory\": \"web\",
    \"buildCommand\": \"npm run build\",
    \"outputDirectory\": \"out\",
    \"installCommand\": \"npm install\",
    \"gitRepository\": {
      \"type\": \"github\",
      \"repo\": \"${REPO}\"
    }
  }")

if [[ "$HTTP" != "200" && "$HTTP" != "201" ]]; then
  if grep -q "already exists" /tmp/vercel-project.json 2>/dev/null; then
    echo "  Project already exists — continuing."
  else
    cat /tmp/vercel-project.json
    exit 1
  fi
else
  echo "  Created."
fi

echo "→ Setting NEXT_PUBLIC_SITE_URL=${SITE_URL}..."
curl -sS -X POST "https://api.vercel.com/v10/projects/${PROJECT_NAME}/env?teamId=${TEAM_ID}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "[{
    \"key\": \"NEXT_PUBLIC_SITE_URL\",
    \"value\": \"${SITE_URL}\",
    \"type\": \"plain\",
    \"target\": [\"production\", \"preview\", \"development\"]
  }]" > /dev/null || true

echo "→ Deploying production from web/..."
cd "$(dirname "$0")/.."
NEXT_PUBLIC_SITE_URL="${SITE_URL}" npx vercel@latest deploy --yes --prod \
  --token "${VERCEL_TOKEN}" \
  --scope jcjimenezglezs-projects \
  --name "${PROJECT_NAME}"

echo ""
echo "Live: ${SITE_URL}"
