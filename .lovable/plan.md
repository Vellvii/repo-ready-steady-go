## Goal
When a visitor submits the homepage waitlist form ("When the Next Batch Drops"), subscribe them directly to your Mailchimp audience.

## Approach
Replace the current `usa-launch-notify` call (used by the inline waitlist on `/`) with a new Mailchimp-only edge function. Existing internal logging/notification stays out of this flow per your choice.

## Steps

1. **Add Mailchimp secrets** (you'll be prompted to enter values):
   - `MAILCHIMP_API_KEY` — from Mailchimp → Account → Extras → API keys
   - `MAILCHIMP_AUDIENCE_ID` — from Audience → Settings → Audience name and defaults
   - `MAILCHIMP_SERVER_PREFIX` — the part after the dash in your API key (e.g. `us21`)

2. **Create edge function `mailchimp-subscribe`** (`supabase/functions/mailchimp-subscribe/index.ts`):
   - CORS handling, public (verify_jwt = false)
   - Zod validate `{ email, source? }`
   - PUT to `https://${prefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${md5(email.toLowerCase())}` with `{ email_address, status_if_new: "subscribed", merge_fields: { SOURCE } }` — this upserts so re-submitters don't error
   - Auth header: `Basic base64("anystring:" + MAILCHIMP_API_KEY)`
   - Return `{ ok, message }`; map Mailchimp errors (compliance, invalid) to friendly copy

3. **Wire up the inline waitlist** in `src/pages/DoxVideoLanding.tsx`:
   - Update `submitWaitlist()` to invoke `mailchimp-subscribe` instead of `usa-launch-notify`
   - Keep existing client-side Zod email validation, loading state, success state, and error display — no UI changes

## Out of scope
- The full mailing-list signup form (`join-mailing-list` edge function with name/phone/country) — left untouched
- Other waitlist forms on prelaunch/lux pages — left untouched (can be migrated later if you want)
- No Supabase logging or Stefan notification email for these inline signups (per your "Mailchimp only" choice)

## Technical notes
- Mailchimp's "subscriber hash" is the lowercase MD5 of the email; computed in Deno via `crypto.subtle` + hex encode.
- Using PUT (upsert) with `status_if_new: "subscribed"` avoids 400s on re-subscribes and respects already-unsubscribed users (won't resurrect them).
- If you later add double opt-in in Mailchimp's audience settings, swap to `status_if_new: "pending"` — one line change.
