# Vellvii SEO & Copy Update Plan

No visual, layout, color, font, animation, or component-structure changes. Only text, metadata, schema, alt text, one new page, and CTA wiring for waitlist capture on sold-out variants.

## Note on the homepage hero

The visible hero text in code today is `The Art of 'O'` (not `PLEASURE : REDEFINED`). I will treat your instruction literally — keep the current visible hero text untouched visually, and swap the underlying `<h1>` element so the HTML/SEO H1 reads the new SEO string while the visible wording stays exactly as it appears. Implementation: the `<h1>` element will contain the SEO sentence wrapped in `sr-only`, and the existing visible wording will render in a styled `<p>` / `<span>` immediately above it — pixel-identical output, single semantic H1.

If you actually want the visible hero text changed too, say so and I'll do that instead.

## 1. Lux product page (`/products/vellvii-lux`) — `src/pages/ProductDetail.tsx`

- H1 (Lux branch only): `Vellvii Lux — Portable Biometric Sex Toy Storage Bag`
- SEO title: `Vellvii Lux | Biometric Sex Toy Storage Bag — Leather, Fingerprint Lock`
- Meta description: new copy as supplied (ends "Ships end of June.")
- Replace Lux marketing body paragraph with the supplied description.
- Image alt text: override Shopify altText for Lux only — map by image index to the 7 supplied strings; any image beyond index 7 falls back to `Vellvii Lux luxury leather biometric storage bag detail {n}`.
- FAQ block: keep existing 7 FAQs (already have answers), no copy change required; ensure FAQPage JSON-LD is emitted (already wired via `SEO` `faqData` — verify and add if missing on Lux).
- Add Product JSON-LD: name, description, image[], price, currency, `availability: PreOrder`, brand `Vellvii`. Wired through existing `SEO` `productData` prop.

## 2. Homepage — `src/components/home/HomeHero.tsx` + `index.html`

- Swap `<motion.h1>` semantics per the note above. Visible appearance unchanged.
- `index.html`: update `<title>` to `Vellvii | Luxury Biometric Sex Toy Storage & Intimate Wellness` and `<meta name="description">` to the supplied homepage description. Mirror in `scripts/prerender-seo.ts` for the `/` route so the prerendered HTML matches.

## 3. DOX product page — `src/pages/ProductDetail.tsx` (DOX branch)

- H1: `Vellvii DOX — Biometric Sex Toy Storage Vault with Docking Stations`
- Meta description: supplied copy.
- Replace sold-out CTA with a `Join the Waitlist` email-capture button — reuse the existing `NotifyMePanel` component (already handles email capture). Button label normalized to `Join the Waitlist`.
- Image alt text: map by index using format `Vellvii DOX biometric sex toy storage vault, {descriptor}` with descriptors front view / side angle / fingerprint lock detail / velvet interior with tray / VDS docking station in use / DDS docking station / lifestyle on nightstand.
- Add Product JSON-LD with `availability: OutOfStock`.

## 4. Sold-out toys — G-Vibe, Evolve, Pulse (`ProductDetail.tsx`)

For each, in the per-handle branch:

- H1: `Vellvii G-Vibe — Luxury G-Spot Vibrator`, `Vellvii Evolve — Luxury Wearable Vibrator`, `Vellvii Pulse — Luxury Couples Vibrator`.
- Meta description template applied per product.
- Replace sold-out CTA with `NotifyMePanel` button labeled `Join the Waitlist`.

## 5. Collection pages

- `src/pages/CollectionDiscreetStorage.tsx` — title `Discreet Sex Toy Storage | Biometric Intimate Storage Cases — Vellvii`, supplied meta description. Mirror in `scripts/prerender-seo.ts`.
- `src/pages/CollectionPleasureCollection.tsx` — title `Luxury Intimate Wellness Collection — Vibrators & Storage | Vellvii`. Mirror in prerender.

## 6. New ad landing page — `/pages/the-lux`

New route, new file `src/pages/TheLuxLanding.tsx`, registered in `src/App.tsx` and added to `scripts/prerender-seo.ts` and `public/sitemap.xml`.

- Strictly non-explicit copy. Zero references to sex toys, vibrators, pleasure, intimate, adult.
- Uses existing Lux product imagery via `useShopifyProducts` (handle `vellvii-lux`).
- Reuses existing design tokens, Baskerville/Montserrat, rose-gold accent, dark theme. No new visual system.
- Sections, in order:
  1. H1 `The Lux — A Biometric Leather Case Worth Keeping`
  2. Sub-headline `Fingerprint-locked. Velvet-lined. Quietly extraordinary.`
  3. Body copy as supplied
  4. Product image gallery (reuse `ImageSlider` or simple grid — visuals already exist)
  5. CTA button `Pre-Order Now — Ships End of June` → links to `/products/vellvii-lux`
  6. Trust badges row: Discreet Shipping, Lifetime Warranty, Plain Packaging, Premium Materials (reuse `TrustBadges` or `TrustStrip`)
- No site nav drawer trigger, no related-products, no footer links to other products. Header/footer minimized to logo + legal only.
- SEO: title and description as supplied; `noindex` left OFF (paid landing pages benefit from being crawlable — confirm if you'd rather noindex).

## 7. Global JSON-LD

Product schema for Lux (PreOrder) and DOX (OutOfStock) emitted via existing `SEO` component `productData` prop — no schema-component changes needed, just pass the data.

## Technical details

- All metadata updates flow through the existing `SEO` component (`react-helmet-async`) and the `scripts/prerender-seo.ts` static-HTML mirror so crawlers without JS see the same tags.
- Waitlist capture reuses `NotifyMePanel` / `usa-launch-notify` Edge Function already in the project — no new backend.
- No tailwind/index.css edits. No new dependencies.
- Files touched: `index.html`, `scripts/prerender-seo.ts`, `public/sitemap.xml`, `src/App.tsx`, `src/pages/ProductDetail.tsx`, `src/components/home/HomeHero.tsx`, `src/pages/CollectionDiscreetStorage.tsx`, `src/pages/CollectionPleasureCollection.tsx`, new `src/pages/TheLuxLanding.tsx`.

## Open questions

1. Homepage H1: confirm the sr-only-H1 + visible-text-unchanged approach, or do you want the visible hero text changed to the new SEO sentence?
2. `/pages/the-lux`: should it be `noindex` (ad-only) or fully indexable?
