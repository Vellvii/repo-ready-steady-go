# Mobile Optimization - LUX & Evolve Product Pages

## What I found (tested at 390x844)

### `/Vellvii-Lux` (PrelaunchLux)
- Horizontal page scroll on mobile (visible scrollbar at the bottom of the page). Caused by sections using `w-screen relative left-1/2 right-1/2 -mx-[50vw]` for full-bleed carousels combined with `text-shadow` glows and missing `overflow-x-hidden` containment at the section level. The root wrapper has `overflow-hidden` but child sections are tall and re-introduce horizontal overflow.
- Hero (`LuxHeroSection`): logo video clamped to `h-[16rem]` on mobile is large but acceptable; tagline `Because Your Pleasure Collection Deserves..........` uses `text-2xl` with long unbroken dotted run that pushes past the safe zone.
- Reserve CTA buttons (`LuxReserveCTA`) on small screens are wide enough that the 3-line stacked content (strikethrough price, big price, "Reserve Your LUX", "VIP Early Access") looks crowded inside the pill - the padding `px-10 py-6` plus optional larger override `text-xl ... px-16 py-7` (used in hero + moment sections) is too aggressive on 375-390px.
- Heading sizes (`text-3xl sm:text-4xl ...`) are fine but vertical rhythm uses `space-y-12 lg:space-y-16` + `py-32` per section, which on mobile creates very long dead space between content - feels broken/empty.
- Section paddings `px-4 sm:px-8 lg:px-12` are OK, but the carousels with `-mx-[50vw]` cause the visible 1-2px horizontal scroll on iOS Safari.

### `/products/vellvii-evolve` (ProductDetail.tsx)
- Same horizontal scrollbar visible at the bottom of the page on mobile.
- The product image container uses `aspect-square -mx-3 sm:mx-0` inside a parent with `px-3`. This is fine logically, but combined with the StickyProductBar and the RelatedProducts horizontal scroller below, something is pushing the page width past 100vw.
- The sticky "Vellvii Evolve / $169 / Sold Out" bottom bar is fine, but the layout above it doesn't have safe bottom padding so content can hide behind it on short scroll positions.
- The `Vellvii - The Art of 'O'` eyebrow on PDP could be tightened on mobile (currently `text-xs sm:text-sm uppercase tracking-[0.15em]` is OK).

## Changes

### 1. Global horizontal-overflow guard
Add `overflow-x-hidden` (or Tailwind's `overflow-x-clip`) to the top-level wrappers of:
- `src/pages/PrelaunchLux.tsx` - already has `overflow-hidden` on the inner div, add `overflow-x-clip` to the outer `min-h-screen` div as belt-and-suspenders.
- `src/pages/ProductDetail.tsx` - add `overflow-x-clip` to the `min-h-screen surface-dark-rich` root.

This is the single highest-impact fix: it kills the horizontal scrollbar without affecting any intentional `w-screen` full-bleed media.

### 2. LUX page mobile polish (`src/components/prelaunch/lux/*`)
- `LuxHeroSection`:
  - Reduce mobile video size: `h-[12rem] sm:h-[18rem] lg:h-[28rem] xl:h-[34rem]`
  - Tagline: cap to `text-xl sm:text-3xl lg:text-4xl` and add `px-2` so the dotted "Deserves..........." can wrap cleanly
  - Reduce hero bottom padding `pb-32 lg:pb-40` -> `pb-20 sm:pb-28 lg:pb-40`
  - Reduce gaps `space-y-12 lg:space-y-16` -> `space-y-8 sm:space-y-12 lg:space-y-16` (applied uniformly across Lux sections)
  - Reduce big CTA override `text-xl sm:text-2xl px-16 py-7` -> `text-base sm:text-xl px-8 sm:px-16 py-5 sm:py-7`
- `LuxJourneySection`, `LuxMaterialsSection`, `LuxPhilosophySection`, `LuxPrivacyPocketSection`, `LuxMomentSection`:
  - Section padding `py-32 lg:py-48` -> `py-20 sm:py-28 lg:py-48`
  - Inner `space-y-20 lg:space-y-32` -> `space-y-14 sm:space-y-20 lg:space-y-32`
- `LuxReserveCTA`:
  - Default padding `px-10 py-6` -> `px-6 sm:px-10 py-5 sm:py-6`
  - Price row text: `text-3xl` -> `text-2xl sm:text-3xl`
  - Button label: `text-base` -> `text-sm sm:text-base`

### 3. Evolve / ProductDetail mobile polish
- Add `overflow-x-clip` to the page root (covered in #1).
- Add `pb-24 sm:pb-0` to the main `min-h-screen` wrapper so content clears the mobile sticky bar.
- Variant color swatches: `w-10 h-10` is fine but ensure `flex-wrap gap-2` and add `gap-y-3` so wrapped rows don't crowd.
- Eyebrow line tightened: keep `text-xs uppercase tracking-[0.15em]` on mobile; no change needed.

### 4. Verification
- Reload `/Vellvii-Lux` at 390x844, scroll top -> bottom, confirm no horizontal scrollbar and CTA buttons fit.
- Reload `/products/vellvii-evolve` at 390x844, confirm no horizontal scrollbar and content clears the sticky bar.
- Spot-check `/products/vellvii-dox` and `/products/vellvii-pulse` to make sure padding tweaks didn't regress desktop or other PDPs.

## Out of scope (not touching)
- Copy / messaging
- Desktop layout (`lg:` and `xl:` classes preserved)
- Status pill positioning (already mobile-friendly)
- Carousel timing / loop behavior
