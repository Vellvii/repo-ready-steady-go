I’ll do a full responsive pass across the entire routed app instead of only the product pages.

Scope:
- Audit every route in `src/App.tsx`, including:
  - `/`, `/showcase`, `/shop`, `/products/:handle`, `/prelaunch`, `/prelaunch-dox`, `/landing`, `/Vellvii-Lux`, Kickstarter routes, `/home`, `/about`, `/contact`, legacy product pages, legal pages, warranty pages, video pages, and 404.
- For dynamic product pages, test representative Shopify handles:
  - LUX, DOX, Evolve, Pulse, G-Vibe, and any other visible catalog item from the shop grid.
- Review all page files and shared components that affect layout, including headers, footers, product cards, carousels, sticky bars, forms, video sections, media viewers, Shopify product components, and mobile drawers.

Validation targets:
- Mobile: 390px and 375px widths.
- Tablet: 768px or 820px width.
- Desktop: 1366px or larger.
- No horizontal overflow or clipped content.
- No blank pages or runtime errors.
- Product images and videos fit intentionally without breaking the viewport.
- Sticky/fixed elements do not cover important content.
- Forms remain usable on mobile.
- Long titles, badges, CTA buttons, accordions, product grids, and carousels wrap correctly.
- Header remains scroll-aware and above content without blocking mobile use.

Implementation approach:
1. Create a route checklist from `App.tsx` and inspect every page plus its imported layout-critical components.
2. Search the full codebase for mobile-risk patterns such as `w-screen`, negative margins, fixed widths, `whitespace-nowrap`, `min-w`, oversized padding, `h-screen`, fixed/sticky overlays, and uncontained media.
3. Apply focused fixes page-by-page using existing design tokens and brand style.
4. Standardize recurring responsive patterns where pages share the same issue, especially product media, sticky bars, horizontal scrollers, hero sections, forms, and cards.
5. Use browser verification on mobile/tablet/desktop for each routed section and representative product handles.
6. Check console and network errors during the route pass and fix frontend runtime issues that cause blank screens.
7. Add or update lightweight frontend tests only if the existing setup supports it or can be added safely, focusing on route render smoke tests and key responsive components.

Out of scope unless you ask:
- Changing brand copy or visual direction.
- Shopify Admin data edits.
- Backend/schema changes.
- Rebuilding the site structure from scratch.

Deliverable:
- A completed responsive fix pass across all pages.
- A short final report listing pages checked, issues fixed, and any remaining items that require Shopify/content changes rather than code.