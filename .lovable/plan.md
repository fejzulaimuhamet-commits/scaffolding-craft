## Echte Root Cause (3. Versuch — diesmal mit Beweis)

Die Live-Site läuft, lädt Sanity-Daten korrekt (Console: `[Sanity] ✅ Verbindung OK – Dokumente: 3`), Headers sind perfekt (kein X-Frame-Options, CSP erlaubt `*.sanity.studio`).

**Das eigentliche Problem:** In `src/sanity/config.ts` zeigt die `presentationTool`-Konfiguration auf die **falsche Origin**:

```ts
const PREVIEW_ORIGIN = "https://scaffolding-craft.lovable.app";  // ← falsch
```

Das Studio versucht den Presentation-Handshake mit Lovable zu machen, nicht mit Vercel/Strato. Auch die URL `wietek-geruestbau.de` fehlt komplett in `allowOrigins`. Deshalb: "Unable to connect", obwohl alles andere funktioniert.

## Fix (1 Datei: `src/sanity/config.ts`)

```ts
const PREVIEW_ORIGIN =
  (import.meta.env.VITE_PREVIEW_ORIGIN as string | undefined) ||
  "https://www.wietek-geruestbau.de";

// allowOrigins erweitern um:
//   https://www.wietek-geruestbau.de
//   https://wietek-geruestbau.de
```

Lovable/Vercel-URLs bleiben in `allowOrigins` für Dev/Preview, aber Default-Origin wird die echte Live-Domain.

## Was danach passiert
1. Lovable pusht zu GitHub
2. Vercel deployt das neue Studio-Bundle (das Studio läuft auch auf der Live-Site unter `/studio`, falls genutzt — Hauptsache der Code im Studio-Bundle wird neu deployt)
3. **Wichtig:** Du musst danach **einmal** `npx sanity deploy` ausführen, damit `wietek-geruestbau.sanity.studio` die neue Config bekommt — denn das gehostete Studio nutzt das gebuildete Studio-Bundle, nicht das von Vercel
4. Refresh im Studio → Presentation funktioniert
