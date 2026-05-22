
# Socials & Presence hub + Reddit growth plan

A dedicated `/socials` page is a good idea — one canonical link to share (packaging QR, email sigs, influencer briefs), it strengthens brand authority signals for Google/AI crawlers via `sameAs` JSON-LD, and gives r/Vellvii a permanent on-site entry point.

## Part 1 — Build a `/socials` page

Quiet-luxury "link in bio" style page, on-brand (dark, rose gold, Baskerville + Montserrat).

### Structure

1. **Header** — small Vellvii wordmark, one line of copy: "Follow the Art of 'O' — behind the design, launch updates, and the r/Vellvii community."

2. **Featured: r/Vellvii** — larger card above the grid for the launch period: short pitch, 2-3 reasons to join ("Behind-the-design previews", "Founder AMAs", "Early-access drops"), primary "Join r/Vellvii" button. No subscriber count.

3. **Social channels grid** — one card each, with icon, handle, one-sentence "what it's for", CTA:
   - **Instagram** — visual journal: product, materials, behind-the-scenes
   - **TikTok** — short films, design process, launch moments
   - **YouTube** — long-form: campaign film, founder story, product walk-throughs
   - **Reddit (r/Vellvii)** — community discussion, AMAs, early-access
   - **LinkedIn** — company, investor and press updates
   - **Pinterest** (if active) — mood, interiors, design references

4. **Where to find Vellvii** — second grid for external campaign / press / discovery surfaces (no counts, just logos + one-line context + link):
   - **Kickstarter** — original campaign page (kept live for provenance / press references)
   - **Prelaunch.com** — official Vellvii prelaunch listing
   - **GadgetFlow** — Vellvii product page
   - Room to add more later: Indiegogo InDemand (if used), Product Hunt, Yanko Design, Wallpaper*, Dezeen, any retailer / press page worth surfacing.
   - Data-driven from a single array so you can add / remove entries without code changes beyond editing one file.

5. **Newsletter capture** — reuse the working signup block from the landing + product pages (the same component, not the prelaunch one). Render it at the bottom of the page with consistent spacing.

6. **SEO** — title "Follow Vellvii - Socials & Community", meta description, canonical `https://vellvii.com/socials`, JSON-LD `Organization` block with `sameAs` array listing every URL on the page (the key signal for Google / AI surfaces to associate accounts with the brand).

### Wiring

- Route: `/socials` added to the router, linked from both footers and from the main header nav (subtle text link).
- Add `/socials` to `public/sitemap.xml` and the URL list in `scripts/prerender-seo.ts`.
- Single shared data source: `src/data/socials.ts` (channels) and `src/data/presence.ts` (external campaign / press surfaces). Both footers and the new page read from these — no duplication.

## Part 2 — Reddit growth playbook for r/Vellvii

Reddit rewards being a member of the community, not a brand broadcasting at it. Quick primer:

### Set the subreddit up (one-time)
- Banner + icon in brand style, short description, clear rules, post flair for: Announcements, AMA, Behind the Design, Owner Q&A, Feedback, Press.
- Pin two posts: (1) "Welcome - what r/Vellvii is" (2) current launch milestone / early-access info.
- Restrict self-promo from non-team accounts initially, enable wiki for FAQ.

### Posting cadence (sustainable: 2-3 posts/week)
- **Behind the Design** — close-ups of materials, hardware iterations, packaging mock-ups. Reddit loves process.
- **Founder updates** — short text posts: what shipped this week, what's next. Builds trust.
- **Polls** — colorways, accessory ideas, naming. Cheap engagement, gives users ownership.
- **AMAs** — one per launch milestone (Prelaunch, Stimulate Expo, USA launch). Cross-post to r/IAmA once the sub is established.
- **Press & milestones** — share Vellvii-owned wins (factual, no exaggerated claims).

### Seeding traffic (the hard part)
- Add r/Vellvii to: footer (done), `/socials` page, packaging QR landing, post-signup confirmation email, post-purchase thank-you.
- Influencer / affiliate briefs: ask them to mention the subreddit, not just Instagram.
- Do NOT spam other subreddits with links — Reddit auto-bans new brand domains fast. Participate as `u/Vellvii` genuinely in adjacent communities (r/DesignPorn, r/somethingimade, r/EDC for the DOX case angle, design / luxury subs), with the subreddit listed in the user profile.
- One "early supporter" perk: discount code or early-access slot for anyone subscribed before launch day. Announce on Instagram / TikTok / Prelaunch.com page.

### What NOT to do
- No bought upvotes, no alt accounts — Reddit detects and shadowbans.
- No reposting Instagram captions verbatim — Reddit downvotes on tone alone.
- No links in every comment — 9:1 value-to-promo ratio.

## Technical details

- New file: `src/pages/Socials.tsx` — React, uses existing UI primitives + framer-motion for entry animations consistent with the site.
- New file: `src/data/socials.ts` — exports `{ id, label, handle, href, blurb, Icon }[]` for owned social channels.
- New file: `src/data/presence.ts` — exports `{ id, label, href, blurb, logo }[]` for external surfaces (Kickstarter, Prelaunch.com, GadgetFlow, future press).
- Refactor: `PrelaunchFooter.tsx` and `LuxFooter.tsx` import from `src/data/socials.ts` instead of duplicating arrays + inline `RedditIcon`.
- Move duplicated inline social SVGs (incl. `RedditIcon`) into `src/components/icons/social/`.
- Newsletter block: identify the signup component currently rendered on the landing and product pages (the working one) and reuse it on `/socials`. Do not use the prelaunch signup variant.
- Router: add `<Route path="/socials" element={<Socials />} />` in the main router.
- SEO: page-level `<SEO>` with title / description / canonical + JSON-LD `Organization` including `sameAs` array of every URL on the page.
- Sitemap + prerender: add `/socials` to `public/sitemap.xml` and `scripts/prerender-seo.ts`.
- Nav: small "Socials" link in the header secondary nav / menu drawer.
- No member / subscriber / follower counts anywhere on this page.
- No backend, no Shopify, no schema changes.

## Out of scope

- Running the Reddit account, writing AMA copy, scheduling posts — operational, not code. Happy to draft post templates separately.
- A Discord / forum / community platform. Reddit is the chosen community surface.
