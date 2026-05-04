## Goal

Turn the existing Vellvii Lux Shopify product page (`/products/<lux-handle>`) into a high-conversion limited pre-order drop. We will update the Shopify product (title + description intro) and add Lux-specific UI on top of the existing `ProductDetail.tsx`. Inventory settings will not be changed.

## Shopify changes (via Admin API)

1. **Title** → `Vellvii Lux – Limited Pre-Order (1500 Units Only)`
2. **Description** → prepend the pre-order intro paragraph above the existing description:
   > This is a limited pre-order drop of the Vellvii Lux. Only 1500 units are available in this first production run. Each order includes a complimentary Vellvii toy. Orders will ship from the USA in the first week of June.

We will not touch variants, inventory quantities, or tracking settings.

## Frontend changes

All UI lives in `src/pages/ProductDetail.tsx`, gated by the Lux handle so other products are unaffected. We detect Lux with `handle?.toLowerCase().includes("lux")` (similar pattern to existing `isDoxProduct`).

### a. New component: `src/components/lux/LuxPreOrderPanel.tsx`
Premium-styled block rendered between the title/price and the Add-to-Cart button, containing:

- **Pre-order banner** — bold gradient card under the title:
  - Line 1: `PRE-ORDER NOW`
  - Line 2: `Ships from the USA – First Week of June`
- **Free gift badge** — pill near the price:
  - `Includes Complimentary Vellvii Toy · Limited to first 1500 orders`
- **Countdown timer** — reuses `src/components/prelaunch/CountdownTimer.tsx` with `targetDate="2026-06-01T00:00:00Z"` and label `Pre-orders close in:` (Days / Hours / Minutes only — we'll pass a `hideSeconds` prop, small additive change to the timer).
- **Live stock counter** — `Only X of 1500 units remaining`
  - Pulls real Shopify inventory via `quantityAvailable` on the selected variant (added to the Storefront `PRODUCT_FIELDS` fragment in `src/lib/shopify.ts`). Requires the variant's inventory to be tracked and `Available on Online Store` — already true since the store reports 1500 in stock.
  - If `quantityAvailable < 300`, render in red (`text-red-500`) with an extra "selling fast" caption.
- **Urgency block** under CTA:
  - `Limited production run. No guaranteed restock.`
  - `Once sold out, next batch may take months.`
- **Shipping clarity block**:
  - ✔ Ships from USA  ✔ No international delays  ✔ Secure checkout

### b. CTA button (Lux only)
In `ProductDetail.tsx`, when `isLuxProduct` is true:
- Button text → `Secure My Pre-Order`
- Larger, dominant styling: `h-14 sm:h-16 text-lg sm:text-xl` plus existing `btn-premium` primary gradient.

### c. Layout / mobile order
Reorder the right column on Lux so the above-the-fold mobile view shows, in order:
1. Title
2. Pre-order banner
3. Price + free gift badge
4. Countdown
5. Add-to-Cart (`Secure My Pre-Order`)
6. Stock counter
7. Urgency text
8. Shipping clarity
9. Description (with new intro already coming from Shopify)
10. Variant selectors / trust badges below

This keeps banner, badge, countdown, CTA, and stock counter visible with minimal scrolling on 375–390px screens.

### d. Sticky bar
`StickyProductBar` already shows on scroll — for Lux we'll override its CTA label to `Secure My Pre-Order` via a new optional prop, so the urgency message persists.

## Technical notes

- **Storefront query update**: add `quantityAvailable` to the variant fields in `PRODUCT_FIELDS` (`src/lib/shopify.ts`) and to the `ShopifyProduct` TypeScript interface. No new requests; piggybacks the existing product fetch.
- **Countdown**: extend `CountdownTimer` with an optional `hideSeconds?: boolean` prop — purely additive, default behavior unchanged.
- **Performance**: no new libraries, no images, no extra network calls. Countdown uses the existing 1s interval pattern.
- **Scoping**: every change is wrapped in `isLuxProduct` checks; DOX, G-Vibe, Pulse, Evolve render exactly as today.
- **Shopify auth**: applying the title/description update needs a Shopify auth refresh — the tool will prompt once before running `shopify--update_product`.

## Out of scope

- No inventory edits, no variant edits, no price changes.
- No fake reviews or testimonials.
- No changes to checkout flow (still cart → Storefront checkout).

## Files touched

- `src/lib/shopify.ts` — add `quantityAvailable` to fragment + type
- `src/components/prelaunch/CountdownTimer.tsx` — add `hideSeconds` prop
- `src/components/lux/LuxPreOrderPanel.tsx` — new
- `src/components/StickyProductBar.tsx` — optional CTA label prop
- `src/pages/ProductDetail.tsx` — Lux-only branch for layout, CTA text, and panel
- Shopify product (title + description) via `shopify--update_product`
