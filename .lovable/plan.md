## Root cause

The runtime error in the iframe is the actual problem:

```
TypeError: (0 , import_react11.useEffectEvent) is not a function
  at usePerspectiveSync (chunk-…:35011)
  at Overlays (chunk-…:35265)
```

`@sanity/visual-editing@5.3.4` (currently installed) uses React 19's `useEffectEvent` hook. This project runs **React 18.3.1**, so the hook does not exist → `Overlays` crashes immediately when mounted inside the iframe.

Because the overlay/comlink layer never finishes mounting, the Studio's Presentation tool cannot establish the postMessage channel to the site → it shows **"Unable to connect"**, and the **Edit toggle stays disabled** (the toggle only enables once a comlink connection is reported).

So this is not a CSP/X-Frame-Options issue — the iframe loads fine. It's a React-version mismatch in the visual-editing SDK.

## Fix

Downgrade `@sanity/visual-editing` to the last React 18-compatible major (v2.x). The public API we use (`enableVisualEditing()` with no args) is identical between v2 and v5.

```
@sanity/visual-editing: ^5.3.4  →  ^2.13.16
```

No code changes required in `src/main.tsx` — the dynamic `import("@sanity/visual-editing")` and `enableVisualEditing()` call work the same way.

## Steps

1. **Downgrade the package** in `package.json` and reinstall:
   - Replace `"@sanity/visual-editing": "^5.3.4"` with `"@sanity/visual-editing": "^2.13.16"`.
2. **Verify** in the running preview that the runtime error is gone (no more `useEffectEvent` trace in the console).
3. **Re-test in Sanity Studio**:
   - Open `https://wietek-geruestbau.sanity.studio` → Presentation.
   - The "Unable to connect" banner should disappear once the iframe loads and the overlay mounts.
   - The **Edit** toggle in the top-left of the Presentation pane should become clickable.
   - Clicking it triggers the preview-secret flow → our edge function `sanity-preview` validates and returns the read token → the page reloads in draft mode.

## Notes / out of scope

- `vercel.json` headers are not used by Lovable hosting (`scaffolding-craft.lovable.app` and `wietek-geruestbau.de` if pointed at Lovable). They were a no-op for the iframe issue. We can leave them in place for any future Vercel deploy; they don't hurt.
- If, after the downgrade, "Unable to connect" still appears on the **published** site only (not the Lovable preview), that would be a separate `X-Frame-Options` issue from Lovable's edge — we'd address it then. The runtime error fix is the prerequisite either way.
- The hard-coded text migration into Sanity schema fields (so click-to-edit actually has fields to edit) is still pending from the earlier plan and is not part of this fix.
