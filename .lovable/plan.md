## Goal

The Meta Pixel base code is installed in `index.html`, but only fires `PageView` once on initial load. Because Vellvii is a single-page app, route changes don't fire new PageViews, and no conversion events are wired up. This plan adds the relevant Meta standard events alongside the existing GA4/Google Ads tracking — without duplicating or changing GA logic.

## Events to implement

Mapped from Meta's standard event catalog to actions that already exist on the site:

| Meta event | Trigger | Existing GA4 hook |
|---|---|---|
| `PageView` | Every SPA route change | (router-level, new) |
| `ViewContent` | Product detail page loads | `trackViewItem` in `ProductDetail.tsx` |
| `AddToCart` | "Add to cart" succeeds | `trackAddToCart` in `ProductDetail.tsx` |
| `InitiateCheckout` | Cart drawer "Checkout" click | `trackBeginCheckout` in `CartDrawer.tsx` |
| `Lead` | Waitlist / VIP / DOX prelaunch / LUX reserve email submit succeeds | (new) |
| `Subscribe` | Mailing list (`mailchimp-subscribe`) success | (new) |
| `CompleteRegistration` | Warranty registration success | (new) |
| `Contact` | Contact page form submit | (new) |

Skipped intentionally:
- `Purchase` — fires on Shopify's checkout domain, not on our React app. If you have the Meta channel installed in Shopify admin, that's where the Purchase event should live (and we'd pass the same `eventID` for dedup). Out of scope unless you want me to wire that side too.
- `Search`, `AddPaymentInfo`, `AddToWishlist` — no matching UX on the site today.

## Technical details

### 1. Add a thin Meta wrapper next to GA helpers

New file `src/lib/metaPixel.ts`:
- `fbq(event, params, options?)` safe wrapper (no-op if `window.fbq` missing).
- Helpers: `pixelPageView()`, `pixelViewContent({content_id, content_name, value, currency})`, `pixelAddToCart(...)`, `pixelInitiateCheckout({contents, num_items, value, currency})`, `pixelLead({content_name, value?})`, `pixelSubscribe({value?, currency?, predicted_ltv?})`, `pixelCompleteRegistration({content_name})`, `pixelContact()`.
- Each helper generates a UUID `eventID` and returns it (used later for server-side dedup if we add CAPI).

### 2. SPA PageView tracking

In `src/App.tsx` (the router root), add a `useEffect` watching `location.pathname` and call `pixelPageView()` on every change. Skip the very first render since the inline pixel snippet already fires `PageView`.

### 3. Hook into existing event sites

- `src/pages/ProductDetail.tsx` — call `pixelViewContent` next to `trackViewItem`, and `pixelAddToCart` next to `trackAddToCart`.
- `src/components/CartDrawer.tsx` — call `pixelInitiateCheckout` next to `trackBeginCheckout`.
- `src/components/EnvelopeMailingList.tsx` and `src/components/prelaunch/EmailCaptureSection.tsx` (and `EmailCaptureForm.tsx`, `LuxReserveCTA` flow) — call `pixelLead` + `pixelSubscribe` on successful waitlist/VIP signup.
- `src/pages/WarrantyRegister.tsx` — `pixelCompleteRegistration` on success.
- `src/pages/Contact.tsx` — `pixelContact` on submit success.

### 4. No changes to

- `index.html` base pixel — already correct.
- `src/lib/analytics.ts` GA logic — untouched.
- Backend / edge functions — no CAPI in this pass (can be a follow-up to dedupe via `eventID`).

## Verification

After deploying:
1. Install Meta Pixel Helper extension on `vellvii.com`.
2. Navigate Home → Shop → product → add to cart → open cart → checkout.
3. Confirm Pixel Helper shows: PageView (×N route changes), ViewContent, AddToCart, InitiateCheckout.
4. Submit waitlist + warranty + contact forms; confirm Lead/Subscribe/CompleteRegistration/Contact fire.
5. Check Events Manager → Test Events with the live URL — all events should appear within ~1 minute.

## Out of scope (ask if you want them next)

- Purchase event on Shopify side (needs Meta sales channel installed in Shopify admin).
- Conversions API (server-side dedup) via a Supabase edge function.
- Advanced matching (hashed email/phone) on form submits for better attribution.
