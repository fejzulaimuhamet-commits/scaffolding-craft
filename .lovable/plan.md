## Echte Ursache

Im Screenshot sieht man: das Studio navigiert den iframe direkt zur Supabase-Function-URL und zeigt deren JSON-Response (inkl. Sanity-Token im Klartext). Das ist:

1. **Der Grund für "Unable to connect"** — der iframe ist eine fremde Origin (supabase.co), die Webseite wird nie geladen, also kann die Comlink-Verbindung des Presentation-Tools nicht zustande kommen.
2. **Ein Token-Leak** — der private `SANITY_TOKEN` ist im DOM sichtbar.

`previewMode.enable` muss laut Sanity-Doku ein **same-origin Pfad** sein (z. B. `/`), nicht eine externe URL. Das Studio hängt dann selbst `?sanity-preview-secret=…` an und navigiert den iframe auf `https://scaffolding-craft.lovable.app/?sanity-preview-secret=…`. Unser `bootstrapPreview()` in `main.tsx` fängt diesen Query-Param ab, ruft die Edge-Function per `fetch` auf (Token bleibt im Speicher, nicht im DOM), speichert ihn in `sessionStorage` und lädt in Draft-Mode neu.

Das erklärt auch, warum es bei beiden Studios (`wietek-geruestbau.sanity.studio` UND `/studio` lokal) gleich kaputt war — die Config ist beide Male falsch gewesen.

## Fix

In `src/sanity/config.ts`:

```ts
previewMode: {
  enable: "/",   // statt der vollen Supabase-URL
},
```

Den jetzt unbenutzten `PREVIEW_SECRET_ENDPOINT` Konstanten entfernen.

## Danach

- Im eingebetteten Studio (`scaffolding-craft.lovable.app/studio`) ist die Änderung sofort live → Presentation öffnen → iframe lädt jetzt die echte Webseite, Edit-Toggle wird aktivierbar.
- Damit es auch unter `wietek-geruestbau.sanity.studio` funktioniert, einmalig **`npx sanity deploy`** im lokalen Sanity-Ordner ausführen — das pusht die geänderte Config zum gehosteten Studio.

Beides nutzt danach denselben Visual-Editing-Flow.
