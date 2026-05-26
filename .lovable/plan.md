# Confirm add-to-cart success with clear feedback

Implement the two feedback items from the screenshot, fitting Vellvii's premium tokens.

## 1. Open cart drawer + toast with actions on add-to-cart

Today, adding to cart fires a sonner toast but the drawer does not open and the toast has no actions. The floating Cart trigger already updates the header count reactively via `getTotalItems()`, so that part is already correct.

Changes:

- `src/stores/cartStore.ts`: add UI state `isDrawerOpen: boolean` plus `openDrawer()` / `closeDrawer()` / `setDrawerOpen(open)` actions. Exclude from `partialize` (UI state, not persisted).
- `src/components/CartDrawer.tsx`: replace local `useState(isOpen)` with the store's `isDrawerOpen` / `setDrawerOpen`. The existing floating trigger keeps working (calls `openDrawer()` when items exist, routes to `/shop` when empty).
- `src/pages/ProductDetail.tsx` (`handleAddToCart`): after `await addItem(...)`, call `useCartStore.getState().openDrawer()` and replace the bare `toast.success` with an actionable sonner toast positioned `top-center`:
  - title: `"{product title} added to your collection"`
  - action: **Checkout** → triggers same checkout flow as drawer button (extract a small `startCheckout()` helper in `cartStore` that returns the attribution-appended URL, or reuse via dispatching an event; cleaner: keep checkout logic in drawer but the toast's primary action just calls `openDrawer()` since drawer already shows Checkout prominently)
  - cancel/secondary: **View cart** → `navigate('/cart')` via a small wrapper that uses `window.location` is acceptable here, but preferred is moving the toast trigger into a tiny hook `useAddToCartFeedback()` that has access to `useNavigate`.

Final toast contract (kept tasteful, single line of actions):
- Primary action: **View cart drawer** (closes toast, drawer is already open — redundant, so drop)
- Two actions only: **Checkout** and **View cart**. Both close the toast. Drawer remains open behind so the user sees their item land.

Wire the same feedback in any other add-to-cart entry points if they exist (currently only `ProductDetail.tsx` calls `addItem`).

## 2. Empty-cart inline notice + disabled checkout

- `CartDrawer` already shows an empty state with "Browse Products" and hides the Checkout button entirely — keep as is.
- `src/pages/Cart.tsx`: already shows an empty state card with "Browse the Collection" and does not render the Checkout button. Add a subtle inline notice line ("Add an item from the collection to enable checkout.") and, when we later render the summary panel for empty carts (we don't today), the Checkout button would be `disabled`. No code change strictly required, but I'll add the one-line inline notice for clarity.
- Floating trigger in `CartDrawer` already swaps to "Shop Now" → `/shop` when `totalItems === 0`. Keep.

## Technical notes

- New store shape:
  ```ts
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  ```
  `partialize` continues to persist only `items`, `cartId`, `checkoutUrl`.
- Toast uses sonner's `action` + `cancel` props; styling inherits from existing sonner Toaster (premium tokens already applied globally).
- No changes to Shopify cart API calls, analytics, or pixel events.

## Files touched

- `src/stores/cartStore.ts` — add drawer UI state + actions
- `src/components/CartDrawer.tsx` — read drawer open state from store
- `src/pages/ProductDetail.tsx` — open drawer + actionable toast after add
- `src/pages/Cart.tsx` — one-line inline notice in empty state (minor)
