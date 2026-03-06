

# Update Admin Notification Email

## What changes
The USA launch notification system currently sends admin alerts to `stefan@vellvii.com`. This will be updated to send to `hello@vellvii.com` instead.

## Technical detail
One line change in `supabase/functions/usa-launch-notify/index.ts` -- update the `to` field in the admin notification email from `stefan@vellvii.com` to `hello@vellvii.com`.

