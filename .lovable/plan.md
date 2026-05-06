## Root Cause (verifiziert per curl)

Die hartkodierte Preview-Origin `https://id-preview--e106eeef-…lovable.app` zeigt **nicht** auf unsere App — dort läuft ein **fremdes Next.js-Projekt** (curl bestätigt: `<html data-dpl-id="…"><link href="/_next/static/…">`). Deshalb:
- Im Iframe: "Unable to connect" — die fremde Seite hat keinen Sanity-Preview-Bootstrap
- Klick auf "Continue anyway" → man landet auf einer fremden Webseite

`https://scaffolding-craft.lovable.app/` liefert dagegen unsere App (curl: `<title>Wietek Gerüstbau Hamburg</title>`).

Mein vorheriger Plan hat die `scaffolding-craft.lovable.app`-DNS für „nicht garantiert vorhanden" gehalten — das war falsch. Die URL existiert, weil das Projekt published ist.

## Fix (1 Datei)

**`src/sanity/config.ts`** — `PREVIEW_ORIGIN` zurück auf `https://scaffolding-craft.lovable.app`. `allowOrigins` enthält die URL bereits.

Danach: einmal Publish → im Studio (`scaffolding-craft.lovable.app/studio/presentation`) lädt der Iframe die richtige App und Click-to-Edit funktioniert.