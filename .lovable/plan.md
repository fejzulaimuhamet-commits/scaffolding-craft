## Ziel

Edit-Panel öffnet sich beim Klick im Studio, Refresh in der Presentation-View bleibt stabil, Overlays erscheinen.

## Ursachen (kurz)

1. `enableVisualEditing()` wurde global in `main.tsx` aufgerufen — ohne History-Adapter, außerhalb des React-Trees. Die Presentation-Comlink-Verbindung kann ohne Router-Sync keine Edit-Klicks an das Studio melden, und beim Iframe-Refresh entsteht eine Reload-Schleife.
2. `bootstrapPreview()` ruft bei jedem Aufruf mit `?sanity-preview-secret=…` neu `fetch + reload` auf — auch wenn schon ein Token im sessionStorage liegt → White Screen / Loop.
3. Stega-Marker werden in `Services.tsx` durch das `c?.title || s.title` Pattern verworfen, sobald der CMS-Wert leer ist (was zumindest die Robustheit beeinträchtigt — funktional ok, wird im selben Schritt sauber gemacht).

## Änderungen

### 1. NEU `src/components/SanityVisualEditing.tsx`

React-Komponente, die nur im Iframe rendert. Lazy-importiert `VisualEditing` aus `@sanity/visual-editing/react` und versorgt es mit einem React-Router-`HistoryAdapter` (subscribe → ref-callback, update → `useNavigate`). Bei Routenwechseln wird der Studio-Side via Callback informiert.

### 2. `src/App.tsx`

`<SanityVisualEditing />` direkt unter `<BrowserRouter>` einhängen — dadurch bekommt der Adapter `useNavigate`/`useLocation`.

### 3. `src/main.tsx`

`enableVisualEditing()` Aufruf entfernen (wird durch die React-Komponente ersetzt). `bootstrapPreview()`:
- Wenn schon Token in sessionStorage → nur Query-Params strippen, **kein** fetch, **kein** reload.
- Sonst wie bisher: validieren, Token speichern, Params strippen, **einmaliger** Reload.

### 4. `src/components/sections/Services.tsx`

Fallback-Logik so, dass Stega-Strings erhalten bleiben: nur fallbacken, wenn das CMS-Feld `undefined`/leer ist (statt `||`, das auch falsy Stega-Strings ersetzen würde — defensiv, da Stega-Strings idR truthy sind, aber sauberer).

## Hinweis Folgesession (kein Code in dieser Runde)

Die meisten Sektionen (Hero, About, Stats, Process, Footer) sind hardcodiert und daher **nicht** per Klick editierbar. Visual Editing greift nur dort, wo Texte direkt aus Sanity-Queries (mit aktivem Stega) gerendert werden. Aktuell sind das: Service-Karten-Titel/Beschreibung. Nächster Schritt wäre die Migration der weiteren Sektionen auf Sanity-Schemas, die wir bereits angelegt haben (`homepage`, `about`, `settings`).

## Erwartet danach

- Iframe-Refresh: stabil, kein White Screen, kein Loop.
- Klick auf Service-Karten-Text im Studio: rechtes Edit-Panel öffnet sich.
- Console: keine `enableVisualEditing`-Fehler mehr.
