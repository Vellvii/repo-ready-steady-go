# Shopify Integration Plan for Vellvii

## ✅ COMPLETED

### Phase 1: Products Created in Shopify
| Product | Price | Handle | Status |
|---------|-------|--------|--------|
| Vellvii DOX | $299 | vellvii-dox | ✅ Created |
| Vellvii LUX | $169 | vellvii-lux | ✅ Created |
| Vellvii G-Vibe | $169 | vellvii-g-vibe | ✅ Created |
| Vellvii Evolve | $169 | vellvii-evolve | ✅ Created |
| Vellvii Pulse | $169 | vellvii-pulse | ✅ Created |

### Phase 2: Shopify API Integration ✅
- [x] `src/lib/shopify.ts` - API configuration and GraphQL queries
- [x] `src/stores/cartStore.ts` - Zustand cart state management
- [x] `src/hooks/useCartSync.ts` - Cart sync on visibility changes
- [x] `src/hooks/useShopifyProducts.ts` - React Query hooks for products

### Phase 3: UI Components ✅
- [x] `src/components/CartDrawer.tsx` - Shopify-integrated cart
- [x] `src/pages/Shop.tsx` - Product catalog at `/shop`
- [x] `src/pages/ProductDetail.tsx` - Product detail at `/product/:handle`

### Phase 4: Routing ✅
- [x] Added `/shop` route
- [x] Added `/product/:handle` dynamic route
- [x] Added redirect from `/products` to `/shop`
- [x] Replaced old Cart with CartDrawer
- [x] Added useCartSync hook

---

## Route Structure

```text
/                    → DOX Landing page
/shop                → Product catalog from Shopify
/product/:handle     → Dynamic product detail pages
/Vellvii-Lux         → Lux prelaunch page
/products            → Redirects to /shop
```

---

## Cart Flow

1. User clicks "Add to Cart" on any product
2. Creates Shopify cart via `cartCreate` mutation (if first item)
3. Adds line items via `cartLinesAdd` mutation
4. Cart persists in localStorage via Zustand
5. Checkout opens Shopify checkout in new tab
6. Cart syncs when user returns (clears if completed)
