# Correct DOX & Lux Product Descriptions Sitewide

## Source of truth (per your message + answers)

**Vellvii DOX**
- Faux leather exterior with rose gold accents
- Velvet-lined interior
- Movable, velvet-lined internal tray for small items (bullet/rose toys, condoms, lubes) - can be repositioned or removed
- Biometric fingerprint lock - up to 10 fingerprints
- USB-C input port on exterior (opposite side from the lock); feeds 3 internal USB-A ports for charging toys securely inside
- VDS and DDS are external suction-base mounting stations that sit atop the DOX (not internal shaped inserts), turning the DOX into a mount for suction-cup toys

**Vellvii Lux**
- Soft portable bag, roughly the size of a refined toiletries bag
- Genuine leather exterior, velvet interior
- Same biometric fingerprint lock system
- USB-C input on exterior; 2 internal USB-A ports for charging toys

## Files to update

**Guides**
- `src/pages/guides/GuideProductsForCouples.tsx` (line ~73, the line you flagged + line ~94 "DOX-compatible through the VDS insert")
- `src/pages/guides/GuideLuxVsDox.tsx` (lines ~70, 84, 102 - replace "shaped inserts/docking inserts" wording; expand Lux description to include leather/velvet/charging/biometric)
- `src/pages/guides/GuidePortableVsBedroomStorage.tsx` (lines ~65, 96 - same replacements; add accurate materials & charging detail)
- `src/pages/guides/GuideDiscreetStorage.tsx` (line ~87 - replace "shaped inserts that keep compatible pieces organized")
- `src/pages/guides/GuideDoxDockingSystem.tsx` (lines ~32, 39, 52, 58 - rewrite VDS/DDS as top-mounted suction stations; update intro & alt text)

**Collections / shared content**
- `src/lib/pdpContent.ts`
  - `DOCKING_INFO` (lines 73-87): rewrite VDS/DDS copy as external suction mounting stations on top of the DOX
  - DOX product details: add faux leather exterior, velvet interior + tray, fingerprint lock (up to 10 prints), USB-C in + 3 USB-A internal
  - Lux product details (lines ~177-195): genuine leather exterior, velvet interior, USB-C in + 2 USB-A internal
  - DOX-compatibility spec rows (lines 212/224/236): change "Fits the Vellvii DOX through the VDS insert" -> language about being compatible with the VDS suction mount atop the DOX
- `src/pages/CollectionDoxCompatible.tsx` (lines ~21, 26, 150, 176): VDS/DDS are top-mounted suction stations, not shaped interior inserts
- `src/pages/CollectionPleasureCollection.tsx` (line 47): update "DOX-compatible through the VDS docking insert" wording
- `src/pages/CollectionBedroomStorage.tsx` (line 46): same
- `src/components/products/DoxCompatibleSection.tsx` (line 19): "Designed to fit the Vellvii DOX through the VDS insert" -> compatible with the VDS suction mount on top of the DOX
- `src/components/products/DockingSystemSection.tsx`: copy reads from `DOCKING_INFO`, no direct edits needed once pdpContent is updated
- `src/components/home/DoxFeatures.tsx`: change "VEGAN LEATHER" panel to "FAUX LEATHER" with corrected description (faux leather exterior, velvet interior, movable tray)

**Prelaunch / SEO**
- `src/pages/PrelaunchDOX.tsx` (lines 15-17, 26, 31): replace "vegan leather" with "faux leather"; update FAQ about charging to reflect USB-C input + 3 internal USB-A ports (not "embedded USB-C charging dock with cradle slots"); fingerprint FAQ note up to 10 prints
- `public/llms.txt` (lines 8-10): rephrase "DOX-compatible through the VDS insert" to top-mounted VDS suction station wording

**Memory updates**
- Update `mem://content/product-colors` or create new `mem://products/dox-product-specifications` capturing the corrected DOX spec (faux leather + rose gold, velvet interior, movable velvet tray, biometric up to 10 prints, USB-C in -> 3x USB-A inside, VDS/DDS = top-mounted suction stations)
- Add charging + materials facts to `mem://products/lux-product-specifications` (USB-C in, 2x USB-A inside, genuine leather, velvet)
- Update `mem://index.md` Core to note: "VDS/DDS are external suction-base mounting stations atop the DOX, never internal shaped inserts."

## Editorial rules applied throughout

- "Faux leather" for DOX, "genuine leather" for Lux - never confuse the two
- Drop all "shaped inserts" / "shaped docking inserts" / "fits through the VDS insert" phrasing
- VDS/DDS framed as "suction-base mounting stations that sit atop the DOX, letting suction-cup pieces be mounted to the DOX itself"
- DOX interior described as "velvet-lined with a movable, velvet-lined tray for smaller pieces (bullet, rose, condoms, lubricants)"
- Charging described factually: USB-C exterior input on the opposite side of the lock; powers internal USB-A ports (3 in DOX, 2 in Lux)
- Hyphens, not em dashes; no marketing exaggeration

## Out of scope

- No layout, route, or component-structure changes
- No new images
- No pricing or warranty edits
