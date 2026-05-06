# On-site Analytics: GA4 funnel + Google Ads Add-to-Cart

Shopify side is done (Google & YouTube app handles `purchase` conversions for both GA4 `G-CGKDHGZFBJ` and Google Ads `AW-18143343715`). This plan covers everything that fires from our domain before checkout.

## 1. `index.html` — load the Google Ads tag
Add a second `gtag('config', 'AW-18143343715')` next to the existing GA4 config. Single shared `gtag()` bootstrap, no duplication.

## 2. `src/lib/analytics.ts` (new) — central helpers
- `trackViewItem(item)` — GA4 `view_item`
- `trackAddToCart(item)` — GA4 `add_to_cart` AND Google Ads `conversion` with `send_to: 'AW-18143343715/<LABEL>'`, `value`, `currency`
- `trackRemoveFromCart(item)` — GA4 `remove_from_cart`
- `trackBeginCheckout(items, value)` — GA4 `begin_checkout`
- `appendCheckoutAttribution(url)` — reads `_ga` cookie + UTM params from the current URL, appends them to the Shopify checkout URL so attribution survives the domain hop

## 3. Wire events in existing components
- `src/pages/ProductDetail.tsx` — `trackViewItem` on load; `trackAddToCart` for ALL products (not just Lux). Keep existing Lux-specific custom events.
- `src/components/CartDrawer.tsx` — `trackBeginCheckout` then `appendCheckoutAttribution(checkoutUrl)` before `window.open`.
- `src/stores/cartStore.ts` — `trackRemoveFromCart` inside `removeItem`.

## Files changed
```text
EDIT index.html                       second gtag config for AW-18143343715
NEW  src/lib/analytics.ts             tracking helpers + checkout attribution
EDIT src/pages/ProductDetail.tsx      view_item, add_to_cart for all products
EDIT src/components/CartDrawer.tsx    begin_checkout + checkout attribution
EDIT src/stores/cartStore.ts          remove_from_cart
```

## What I need from you
**Paste the Google Ads conversion label** for the "Google Shopping App Add To Cart" conversion — the part after the slash in `send_to`. Find it via Google Ads → Goals → Conversions → click "Google Shopping App Add To Cart" → "Tag setup" → "Install the tag yourself". The snippet shows:

```js
gtag('event', 'conversion', {'send_to': 'AW-18143343715/AbC-D_efG12hIjKlMnO', ...});
```

I need the `AbC-D_efG12hIjKlMnO` part. Without it the page tag loads but the add-to-cart conversion won't actually count in Google Ads.

If you'd rather ship now and patch the label later, I can — just say so.
