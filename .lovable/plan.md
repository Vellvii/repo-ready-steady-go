## Context

The snippet you pasted is Judge.me's **Shopify Liquid theme** install code. It's meant to be pasted into `templates/product.liquid` inside a Shopify Online Store theme — the `{{ product.id }}`, `{% if %}`, `{% assign %}` tags are Liquid and only run on Shopify's server.

Our store is a **headless React storefront** (Vite + Storefront API), so we can't paste that Liquid verbatim. Instead, we render the equivalent `<div class="jdgm-widget jdgm-review-widget">` ourselves and let Judge.me's `widget_preloader.js` hydrate it client-side — which is what `ProductReviews.tsx` already does.

That said, comparing our current div with the official snippet, we're missing a few data attributes Judge.me's loader expects in 2025. Worth tightening up.

## What's missing on our widget div

Current:
```tsx
<div
  className="jdgm-widget jdgm-review-widget"
  data-id={numericId}
  data-product-title=""
  data-product-handle=""
/>
```

Official snippet expects (translated to React/JSX):
- `data-id` - numeric product id (we have it)
- `data-product-id` - same numeric id (missing)
- `data-product-title` - real product title, escaped (we send empty string)
- `data-widget='review'` (missing)
- `data-auto-install='false'` (missing)
- `data-entry-point='review_widget.js'` (missing)
- `data-entry-key='review-widget/main.js'` (missing)

Without these, Judge.me's newer widget loader sometimes silently no-ops or falls back to slower paths.

## Plan

### 1. `src/components/products/ProductReviews.tsx`
- Add a `productTitle: string` prop.
- Update the rendered div to include the full attribute set above. `data-product-title` is rendered via React (which escapes automatically — equivalent to Liquid's `| escape`).
- Keep the preloader `<script src="https://cdn.judge.me/widget_preloader.js">` injection as-is (this is the headless equivalent of installing the Judge.me Shopify app's theme block).
- Add a `<div style={{ clear: "both" }} />` before the widget div, matching the snippet (prevents float collapse on legacy review layouts).
- Leave both states intact: "What guests are saying" (with stars) when `reviewData` exists; "Be the first to review" invitation when `null`. Judge.me's widget renders its own "Write a review" CTA inside the div either way.

### 2. `src/pages/ProductDetail.tsx`
- Pass `productTitle={product.node.title}` to `<ProductReviews />`. One-line change at the existing call site (around line 555).

### 3. No memory changes
- The existing `mem://integrations/judgeme-reviews` memory already covers the policy (section always visible, JSON-LD gated on real counts). This is a small attribute tightening, not a policy shift.

## Why we can't just use the Liquid snippet you pasted

| Liquid (Shopify theme) | Our headless React app |
|---|---|
| `{{ product.id }}` resolved server-side by Shopify | Resolved client-side via Storefront API |
| `{% if %}` / `{% assign %}` Liquid tags | JSX conditionals + JS |
| `product.metafields.judgeme.widget` pre-rendered HTML cached on the Shopify product | Not available — we don't render through Shopify's theme |
| `shop.metafields.judgeme.shop_reviews_count` | Not exposed to Storefront API (Judge.me-private metafield) |

So the legacy SSR-cached widget content (`has_legacy` branch in your snippet) doesn't apply to us — Judge.me's preloader fetches review data via its own JS API instead. That's the correct headless behavior.

## Files touched

- `src/components/products/ProductReviews.tsx` - add prop, expand data attributes, add clear-both spacer
- `src/pages/ProductDetail.tsx` - pass `productTitle` prop (1 line)
