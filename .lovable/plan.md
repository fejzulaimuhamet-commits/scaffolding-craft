## Root cause

`src/sanity/config.ts` hardcodes the preview origin to `https://scaffolding-craft.lovable.app`. That hostname only resolves if the project has actually been **published** (Publish → Update). If the project is unpublished — or the publish was reverted — DNS for `scaffolding-craft.lovable.app` returns NXDOMAIN, which is exactly the "DNS error / not found" white screen you're seeing inside the Sanity Presentation iframe.

The always-available URL for this project is the preview deployment:

```
https://id-preview--e106eeef-8ae8-469b-b64d-dae180e6aade.lovable.app
```

That URL is live right now regardless of publish state, and it's what the Presentation tool should be pointing at for day-to-day editing.

## The exact correct URL to use

Inside `wietek-geruestbau.sanity.studio` → **Presentation** tool, the address bar must show:

```
https://id-preview--e106eeef-8ae8-469b-b64d-dae180e6aade.lovable.app/?sanity-preview-secret=…&sanity-preview-perspective=…
```

(The `?sanity-preview-…` params are appended automatically by Studio.)

## Fix plan

### 1. `src/sanity/config.ts` — switch preview origin to the preview deployment

Replace the hardcoded `PREVIEW_ORIGIN` with logic that:

- Prefers `import.meta.env.VITE_PREVIEW_ORIGIN` if set (escape hatch).
- Otherwise defaults to the stable Lovable preview URL:
  `https://id-preview--e106eeef-8ae8-469b-b64d-dae180e6aade.lovable.app`

Reasoning: the preview URL is always live; the published URL is not guaranteed to exist.

### 2. CORS for the new origin

The preview URL must be added as an allowed CORS origin in Sanity (project `wietek`). I'll do this automatically via the Sanity MCP `add_cors_origin` tool:

- `https://id-preview--e106eeef-8ae8-469b-b64d-dae180e6aade.lovable.app` (allow credentials: true)
- Keep the existing `https://wietek-geruestbau.sanity.studio` origin.
- Keep `https://scaffolding-craft.lovable.app` for when published.

### 3. Verify the `sanity-preview` Edge Function accepts the new referrer

The Edge Function that hands out the preview secret token must accept requests originating from the preview URL. I'll read the function and, if it filters by origin/referrer, add the preview host to the allowlist.

### 4. White-screen-on-refresh hardening

Even with the right URL, the refresh-inside-iframe path needs:

- `bootstrapPreview()` in `src/main.tsx` must not loop reload when the secret param is absent on a normal refresh (already guarded — re-verify after the origin change).
- `SanityVisualEditing` must keep rendering after refresh — confirm the lazy import resolves inside the iframe context (no top-level throw).

### 5. Step-by-step test instructions for you

After deploy:

1. Open `https://wietek-geruestbau.sanity.studio/presentation`.
2. The iframe loads `https://id-preview--e106eeef-8ae8-469b-b64d-dae180e6aade.lovable.app/?sanity-preview-secret=…`.
3. Toggle **Edit** in the top toolbar.
4. Click any **Service card title or description** (these are wired to Sanity with Stega). The right-hand inspector opens with the field focused.
5. Hardcoded sections (Hero, About, Stats, Process, Footer) will still NOT be clickable — they're not in Sanity yet. Migration of those sections is a separate follow-up.

## Out of scope (separate task)

Migrating Hero / About / Stats / Process / Footer content from hardcoded JSX into Sanity `homepage` / `about` / `settings` documents so they become click-to-edit too. Say the word and I'll plan that next.