#!/usr/bin/env bash
# Trigger a production deploy on Vercel via Deploy Hook.
# Requires VERCEL_DEPLOY_HOOK in env (create in Vercel → Project → Settings → Git → Deploy Hooks).

set -euo pipefail

HOOK="${VERCEL_DEPLOY_HOOK:-}"

if [ -z "$HOOK" ]; then
  echo "VERCEL_DEPLOY_HOOK is not set — skip remote deploy trigger." >&2
  echo "Create a Deploy Hook in Vercel and add the URL to GitHub Secrets / automation env." >&2
  exit 0
fi

echo "Triggering Vercel production deploy..."
HTTP=$(curl -sS -o /tmp/vercel-deploy-hook.json -w "%{http_code}" -X POST "$HOOK")

if [ "$HTTP" -ge 200 ] && [ "$HTTP" -lt 300 ]; then
  echo "Deploy hook accepted (HTTP $HTTP)."
  cat /tmp/vercel-deploy-hook.json 2>/dev/null || true
  exit 0
fi

echo "Deploy hook failed (HTTP $HTTP):" >&2
cat /tmp/vercel-deploy-hook.json >&2 || true
exit 1
