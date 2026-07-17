# Tapefund SEO + pSEO + GEO Plan

**Model:** Motley Fool *Stock Advisor* clone (English)  
**Scoreboard:** Tapefund live track record vs SPY  
**Product:** Paid stock newsletter (picks + theses)  
**Not in scope:** Agent kit, Acorns/RIA, Numerai, Spanish SEO

Keyword source: Google Keyword Planner export `Keyword Stats 2026-07-17` (~1,694 terms).

---

## 1. Strategy in one page

| Layer | Job | Primary keywords |
|---|---|---|
| **SEO** | Rank for category + convert to newsletter | `stock newsletter`, `stock picks`, `stock advisor`, `stock recommendations` |
| **pSEO** | Scale pages from data you already have (tickers, dates, theses) | `{TICKER} thesis`, `{TICKER} stock analysis`, journal/date URLs |
| **GEO** | Get cited by ChatGPT / Perplexity / AI Overviews | Clear facts, FAQ, vs-SPY stats, methodology, citations |

**Funnel**

```
Demand content ("best stocks to buy now")
        ↓
Tapefund proof (NAV, book summary, vs SPY)
        ↓
Newsletter CTA (Stock Advisor–style picks + full theses)
```

**Paywall rule (critical)**  
- **Free:** scoreboard (NAV, vs SPY, high-level book / delayed detail)  
- **Paid:** actionable pick timing + full thesis depth + weekly letter  
If the live book already gives “what to buy,” nobody pays for picks.

---

## 2. Keyword tiers

### Tier A — Product (own these)

| Keyword | Vol/mo | Comp | Target URL |
|---|---:|---|---|
| stock newsletter | 50,000 | Low | `/newsletter/` |
| stock advisor | 5,000 | Low | `/newsletter/` (H1/alt) or `/stock-advisor/` alias |
| stock picks | 5,000 | Low | `/picks/` hub |
| stock recommendations | 5,000 | Medium | `/picks/` |
| stock advisory services | 5,000 | Medium | `/newsletter/` comparison section |
| stock picking service | 500 | Low | `/newsletter/` |
| best stock picking service | 500 | Medium | `/vs/motley-fool-stock-advisor/` |

**Hero:** `stock newsletter` — best volume/competition fit for the actual product.

### Tier B — Demand (acquisition content)

| Keyword pattern | Vol/mo | Role |
|---|---:|---|
| best stocks to buy now / right now | ~50,000 | Recurring listicles → CTA |
| stocks to buy | ~50,000 | Broad hub |
| best growth stocks to buy now | 5,000 | Better fit (thesis / growth) |
| top stocks to buy now | 5,000 | Supporting |

Publish on a cadence; always end with newsletter + Tapefund vs SPY proof.

### Tier C — Brand / opportunistic (do not build the business on these)

| Keyword | Use |
|---|---|
| motley fool stock advisor (+ review / cost / worth it) | One “alternative” page + maybe 1 review-style post |
| motley fool login / sign in | Ignore |

### Avoid as primary positioning

Old site keywords like “AI hedge fund”, “Numerai”, “Robinhood Agentic” as head terms — keep as supporting copy only. They describe the engine, not the product people search.

---

## 3. Information architecture

### Keep (proof / existing pSEO)

| Path | Role |
|---|---|
| `/` | Scoreboard + vs SPY + CTA newsletter |
| `/performance/` | Fool-style “vs S&P” marketing chart |
| `/trades/` + `/trades/[ticker]/` | Book / ticker pages (pSEO) |
| `/theses/` + `/theses/[slug]/` | Free teaser theses; depth gated later |
| `/journal/[date]/` | Daily log (pSEO + GEO freshness) |
| `/methodology/` | Trust + GEO |
| `/faq/` | GEO + schema |
| `/letters/` | Archive; newest teaser → paid |

### Add (product + SEO)

| Path | Primary keyword | Notes |
|---|---|---|
| `/newsletter/` | stock newsletter, stock advisor | Main money page |
| `/picks/` | stock picks, stock recommendations | Hub of free summaries + paywall |
| `/picks/[slug]/` or date issues | — | Each letter/issue |
| `/best-stocks-to-buy-now/` | best stocks to buy now | Living page, updated weekly |
| `/best-growth-stocks-to-buy-now/` | best growth stocks to buy now | Same pattern |
| `/vs/motley-fool-stock-advisor/` | best stock picking service + brand | Honest comparison; Tapefund vs SPY |

### Optional later

- `/stocks-to-buy/` hub linking Tier B posts  
- `/alternatives/motley-fool/` redirect to `/vs/...`

---

## 4. Classic SEO plan

### On-page (every money / pillar page)

