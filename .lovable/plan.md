# Goal

Address what the audit screenshots actually flag, separating "we can fix in code" from "this isn't a code problem."

# The three critical scores - honest read

**Schema 0/100** - Fixable now, mostly already done last turn. Need to verify and add a couple more on-page schemas.

**SEO visibility 11/100** - Not a code bug. The site is young (Authority Score is likely under 20), the keyword space is competitive ("intimate wellness", "biometric storage"), and most of the catalog is still pre-launch. No technical change moves this in a week. What moves it: published guides (already 7+ live), real backlinks, real reviews, time.

**AI visibility 0/3** - Not a code bug. ChatGPT doesn't crawl your site directly for recommendations - it pulls from listicles, Reddit, news, Wikipedia, Amazon reviews. The fix is third-party presence, not on-site code. We *can* make our content more AI-friendly so when LLMs do encounter the site they parse it correctly.

# What we'll do in code

## 1. Verify schema coverage after last turn's work

Run our own audit: fetch the deployed HTML for `/`, `/products/vellvii-dox`, and `/guides/lux-vs-dox` and confirm:
- Organization + WebSite present in raw HTML (from index.html)
- Product, FAQ, Article, Breadcrumb present after JS executes
- No duplicate canonicals
- No JSON-LD syntax errors

Run Google's Rich Results test via curl on the same URLs. Report what passes.

## 2. Add the on-page schemas still missing

- **CollectionPage** schema on `/shop`, `/collections/*`, and `/guides`. The audit tools weight this for category pages.
- **ItemList** schema on collection pages listing the products in display order.
- **HowTo** schema on the care/cleaning guide.
- **Person** author block on guides (currently `Organization` - Google E-E-A-T prefers a named person, even if it's "Vellvii Editorial").
- **Speakable** schema on the homepage FAQ - this is the one LLMs and voice assistants do look at.

## 3. Improve AI-readability of the site (the small lever we have on the AI score)

- **Expand `public/llms.txt`** - currently exists but is minimal. Add the full route map with one-line descriptions for every public page so ChatGPT/Perplexity/Claude can ingest the site without parsing the JS shell.
- **Add `public/llms-full.txt`** - a long-form markdown dump of the homepage, About, all guides, and product descriptions. This is the spec extension AI crawlers explicitly look for.
- **Prerender critical routes** to static HTML so non-JS crawlers (which includes most AI tooling) see real copy, not an empty `<div id="root">`. There's already a `scripts/prerender-seo.ts` in the repo - audit whether it's wired into the build and which routes it covers.

## 4. Sitemap audit

The audit's "1 of 7 searches" hints crawlers may not see all pages. Verify `public/sitemap.xml` includes every public route the app currently has (Shop, collections, every product, every guide, contact, warranty, terms, privacy). I'll diff against `src/App.tsx` and report missing entries.

## 5. Run a real SEO snapshot via Semrush

Before guessing what to optimize, pull the actual numbers from Semrush for `vellvii.com`:
- Domain Authority Score + current organic keywords
- Top-ranking pages (if any)
- The actual keywords we rank for vs. the ones we *want* to rank for

This grounds any further content/SEO work in real data instead of audit theater.

# What we will NOT do

- **Promise to "fix" the AI mention rate.** That's earned-media work (press, Reddit, listicles, podcast mentions). No JSON-LD change makes ChatGPT recommend you.
- **Add a third-party "AI SEO" tool integration.** Most are snake oil. The fundamentals (clean schema, crawlable HTML, llms.txt, real content) cover the same ground.
- **Chase the score on that specific dashboard.** It's a sales funnel for whoever made the report. We'll fix the underlying issues; the score will move when their next scan runs.

# Files touched

- `public/llms.txt` (expand), `public/llms-full.txt` (new)
- `src/pages/Shop.tsx`, `src/pages/Collection*.tsx`, `src/pages/Guides.tsx` (add CollectionPage + ItemList JSON-LD)
- `src/components/guides/GuideLayout.tsx` (Person author + Speakable)
- `src/components/SEO.tsx` (add CollectionPage / ItemList / HowTo / Speakable slots)
- `scripts/generate-sitemap.ts` or `public/sitemap.xml` (audit + fill gaps)
- `scripts/prerender-seo.ts` and `package.json` (verify wiring)

# Expected outcome

Within one re-crawl cycle (~1-3 weeks):
- Schema score on that audit moves from 0 to high (most checks pass)
- Technical health stays at 94+
- SEO visibility moves only when real content keeps shipping and backlinks accumulate - no overnight change
- AI visibility unchanged from on-site work alone - that requires off-site presence

I'll be upfront about which numbers moved and which didn't.
