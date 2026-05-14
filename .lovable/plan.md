## Goal

Tighten the footer used across the site (`PrelaunchFooter`) so it reads cleaner and more editorial — less stacked, less "card-y" social pills, less repeated divider lines — while keeping every existing link, social, contact, and the "The Art of 'O'" tagline.

## Scope

- Single file: `src/components/prelaunch/PrelaunchFooter.tsx`
- No route, content, or schema changes. No removals of links. No new dependencies.
- Applies everywhere `PrelaunchFooter` is rendered (Shop, Guides, Contact, Warranty, Privacy, Terms, PrelaunchDOX, CollectionDoxCompatible, DoxVideoLanding).

## Refinements

1. **Structure** — Replace the centered vertical stack with a refined two-row editorial layout:
   - **Top row**: Logo on the left, link columns (Explore / Support / Legal) on the right. On mobile it stacks: logo first, then a 3-column compact link grid.
   - **Bottom row**: A single hairline divider, then a slim line containing — copyright (left), email (center), social icons (right). Mobile collapses to centered stack.
2. **Tagline block** — Keep "The Art of 'O'" but make it quieter: remove the two horizontal hairline accents, reduce size to `text-lg sm:text-xl`, set above the main grid with generous breathing room. Only one decorative element retained.
3. **Social icons** — Drop the circular pill buttons. Use plain inline icons (`w-4 h-4`) with `text-light-secondary/70 hover:text-primary` and `gap-5` spacing. Keeps the same four links and aria-labels.
4. **Email** — Inline text link `hello@vellvii.com` in Montserrat with subtle underline-on-hover, no icon, sits in the bottom row.
5. **Link columns** — Keep the same headings (Explore, Support, Legal) and the exact same list items. Headings switch from italic Baskerville chip to a simple uppercase Montserrat micro-label (`text-[0.65rem] tracking-[0.22em] text-light-secondary/55`) for a calmer hierarchy. Item text stays Montserrat, slightly tighter spacing (`space-y-2.5`).
6. **Dividers** — Remove the two internal `border-t` lines (above grid, above copyright). Keep only the top `border-t border-white/10` on the `<footer>` element and one hairline above the bottom row.
7. **Spacing** — Use `pt-14 pb-8` overall, `gap-12` between logo and columns. Reduce visual weight of drop-shadow on logo (`drop-shadow-[0_0_18px_rgba(212,175,55,0.18)]`).
8. **Tokens** — All colors continue to use semantic tokens (`text-light-secondary`, `text-light-muted`, `text-primary`, `border-white/10`). No raw hex outside the existing logo glow.

## Out of scope

- Newsletter signup, language/currency switcher, address block — not adding new sections.
- LuxFooter (separate component, untouched).
- Footer copy/links.

## QA after implementation

- Render `/shop`, `/guides`, `/contact`, `/privacy-policy`, `/terms-of-service` and confirm:
  - All original links present, same hrefs.
  - Tagline still reads "The Art of 'O'".
  - Mobile (375px) stacks cleanly with no horizontal scroll.
  - Desktop two-row layout aligns logo + columns.
  - Social icons hover to primary; email link works.
  - Copyright still "© 2026 Vellvii. All rights reserved."
