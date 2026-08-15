# Automations — "Failed to create" troubleshooting

If save fails in the Automations editor, check these in order.

## 1. GitHub connected in Cursor (most common)

Cron automations **default to no repository**. You must pick one manually.

1. [cursor.com/dashboard](https://cursor.com/dashboard) → **Integrations** → **GitHub**
2. Install the Cursor GitHub App on **Jcjimenezglez/investingRobinhood**
3. Grant **Contents** (read/write) at minimum

Without this: `Repository access denied` or `failed to create`.

## 2. Repository selected in the automation

In the editor, under **Repositories** (not only the prompt):

- Mode: **Single repository**
- Repo: `Jcjimenezglez/investingRobinhood`
- Branch: `main`

Required for cron jobs that write `logs/` and run `scripts/`.

## 3. Cloud Agent environment

1. [cursor.com/dashboard?tab=cloud-agents](https://cursor.com/dashboard?tab=cloud-agents)
2. Create or verify a **Cloud Agent environment** (billing / Pro plan)
3. Default branch must be `main` on the repo

## 4. Create one automation first (minimal)

Do **not** bulk-save 5 tabs at once. Create **one**, save, test run, then clone the pattern.

Suggested first: **Pre-Market 8:00 ET** (research only, no trades).

### Trigger

- Type: **Scheduled**
- Cron: `0 8 * * 1-5`
- Timezone: **America/New_York**

### Repository

- Single repo: `Jcjimenezglez/investingRobinhood` / `main`

### Prompt (paste)

```
You are CIO of investingRobinhood (~$118 Agentic, Kevin Xu mandate).

Follow workflows/automation-01-premarket.md in the repo.

Load prompt/manifest.json. Run: bash scripts/fetch-signals.sh all

Write logs/intelligence/YYYY-MM-DD-0800-premarket.md.

NO trades. Commit and push logs/ and data/signals/ to main.
```

### Tools

- Enable **MCP** → add `robinhood-trading` (OAuth once in [cursor.com/agents](https://cursor.com/agents) MCP settings)

### Save → Run once manually

Check run history for errors.

## 5. Remaining four automations

| Name | Cron (ET) | Workflow file |
|------|-----------|---------------|
| Market Open 9:35 | `35 9 * * 1-5` | automation-02-market-open.md |
| Midday Monitor | `0 12 * * 1-5` | automation-03-intraday-monitor.md |
| Close Monitor | `0 15 * * 1-5` | automation-03-intraday-monitor.md |
| Weekly Review | `30 16 * * 5` | automation-04-weekly-review.md |
| SPCX personal watch | `0 18 * * 5` | automation-08-spcx-personal-watch.md (NO orders) |

Same repo + branch + Robinhood MCP on each.

## 6. If prefill from chat broke the form

Close all automation tabs. **New automation** → fill manually using this doc (no prefill).

Special characters in names (em dash `—`) can sometimes break save — use ASCII hyphens only.

## 7. Still failing?

Open DevTools → Network tab → click Save → note HTTP status (400/403/500).

Common messages:

| Error | Fix |
|-------|-----|
| Repository access denied | GitHub App on repo (step 1) |
| unauthenticated | Re-login Cursor + GitHub |
| Cloud environment | Dashboard → Cloud Agents → create env |
| EXEC_DAEMON_NOT_READY | Cursor infra — retry in ~1 hour |
