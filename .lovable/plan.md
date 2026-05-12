## Issue

The product page "Notify me when available" panel (`src/components/products/NotifyMePanel.tsx`, used by `ProductDetail.tsx` for sold-out products) is currently UI-only. Submitting the form just flips a local `submitted` state — the email is **not** sent anywhere, so users are not added to Mailchimp.

The homepage / DOX landing already use the existing `mailchimp-subscribe` edge function, which accepts `{ email, source }` and adds the subscriber to the configured Mailchimp audience.

## Fix

Update `NotifyMePanel.tsx` to call the same `mailchimp-subscribe` edge function on submit, identically to the landing pages.

### Changes (single file: `src/components/products/NotifyMePanel.tsx`)

1. Import `supabase` from `@/integrations/supabase/client` and `useToast` from `@/hooks/use-toast`.
2. Make `handleSubmit` async; add a `loading` state and disable the button while submitting.
3. Validate email (basic regex / HTML required already in place).
4. Call:
   ```ts
   supabase.functions.invoke("mailchimp-subscribe", {
     body: { email, source: `notify_${productTitle}` }
   })
   ```
   Truncate `source` to keep within the function's 64-char cap.
5. On success → set `submitted = true` (keeps existing thank-you message).
6. On error → show a toast with a graceful message; do not flip `submitted`.
7. Remove the "UI-ONLY" / TODO comments now that it is wired.

No backend, schema, or other component changes. Cart, drawer, and other CTAs are untouched.

## QA

- Visit a sold-out product page (e.g. one currently rendering `NotifyMePanel`).
- Enter an email, submit → confirmation message appears.
- Verify the address shows up in the Mailchimp audience with `SOURCE = notify_<product>`.
- Submit invalid email → browser validation blocks; submit a duplicate → still resolves successfully (Mailchimp returns 200 for already-subscribed).
- Network failure path shows the error toast and lets the user retry.
