
# Premium Aesthetic Polish — Landing, Shop, PDP

Scope: presentation-layer only. No business logic, no Shopify changes (you renamed "Pleasure Collection" already).

---

## 1. Header — clean & minimal (`ScrollHeader.tsx`)

Founders want minimal, so we strip rather than add.

- Remove the drop-shadow glow on the logo (currently `drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]`) — quieter wordmark.
- Reduce header height: `h-16 sm:h-20` (from `h-20 sm:h-24`).
- Replace `bg-black/80 backdrop-blur-md` with `bg-black/40 backdrop-blur-xl` and a hairline rose-gold border on scroll only (`border-primary/15` after 50px scroll, transparent at top).
- Hide the empty mobile-menu hamburger (nav links are disabled — currently a button that opens an empty drawer). Keep just: logo (left) + cart icon (right, already floating).
- Add a single thin tagline line in the header on `md:` and up, centered: **"The Art of 'O'"** in Baskerville italic, `text-xs tracking-[0.3em] text-primary/70`. Hidden on mobile.

## 2. Tagline placement

- **Header (desktop only):** centered italic Baskerville, very small, as above.
- **Footer:** add tagline above the existing footer block — Baskerville italic, centered, `text-2xl`, with a thin rose-gold rule above and below (`PrelaunchFooter.tsx`).
- **Homepage hero** already says "The Art of 'O'" — leave it.

## 3. Founder note — homepage

New component `src/components/home/FounderNote.tsx`, mounted between `BrandPhilosophy` and `HomeFAQ` (or wherever fits cleanest after I view `Home.tsx`).

Copy (refined, no explicit terms):

> **Why we made Vellvii**
> The intimacy space has been flooded with the disposable and the crude. We wanted to bring back what was missing — elegance, craft, and quiet confidence. Pieces designed for the bedside table, not hidden in a drawer. Made for adults who expect the same standard from their wellness as from their watch, their fragrance, their home.
> — The Vellvii Founders

Layout: two columns on desktop (small portrait/illustration placeholder left, text right), single column on mobile. Baskerville heading, Montserrat body, rose-gold signature rule.

## 4. Trust strip below add-to-cart (PDP)

New `src/components/products/TrustStrip.tsx`, mounted in `ProductDetail.tsx` directly under the add-to-cart button. Replaces nothing structural.

Four monoline lucide icons + one-line labels:
- Truck — Discreet shipping
- ShieldCheck — 1-year warranty
- Lock — Plain packaging
- Sparkles — Body-safe materials

Style: thin 1px rose-gold/15 hairline divider top and bottom, no boxes, icons in `text-primary`, labels `text-xs uppercase tracking-[0.2em] text-light-secondary font-montserrat`. Grid 2x2 on mobile, 4-up on desktop.

## 5. Sold Out pills — softer

Currently solid red. Change in `Shop.tsx` and `ProductCard.tsx`:

- Background: `bg-black/40 backdrop-blur-sm`
- Border: `border border-primary/30`
- Text: `text-primary/90` (champagne/rose-gold)
- Same uppercase `tracking-wider` Montserrat — still legible, no longer shouting.
- Remove the duplicate Sold Out pill in the footer of the card (currently shows twice — once on image, once next to price). Keep image overlay only.

## 6. Scroll & hover accents (rose-gold)

a) **Scroll-reveal rose-gold underline** on section headings — extend existing `ScrollReveal` so any `h2` inside `surface-dark-rich` sections gets a 40px rose-gold rule that draws in as it enters viewport. Implemented as a utility class `.heading-rule` in `index.css` with `@keyframes draw-rule` triggered by an IntersectionObserver hook (`useInViewRule`).

b) **Cursor-follow glow** on hero and product cards — small (~120px) soft rose-gold radial that follows pointer, `mix-blend-mode: screen`, opacity 0.15. New `src/components/effects/CursorGlow.tsx`. Only mounts on `(hover: hover) and (pointer: fine)` — disabled on touch.

c) **Product card hover** (`Shop.tsx` `ProductCard`):
- Image: subtle `scale(1.03)` + 700ms ease.
- Add a thin rose-gold border that fades in on hover (`ring-1 ring-primary/0 hover:ring-primary/30`).
- Title color shift to `text-primary` already exists — keep.

d) **Magnetic button** already exists (`MagneticButton.tsx`) — use it on the homepage hero CTAs for a refined pointer feel.

e) **Parallax** on hero video — apply gentle `translateY` on scroll (existing `ParallaxContainer`) so the hero feels less static.

## 7. Shop hero spacing

Tighten the shop hero — currently feels thin. Add a small Baskerville italic line under "The Collection": *"The Art of 'O'"* in `text-primary/60`, mirroring the homepage so the brand line shows up across pages.

---

## Files touched

```
src/components/ScrollHeader.tsx                 (minimize, hairline border, desktop tagline)
src/components/prelaunch/PrelaunchFooter.tsx    (tagline block)
src/components/home/FounderNote.tsx             NEW
src/pages/Home.tsx                              (mount FounderNote)
src/components/products/TrustStrip.tsx          NEW
src/pages/ProductDetail.tsx                     (mount TrustStrip)
src/pages/Shop.tsx                              (softer Sold Out, dedupe pill, italic tagline)
src/components/ProductCard.tsx                  (softer Sold Out, hover ring)
src/components/effects/CursorGlow.tsx           NEW
src/hooks/useInViewRule.ts                      NEW
src/index.css                                   (.heading-rule, draw-rule keyframes)
```

No new dependencies. No Shopify, no backend, no payments touched.

---

## Out of scope (flagging only)

- Hero Ken-Burns motion / replacing the baked-in raster text — you said visuals are being handled in person.
- "In the box" / materials spec block on PDP — separate larger pass.
- Pairing module ("Pairs with Pulse") — separate pass.
- Blank `/products/vellvii-pulse` PDP — functional bug, separate fix.

Ready to build on approval.
