

# Replace "Join the Discussion" with "Notify Me When Available in USA" Email Capture

## Summary
Replace the current "Join the Discussion" button with a prominent "Notify Me When Available in USA" button that opens a modal with a simple email capture form.

---

## What You'll Get

**The Button:**
- Large, eye-catching button replacing "Join the Discussion"
- Text: "Notify Me When Available in USA"
- USA flag icon for visual clarity
- Same styling treatment as the Reserve button (luxury gradient)

**The Modal (when clicked):**
- Clean, simple dialog overlay
- Headline: "Get Notified for USA Launch"
- Just one field: Email address
- Submit button: "Notify Me"
- Success state after submission

---

## Design

```text
┌─────────────────────────────────────┐
│                                     │
│    [Reserve Your DOX] (gold)        │
│                                     │
│    [🇺🇸 Notify Me When              │
│        Available in USA]            │
│                                     │
└─────────────────────────────────────┘

        ↓ When clicked ↓

┌─────────────────────────────────────┐
│                 ✕                   │
│                                     │
│     Get Notified for USA Launch     │
│                                     │
│     Be first to know when DOX       │
│     becomes available in your area  │
│                                     │
│     ┌─────────────────────────┐     │
│     │ Enter your email        │     │
│     └─────────────────────────┘     │
│                                     │
│         [Notify Me]                 │
│                                     │
└─────────────────────────────────────┘
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/DoxVideoLanding.tsx` | Replace "Join Discussion" button with "Notify Me" button + modal |

---

## Technical Details

### Modal Implementation
- Use existing `Dialog` component from `@radix-ui/react-dialog`
- Simple email-only form with Zod validation
- For now, log email to console (can be connected to edge function later)
- Success state with confirmation message

### Button Appears In Two Places
1. **Below video** (main CTA area, lines 193-201)
2. **Inside video end screen** (can add there too, or keep simple)

### Validation
- Email required and must be valid format
- Max 255 characters
- Proper error messages

---

## Result
- Cleaner user experience focused on email capture for USA launch
- Reduces friction (no external link)
- Captures leads directly on the page
- Can later connect to mailing list edge function

