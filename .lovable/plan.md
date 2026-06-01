## What's already in place

The infrastructure the user is asking for already exists; it just needs a small tightening pass and the specific copy updates they listed.

- `react-helmet-async` is wired (`HelmetProvider` in `src/App.tsx`). Every route component passes a unique `canonical`, `title`, and `description` through `src/components/SEO.tsx` — confirmed for `/`, `/pages/the-lux`, `/guides`, `/contact`, `/products/vellvii-lux`, `/products/vellvii-dox`, all collections, and all guides.
- `scripts/prerender-seo.ts` runs as a postbuild step (`"build": "vite build && bunx tsx scripts/prerender-seo.ts"`) and writes a static `dist/<route>/index.html` per route with the head rewritten (title, description, og:*, twitter:*, canonical, hreflang). Non-JS crawlers (Google's raw-HTML pass, LinkedIn, Slack, Semrush) see the right tags before any JavaScript runs. This is Option 2 from the user's list.
- The route list in the prerender script already includes `/pages/the-lux`, `/guides`, `/contact`, `/products/vellvii-lux`, `/products/vellvii-dox`, and the rest.

So the architecture is correct. What's missing is (a) a static `<link rel="canonical">` in the root `index.html` so the homepage canonical is in raw HTML even before prerender runs, and (b) the exact copy strings the user specified for five routes.

## Changes

1. **`index.html`** — add `<link rel="canonical" href="https://vellvii.com/" />` to the static head so the homepage ships its own canonical in raw HTML.

2. **`scripts/prerender-seo.ts`** — update the per-route entries to exactly match the copy the user provided:
   - `/pages/the-lux` — title `Vellvii Lux | Biometric Leather Travel Case — Fingerprint Locked`, description per user.
   - `/products/vellvii-lux` — title `Vellvii Lux | Biometric Sex Toy Storage Bag — Leather, Fingerprint Lock`, description per user.
   - `/products/vellvii-dox` — description shortened per user.
   - `/guides` — title `Intimate Wellness Guides | Vellvii`, description per user.
   - `/contact` — title `Contact Vellvii | Luxury Intimate Wellness`, description per user.
   - Also harden `rewriteHead` so the canonical replaces an existing one rather than appending a second `<link rel="canonical">` (avoids duplicate canonicals once step 1 lands).

3. **Matching Helmet copy in the route components** — update the same five strings in `src/pages/TheLuxLanding.tsx`, `src/pages/ProductDetail.tsx` (or wherever Lux/DOX titles live), `src/pages/Guides.tsx`, and `src/pages/Contact.tsx` so JS-executing crawlers and the prerendered HTML agree.

4. **Verify after deploy** with raw-HTML curls (no JS):
   ```text
   curl -s https://vellvii.com/ | grep -E 'canonical|<title>|name="description"'
   curl -s https://vellvii.com/pages/the-lux | grep -E 'canonical|<title>|name="description"'
   curl -s https://vellvii.com/guides | grep -E 'canonical|<title>|name="description"'
   curl -s https://vellvii.com/contact | grep -E 'canonical|<title>|name="description"'
   curl -s https://vellvii.com/products/vellvii-lux | grep -E 'canonical|<title>|name="description"'
   curl -s https://vellvii.com/products/vellvii-dox | grep -E 'canonical|<title>|name="description"'
   ```
   Each should return that route's unique canonical, title, and description.

## Out of scope

- Migrating off the Vite SPA to Next.js / Remix / TanStack Start. The user's Option 1 (SSR) is unnecessary because Option 2 is already implemented and serving prerendered HTML per route.
- Pulling dynamic Shopify product handles into the prerender list at build time. The five core handles (`vellvii-dox`, `vellvii-lux`, `vellvii-g-vibe`, `vellvii-evolve`, `vellvii-pulse`) cover the live catalog. Helmet still sets a unique canonical for any other handle for Google.
- Redesigning the SEO component or sitemap.

## Em-dash note

The user's spec uses em dashes (—). Project memory says copy should use hyphens (-), not em dashes. Will use hyphens in titles to stay on-brand unless the user confirms they want em dashes in these specific tags. Flagging this rather than silently overriding either way.

## Files touched

- `index.html`
- `scripts/prerender-seo.ts`
- `src/pages/TheLuxLanding.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Guides.tsx`
- `src/pages/ProductDetail.tsx` (or the per-handle title/description map it reads from)