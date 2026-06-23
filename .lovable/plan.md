## Audit findings (vellvii.com, US database, Semrush)

**Where you stand today**
- Authority Score: **2/100**. Domain is brand-new in Google's eyes.
- 10 ranking keywords, ~168 est. visits/mo. The only #1 is your brand name.
- Real opportunity already in reach: "best sex toy storage" (#17, vol 110), "sex toy storage" (#45, vol 1,900), "sex toy box" (#48, vol 1,300), "storage for adult toys" (#30, vol 70). All point to ONE guide page that's doing all the heavy lifting.
- Backlink profile is thin (12 referring domains) and dominated by the heyupnow.com pattern noted in memory. No real authority links yet.
- Direct keyword overlap with Lovehoney/Lelo is effectively zero — they own generic toy keywords; you're carving a sub-niche (luxury storage / biometric). Good — don't fight them head-on.

**Technical SEO state**
- index.html head is solid (canonical, OG, Organization JSON-LD, gtag, pixel).
- robots.txt + sitemap.xml exist and are hand-maintained.
- Per-route `<Helmet>` coverage is partial — needs audit across Shop, all 6 Collection pages, ProductDetail (dynamic), every Guide. Each needs unique title/description/canonical/og + Product or Article JSON-LD.
- Sitemap is hand-edited and likely stale vs. Shopify product list and current routes.
- Image alts: now clean on DOX (just fixed), but unverified across guides and Lux.

**Motion state**
- Good foundations: carousel layer-toggle, scroll-aware header, sticky mobile bar, Tailwind animations (fade-in, scale-in, accordion).
- Gaps vs. Apple/B&O/Aesop standard:
  - No scroll-pinned product narrative (DOX color/biometric/interior should each "earn" their scroll moment).
  - Color variant swap is a hard cut, not a cross-fade.
  - No cursor-aware tilt or magnetic hover on hero product.
  - No page-transition (Shop card -> Product hero feels like a navigation, not a continuation).
  - Cart add is functional, not delightful.

---

## Plan — two parallel tracks, ordered by ROI

### Track A — SEO foundation (compounds, do first)

**A1. Sitemap regenerator** — replace the hand-edited XML with `scripts/generate-sitemap.ts` wired to `predev`/`prebuild`. Pulls Shopify product handles + all static + guide routes dynamically. Keeps `lastmod` honest.

**A2. Per-route Helmet pass** — add unique `<title>`, meta description, canonical, og:title/url/image to:
- Shop, all 6 Collection pages
- ProductDetail (dynamic from Shopify data)
- All 7+ Guide pages
- Warranty, Contact, Lux landing, Available Now
Self-referencing canonicals. Remove canonical from index.html once Helmet ships it everywhere.

**A3. Structured data per page type**
- ProductDetail: `Product` + `Offer` (+ `AggregateRating` once Judge.me has reviews — already gated correctly per memory)
- Collection pages: `ItemList` + `BreadcrumbList`
- Guide pages: `Article` + `BreadcrumbList`
- Home: `FAQPage` (the existing FAQ accordion is currently invisible to Google)

**A4. Strengthen the one page that's actually working** — `/guides/best-sex-toy-storage-box` is your single highest-leverage URL (ranks for 4 keywords at vol 110-1,900). Expand it: comparison table, internal links to DOX/Lux/Collections, FAQ block, original photos. Target: #17 -> page 1.

**A5. Content pillar build-out** — 4 new long-form guides targeting realistic-difficulty terms aligned to your category:
1. "Biometric jewelry box vs. lockbox — what actually keeps things private" (defines the category you own)
2. "Discreet bedroom storage for couples" (couples + storage intersection)
3. "How to choose a luxury intimate wellness gift" (gifting intent)
4. "Travel-safe storage for intimate products" (portable storage angle)
Each links into DOX, Lux, and the relevant Collection. Each gets Helmet + Article schema.

**A6. Internal linking + image alt sweep** — every guide -> products; every product -> 1-2 guides; alt audit on Lux + guide images.

**A7. Backlink hygiene** — heyupnow.com pattern is already monitor-only per memory; no disavow needed. Document the new fiverr-affordable-seo-services anchor — that's a paid-SEO spam pattern, watch it.

### Track B — Apple-grade motion (perceived quality, run alongside)

Library: add `motion` (modern Framer Motion). Lightweight, already React-native. No three.js, no scroll-jacking.

**B1. DOX product hero (highest visual ROI)** — cursor-aware 3D tilt on the lead image, with a soft specular highlight that follows the cursor.

**B2. Color variant cross-fade** — replace the hard image swap with a 250ms cross-fade + 1.02 scale-in. Same logic as the carousel layer-toggle you already trust.

**B3. Scroll-pinned product story** — sticky stages on DOX page: COLOR -> BIOMETRIC -> INTERIOR -> CRAFT. Each stage holds while the copy/visual evolves, then releases. This is the single biggest "Apple feel" win.

**B4. Section reveals** — fade + 12px rise as sections enter viewport, sitewide. Respect `prefers-reduced-motion`.

**B5. Cart micro-interactions** — spring-open drawer, item-add bounce, brief success checkmark on the trigger.

**B6. Shop -> Product transition** — shared-element style continuity using the product card image as the seed for the product hero.

**B7. Lux landing polish** — parallax on the private-jet hero, refined countdown tick animation.

---

## Execution order (week-by-week)

- **Week 1:** A1 sitemap, A2 Helmet for Shop/Collections/ProductDetail, A3 Product schema, B2 color cross-fade, B4 section reveals.
- **Week 2:** A2 Helmet for Guides, A3 Article/FAQ/Breadcrumb schema, A4 strengthen winning guide, B1 hero tilt, B3 scroll-pinned DOX story.
- **Week 3:** A5 first two new guides, A6 internal linking + alts, B5 cart micro-interactions, B7 Lux polish.
- **Week 4:** A5 remaining guides, B6 Shop->Product transition, full QA pass + rescan.

## Honest expectations
- SEO: with AS=2 you're a young site. Expect first compounding 8-12 weeks after the content + schema ships. The single fastest win is pushing the existing storage guide to page 1.
- Motion: B1-B4 will visibly lift perceived quality on first visit. B3 (scroll-pinned story) is the move that makes people say "this feels like Apple."

## Want me to narrow scope?
Say the word if you'd rather I:
- Ship Track A only this sprint, Track B next, or vice-versa
- Drop any guide topic that doesn't fit the brand
- Skip Shop->Product transition (it's the most complex motion piece)