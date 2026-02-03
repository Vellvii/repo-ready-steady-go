

# Plan: Apple-Inspired Home Page with DOX Focus

## Design Philosophy

Inspired by Apple's product marketing and LELO's luxury aesthetic, the new home page will:
- Lead with the **DOX as the hero** (flagship product) - like Apple leads with iPhone
- Use **full-bleed imagery** and **cinematic video**
- **Minimal text**, maximum visual impact
- Smooth scroll-driven reveals
- Showcase other products as part of the ecosystem (like Apple shows AirPods, Watch alongside iPhone)

---

## Page Structure (7 Sections)

```text
+-----------------------------------------------+
|  SECTION 1: HERO - DOX CINEMATIC              |
|  Full-screen video/image with minimal text    |
|  "The Art of 'O'" + "Explore DOX" CTA         |
+-----------------------------------------------+
|  SECTION 2: DOX FEATURES - SPLIT PANELS       |
|  3 key features in large image panels         |
|  Biometric Lock | Charging Dock | Design      |
+-----------------------------------------------+
|  SECTION 3: DOX VIDEO - 60 SECONDS            |
|  Embedded video with elegant play button      |
|  "Experience in 60 Seconds"                   |
+-----------------------------------------------+
|  SECTION 4: THE ECOSYSTEM                     |
|  "Designed to Work Together"                  |
|  Horizontal product carousel from Shopify     |
+-----------------------------------------------+
|  SECTION 5: BRAND PHILOSOPHY                  |
|  Centered manifesto text block                |
|  "Luxury. Privacy. Pleasure."                 |
+-----------------------------------------------+
|  SECTION 6: WHY VELLVII - TRUST               |
|  4 icon blocks with value propositions        |
+-----------------------------------------------+
|  SECTION 7: FINAL CTA                         |
|  "Shop the Collection" + email capture        |
+-----------------------------------------------+
|  FOOTER                                       |
+-----------------------------------------------+
```

---

## Section 1: DOX Hero (Full-Screen)

Apple-style hero with cinematic presence:

```text
+--------------------------------------------------+
|                                                  |
|              [NAVIGATION BAR]                    |
|                                                  |
|                                                  |
|    [Full-screen DOX image/video background]      |
|                                                  |
|                                                  |
|              V E L L V I I                       |
|                                                  |
|            "The Art of 'O'"                      |
|                                                  |
|           [Explore DOX]  [Shop]                  |
|                                                  |
|                  ↓                               |
+--------------------------------------------------+
```

**Technical:**
- Full viewport height (`min-h-screen`)
- Background: `/uploads/Dox1.jpg` or `/uploads/HEROPAGE.webm` with overlay
- Centered logo with glow effect
- Two CTAs: primary "Explore DOX" (scrolls to DOX section), secondary "Shop All"
- Smooth scroll indicator at bottom

---

## Section 2: DOX Feature Panels

Three large split panels showcasing key features:

```text
+--------------------------------------------------+
|  +----------------+  +----------------+           |
|  |                |  |  BIOMETRIC     |           |
|  |  [Fingerprint  |  |  SECURITY      |           |
|  |   video/image] |  |                |           |
|  |                |  |  Your privacy, |           |
|  |                |  |  sealed.       |           |
|  +----------------+  +----------------+           |
|                                                   |
|  +----------------+  +----------------+           |
|  |  INTEGRATED    |  |                |           |
|  |  CHARGING      |  |  [Charging     |           |
|  |                |  |   dock image]  |           |
|  |  Always ready. |  |                |           |
|  |  Always hidden.|  |                |           |
|  +----------------+  +----------------+           |
|                                                   |
|  +----------------+  +----------------+           |
|  |                |  |  VEGAN         |           |
|  |  [Interior     |  |  LEATHER       |           |
|  |   velvet image]|  |                |           |
|  |                |  |  Crafted with  |           |
|  |                |  |  intention.    |           |
|  +----------------+  +----------------+           |
+--------------------------------------------------+
```

**Technical:**
- Alternating image/text layout (image left, text right; then flip)
- Images: `/uploads/fingerprint-video.webm`, `/uploads/Red_Dox_charge_inside.png`, `/uploads/dox-interior-labeled.jpg`
- Large typography (Baskerville headings)
- ScrollReveal animations on each panel

---

## Section 3: DOX Video Section

Cinematic video section (reusing the 60-second explainer):

```text
+--------------------------------------------------+
|                                                  |
|         EXPERIENCE DOX IN 60 SECONDS             |
|                                                  |
|  +------------------------------------------+    |
|  |                                          |    |
|  |              [Video Player]              |    |
|  |                                          |    |
|  |              [Play Button]               |    |
|  |                                          |    |
|  +------------------------------------------+    |
|                                                  |
|               [Pre-Order DOX]                    |
|                                                  |
+--------------------------------------------------+
```

**Technical:**
- Reuse video logic from current `DoxLanding.tsx`
- Video source: `/uploads/The_Vellvii_Dox_1.webm`
- Large centered play button with glow effect
- CTA button below video

---

## Section 4: The Ecosystem (Product Carousel)

Horizontal scrolling product cards fetched from Shopify:

