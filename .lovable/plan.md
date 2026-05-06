## Fix

In `src/sanity/config.ts` den `PREVIEW_ORIGIN` fest auf die funktionierende Lovable-URL setzen, statt aus `window.location.origin` / `VITE_SITE_URL` zu lesen (was zur nicht-erreichbaren Custom-Domain führte).

```ts
const PREVIEW_ORIGIN = "https://scaffolding-craft.lovable.app";
```

## Nach dem Deploy (du, einmalig)

Damit das Sanity Studio (`https://wietek-geruestbau.sanity.studio`) die neue Config bekommt, muss es neu deployed werden:

```bash
npx sanity deploy
```

(im lokalen Sanity-Projektordner ausführen)

Danach im Studio → Presentation neu laden → die Preview-URL oben sollte jetzt `https://scaffolding-craft.lovable.app/` zeigen, der Iframe lädt, "Unable to connect" verschwindet, Edit-Toggle wird aktivierbar.

## Sobald die Custom-Domain `wietek-geruestbau.de` korrekt auf Lovable zeigt

Können wir `PREVIEW_ORIGIN` zurück auf die Custom-Domain stellen — aber erst dann, wenn sie im Browser direkt aufrufbar ist.