1. **One primary keyword** in title, H1, first 100 words, slug.  
2. **Proof block above fold:** Tapefund return vs SPY since inception (update on deploy).  
3. **CTA:** “Get this week’s pick + full thesis”.  
4. **Disclaimer:** not investment advice; past performance ≠ future results.  
5. Internal links: homepage ↔ newsletter ↔ performance ↔ 2–3 demand posts.

### Title / H1 examples

| URL | Title (draft) |
|---|---|
| `/newsletter/` | Stock Newsletter with Live Track Record vs S&P 500 \| Tapefund |
| `/picks/` | Stock Picks & Recommendations — Live CIO Book \| Tapefund |
| `/best-stocks-to-buy-now/` | Best Stocks to Buy Now (Updated Weekly) \| Tapefund |
| `/performance/` | Tapefund vs S&P 500 — Live Stock Advisor Track Record |
| `/vs/motley-fool-stock-advisor/` | Motley Fool Stock Advisor Alternative: Live Track Record |

### Technical (already mostly there)

- Sitemap includes static + journal + tickers + theses + performance  
- Canonicals via `pageMetadata`  
- RSS `/rss.xml` — keep; add newsletter issues when live  
- Update `BRAND.keywords` in `web/lib/site-config.ts` to Tier A (drop hedge-fund-first list)

Suggested keyword list for `site-config`:

```text
stock newsletter, stock picks, stock recommendations, stock advisor,
stock picking service, live track record, vs S&P 500, investment thesis
```

### Content cadence (manual SEO)

| Cadence | Asset |
|---|---|
| Weekly | `/best-stocks-to-buy-now/` refresh + newsletter issue |
| Weekly | Friday performance note (already in runbook) |
| Monthly | 1 growth / thesis deep-dive (free teaser) |
| Once | `/vs/motley-fool-stock-advisor/` |

---

## 5. Programmatic SEO (pSEO)

Use **structured data you already generate** so pages scale without inventing thin content.

### Existing templates (improve, don’t reinvent)

| Template | URL | Intent | Enrichment |
|---|---|---|---|
| Ticker trade page | `/trades/[ticker]/` | `{ticker} stock` / position transparency | Add: vs SPY while held, thesis link, “last CIO note”, FAQ block |
| Thesis page | `/theses/[slug]/` | `{ticker} investment thesis` | Free abstract + paywall for full thesis |
| Journal day | `/journal/[date]/` | freshness / “what we did on DATE” | 2–3 sentence summary + tickers mentioned + link to newsletter |
| Weekly performance | `/performance/[slug]/` | vs SPY weekly | Chart snippet + shareable “Stock Advisor–style” returns blurb |

### New pSEO templates (phase 2)

| Template | URL pattern | Source data | Index rule |
|---|---|---|---|
| Ticker thesis hub | `/stocks/[ticker]/` | merge trades + theses + journal mentions | Only if thesis or open/closed trade exists |
| Monthly picks archive | `/picks/20XX/MM/` | newsletter issues | After 3+ issues |

**Quality bar (avoid thin pSEO spam)**  
- No page without ≥300 words of unique narrative OR unique structured facts (entry, size, return, thesis excerpt).  
- `noindex` stub tickers with no activity.  
- Every pSEO page links up to hub (`/trades/`, `/picks/`) and sideways to 2 related tickers.

### Internal linking graph

```
/newsletter/  ←——  /picks/  ←——  /best-stocks-to-buy-now/
     ↑                ↑
/performance/   /trades/[ticker]/ ←→ /theses/[slug]/
     ↑                ↑
     └———— /journal/[date]/ ————┘
```

---

## 6. GEO (Generative Engine Optimization)

Goal: when someone asks ChatGPT / Perplexity / Gemini / AI Overviews  
*“stock newsletter with live track record”* or *“AI CIO stock picks vs S&P”*, Tapefund gets cited.

### What models cite

1. **Clear, quotable facts** (numbers + dates)  
2. **FAQ / Q&A** in plain language  
3. **Methodology** pages  
4. **Consistent entity** (same name, same URL, same inception date)  
5. **Original data** (your NAV / vs SPY — not scraped picks)

### GEO checklist for Tapefund

| Action | Where |
|---|---|
| Lead with definition | Home + About-style blurb: “Tapefund is a stock newsletter backed by a live public track record vs S&P 500, started YYYY-MM-DD with $100.” |
| Refresh FAQ for product | Add: What is the newsletter? Free vs paid? Is it Motley Fool? How vs SPY calculated? |
| Keep `/methodology/` crisp | Rules in bullets models can quote |
| Publish stable stats block | Inception date, starting NAV, current NAV, return vs SPY, # positions — same numbers sitewide |
| Article schema + FAQ schema | Already partially via SEO helpers — extend to newsletter + picks |
| Author / org entity | Organization JSON-LD; later Person “CIO” if you brand one |
| Earn citations | Guest posts, X/LinkedIn with link to `/performance/` chart (same as Fool marketing) |
| Avoid fluff | Models skip vague “AI-powered alpha” — prefer “concentrated long equities, thesis before buy, cash floor X%” |

