## Goal
1. Upload the new Nova photo as a Lovable Asset.
2. Inside the existing "Free Bonus - Nova" block on `/pages/the-lux`, replace the single static Nova image with a small carousel that cycles through both Nova photos (existing `nova.avif` + new upload). Text/layout otherwise unchanged.
3. Add an equivalent (but more compact) "Free Bonus - Nova" block to the actual Lux product page at `src/pages/ProductDetail.tsx` (handle `vellvii-lux`), placed below the main product info so it complements rather than competes with the Lux hero/gallery.

## Implementation

### Asset
- `lovable-assets create --file /mnt/user-uploads/PHOTO-2026-06-04-09-01-09.jpg --filename nova-2.jpg > src/assets/nova-2.jpg.asset.json`

### Carousel inside the existing Nova block (TheLuxLanding.tsx)
- Build a tiny inline carousel (no new dependency) using local `useState` + `useEffect` setInterval (5s, per project carousel timing memory) with A/B layer cross-fade — matches the project's carousel architecture (no flicker, opacity toggle).
- Manual dot indicators below the image; click to switch (manual override pauses auto-rotate, per project memory).
- Same container dimensions, rounded card, `object-contain`, dark/rose-gold tokens. No changes to copy, heading, $50/FREE callout, or "Auto-added" text.

### Nova bonus block on ProductDetail.tsx (handle === "vellvii-lux" only)
- Conditionally render a section after the main product info / before reviews/related products. Confirm exact insertion point after reading the file.
- Compact layout: small Nova carousel (same two images, smaller — e.g. `max-h-[280px]`) beside a short headline "Free Bonus - $50 Value · Meet the Nova" and one-line description "A $50 Nova is auto-added to every Lux order." Uses existing rose-gold border/`bg-primary/[0.03]` styling so it reads as a complementary gift, not a competing product.
- Gated by `product?.handle === "vellvii-lux"` so it only appears on the Lux PDP.

## Out of scope
- No changes to existing buttons, links, copy elsewhere, colors, fonts, or any other section.
- No new npm packages.