
# Plan: Add Shopify 3D Model Support + Product Filtering

## Overview
This plan adds two major features:
1. **3D Model Support** - Display 3D models uploaded to Shopify products on your website
2. **Product Filtering** - Filter products by Shopify collections or tags

---

## Part 1: 3D Model Support

### How It Works
When you upload a 3D model to a product in the Shopify app, it gets stored in Shopify's media library. We need to update our API queries to fetch the `media` object instead of just `images`, then display the 3D model using the existing `Model3DViewer` component.

### Changes Required

#### 1. Update Shopify Types (`src/lib/shopify.ts`)
Add media types to handle 3D models:
- Add `ShopifyMedia` type with support for `Image`, `Model3d`, and `Video` media types
- Extend `ShopifyProduct` interface to include media edges

#### 2. Update GraphQL Queries (`src/lib/shopify.ts`)
Modify `PRODUCTS_QUERY` and `PRODUCT_BY_HANDLE_QUERY` to fetch media:
```text
media(first: 10) {
  edges {
    node {
      mediaContentType
      ... on MediaImage {
        image { url altText }
      }
      ... on Model3d {
        sources { url format mimeType }
        alt
      }
      ... on Video {
        sources { url format mimeType }
      }
    }
  }
}
```

#### 3. Update Product Detail Page (`src/pages/ProductDetail.tsx`)
- Import the existing `Model3DViewer` component
- Detect if product has 3D model in media
- Add toggle buttons (Images / 3D View) when a 3D model exists
- Display the 3D model using the existing viewer component
- Keep current image gallery as the default view

#### 4. Update Product Hooks (if needed)
Ensure the hooks properly pass through the new media data structure.

---

## Part 2: Product Filtering by Collections/Tags

### How It Works
Shopify collections let you group products. We'll fetch available collections and add filter buttons on the shop page.

### Changes Required

#### 1. Add Collections Query (`src/lib/shopify.ts`)
Add a new GraphQL query to fetch collections:
```text
query GetCollections {
  collections(first: 20) {
    edges {
      node {
        id
        title
        handle
        productsCount
      }
    }
  }
}
```

#### 2. Add Products by Collection Query
Modify the products query to support filtering by collection:
```text
query GetProductsByCollection($handle: String!, $first: Int!) {
  collection(handle: $handle) {
    products(first: $first) {
      edges { node { ... } }
    }
  }
}
```

#### 3. Add Collection Hooks (`src/hooks/useShopifyProducts.ts`)
- Add `useShopifyCollections()` hook to fetch all collections
- Add `useShopifyProductsByCollection(handle)` hook for filtered products

#### 4. Update Shop Page (`src/pages/Shop.tsx`)
- Add horizontal scrollable filter bar below the hero
- Show "All Products" plus each collection as filter buttons
- Track selected filter in state
- Fetch appropriate products based on selection

---

## Technical Details

### Files to Modify
1. `src/lib/shopify.ts` - Types and queries
2. `src/hooks/useShopifyProducts.ts` - New hooks
3. `src/pages/ProductDetail.tsx` - 3D viewer integration
4. `src/pages/Shop.tsx` - Collection filter UI

### Dependencies
- Already have `@react-three/fiber` and `@react-three/drei` installed
- Already have `Model3DViewer` component ready

### Cache Behavior
- 5-minute stale time on product data
- Hard refresh or waiting 5 minutes will show updated data from Shopify
- Can reduce stale time if more immediate updates are needed

---

## User Experience

### 3D Models on Product Pages
- If a product has a 3D model, show "Images | 3D View" toggle buttons
- Default to images view
- 3D view shows interactive model that can be rotated/zoomed
- Graceful fallback if 3D model fails to load

### Collection Filtering on Shop Page
- Clean horizontal filter bar with collection names
- Rose gold highlight for active filter
- Smooth loading states when switching filters
- Mobile-friendly scrollable filter bar

---

## Next Steps After Implementation
1. Upload a 3D model to a product in Shopify to test
2. Create collections in Shopify (Vibes, Storage, etc.)
3. Assign products to collections
4. Verify filtering works on the shop page
