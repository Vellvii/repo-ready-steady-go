## Goal

On desktop product pages (Lux especially), the right info column is taller than the left image column. Because the right column is `lg:sticky lg:top-24`, scrolling leaves a large empty gap below the image on the left. We want the image column to slowly drift down with scroll so its bottom finishes roughly level with the trust badges / bottom of the info column — eliminating the gap, while still letting the user scroll the page normally.

This change is desktop-only. Mobile (single-column stack) stays exactly as it is.

## Approach

Use a CSS-only "reverse sticky" pattern — no JS scroll listeners, no jank.

The image column is wrapped in an inner block. The outer wrapper grows to match the height of the info column (via the existing CSS grid `items-start` row — we'll switch the row to `items-stretch` only at `lg`). The inner block is given:

- `lg:sticky`
- `lg:top-[calc(100vh-IMAGE_HEIGHT-PADDING)]` style so it sticks to the BOTTOM of the viewport instead of the top.

Effect: while there's room, the image scrolls normally with the page; once its bottom would leave the viewport, it sticks to the bottom of the viewport and stays visible while the info column continues scrolling. By the time the user reaches the end of the info column, the image's bottom naturally lines up with the bottom of the info column — no empty gap.

This is the standard Tailwind/CSS technique for "tall column + short column" sticky pairs.

## Changes

Single file: `src/pages/ProductDetail.tsx`

1. Image column outer wrapper (`<div className="space-y-3 sm:space-y-4">` around the gallery, line ~245):
   - Change to `<div className="space-y-3 sm:space-y-4 lg:h-full">` so it stretches to match the info column on desktop.

2. Inside that wrapper, wrap the existing gallery contents (toggle + main image + thumbnails) in a new inner div:
   - `<div className="lg:sticky lg:top-24 lg:flex lg:flex-col lg:justify-end lg:min-h-[calc(100vh-8rem)]">`
   - `justify-end` pushes the image to the bottom of the sticky box, so as the user scrolls the image gradually moves down within its column until its bottom reaches the bottom of the info column.
   - `min-h-[calc(100vh-8rem)]` ensures the sticky container fills the viewport height (minus header offset) so the image is anchored to the viewport bottom while sticking.

3. Grid row alignment (line ~244, `items-start`):
   - Change to `items-start lg:items-stretch` so on desktop the two columns share the same height and the left wrapper can stretch.

## Why this works

- Grid `items-stretch` makes both columns the same height (= height of taller info column).
- The left wrapper now has that full height, but its inner sticky child only takes its natural size.
- `lg:sticky` + `top-24` + `min-h-[calc(100vh-6rem)]` + `justify-end` makes the inner child behave as: "stay pinned to the bottom of the viewport while my parent is scrolling past." This is the inverse of the existing right-column behavior.
- Net result on desktop: image scrolls with page initially → sticks near bottom of viewport while user reads info → its bottom aligns with the bottom of the info column at the end. The empty gap disappears.
- On mobile (`<lg`), none of the `lg:` classes apply, so layout is unchanged.

## Out of scope

- No changes to mobile layout, content, or other product pages' content.
- No JS scroll handlers, no IntersectionObserver — pure CSS.
- Lightbox, 3D toggle, thumbnails, related products: untouched.

## Verification after implementation

- Desktop (≥1024px): scroll the Lux product page; confirm the image gradually descends with scroll and its bottom ends near the trust badges, with no large empty space below it.
- Desktop non-Lux (e.g. Pulse, G-Vibe): same behavior, gap (if any) is removed.
- Mobile (375–414px): layout unchanged, image stays above info as before.
- Lightbox click and 3D toggle still work.
