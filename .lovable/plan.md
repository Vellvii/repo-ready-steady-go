# Reviews Integration Plan (Judge.me)

## Goal

Resolve the Google Rich Results warnings (`review`, `aggregateRating` missing) on product pages by wiring up Judge.me — without ever emitting fake or empty review data. Section and schema appear only once real customer reviews exist.

## Approach

**Source of truth:** Judge.me (free Shopify app, installs in one click from Shopify App Store). It:
- Hosts review collection, moderation, email requests
- Exposes ratings via Shopify product metafields (`reviews.rating` and `reviews.rating_count`) and via its own JS widget
- Auto-generates valid `aggregateRating` JSON-LD that Google accepts
- Syndicates to Google Shopping seller ratings

You will install Judge.me in your Shopify admin separately (one-click, free). This plan covers the **storefront-side wiring** so it shows up on vellvii.com product pages.

## What gets built

### 1. Extend Shopify product query with review metafields

Update `src/lib/shopify.ts` `PRODUCT_BY_HANDLE_QUERY` to fetch the two Judge.me metafields:

```text
metafields(identifiers: [
  { namespace: "reviews", key: "rating" },
  { namespace: "reviews", key: "rating_count" }
]) { key value type }
```

Add a helper `parseReviewMetafields(product)` returning `{ rating: number, count: number } | null` — returns `null` when count is 0 or metafields missing.

### 2. New `<ProductReviews>` component

Path: `src/components/products/ProductReviews.tsx`

- Takes `productHandle` and `reviewData` props
- If `reviewData === null` → renders nothing (component returns `null`)
- If reviews exist → renders a section above the footer on the product detail page with:
  - Section heading "Reviews" (Baskerville, brand styling)
  - Aggregate display: star row + numeric rating + "(N reviews)"
  - Judge.me preview widget embed (their `<div class="jdgm-widget jdgm-review-widget">` with product id) — loads only when reviews exist, so no "be the first to review" CTA ever appears

### 3. Update `<SEO>` to accept aggregate rating

`src/components/SEO.tsx` — extend `productData` interface with optional `aggregateRating?: { ratingValue: number; reviewCount: number }`. Only when present, inject into Product JSON-LD:

```text
aggregateRating: {
  "@type": "AggregateRating",
  ratingValue: ...,
  reviewCount: ...
}
```

No emission when undefined — keeps schema clean and policy-compliant.

### 4. Wire it into `ProductDetail.tsx`

- Parse review metafields from the Shopify product
- Pass `aggregateRating` to `<SEO productData={...}>` only when real data exists
- Render `<ProductReviews>` (which self-hides if no data) above `<RelatedProducts>`

### 5. Load Judge.me script conditionally

Add a small loader in `ProductDetail.tsx` that injects Judge.me's widget script (`https://cdn.judge.me/widget_preloader.js` with shop domain) only when at least one product review exists. Avoids extra network weight on empty-state pages.

### 6. Update the security/setup notes

Add a one-time setup note to `mem://integrations/judgeme-reviews` documenting:
- Install Judge.me from Shopify App Store (free plan is sufficient)
- Enable the "Product Rating" metafields (Judge.me does this automatically on install)
- No API keys needed on the storefront — metafields + their public widget script

## What does NOT get built

- No placeholder reviews, no "Be the first to review" CTA, no founder quotes pretending to be reviews
- No custom review form (Judge.me handles collection via post-purchase emails)
- No changes to Kickstarter pages, homepage, or LUX prelaunch — reviews live on `/products/:handle` only

## Files touched

```text
src/lib/shopify.ts                          (extend query + helper)
src/components/SEO.tsx                      (aggregateRating support)
src/components/products/ProductReviews.tsx  (NEW)
src/pages/ProductDetail.tsx                 (wire it in)
mem://integrations/judgeme-reviews          (NEW memory)
```

## After implementation

1. You install Judge.me in Shopify admin (one-click)
2. As real customer reviews come in and are approved in Judge.me, they auto-populate the section + JSON-LD on vellvii.com
3. Re-run Google Rich Results Test — the two warnings disappear naturally once the first review lands
4. Bonus: Trustpilot can be layered on later for brand-level trust (separate from Product schema, would live in footer)

## Industry context (FYI)

Judge.me is what Dame, Maude, and most premium DTC wellness brands started with before moving to Yotpo/Okendo at scale. Good fit for Vellvii's stage — free, schema-compliant, no fake-data risk.