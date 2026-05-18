## Goal
Make sure all crawler-facing URLs point at the live custom domain `https://vellvii.com` and never at `vellvii-site.lovable.app`.

## Changes

1. **`public/robots.txt`** — revert the `Sitemap:` directive back to:
   ```
   Sitemap: https://vellvii.com/sitemap.xml
   ```

2. **`public/sitemap.xml`** — verify all `<loc>` entries use `https://vellvii.com` as the host (they already do after the previous round; confirm none slipped to `lovable.app`).

3. **`src/components/SEO.tsx`** — confirm `SITE_URL` stays `https://vellvii.com` (already correct). No change expected.

4. **`index.html`** — confirm `og:url` / canonical references stay on `vellvii.com` (already correct). No change expected.

5. **`public/llms.txt`** — confirm all links stay on `vellvii.com` (already correct after the previous rewrite). No change expected.

## Out of scope
- No new routes, no metadata copy changes, no design changes.
- No disavow file.
- The previous SEO scanner finding that recommended switching to `vellvii-site.lovable.app` will be ignored — your live canonical domain is `vellvii.com`, which is the correct choice for crawlers.

## QA after implementation
- `rg "lovable.app" public/ src/` returns no hits in canonical/sitemap/robots surfaces.
- `robots.txt` Sitemap line points to `https://vellvii.com/sitemap.xml`.
- `sitemap.xml` host is `https://vellvii.com` on every entry.
