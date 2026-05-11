## Update sitemap to focused route list

Edit `public/sitemap.xml` to keep only the pages relevant for indexing right now, all under `https://vellvii.com/`.

### Entries to include

- `/` — homepage (priority 1.0, daily)
- `/shop` — pleasure collection (priority 0.9, weekly)
- `/products/vellvii-lux` — LUX product page (priority 1.0, daily)
- `/products/vellvii-dox` — DOX product page (priority 0.9, weekly)
- `/products/vellvii-pulse` — Pulse product page (priority 0.8, weekly)
- `/products/vellvii-g-vibe` — G-Vibe product page (priority 0.8, weekly)
- `/products/vellvii-vibe` — Vibe product page (priority 0.8, weekly)
- `/warranty` — warranty info (priority 0.5, monthly)
- `/privacy-policy` — privacy policy (priority 0.3, yearly)
- `/terms-of-service` — terms of service (priority 0.3, yearly)

### Entries to remove

- `/about`
- `/contact`
- `/Vellvii-Lux` (legacy prelaunch route)

### Other changes

- Update `<lastmod>` on all entries to today's date (2026-05-11).
- Keep the existing `image:image` blocks on the LUX entry intact.
- Leave `public/robots.txt` as-is (already references `https://vellvii.com/sitemap.xml`).

After deploy, the live sitemap will be available at `https://vellvii.com/sitemap.xml` for Google Search Console submission.