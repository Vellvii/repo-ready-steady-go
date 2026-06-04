
## Goal

Re-engineer `/pages/the-lux` (the Meta Ads landing page) so the **free Nova gift ($49 value)** becomes the dominant emotional hook — not a footnote. The Lux is still the product, but the page must repeatedly answer the abandoning customer's silent question: "Is $199 worth it?" The answer becomes: "You're not paying $199 for the Lux. You're paying $199 for the Lux **and** a $49 Nova - free, only on this page, only right now."

Scope is **only** `/pages/the-lux` (`src/pages/TheLuxLanding.tsx` + a few small components under `src/components/lux/`). No changes to the Lux PDP, the cart, Shopify variants, pricing, or shipping logic.

---

## Strategy - why customers abandon, and what we change

Right now the page treats the Nova as a polite bonus, buried below the gallery and trust badges. By the time the user reaches the Shopify cart, the Nova has emotionally evaporated and they're staring at "$199 + $14.20 shipping" with no anchoring value. The fix is repetition + visual proof + scarcity, all without cheapening the brand.

Three anchors carry the message through the page:

1. **Top of page** — a refined "Free $49 Nova included" ribbon above the hero so the gift registers in the first 2 seconds.
2. **Mid page** — a redesigned "Value Stack" panel that shows the math: Lux $199 + Nova $49 = **$248 value, you pay $199**. Visual, not just text.
3. **Final CTA + sticky mobile bar** — both repeat "Includes free Nova ($49)" right next to the price, so the offer travels with the user all the way to the "Pre-Order" tap.

Tone stays Vellvii — Baskerville + Montserrat, rose gold on dark, quiet luxury. No neon "FREE!!" badges, no countdown gimmicks beyond what we already use elsewhere.

---

## Page structure (top to bottom)

```text
1.  Gift ribbon                — "Complimentary $49 Nova with every Lux - this page only"
2.  Hero                       — Headline reframed around the pairing, not the case alone
3.  Hero image (Lux)           — unchanged source, refined frame
4.  Value Stack panel          — $199 Lux + $49 Nova = $248, you pay $199 (visual receipt)
5.  Pairing showcase           — Side-by-side: Lux carousel + Nova carousel, "Designed to travel together"
6.  Body copy                  — Rewritten around the duo, not the case alone
7.  Primary CTA                — Button label includes the gift; supporting line reinforces $49 saved
8.  Lux supporting gallery     — unchanged images, tightened grid
9.  Nova "Meet your gift" block — kept, refined; $50 -> $49 everywhere
10. Trust badges               — unchanged
11. Secondary CTA              — rebuilt; price line shows strikethrough $248 -> $199
12. FAQ                        — add 1 FAQ: "Is the Nova really free?"
13. Sticky mobile CTA bar      — new: appears on scroll, shows "Lux + free Nova - $199" + Pre-Order
14. Footer                     — unchanged
```

---

## Section-by-section detail

### 1. Gift ribbon (new, top of page, above hero)
Thin rose-gold-bordered strip, dark background, centered:
> "Complimentary Vellvii Nova - a $49 gift, included free with every Lux ordered on this page."
Small gift icon left and right. Not sticky. Sets the frame before the headline.

### 2. Hero (rewritten)
- Eyebrow: "Reserve Now - Ships End of June"
- H1: **"The Lux. Plus a $49 Nova, on us."**
- Sub (italic Baskerville): "A biometric leather case worth keeping - and the quiet companion that lives inside it."
- Price block: large `$199`, then small line: `Includes free Nova - a $49 gift · + $14.20 shipping · Ships end of June`

### 3. Hero image — unchanged (uses `images[0]` from Shopify)

### 4. Value Stack panel (new)
A "receipt-style" card, centered, max-w-md:

```text
Vellvii Lux ............ $199
Vellvii Nova ........... $49
                       ------
Total value ............ $248
This page only ........  -$49
                       ------
You pay ................ $199
```

Rendered with monospace-feeling alignment using Montserrat tabular numerals, dotted leaders in `text-light-secondary/40`, "You pay $199" in rose gold and bold. This is the single most important new element on the page.