### GEO-friendly answer blocks (add to homepage / FAQ)

Use short self-contained paragraphs:

> Tapefund publishes a live stock-picking track record and a paid stock newsletter. Performance is measured against the S&P 500 (SPY) since inception on 2026-06-18. The public site shows NAV and high-level positions; subscribers get full theses and weekly stock recommendations. This is not investment advice.

### Questions to win in AI answers

- “Best stock newsletter with public track record”  
- “Stock Advisor alternative with live performance”  
- “How does Tapefund compare to the S&P 500?”  
- “Is Tapefund investment advice?” → clear No + disclaimer (trust)

---

## 7. Free vs paid content matrix

| Content | Free (SEO/GEO/proof) | Paid (Stock Advisor) |
|---|---|---|
| NAV + return vs SPY | Yes | — |
| Open tickers (names only or delayed) | Yes (decide delay policy) | Full size / conviction / entry detail |
| Thesis one-pager | Teaser (problem + thesis sentence) | Full thesis + kill criteria + sizing |
| Weekly “best stocks to buy now” | Top 1–2 names + why in 2 lines | Full list + sizing notes |
| Daily journal | Summary | Extended CIO reasoning |
| Investor letter | Headline | Full letter |

**Recommended delay policy for Fool-like conversion:** publish ticker names on site the same day; keep **entry/sizing/full thesis** for subscribers for 7 days — or keep names free forever and only gate depth (Option A from strategy discussion). Pick one and stick to it.

---

## 8. Phased roadmap

### Phase 0 — Positioning (no big build)

1. Rewrite homepage message: Stock Advisor–style newsletter + live vs SPY (not “AI hedge fund telemetry”).  
2. Update `BRAND` tagline, description, keywords.  
3. FAQ: newsletter + free vs paid.  
4. Single primary CTA → `/newsletter/` waitlist landing (email capture deferred; UI-only for now).

### Phase 1 — Money + proof pages

1. Ship `/newsletter/` (Tier A).  
2. Strengthen `/performance/` as Fool-style vs S&P chart.  
3. Ship `/best-stocks-to-buy-now/` (weekly update from runbook).  
4. Connect newsletter provider (Substack/Ghost/Beehiiv) — **deferred**: landing + waitlist UI first; email capture later.

### Phase 2 — pSEO enrichment

1. Enrich `/trades/[ticker]/` with vs-SPY-while-held + FAQ.  
2. Thesis teasers + paywall or “full thesis in newsletter” CTA.  
3. Journal summaries for GEO freshness.

### Phase 3 — Competitive + scale

1. `/vs/motley-fool-stock-advisor/`.  
2. `/picks/` hub + issue archive.  
3. Optional `/stocks/[ticker]/` consolidated pSEO only for active names.

---

## 9. Measurement

| Metric | Target (directional) |
|---|---|
| Organic landing on Tier A/B | Growing week over week |
| CTA click home → newsletter | ≥5% of sessions after Phase 1 |
| Paid subs | Validate before more pSEO templates |
| AI citations | Manual checks monthly in Perplexity/ChatGPT for 4 GEO queries above |
| vs SPY block accuracy | Must match `/performance/` (trust) |

**Do not** optimize for Motley Fool brand terms as primary KPI.

---

## 10. What “good” looks like

Someone searching **stock newsletter** or **best stocks to buy now** lands on Tapefund, sees **vs S&P proof**, understands **free scoreboard vs paid picks/theses**, and subscribes.

pSEO makes every ticker and journal day a door into that story.  
GEO makes AI engines repeat your definition and cite your track record.

---

## 11. Implementation notes (repo)

| File / area | Change when executing |
|---|---|
| `web/lib/site-config.ts` | Brand copy + keywords → Stock Advisor positioning |
| `web/app/page.tsx` | Hero + CTA + vs SPY |
| `web/app/faq/page.tsx` + `SITE_FAQ` | Newsletter FAQs |
| New routes | `newsletter`, `picks`, `best-stocks-to-buy-now`, `vs/...` |
| `web/app/sitemap.ts` | Register new static paths |
| Automations / Friday report | Feed `/best-stocks-to-buy-now/` + performance chart |

This document is the plan only; implementation is a separate change set.
