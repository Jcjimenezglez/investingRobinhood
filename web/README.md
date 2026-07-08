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

## Deploy on Vercel

1. Import repo, set **Root Directory** to `web`
2. Environment: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
3. Deploy — rebuild after each day's logs are committed

Optional: GitHub Action cron that commits journal + triggers Vercel deploy at 16:30 ET.

## SEO checklist

- [ ] Buy domain, point DNS to Vercel
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Google Search Console → submit `sitemap.xml`
- [ ] Verify `/robots.txt` and `/rss.xml`
- [ ] Add JSON-LD (future)

Account numbers are stripped at publish time (`••••3029` → `Agentic account`).
