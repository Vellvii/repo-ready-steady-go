## Goal

Clean up the route map: remove dead pages, redirect pre-Shopify product URLs to the canonical Shopify PDPs, normalize URL casing, and update the sitemap and memory to match the new state.

## Routes to remove (delete page files + remove from `App.tsx`)

All Kickstarter & related campaign experiments — no longer in use:
- `/Vellvii-Kickstarter` → `VellviiKickstarter.tsx`
- `/Vellvii-Kickstarter2` → `VellviiKickstarter2.tsx`
- `/Vellvii-Prototype` → `VellviiPrototype.tsx`
- `/kickstarter` → `KickstarterPrelaunch.tsx`
- `/kickstarterV2` → `KickstarterV2.tsx`
- `/kickstarter-hero-download` → `KickstarterHeroDownload.tsx`

Disabled-nav pages:
- `/home` → `Home.tsx`
- `/about` → `About.tsx`
- `/contact` → `Contact.tsx`

Off-brand:
- `/sex-saddle` → `SexSaddle.tsx`

Also delete the related component folders that nothing else imports:
- `src/components/kickstarter/*`
- `src/components/kickstarter2/*`
- `src/components/ks-prelaunch/*`
- `src/components/ks-v2/*`

(I'll grep for any external imports first; if anything is still referenced from a kept page, I'll leave that file in place.)

## Routes to redirect (keep route entry, swap element to `<Navigate>`)

Pre-Shopify product pages → canonical Shopify PDPs (301-equivalent client redirect):

| From | To |
|---|---|
| `/dox` | `/products/vellvii-dox` |
| `/pulse` | `/products/vellvii-pulse` |
| `/vibe` | `/products/vellvii-vibe` |
| `/g-vibe` | `/products/vellvii-g-vibe` |
| `/luxury-storage` | `/products/vellvii-lux` |
| `/docking-station` | `/products/vellvii-dox` |

Also delete the underlying `src/pages/{DOX,Pulse,Vibe,GVibe,LuxuryStorage,DockingStation}.tsx` files since redirects don't render them.

## Final route map after cleanup

```text
/                       DoxVideoLanding   (homepage)
/showcase               DoxLanding        (legacy hero, kept per request)
/landing                AgeGateLanding
/shop                   Shop
/products/:handle       ProductDetail
/product/:handle        → /products/:handle
/prelaunch              PrelaunchDOX
/prelaunch-dox          → /prelaunch       (dedupe)
/Vellvii-Lux            PrelaunchLux
/v/1 ... /v/8           QR video landings
/warranty               Warranty
/warranty/register      WarrantyRegister
/privacy-policy         PrivacyPolicy
/terms-of-service       TermsOfService

# Redirects
/dox, /pulse, /vibe, /g-vibe, /luxury-storage, /docking-station → matching /products/<handle>

*                       NotFound
```

Note: `/Vellvii-Lux` keeps its mixed-case URL because it's actively shared in marketing. I'll add a lowercase `/vellvii-lux` alias that redirects to it so future links can use the clean form.

## Files to update

1. `src/App.tsx` — remove deleted routes, add `<Navigate>` redirects, prune imports.
2. `public/sitemap.xml` — remove dead URLs; current entries are still accurate (`/`, `/shop`, four `/products/*`, `/warranty`, `/privacy-policy`, `/terms-of-service`). Add `/Vellvii-Lux` and `/prelaunch`. Bump `lastmod` to today.
3. `public/llms.txt` and `public/robots.txt` — quick scan; remove references to deleted routes if any.
4. Delete the page files and component folders listed above.
5. Update memory `mem://routing/homepage-and-parked-routes` to reflect the new map, and remove now-stale memories: `mem://constraints/kickstarter-platform-limitations`, `mem://tools/kickstarter-hero-generator`, `mem://marketing/kickstarter-pricing-tiers`, `mem://marketing/official-kickstarter-campaign-link`, `mem://marketing/kickstarter-page-requirements`, `mem://analytics/kickstarter-conversion-tracking`. Also update the Core memory line that mentions Kickstarter.

## Out of scope

- Re-enabling /about, /contact in nav (deleted per your call).
- Search Console resubmission — you'll want to do this manually after deploy so Google picks up the redirects and the trimmed sitemap.

## One thing to flag

If any Meta/Google ad currently points to a Kickstarter route (`/kickstarter`, `/kickstarterV2`, etc.), those ads will start hitting the 404 page. I'll route all six deleted Kickstarter URLs to `/` as a safety net so no traffic is lost — confirm if you'd rather they 404 instead.
