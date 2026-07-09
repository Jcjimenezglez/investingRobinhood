# investingRobinhood — public site

Static Next.js site that reads daily content from `../logs/` at build time. No CMS — the agent's markdown **is** the content.

## Pages

| Route | Source |
|-------|--------|
| `/` | `positions.jsonl` + latest journal |
| `/journal/[date]` | `logs/intelligence/YYYY-MM-DD-*.md` |
| `/trades`, `/trades/[ticker]` | `logs/scorecard/positions.jsonl` |
| `/theses/[slug]` | `logs/theses/*.md` |
| `/letters/[slug]` | `logs/investor-letters/*.md` |
| `/performance` | `logs/scorecard/weekly/*.md` |
| `/methodology` | Pillar page (SEO) |

## Local dev

```bash
cd web
npm install
npm run dev
```

## Production build

```bash
cd web
NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run build
```

Output: `web/out/` (static export).

## Deploy on Vercel (recommended)

1. [vercel.com/new](https://vercel.com/new) → Import `investingRobinhood` from GitHub
2. **Root Directory:** `web`
3. **Environment:** `NEXT_PUBLIC_SITE_URL=https://<your-project>.vercel.app`
4. Deploy — you get a `*.vercel.app` URL immediately (swap to custom domain later)

Or CLI (after `vercel login`):

```bash
cd web && vercel --prod
```

`vercel.json` is included. Each push to `main` can auto-deploy if Git integration is enabled.

## Publishing schedule

The site is **static** — it reads `logs/` at build time. Policy: **`config/site-publish.json`**.

| When | What happens |
|------|----------------|
| Mon–Fri automations | Commit logs to `main` — **no** public redeploy |
| Friday ~17:00 ET | Calibration automation commits with `[deploy-site]` + runs `scripts/trigger-site-deploy.sh` |
| Manual `web/` changes | Always redeploy (Vercel `ignoreCommand` detects `web/` diffs) |

### One-time setup (weekly deploy)

1. **Vercel Deploy Hook:** Project → Settings → Git → Deploy Hooks → branch `main` → copy URL
2. **GitHub Secret:** `VERCEL_DEPLOY_HOOK` (enables backup workflow `.github/workflows/deploy-site-friday.yml`)
3. **Cursor Automation #6 env:** same `VERCEL_DEPLOY_HOOK` so `trigger-site-deploy.sh` runs after Friday calibration

Without the hook, logs still land in GitHub but tapefund.com only updates when you push `web/` changes manually.

## SEO checklist

- [ ] Buy domain, point DNS to Vercel
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Google Search Console → submit `sitemap.xml`
- [ ] Verify `/robots.txt` and `/rss.xml`
- [ ] Add JSON-LD (future)

## Privacy

All published content passes `lib/sanitize.ts` before render:

- Account numbers and Robinhood account IDs → redacted
- Order UUIDs, emails, exact fractional share counts → redacted
- Internal repo paths (`logs/`, `config/`, etc.) → `[internal]`
- Pre-flight / MCP check-loop sections → stripped from journal pages
- LP-personal references in letters/theses → neutralized public copy

`npm run build` runs `scripts/verify-public-content.ts` and **fails** if private patterns leak.

**Never published:** `logs/trade-journal.md`, calibration files, alerts, `.env`, raw MCP dumps.