```text
+--------------------------------------------------+
|                                                  |
|         THE VELLVII COLLECTION                   |
|         Designed to Work Together                |
|                                                  |
|  +------+ +------+ +------+ +------+ +------+    |
|  |Pulse | |G-Vibe| |Evolve| | DOX  | | LUX  |    |
|  |$169  | |$169  | |$199  | |$299  | |$399  |    |
|  +------+ +------+ +------+ +------+ +------+    |
|               ← Scroll →                         |
|                                                  |
|              [Shop All Products]                 |
|                                                  |
+--------------------------------------------------+
```

**Technical:**
- Use `useShopifyProducts()` hook for dynamic data
- Horizontal scroll with `overflow-x-auto` and snap scrolling
- Each card shows: image, name, price
- Links to `/product/{handle}`
- "Shop All" button links to `/shop`

---

## Section 5: Brand Philosophy

Minimalist centered text block (Apple-style manifesto):

```text
+--------------------------------------------------+
|                                                  |
|                                                  |
|                    VELLVII                       |
|                                                  |
|          "We believe intimacy deserves          |
|           the same thoughtful design            |
|           as everything else in your life."     |
|                                                  |
|                                                  |
+--------------------------------------------------+
```

**Technical:**
- Centered text with generous whitespace
- Baskerville font for elegance
- Subtle fade-in animation on scroll
- Dark background with rose gold accents

---

## Section 6: Trust Section (Why Vellvii)

Four-column grid with icons and value props:

```text
+--------------------------------------------------+
|                                                  |
|              WHY CHOOSE VELLVII                  |
|                                                  |
|  +----------+  +----------+  +----------+        |
|  |   🔒     |  |   🔌     |  |   ✨     |        |
|  | Biometric|  | Wireless |  | Premium  |        |
|  | Security |  | Charging |  | Materials|        |
|  +----------+  +----------+  +----------+        |
|                                                  |
|  +----------+  +----------+                      |
|  |   📦     |  |   🎁     |                      |
|  | Discreet |  | 2-Year   |                      |
|  | Shipping |  | Warranty |                      |
|  +----------+  +----------+                      |
|                                                  |
+--------------------------------------------------+
```

**Technical:**
- CSS grid: 2 cols on mobile, 4 on desktop
- Lucide icons with rose gold color
- Short descriptions
- ScrollReveal stagger animation

---

## Section 7: Final CTA

Conversion section at the bottom:

```text
+--------------------------------------------------+
|                                                  |
|         READY TO EXPERIENCE LUXURY?              |
|                                                  |
|         [Shop the Collection]                    |
|                                                  |
|              or                                  |
|                                                  |
|         [Reserve Your DOX]  (Prelaunch)          |
|                                                  |
+--------------------------------------------------+
```

**Technical:**
- Two CTAs: "Shop Collection" (to /shop) and "Reserve DOX" (prelaunch.com)
- Background with subtle gradient

---

## Technical Implementation

### File Structure

Create modular components for maintainability:

```text
src/
├── pages/
│   └── DoxLanding.tsx          (completely rewritten)
└── components/
    └── home/
        ├── HomeHero.tsx        (new)
        ├── DoxFeatures.tsx     (new)
        ├── DoxVideo.tsx        (new)
        ├── ProductCarousel.tsx (new)
        ├── BrandPhilosophy.tsx (new)
        ├── TrustSection.tsx    (new)
        └── FinalCTA.tsx        (new)
```

### Dependencies Used
- `framer-motion` - Animations
- `@tanstack/react-query` - Product fetching
- Existing: `ScrollReveal`, animation components
- Existing: `useShopifyProducts` hook

### Key Design Tokens
- Background: `surface-dark-rich` (near-black)
- Primary accent: Rose gold (`primary`)
- Typography: Baskerville (headings), Montserrat (body)
- Shadows: `shadow-elegant`, `shadow-glow`

---

## Mobile Responsiveness

| Section | Mobile Behavior |
|---------|-----------------|
| Hero | Full screen, stacked CTAs |
| Features | Single column, image above text |
| Video | Full width, maintains aspect ratio |
| Products | Horizontal scroll with touch |
| Philosophy | Smaller text, more padding |
| Trust | 2x2 grid |
| CTA | Stacked buttons |

---

## Files to Modify/Create

1. **Create** `src/components/home/HomeHero.tsx`
2. **Create** `src/components/home/DoxFeatures.tsx`
3. **Create** `src/components/home/DoxVideo.tsx`
4. **Create** `src/components/home/ProductCarousel.tsx`
5. **Create** `src/components/home/BrandPhilosophy.tsx`
6. **Create** `src/components/home/TrustSection.tsx`
7. **Create** `src/components/home/FinalCTA.tsx`
8. **Rewrite** `src/pages/DoxLanding.tsx` - Compose all sections together

---

## Assets Used

All from existing `/uploads/`:
- Hero: `Dox1.jpg` or `HEROPAGE.webm`
- Fingerprint: `fingerprint-video.webm` or `Dox_fp_lock_video2.webm`
- Charging: `Red_Dox_charge_inside.png` or `White_charge_outside.png`
- Interior: `dox-interior-labeled.jpg`
- Video: `The_Vellvii_Dox_1.webm`
- Products: Fetched from Shopify API

---

## Summary

This redesign positions Vellvii as the "Apple of sex toys" by:
1. Leading with DOX as the flagship hero product
2. Using cinematic, full-bleed imagery
3. Minimal text, maximum visual impact
4. Showcasing the full ecosystem while keeping DOX central
5. Building trust through clear value propositions
6. Smooth, premium animations throughout

