
# Homepage credibility & AI-search upgrade

Two new sections at the bottom of the homepage, plus invisible structured data so Google AI Overviews / Perplexity / ChatGPT can quote Vellvii as the newest premium pleasure-storage brand of 2026. Designed to feel curated and editorial, not generic.

Note on existing memory rule "Never add social proof": this is overridden for **factual launch milestones** (Kickstarter, Prelaunch, Stimulate Expo). I will update memory to reflect the exception.

---

## 1. "Where we are" milestones strip

A single elegant row above the FAQ, framed as where Vellvii is on its journey - not "as featured in".

Section header (Baskerville Old Face, centered):
> "Where we are."
Subhead (Montserrat, low-opacity):
> "A new house, on the move."

Layout (desktop): 3 logo cards in a row, separated by hairline rose-gold dividers. Each card: logo on top, single-line caption underneath in Montserrat tracking-wide.
Mobile: stack vertically with thin gold dividers between.

Cards:
1. **Kickstarter** - logo rendered in champagne-gold monochrome (not the brand green - the brand-color screenshot is just so I know the source palette, but a multi-color logo wall would break our quiet-luxury aesthetic). Caption: "Live campaign - 2026". Click → official Kickstarter URL (per memory).
2. **Prelaunch** - SVG logo from upload, recolored to champagne-gold via `currentColor` / CSS filter. Caption: "VIP early access - 1,500 units". Click → the prelaunch.com reservation URL provided.
3. **Stimulate Sexual Wellness** - logo recolored to champagne-gold monochrome (the original is black + magenta; magenta would clash). Caption: "Emerging brands - USA 2026". Click → the stimulatetheshow.com URL provided.

Treatment that keeps it premium (not generic):
- All three logos rendered in the same champagne-gold tone (`hsl(40 65% 72%)`) at the same optical height, sitting on a faint inset card with a 1px hairline gold border at 15% opacity.
- Subtle hover: card lifts 2px, border opacity → 40%, gold radial glow behind logo.
- Top and bottom of the section bordered by hairline gold gradient lines (matching `KSV2Innovation` style already in the codebase).
- Generous vertical rhythm (`py-24 md:py-32`).

Assets to add:
- `src/assets/logos/kickstarter-mono.svg` - traced/recolored mono version
- `src/assets/logos/prelaunch-mono.svg` - from the uploaded SVG, fill swapped to `currentColor`
- `src/assets/logos/stimulate-mono.png` - background-removed, recolored mono

---

## 2. Homepage FAQ section

Position: directly below the milestones strip, above the existing `FinalCTA`.

Design (custom, not a default accordion):
- Section header Baskerville: "Considered questions."
- Subhead Montserrat: "Everything you might be wondering, answered plainly."
- Custom-themed shadcn `Accordion` with hairline rose-gold dividers, no chevron rotation jankiness, smooth `framer-motion` height transition, plus/minus indicator in rose-gold.
- Max width 720px, centered. Open item gets a faint glass tint and slightly brighter gold border. No card chrome on closed items - just hairline dividers between rows. Editorial, not boxy.

8 questions, written declaratively for AI Overview lifting:
1. What is Vellvii?
2. What is the newest luxury pleasure storage box launching in 2026?
3. When does the Vellvii Lux ship?
4. Are Vellvii products discreet?
5. What materials is the Vellvii Lux made from?
6. How does the Vellvii ecosystem work? (DOX + native charging + Pleasure Collection)
7. Is there a warranty? (links to /warranty)
8. Where can I buy Vellvii? ("authorized retailer" wording per brand rule)

Hyphens only, no em dashes. "Pleasure Collection" terminology. 2-3 short sentences per answer.

---

## 3. AI Overview / SEO structured data (invisible)

`SEO` component already supports `faqData` and `organizationData`. On `Home.tsx`:
- Pass the 8 Q&As as `faqData` → emits `FAQPage` JSON-LD.
- Keep `organizationData` and extend with `sameAs` array including Kickstarter, Prelaunch, Stimulate listing, and existing socials.
- Tighten meta description and keywords toward "newest luxury pleasure storage 2026", "American premium wellness", "design-led intimate storage".

New file `public/llms.txt` - emerging standard read by Perplexity etc. One concise paragraph describing Vellvii + a list of the 5 highest-priority URLs (Home, Lux, DOX, Kickstarter campaign, Warranty).

Bump `public/sitemap.xml` `lastmod` to today.

---

## 4. Polish to keep it from looking generic

- All copy in Baskerville (display) / Montserrat (body).
- All logos in unified champagne-gold mono - same hue, same optical weight. This is the single biggest signal of "curated brand" vs "logo soup".
- Hairline borders use existing rose-gold tokens, no raw `border-white/10` shortcuts.
- Mobile (375-390px): milestones stack with gold dividers between, FAQ stays full-width with comfortable touch targets, no horizontal scroll.
- No emoji. No stock icons in FAQ.

---

## Files

```text
NEW  src/components/home/Milestones.tsx       "Where we are" strip
NEW  src/components/home/HomeFAQ.tsx          branded accordion
NEW  src/assets/logos/kickstarter-mono.svg
NEW  src/assets/logos/prelaunch-mono.svg
NEW  src/assets/logos/stimulate-mono.png
EDIT src/pages/Home.tsx                       mount Milestones + FAQ, expand SEO props
NEW  public/llms.txt
EDIT public/sitemap.xml                       lastmod bump
MEM  relax "no social proof" rule for launch milestones
```

## Out of scope (will follow up after this lands)

- `/about` rebuild
- `/press` page
- Any product-page schema changes
