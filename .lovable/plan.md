# Three UX/A11y feedback items

## 1. Product cards: fully clickable + distinct Quick View

Today `Shop.tsx` already wraps the whole card in `<Link>`, but the quick-add `<button>` is nested inside the anchor (invalid HTML) and the affordance is labelled "Add" rather than a true Quick View.

Changes in `src/pages/Shop.tsx` (`ProductCard`):
- Replace outer `<Link>` with `<article>` + an absolutely positioned overlay `<Link aria-label="View {title}">` that covers image + title area, so the entire card navigates while leaving room for action buttons that sit at a higher z-index (no nested interactive elements, valid HTML, no `e.stopPropagation` hacks).
- Add a small **Quick View** icon button (Eye icon) in the top-right of the image, `aria-label="Quick view {title}"`, that opens a lightweight dialog (reuse shadcn `Dialog`) showing hero image, title, price, short description, "Add to cart" (or "Select options" → routes to PDP), and "View details" link. New component `src/components/products/QuickViewDialog.tsx`.
- Keep the existing Add / Select options button in the card footer but raise its z-index above the overlay link, increase tap target to `min-h-11` on mobile.
- Make the entire card pointer-friendly: cursor-pointer on hover state already exists via `group-hover` ring; nothing else needed.

Apply the same pattern to `RelatedProducts.tsx`, `SimilarProducts.tsx`, and `ProductCard.tsx` (legacy) if they share the nested-link issue — verify and update.

## 2. Age gate: lower friction + accessibility

Changes in `src/components/AgeGateModal.tsx`:
- **Session memory by default**: keep the 30-day localStorage TTL, but also write to `sessionStorage` immediately so subsequent navigations within the same tab never re-prompt even if localStorage is blocked (Safari ITP / private mode).
- **Explicit copy**: change the primary CTA from "Enter" to **"I am 18+ — Enter"** and the secondary from "Leave site" to **"I am under 18 — Leave"**.
- **Larger tap targets**: bump both buttons to `min-h-12 px-12` (mobile-first), ensure ≥44×44.
- **Keyboard focus management**: focus the primary "I am 18+" button on open; trap focus between the two buttons; handle `Escape` → trigger "Leave"; handle `Enter` key → confirm. Use a small `useFocusTrap` hook inline (querySelectorAll of focusable, loop on Tab/Shift+Tab).
- **A11y polish**: add `aria-describedby` pointing to the disclaimer paragraph, give the dialog a real `<h2>` (visually present via the tagline) referenced by `aria-labelledby`, and add `role="document"` to the inner content.
- **Don't block links**: confirm modal is rendered only at site root (`App.tsx`) once — already true. Add a query-string escape hatch: `?agegate=skip` (used by privacy/terms/warranty pages linked from external/legal contexts) so deep-link traffic isn't gated when arriving from compliance pages. Skip-list: `/privacy-policy`, `/terms-of-service`, `/warranty*`, `/contact`. Implementation: read `window.location.pathname` in `useEffect` and `return` early if path matches the allowlist regex.

## 3. 404 / empty-state: keep header + add recovery paths

Changes in `src/pages/NotFound.tsx`:
- Render `ScrollHeader` at the top so site navigation/search remain accessible (currently the page has no header).
- Add a **discovery strip** below the existing CTAs with three link tiles:
  - **Devices** → `/shop?category=devices` (or current Shop filter for devices)
  - **Storage** → `/collections/discreet-storage`
  - **Available now** → `/shop?available=true` (or current "in stock" filter)
- Add a **Featured in-stock items** row beneath the strip: pull 3 products via `useShopifyProducts({ first: 12 })`, filter to `availableForSale`, and render compact cards (reuse the same `ProductCard` from Shop or a slim variant). Loading skeleton fallback.
- Keep current premium "Out of Reach" styling and tokens.
- Add inline messaging clarifying the page is gone but the collection isn't.

Confirm Shop filter query params (`?category=`, `?available=`) — if Shop doesn't currently read them, add minimal URL→state sync in `Shop.tsx` so the 404 links land in a meaningfully filtered view.

## Files touched

- `src/pages/Shop.tsx` — restructure ProductCard, wire Quick View
- `src/components/products/QuickViewDialog.tsx` — new
- `src/components/RelatedProducts.tsx`, `src/components/SimilarProducts.tsx`, `src/components/ProductCard.tsx` — apply overlay-link pattern if needed
- `src/components/AgeGateModal.tsx` — copy, focus trap, session memory, path allowlist
- `src/pages/NotFound.tsx` — header, recovery tiles, featured products
- `src/pages/Shop.tsx` — minimal URL param sync for `category` / `available` (if not present)

## Out of scope

- No changes to Shopify catalog data or cart flow.
- No copy changes to PDPs or homepage.
- No new dependencies — reuse shadcn Dialog, lucide icons, existing tokens.
