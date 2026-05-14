# Reintroduce Confirmed DOX & Lux Specs

Confirmed specs (now approved):
- **DOX**: faux leather exterior, velvet interior, 3 internal USB-A ports powered by external USB-C input, VDS/DDS docking
- **Lux**: genuine leather exterior, velvet interior, 2 internal USB-A ports powered by external USB-C input, fingerprint lock, portable case

Forbidden (still): universal/wireless/fast/smart charging, app-connected, waterproof, medical-grade, body-safe certified, country of origin.

## Files to update (active/canonical only)

### 1. `src/lib/pdpContent.ts`
**DOX `productDetails`** → set:
- Exterior: "Faux leather with rose-gold accents"
- Interior: "Velvet-lined, with a movable velvet-lined tray for smaller items"
- Security: "Biometric fingerprint lock"
- Charging: "3 internal USB-A charging ports powered by an external USB-C input"
- Top Mounts: "VDS and DDS suction-base mounting stations"

**DOX `keyBenefits`** → revise one card to surface charging (e.g. replace generic "refined sex toy lock box" with "Integrated internal charging — 3 internal USB-A ports powered through a single external USB-C input").

**DOX `faqs`** → append two FAQs:
- "Does Vellvii DOX include charging ports?" → "Yes. Vellvii DOX includes 3 internal USB-A charging ports powered through an external USB-C input."
- "What materials are used on Vellvii DOX?" → "Vellvii DOX uses a faux leather exterior with a velvet interior."

**Lux `productDetails`** → set:
- Exterior: "Genuine leather"
- Interior: "Velvet-lined"
- Format: "Portable storage case, sized like a refined toiletries bag"
- Security: "Biometric fingerprint lock"
- Charging: "2 internal USB-A charging ports powered by an external USB-C input"

**Lux `keyBenefits`** → swap one card for "Integrated internal charging — 2 internal USB-A ports powered through a single external USB-C input".

**Lux `faqs`** → append:
- "Does Vellvii Lux include charging ports?" → "Yes. Vellvii Lux includes 2 internal USB-A charging ports powered through an external USB-C input."
- "What materials are used on Vellvii Lux?" → "Vellvii Lux uses a genuine leather exterior with a velvet interior."

### 2. `src/lib/productData.ts`
DOX `features`: `['Faux Leather Exterior', 'Biometric Lock Box', 'Internal USB-A Charging']`

### 3. `src/components/home/HomeFAQ.tsx`
- DOX material answer: restore "faux leather exterior with a velvet interior" phrasing.
- DOX charging answer: restore "3 internal USB-A charging ports powered by an external USB-C input" (replace the softened "storage and docking spaces" line).
- Lux material answer (if present): "genuine leather exterior with a velvet interior".
- Keep premium tone — facts in second sentences, not headlines.

### 4. `src/components/home/DoxFeatures.tsx`
View first; restore charging/material feature tiles where they were softened. Keep hero copy elegant.

### 5. `src/components/home/TrustSection.tsx`
View first; if a "Considered Materials" tile exists, may upgrade to "Faux leather and velvet" (DOX-leaning) but keep brand-voice; otherwise leave.

### 6. `src/components/products/TrustStrip.tsx`
Leave "Considered Materials" generic OR change to "Premium Materials". Avoid "body-safe".

### 7. `src/pages/DoxLanding.tsx`
SEO `productData.description` → "Vellvii DOX — biometric sex toy lock box and bedroom storage hub with faux leather exterior, velvet interior, VDS/DDS docking, and internal USB-A charging powered by external USB-C input." Remove the lingering "faux leather with velvet-lined interior" + "USB-C charging dock" phrasing and replace with confirmed wording. Keep `noindex`.

### 8. `src/pages/ProductDetail.tsx`
Update per-product SEO `description` for DOX and Lux to the approved meta:
- DOX: "Vellvii DOX is a refined biometric sex toy lock box and bedroom storage hub with a faux leather exterior, velvet interior, VDS/DDS docking, and internal USB-A charging ports."
- Lux: "Vellvii Lux is a portable fingerprint-lock sex toy storage case with a genuine leather exterior, velvet interior, and internal USB-A charging ports for travel-friendly privacy."
- Titles stay clean (no charging in title).

### 9. Guides (light touch, only where natural)
- `GuideBiometricLockBoxForSexToys.tsx`: add one factual line — DOX (faux leather + 3 USB-A via USB-C); Lux (genuine leather + 2 USB-A via USB-C).
- `GuideHowToCleanAndStoreSexToys.tsx`: mention internal USB-A charging once in storage-tip context.
- `GuideLuxVsDox.tsx`: ensure comparison table reflects exact materials + 3 vs 2 USB-A ports.
- No new claims beyond the confirmed list.

### 10. `public/llms.txt`
Update DOX and Lux bullet lines to include faux leather/velvet + 3 USB-A via USB-C, and genuine leather/velvet + 2 USB-A via USB-C. Keep the "no app-connected / no waterproof / no origin claims" guardrails.

## Out of scope
- Legacy/noindex prelaunch files (`PrelaunchDOX.tsx`, `prelaunch/*`, `LuxFAQSection.tsx`) — untouched.
- Homepage hero, PDP hero, brand storytelling — unchanged.
- No design/component structure changes.
- No sitemap, no new routes, no disavow.

## QA checklist
- DOX material/charging specs restored with exact wording.
- Lux material/charging specs restored with exact wording.
- No "universal/wireless/fast/smart charging" anywhere.
- No app-connected, waterproof, medical-grade, body-safe certified, or origin claims.
- Visible FAQ copy matches JSON-LD (auto via `pdpContent`).
- Hero copy untouched.
- Legacy noindex pages untouched.
- llms.txt updated, guardrails preserved.
