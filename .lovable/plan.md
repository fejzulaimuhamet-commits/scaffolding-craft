## Empfehlung: Sanity behalten + Visual Editing aktivieren

Sanity ist bereits eingerichtet, alle Inhalte fließen schon über `useSanity`-Hooks. Sanity bietet **Visual Editing** (offizielles Feature seit 2024): Der Kunde sieht die echte Live-Website mit kleinen Stift-Symbolen über jedem Text/Bild — Klick → Sidebar zum Bearbeiten → Speichern → Live-Update. Kein zweites CMS, keine AI, keine Lovable-Oberfläche.

Alternativen wie Storyblok, Builder.io oder TinaCMS würden einen kompletten Umbau bedeuten und bieten dasselbe Ergebnis. Bei Sanity bleiben heißt: ~1 Tag Arbeit statt mehrerer Tage Migration.

### Was der Kunde am Ende sieht

1. Login auf `https://wietek-geruestbau.sanity.studio` (eigene URL, kein Lovable-Branding, kein AI-Chat).
2. Linke Hälfte: das **Presentation-Tool** mit der echten Website. Rechte Hälfte: das Bearbeitungsformular.
3. Hover über jeden Text/jedes Bild → Stift-Symbol → Klick → editieren → Speichern → Änderung sofort sichtbar.
4. Kein Code, keine technischen Begriffe, eine einzige Login-Seite.

### Umsetzungs-Schritte

**1. Sanity Studio deployen** (einmalig, lokal vom Kunden-unabhängigen Rechner)
- `npx sanity deploy` mit Hostname `wietek-geruestbau` → erzeugt `https://wietek-geruestbau.sanity.studio`.
- In `sanity.io/manage` → Project `d683vf4r` → API → CORS Origins: Live-Domain + Studio-Domain mit "Allow credentials" hinzufügen.

**2. Visual Editing im Frontend aktivieren**
- Pakete hinzufügen: `@sanity/visual-editing`, `@sanity/preview-url-secret`.
- `enableVisualEditing()` einmalig in `src/main.tsx` aufrufen — rendert die Edit-Overlays nur, wenn die Seite aus dem Studio heraus geöffnet wird, sonst unsichtbar für normale Besucher.
- In allen GROQ-Queries (`src/lib/queries.ts`) **Source Maps** aktivieren: `client.fetch(query, params, { perspective: 'previewDrafts', stega: true })` für die Studio-Vorschau, normaler Modus für Besucher.
- Eine `data-sanity` Markierung ist nicht nötig — Sanity nutzt unsichtbare Stega-Encoding-Marker im Text, dadurch wird **jeder Text auf jeder bestehenden Seite automatisch klickbar**.

**3. Presentation-Tool im Studio konfigurieren**
- In `src/sanity/config.ts` das `presentationTool` aus `sanity/presentation` zu den Plugins hinzufügen mit `previewUrl: { origin: 'https://scaffolding-craft.lovable.app', preview: '/' }`.
- Dokument-Locations definieren (welche Sanity-Dokumente zu welchen URLs gehören), damit das Studio beim Bearbeiten eines Service automatisch zur passenden Seite navigiert.

**4. Preview-Token für Drafts** (damit der Kunde unveröffentlichte Änderungen sieht)
- In Sanity Manage einen Read-Token erzeugen, in Lovable Cloud als Secret `SANITY_PREVIEW_TOKEN` ablegen.
- Kleine Edge Function `/api/preview` validiert den Token via `@sanity/preview-url-secret` und schaltet im Browser den Draft-Modus (Cookie) frei.

**5. Texte/Bilder, die noch hardgecodet sind, ins CMS übertragen**
- Aktuell sind viele Sektionen (Hero-Texte einzelner Services, About-Sektion, Footer) teils statisch im Code. Audit: in jedem Page/Section-Component prüfen, ob Texte aus `useSanity`-Hook oder aus String-Literalen kommen.
- Für hardgecodete Inhalte: passendes Schema-Feld ergänzen (z.B. `homepage.servicesIntro`) und im Component einsetzen.
- Nur was im CMS liegt, ist klickbar editierbar.

**6. Kunden-Onboarding**
- In Sanity Manage einen User mit Rolle "Editor" einladen (E-Mail des Kunden). Editor-Rolle = darf bearbeiten + veröffentlichen, sieht aber keine API-Schlüssel/Schema-Settings.
- Kurze Anleitung (1 Seite): Login-URL, "Klick auf Text → bearbeiten → Publish-Button".

### Technische Details

- **Kein Lovable-Branding sichtbar:** Studio läuft auf `*.sanity.studio` (eigene Subdomain). Die Live-Site, die der Kunde im Presentation-Tool sieht, ist die published Lovable-URL bzw. eine Custom Domain — das Lovable-Badge lässt sich über `publish_settings` ausblenden (Pro-Plan nötig) oder per Custom Domain umgehen.
- **Kein AI-Chat:** Sanity Studio hat keinen AI-Chat. Lovable wird vom Kunden nie geöffnet.
- **Sicherheit:** Preview-Token-Validierung verhindert, dass Externe in den Draft-Modus gelangen.
- **Bestehender `/studio`-Route** in der App kann bleiben oder entfernt werden — die deployte Studio-URL ist die saubere Lösung für den Kunden.

### Aufwand
~4–8 Stunden je nachdem wie viel Inhalt aktuell hardgecodet ist und ins Schema überführt werden muss.
