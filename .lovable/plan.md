## Goal
Add an Apple-style scroll-pinned DOX story to the homepage (`DoxVideoLanding.tsx`), placed right before section [4] "DOX Video Section" so it warms the viewer up before the 60-second video plays.

## Placement
Insert a new section between line 319 (end of [3] Lux Hero) and line 322 ([4] DOX Video). Same horizontal rhythm (`px-4`, top border, top padding) as adjacent sections.

## What the user sees
A tall scrollable container (`~400vh`). Inside it, a sticky `100vh` stage holds the DOX product image on one side and a stack of 4 text panels on the other. As you scroll:

```text
Stage 1  COLOR          Onyx DOX shown (the black one - shows the rose gold hardware best)
Stage 2  BIOMETRIC      Fingerprint glyph + "10 unique prints, instant unlock"
Stage 3  INTERIOR       Velvet-lined cradle, movable tray, 3 internal USB-A
Stage 4  CRAFT          Faux leather + rose gold hardware, hand-finished
```

Each stage = 100vh of scroll. Active panel = opacity 1, scale 1; inactive = opacity 0.25, translated. Driven by `useScroll` + `useTransform` from framer-motion (already in the file). Image stays as the Onyx DOX throughout; only the text panels swap.

## Mobile (<=767px)
Sticky scroll pinning feels janky on touch and conflicts with the existing full-page swipe model. On mobile, fall back to a vertical stack: Onyx DOX image + 4 cards revealed via existing `<Reveal>` component. No pinning. Detect with `matchMedia('(min-width: 768px)')`.

## Accessibility / Perf
- `prefers-reduced-motion`: skip transforms, render as plain stacked sections.
- Image: reuse the existing Onyx DOX hero asset already imported in `ProductDetail`. No new uploads.
- No new dependencies.

## Files
- **edit** `src/pages/DoxVideoLanding.tsx` - insert section + import new component.
- **create** `src/components/DoxScrollStory.tsx` - the pinned-story component (desktop pinned, mobile stacked, reduced-motion safe).

## Out of scope
- Not touching the existing Lux hero or DOX video section.
- Not changing copy elsewhere on the homepage.
- No new routes, no SEO changes (the section sits inside an already-indexed page).
