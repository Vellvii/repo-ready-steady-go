# Vellvii Website — Working Agreement

## Branch workflow (standing rule — applies to every task in this repo)

- **Never commit or push directly to `main`.**
- All work happens on **`dev`**. When starting new work, branch off **`dev`** (never `main`),
  and merge it back into `dev` when it's ready.
- **`dev` is the live preview branch** — it is connected to Lovable, so anything merged into
  `dev` shows up automatically in the Lovable preview. **After merging anything into `dev`,
  tell Stefan it's ready to view in Lovable.**
- **`main` is production** (deployed by Vercel). Only touch `main` on the explicit command
  **"publish"**. When Stefan says "publish": merge `dev` into `main`. Do not merge to `main`
  for any other reason, and do not ask for confirmation each time — just do it.
- **After publishing**, confirm it's done and give Stefan the live site link:
  https://vellvii.com

## Build / preview notes

- Verification of visual work happens in the **Lovable preview** (the `dev` branch), not via a
  local build. The production build runs `vite build` + a prerender step (`scripts/prerender-seo.ts`)
  that needs Supabase environment variables, so a full local build is not generally runnable in a
  fresh container.

## Design direction

- The site follows a **quiet-luxury** visual language inspired by houses like Azimut,
  Rolls-Royce, Baxter, Timamoon and Tussenklip: restraint over ornament, muted champagne metal
  (not bright gold), warm bone text (not clinical white), neutral depth shadows with colored glow
  kept to a whisper, static brushed-metal type (no animated shimmer), generous negative space,
  and slow, confident motion.
- The design system lives in `src/index.css` (tokens, `.gradient-text`, `.text-light-*`,
  `.btn-premium`, dark-surface helpers) and `tailwind.config.ts` (gradients, shadows). Changing
  these propagates across all pages — prefer editing the system over one-off page styles.
