## Goal

Reduce visual noise in the nav drawer by collapsing long lists into expandable accordion groups, while keeping every link reachable.

## New drawer structure

Top-level items (always visible). Items marked with > expand on tap; everything else navigates immediately.

```
> Shop
    All Products
    Pleasure Collection
    DOX-Compatible
    Discreet Storage
    Portable Storage
    Bedroom Storage
    For Couples
> Products
    Vellvii DOX
    Vellvii Lux
    Vellvii G-Vibe
    Vellvii Evolve
    Vellvii Pulse
  Guides
  Warranty
  Contact
> More
    Register Warranty
    Privacy Policy
    Terms of Service
```

Result: 6 visible rows instead of 18. Power-user paths (collections, individual products, legal) are one tap away.

## Behavior

- Default state: all groups collapsed. Drawer opens short and scannable.
- Auto-expand the group that contains the current route (so the active page is always visible without tapping).
- Single-expand optional - users can have multiple groups open at once (simpler, no surprise collapses).
- Chevron icon rotates 180 deg when open. Smooth height transition (framer-motion, ~200ms).
- Search still filters across all links and auto-expands matching groups.
- Tapping a leaf link closes the drawer (existing behavior preserved).

## Visual treatment

- Group header: same Baskerville italic uppercase styling as today, but now a button row with chevron on the right.
- Indent leaf links by 12px under expanded groups so hierarchy reads clearly.
- Keep existing hover border-left accent on leaves.
- Tagline, search, footer (email + copyright) unchanged.

## Files to change

- `src/components/navigation/LuxuryNavDrawer.tsx` - restructure NAV_GROUPS into tiered shape (top-level item OR collapsible group), add expansion state, chevron, animated height. Move Privacy/Terms + Register Warranty into a new "More" group. Promote Guides/Warranty/Contact to top-level.

## QA

- 375px mobile: drawer scrolls cleanly, no overflow.
- Tap each group header: expands/collapses smoothly.
- Navigate to /warranty/register: drawer reopens with "More" pre-expanded.
- Search "lux": Products group auto-expands and shows Vellvii Lux.
- Keyboard: Escape closes; Tab order reaches headers and leaves.
- Active route still closes drawer on tap.

No changes to footer, routes, sitemap, or other components.