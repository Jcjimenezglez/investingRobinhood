#!/usr/bin/env bash
# Vercel "Ignored Build Step" hook.
# Exit 0 → skip deploy. Exit 1 → run build + deploy.
#
# Policy: deploy when web code changes or commit includes [deploy-site].
# Daily log-only pushes to main do NOT redeploy tapefund.com.

set -euo pipefail

MSG="${VERCEL_GIT_COMMIT_MESSAGE:-}"

if echo "$MSG" | grep -q '\[deploy-site\]'; then
  exit 1
fi

if git diff HEAD^ HEAD --quiet -- web vercel.json 2>/dev/null; then
  :
else
  exit 1
fi

exit 0
