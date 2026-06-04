## Problem
On /pages/the-lux, the $199 price appears three times in quick succession around the primary CTA button:
1. "\$199 — Discreet shipping included" (small text above the button)
2. "Pre-Order Now - \$199 - Ships End of June" (the CTA button itself)
3. "\$199 + \$14.20 shipping · Ships end of June" (small text below the button)

This repetition looks cluttered and undermines the premium feel.

## Change
In `src/pages/TheLuxLanding.tsx`, edit the **Primary CTA** section only:
- Remove the `<p>` line immediately above the CTA button that reads: "$199 — Discreet shipping included"
- Remove the `<p>` line immediately below the CTA button that reads: "$199 + $14.20 shipping · Ships end of June"
- Leave the CTA button label, link, and styling completely untouched.

No other elements, sections, or styles on the page will be changed.