### 5. Pairing showcase (new)
Two-column on desktop, stacked on mobile. Left: small Lux image carousel using existing Shopify `images`. Right: existing `NovaCarousel`. Caption beneath spans both columns:
> "The Lux holds. The Nova travels inside. Designed to belong together."

This is what the gift looks like — proof, not promise.

### 6. Body copy (rewritten, shorter, duo-framed)
Reframe the existing paragraph so the Nova is mentioned in sentence one, not as a footnote. Keep all factual claims (leather, USB-C, lifetime warranty, discreet shipping).

### 7. Primary CTA (button label changed)
- Button copy: **"Reserve the Lux + Free Nova - $199"**
- Supporting line under button: "$49 Nova included free · $14.20 shipping · Ships end of June"
- Same `href` to Shopify cart - no link/business-logic change.

### 8. Supporting gallery — unchanged

### 9. Nova "Meet your gift" block — refined
Keep current layout. Change every `$50` to `$49`. Tighten the closing line to: "First-run offer. Only included with Lux orders placed on this page."

### 10. Trust badges — unchanged

### 11. Secondary CTA (rebuilt to remove redundant price stack)
Single clean block:
- Strikethrough `$248` + bold rose-gold `$199` on one line
- Button: "Reserve Your Lux + Free Nova"
- One small line beneath: "Discreet shipping · Lifetime warranty"

This replaces the current triple-$199 stack (which we already discussed cleaning up).

### 12. FAQ
Add one item at the top:
- Q: "Is the Nova really free?"
- A: "Yes. Every Lux ordered through this page automatically includes a Vellvii Nova - a $49 gift - added to your shipment at no extra cost. Limited to the first production run."

Change one existing item's references from "$50" to "$49" if any exist. (None currently do, but verify.)

### 13. Sticky mobile CTA bar (new, mobile + small tablet only)
Appears after the user scrolls past the hero. Slim bar at bottom:
- Left: "Lux + free Nova" small, then "$199" bold rose gold
- Right: "Pre-Order" button, same Shopify link

Pattern mirrors `src/components/StickyProductBar.tsx` so it feels native. Built as a small new `LuxStickyOfferBar.tsx` to keep the existing component untouched.

### 14. Footer — unchanged (`PrelaunchFooter`)

---

## Global copy rules for this page

- Every dollar reference to the Nova becomes **$49** (was $50). Includes the gift ribbon, value stack, CTAs, Nova block, FAQ.
- Every CTA label that mentions price also mentions the gift.
- No new claims (no "limited to 500", no countdown timers) unless you confirm them - we'll keep "first production run" which is already true.
- Hyphens only, no em dashes. Premium tone preserved.

---

## Files touched (all under `src/pages/TheLuxLanding.tsx` and `src/components/lux/`)

- `src/pages/TheLuxLanding.tsx` - main rewrite of sections 1, 2, 4, 5, 6, 7, 9, 11, 12, plus mount sticky bar.
- `src/components/lux/NovaGiftBlock.tsx` - change `$50` -> `$49` in the compact block too (so PDP stays consistent with landing page).
- `src/components/lux/ValueStackCard.tsx` - **new**, the receipt-style value panel.
- `src/components/lux/LuxNovaPairing.tsx` - **new**, the side-by-side pairing showcase.
- `src/components/lux/LuxStickyOfferBar.tsx` - **new**, mobile sticky offer bar.

No new npm packages. No Shopify, cart, routing, SEO schema, or pricing changes beyond the SEO `<title>`/`description` which I'll update to reflect "+ Free $49 Nova".

---

## Explicitly out of scope

- The Lux product page (`/products/vellvii-lux`) - not touched in this change.
- The Shopify cart page itself - we cannot edit it; the on-page persuasion is our only lever.
- Any change to the Nova's actual price in Shopify or the Lux variant.
- No images regenerated via AI - we use existing Shopify `images` and the two Nova photos already in `public/nova/`. If you want fresh hero photography we can do that as a follow-up.

---

## What I need from you before I build

One quick confirmation:

1. **$49 vs $50** - you said $49 in this message but the existing copy says $50. Confirm I should change every instance (landing page + Nova compact block on the Lux PDP) to **$49**. If only this landing page should say $49, tell me and I'll scope it tighter.

Once you confirm, I'll switch to build mode and ship it.
