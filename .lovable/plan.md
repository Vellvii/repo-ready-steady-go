# Inventory-aware shop and cross-link upgrades

Implements the four feedback items as a coordinated upgrade to the Shop, header, homepage, cross-link surfaces, and search. Frontend / presentation only — no Shopify schema changes.

## 1. In-stock filtering and clearer card badges

Goal: reduce dead-end clicks on Shop and collection grids.

- `src/pages/Shop.tsx`
  - Default `inStockOnly` to **on** when no `?filter` param is present (still off when a user explicitly clears, persisted via URL `?show=all`).
  - Sort sold-out items to the end of the grid even when shown; visually de-emphasize them (reduced opacity, muted price, no Add button).
  - Always show result counts (already partly there) and add a second line: "X in stock - Y sold out" when relevant.
  - Add an availability sort option ("Available first") alongside existing sort.
- `src/components/products/StatusPill.tsx`
  - Add `"pre-order-eta"` variant accepting an ETA string (e.g. "Ships Aug 2026") rendered as a second line / tooltip.
  - Strengthen Sold Out styling so it reads at a glance on the grid.
- `src/components/products/CollectionLayout.tsx` (collection pages e.g. `/collections/discreet-storage`)
  - Mirror Shop behaviour: same in-stock toggle, same sold-out de-emphasis, same counts.

## 2. True "Available Now" collection, exposed prominently

Goal: a single trustworthy entry point for what users can buy today.

- New route `/available-now` -> new page `src/pages/AvailableNow.tsx`
  - Reuses `useShopifyProducts`, filters client-side to variants with `availableForSale === true` and excludes known pre-order handles (reuse `PRE_ORDER_HANDLES` from `StatusPill`).
  - Editorial header ("Available Now - Ships from our atelier"), product grid, and an empty-state block when fewer than 3 items match: shows pre-order alternatives + link to Guides.
- `src/components/ScrollHeader.tsx`
  - Add a top-level "Available Now" link (desktop nav + mobile menu), with a small pulse dot when at least one product is in stock.
- `src/pages/Index.tsx` (homepage)
  - Insert an "Available Now" strip above the existing milestones / FAQ region with up to 4 in-stock products and a "See all" link to `/available-now`.
- `src/pages/Shop.tsx`
  - Change the existing "Available Now" editorial card to link to `/available-now` instead of `/shop?filter=in-stock`.

## 3. Inventory-aware cross-links

Goal: when one product links to another (Lux -> DOX, DOX-compatible grids, related products), surface live status and alternatives instead of dead links.

- New helper `src/lib/productAvailability.ts`
  - `useProductAvailability(handle)` -> `{ status, etaLabel, alternatives }` using existing `useShopifyProducts` cache. Status uses `getProductStatus`; alternatives are top in-stock products from the same collection (Storage, Pleasure, DOX-Compatible).
- New component `src/components/products/CrossLinkCard.tsx`
  - Small inline card showing target product's image, name, `StatusPill`, and, if sold-out/pre-order, an "Also available now" row with 2-3 alternative thumbnails.
- Update existing cross-link sites to use it:
  - `src/components/RelatedProducts.tsx`
  - `src/pages/ProductDetail.tsx` (the Lux -> DOX promo block and any "Pair with" sections)
  - `src/pages/CollectionDoxCompatible.tsx`
  - `src/pages/DoxVideoLanding.tsx` (only the inline product references, not hero copy)

## 4. Search with availability + synonyms

Goal: predictive search that respects stock and matches everyday words.

- `src/pages/Shop.tsx` `SearchBar` + `fuzzyMatch`
  - Add a synonym map: `storage -> [dox, lux, case, tray]`, `wellness -> [vellvii, collection]`, `case -> [dox, lux]`, `discreet -> [storage, lock, biometric]`, `couples -> [pulse, evolve]`, `vibrator -> [g-vibe, pulse, evolve]` (kept as a small client-side map in `src/lib/searchSynonyms.ts`).
  - When matching, expand the query through the synonym map and merge results (highest score wins).
  - Show a `StatusPill` next to each suggestion (In Stock / Pre-Order / Sold Out) and sort in-stock first.
  - Zero-results state inside the dropdown and below the grid: "No matches for X. Popular in-stock:" with 3 chips linking to top in-stock products + a link to `/available-now`.

## Files touched

```text
new:    src/pages/AvailableNow.tsx
new:    src/lib/productAvailability.ts
new:    src/lib/searchSynonyms.ts
new:    src/components/products/CrossLinkCard.tsx
edit:   src/pages/Shop.tsx
edit:   src/pages/Index.tsx
edit:   src/pages/ProductDetail.tsx
edit:   src/pages/CollectionDoxCompatible.tsx
edit:   src/pages/DoxVideoLanding.tsx
edit:   src/components/ScrollHeader.tsx
edit:   src/components/RelatedProducts.tsx
edit:   src/components/products/StatusPill.tsx
edit:   src/components/products/CollectionLayout.tsx
edit:   src/App.tsx        (register /available-now route)
```

## Technical notes

- All inventory checks go through `availableForSale` on variants (already used). No new Shopify queries needed.
- Pre-order ETAs use the existing `PRE_ORDER_HANDLES` set with an `ETA_LABELS` map (e.g. `"vellvii-lux": "Ships Aug 2026"`) so copy stays in one file.
- `useShopifyProducts(50)` is already called on Shop and reused across hooks via React Query cache, so the new helpers and homepage strip incur no extra network cost.
- No business logic changes to cart, checkout, or Shopify mutations.
- Copy follows brand memory: hyphens only (no em dashes), "Pleasure Collection" naming, no fabricated review/social proof.
