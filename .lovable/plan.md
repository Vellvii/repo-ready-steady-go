## Goal
Skip the age verification modal on `/pages/the-lux` only. All other routes (including `/`) keep the gate.

## Change
**File:** `src/components/AgeGateModal.tsx`

Update the `SKIP_PATH_RE` constant to also match `/pages/the-lux`:

```ts
const SKIP_PATH_RE = /^\/(privacy-policy|terms-of-service|warranty|contact|pages\/the-lux)(\/|$)/i;
```

That's the only change. The existing bypass logic already short-circuits before `setOpen(true)`, so no other code needs to move.

## Out of scope
- No changes to the gate on any other route
- No changes to storage keys, TTL, or styling
- No routing changes