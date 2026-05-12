## Homepage Lux Copy Cleanup

Soften scarcity wording in `src/pages/DoxVideoLanding.tsx` Lux section so it does not imply Lux itself is forever-limited, while keeping the Nova first-run bonus accurate.

### Changes

**`src/pages/DoxVideoLanding.tsx`**

1. Line 239 — replace pill text:
   - From: `Limited Pre-Order - 1,500 Units`
   - To: `First-Run Offer`

2. Lines 264-265 — replace supporting paragraph:
   - From: "Ships first week of June. The first 1,500 orders may add a complimentary Vellvii Nova - our handheld suction piece - at checkout."
   - To: "Ships first week of June. The current Lux first-run offer includes a complimentary Vellvii Nova - our handheld suction piece. Future Lux runs are planned, but the Nova gift will not be included after this first run."

### QA grep

After the edit, re-run grep for: `Limited Pre-Order`, `1,500 Units`, `only 1,500`, `limited forever`, `USA launch`, `made in USA`, `assembled in USA`, `fulfilled in USA` across `src/` and `public/`.

Initial grep already found:
- `src/components/prelaunch/lux/LuxCountdown.tsx:73` — `USA Launch Badge` (inside legacy `/Vellvii-Lux` prelaunch page, which is noindex). Out of scope per the user's "homepage and canonical public surfaces" instruction, but will be flagged in the report for manual review.
- `src/components/lux/LuxPreOrderPanel.tsx` — contains `1,500`, `1500 units` and `Ships from the USA`. This file powers the canonical Lux PDP (not legacy). Will flag in the report and ask whether to soften in a follow-up; the user's current request is scoped to the homepage only.

### Out of scope (will not edit)

- Lux PDP panel (`LuxPreOrderPanel.tsx`) and legacy `/Vellvii-Lux` prelaunch components — flagged for follow-up.
- No origin/manufacturing changes elsewhere.
- No changes to Lux positioning (remains portable fingerprint-lock storage).
