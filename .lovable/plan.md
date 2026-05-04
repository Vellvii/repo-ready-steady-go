## Goal

The Kickstarter campaign has wrapped, so the homepage at `/` (`DoxVideoLanding`) shouldn't keep urging people to "Back us on Kickstarter" with a live countdown to April 9. The new homepage will:

1. **Thank Kickstarter and prelaunch backers**, and reassure them their orders are in processing.
2. **Spotlight Lux** as the next live drop (1,500-unit limited pre-order, ships first week of June).
3. **Showcase the wider Pleasure Collection** (DOX, Pulse, Vibe, G-Vibe, Docking Station, Sex Saddle) so the homepage isn't a one-product page anymore.
4. **Tell the public**: more units of all products — including Lux — will be released soon, with an email list to be first in line.
5. Keep the 60-second DOX video as the brand moment in the middle of the page.

## New homepage structure

```text
[1] Header (logo)
[2] Backer thank-you + status ribbon       <-- NEW
[3] Lux pre-order hero (primary CTA)       <-- REPLACES Kickstarter banner
[4] DOX 60-second video                    <-- KEEP, repositioned
[5] The Vellvii Collection (product grid)  <-- NEW
[6] Public waitlist (next batch notify)    <-- NEW
[7] Footer
```

### [2] Backer thank-you + status ribbon (new)
Compact, rose-gold-bordered card directly under the logo. Two-line voice:
- "To our Kickstarter and prelaunch backers - thank you. You made Vellvii real."
- "Your orders are now in processing. You'll receive shipping confirmation by email as your unit moves through fulfillment."

Quiet, elegant, no buttons - just acknowledgment and reassurance.

### [3] Lux pre-order hero
Replaces the giant "Officially Live On Kickstarter" block (lines 194–285).
- Headline: "The Vellvii Lux is here." (gradient shimmer, reusing the existing animation).
- Sub-line: "Limited pre-order - 1,500 units. Ships first week of June. Includes a complimentary Vellvii Nova."
- Reuses `LuxCountdown` from `src/components/lux/LuxPreOrderPanel.tsx` (already counts down to midnight Pacific Time on June 1, 2026).
- Primary CTA button: **"Reserve Your Lux"** -> `/products/vellvii-lux` (Shopify cart). Same gold gradient styling as the current Kickstarter button so visual weight is preserved.
- Drops the `KICKSTARTER_URL` constant and the "Project Ends: 9 April 2026" line.

### [4] DOX 60-second video
Untouched logic - `videoRef`, `handlePlay`, `handleVideoEnd`, `handleReplay`, fullscreen flow, end-screen "Watch Again" all preserved. Just sits below the Lux hero now with a slightly softer headline: "DOX in 60 Seconds" -> "Meet the DOX" (subline: "The flagship vault. New batches releasing soon.").

### [5] The Vellvii Collection (new product grid)
Six small cards in a responsive grid (2 cols mobile, 3 cols tablet+):
- DOX (`/dox`)
- Lux (`/products/vellvii-lux`)
- Pulse (`/pulse`)
- Vibe (`/vibe`)
- G-Vibe (`/g-vibe`)
- Sex Saddle / Docking Station (one of these to keep the grid balanced - Sex Saddle for variety)

Each card: edge-to-edge product image (uses existing `/uploads/...` assets already loaded by `Home.tsx`), product name in Baskerville, single rose-gold "Explore" link. Section heading: **"Discover the Collection"** with sub-line: **"More units of every product - including Lux - release soon. Reserve your place below."**

This satisfies your "focus on other products" ask without bloating the page; each card is a doorway, not a sales pitch.

### [6] Public waitlist (next batch notify)
Reuses the existing `notifyOpen` modal + `usa-launch-notify` Supabase edge function (already wired up in this file).
- Quiet inline section: "Be first when the next batch drops."
- Single email field + "Join the Waitlist" button -> opens the existing dialog flow with success state intact.
- Source field passed to the edge function changed from `dox_video_landing` to `homepage_waitlist` so you can segment signups in the database.
- Copy makes clear: "We'll notify you when DOX, Lux, and the rest of the Vellvii Collection open for restock." This is the "more available soon to the public" promise you mentioned.

## Imports / cleanup in `DoxVideoLanding.tsx`

- Remove `CountdownTimer` import (no longer used - replaced by `LuxCountdown`).
- Add `LuxCountdown` from `@/components/lux/LuxPreOrderPanel`.
- Add `Link` from `react-router-dom` for in-app navigation to `/products/vellvii-lux` and the collection cards.
- Drop the `KICKSTARTER_URL` constant.
- Update `<SEO description>` to reflect Lux pre-order + collection focus (small, helps Google).

## Out of scope

- `src/pages/Home.tsx` (lives at `/home`, not the public root) - left as-is.
- All Kickstarter pages (`/kickstarter`, `/Vellvii-Kickstarter`, etc.) - kept intact for archival / inbound link continuity.
- The Lux product page itself - already polished.
- `useCartSync`, cart drawer, footer - untouched.
- No new edge functions or DB migrations - we reuse `usa-launch-notify` with a new `source` value.

## Brand & UX guardrails

- Rose-gold + champagne-gold tokens, Baskerville headings, Montserrat body, hyphens (no em dashes), copyright 2026 - per project memory.
- Mobile-first sizing preserved (`text-4xl sm:text-6xl md:text-7xl lg:text-8xl` for the Lux headline; product grid is 2 cols at 375px).
- No fake reviews / social proof claims.
- "Pleasure Collection" terminology, never "sex toy."

## After approval

1. Edit `src/pages/DoxVideoLanding.tsx` per above.
2. Save a memory note: homepage now leads with backer thank-you + Lux pre-order + collection grid (post-Kickstarter), so future me doesn't accidentally re-add a Kickstarter banner.

If you'd like the order swapped (e.g., video before Lux hero, or collection grid above the video), or want a more emotional dedicated `/thanks` page for backers, say the word and I'll revise.
