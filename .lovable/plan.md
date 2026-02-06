

# Warranty Page for Vellvii DOX & LUX

## Overview
Create a dedicated warranty page that clearly communicates the **lifetime warranty** coverage for the DOX and LUX storage products, distinguishing them from the standard warranty on the three toy products. The page will also include a clear **no refunds policy**.

---

## Page Structure

### Header Section
- Vellvii logo (clickable, links to home)
- Page title: "Lifetime Warranty"
- Subtitle: "Our Promise of Lasting Quality"

### Section 1: Lifetime Warranty Products
Cover the **DOX** and **LUX** with clear messaging:

**What's Covered:**
- Hinge mechanism failure
- Fingerprint lock malfunction
- Leather fading or discoloration under normal use
- Charging dock issues
- Velvet lining defects
- Structural integrity issues

**What's NOT Covered:**
- Intentional damage or misuse
- Physical trauma (drops, crushing, forcing open)
- Damage from improper cleaning products
- Normal wear and tear from excessive use
- Modifications or unauthorized repairs
- Water damage (submerging the product)

### Section 2: Toy Product Warranty
Brief mention that the Pulse, Vibe, and G-Vibe have a **standard 1-year warranty** covering manufacturing defects only.

### Section 3: No Refunds Policy
Clear, prominent section stating:
- **All sales are final** - no refunds under any circumstances
- Due to the intimate nature of products, returns are not accepted
- Warranty claims result in **repair or replacement only**, not refunds
- Defective items will be replaced at Vellvii's discretion

### Section 4: How to File a Warranty Claim
Step-by-step process:
1. Email hello@vellvii.com with order number and issue description
2. Include photos of the defect
3. Team reviews within 48 hours
4. Receive repair, replacement, or further instructions

### Footer
Standard PrelaunchFooter component

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/Warranty.tsx` | Create | New warranty page component |
| `src/App.tsx` | Modify | Add route `/warranty` |
| `src/components/prelaunch/PrelaunchFooter.tsx` | Modify | Add "Warranty" link to footer navigation |

---

## Design Notes
- Follow existing legal page styling (PrivacyPolicy/TermsOfService pattern)
- Dark background with prose content
- Gold/primary accent for headers
- No Refunds section will have slightly stronger visual emphasis (subtle border or background)
- Mobile-responsive layout
- SEO component with proper meta tags

---

## Technical Details

**New Route:**
```text
/warranty -> Warranty.tsx
```

**SEO Meta:**
- Title: "Lifetime Warranty | Vellvii"
- Description: "Vellvii offers a lifetime warranty on DOX and LUX luxury storage products. All sales are final with no refunds. Coverage includes manufacturing defects."
- Canonical: `/warranty`

**Footer Link Addition:**
Add "Warranty" between "Privacy Policy" and "Terms of Service" in the footer navigation.

