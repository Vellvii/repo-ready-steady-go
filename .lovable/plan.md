## Problem

On `/products/vellvii-dox`, selecting a different color in the picker doesn't swap the images. The current logic in `src/pages/ProductDetail.tsx` (`filteredImages`) tries to match images to the selected color by inspecting the image's `altText` and URL filename for the color name (e.g. "red", "black", "white"). Shopify-uploaded images usually don't have those colors in their auto-generated CDN filenames, and the alt text on the uploaded DOX images doesn't contain the color either - so every color falls back to the same default set.

The reliable Shopify-native way to associate images with variants is the `variant.image` field, which the storefront query is not currently requesting.

## Fix

### 1. Request the variant image from Shopify
In `src/lib/shopify.ts`, extend the `variants` selection inside `PRODUCT_FIELDS` to include:

```graphql
image {
  url
  altText
}
```

Also extend the `ShopifyProduct` TypeScript type (top of `src/lib/shopify.ts`) so each variant node has an optional `image: { url: string; altText: string | null } | null`.

### 2. Use the variant image as the source of truth for color
In `src/pages/ProductDetail.tsx`, replace the alt/filename-based color matching in `filteredImages` with a variant-image driven approach:

- Collect every variant that shares the currently selected `Color` value (across other options like size, if any).
- Build the image list as: the unique `variant.image.url`s from those variants first, followed by any remaining product images that are not assigned to a different color's variants.
- If no variant has an `image` set (older products), keep the existing alt/filename heuristic as a fallback so nothing regresses.
- Keep the existing `useEffect` that resets `selectedImageIndex` when `Color` changes.

### 3. No other surfaces change
Cart, schema/SEO, price, and availability logic continue to read from `selectedVariant` exactly as today. The color swatch UI itself is already wired - only the image resolution is broken.

## What the user needs to do in Shopify

For this to work, each DOX image in Shopify must be **assigned to its color variant** (in the Shopify admin: open the variant > set its image). Just uploading red/white/black images to the product gallery isn't enough - Shopify needs the variant-to-image link. I'll confirm the assignments are in place once the code change is live; if any color still shows the default set, it means that variant has no image assigned in Shopify yet.

## Files touched

- `src/lib/shopify.ts` - add `image` to variants in query + type.
- `src/pages/ProductDetail.tsx` - rewrite `filteredImages` to prefer `variant.image`.
