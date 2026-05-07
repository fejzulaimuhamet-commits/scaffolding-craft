## Warum vieles nicht editierbar ist

Zwei zusammenhängende Probleme:

### 1. Falsche Studio-URL für Stega-Encoding
In `src/lib/sanity.ts` zeigt die Studio-URL noch auf die alte Lovable-Adresse:
```ts
"https://scaffolding-craft.lovable.app/studio"  // ← falsch
```
Das Stega-Encoding bettet "klick zum editieren"-Links in die gerenderten Texte ein. Wenn die Studio-URL falsch ist, kann das Sanity-Dashboard die Klicks nicht zum richtigen Dokument zurückführen.

### 2. Hardcoded Fallbacks in 6 Sektionen
`Industries`, `Projects`, `ServiceArea`, `Services`, `Stats`, `Testimonials` haben noch Fallback-Konstanten im Code. Wenn Sanity leere Felder hat, rendern sie den Fallback **ohne Stega-Marker** → nicht klickbar im Presentation-Modus. Editierbar werden sie nur, wenn die Texte tatsächlich aus Sanity kommen.

## Fix

### Schritt 1 (mache ich): Studio-URL korrigieren
`src/lib/sanity.ts`: `STUDIO_URL` auf `https://wietek-geruestbau.sanity.studio` umstellen. Damit funktionieren ab dem nächsten Vercel-Deploy alle Stega-Klicks korrekt.

### Schritt 2 (mache ich): Fallbacks aus 6 Sektionen entfernen
- `Industries.tsx`
- `Projects.tsx`
- `ServiceArea.tsx`
- `Services.tsx`
- `Stats.tsx`
- `Testimonials.tsx`

Statt Fallback → wenn Sanity leer ist, Sektion ausblenden ODER leeren Editier-Slot rendern, sodass der Kunde den Inhalt im Studio anlegen muss. Damit ist alles, was sichtbar ist, auch editierbar.

### Schritt 3: Studio neu deployen (machst du)
Da das Studio-Bundle (`wietek-geruestbau.sanity.studio`) ein separater Build ist, musst du danach **einmal** im Projektordner laufen lassen:
```
npx sanity deploy
```
Damit nimmt das gehostete Studio die neue Config (Stega + korrekte previewUrl) auf. Vercel-Deploy alleine reicht nicht für das gehostete Studio.

## Was du danach hast
- ✅ Alle Texte/Bilder im Presentation-Modus klickbar → öffnen direkt das richtige Sanity-Dokument
- ✅ Keine "Geister-Texte" mehr, die im Code stehen aber nicht editierbar sind
- ✅ Header & Footer bleiben unangetastet (im Code, wie gewünscht)
