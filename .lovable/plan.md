## Ziel

Auf `scaffolding-craft.lovable.app/studio` sollen möglichst viele Texte klickbar/editierbar werden. Der Stega-Mechanismus ist bereits aktiv — ihm fehlen nur **Inhalte aus Sanity** und **erweiterte Schemas** für die Sektionen, die heute hardcodiert sind.

## Root Cause

1. **Keine Sanity-Inhalte vorhanden:** Hero/About/Settings haben Schemas, aber keine Dokumente → `homepage?.heroTitle` ist `undefined` → Code fällt auf hartkodierte JSX-Strings → diese tragen **keine** Stega-Marker → Klick = keine Edit-Sidebar.
2. **Schemas zu schmal:** Hero hat z.B. nur `heroTitle/heroSubtitle/heroImage/3 counter` — aber kein USP-Array, keine CTA-Texte, kein Badge. Process/Stats/Footer/Industries sind komplett ohne Schema.
3. **Fallback-Pattern verliert Stega:** Selbst mit Daten verlieren Konstrukte wie `{heroTitle ?? <>fallback</>}` die Stega-Encoding nicht — aber `homepage?.heroTitle ?? "..."` ist OK. Trotzdem: Wir entfernen den Fallback oder geben ein leeres `""` raus, damit ein leeres Feld in Sanity sichtbar wird (= Edit-Anreiz).

## Umsetzung

### 1. Schemas erweitern

**`src/sanity/schemas/homepage.ts`** — zusätzliche Felder:
- `heroBadge` (string, z.B. "5,0 ★ Google · Familiengeführt seit 2014")
- `heroUsps` (array of string, 4 Items)
- `heroCtaPrimary` (string), `heroCtaSecondary` (string)
- `statsItems` (array of `{ value: string, label: string }`)
- `processSteps` (array of `{ title, description }`)

**`src/sanity/schemas/settings.ts`** — zusätzliche Felder:
- `footerTagline` (string)
- `footerLegal` (string)
- `serviceArea` (string)

**`src/sanity/schemas/about.ts`** — zusätzliche Felder:
- `headline` (string), `intro` (text)
- `stats` (array of `{ value, label }`)

### 2. Initiale Inhalte seeden

Schreibe ein einmaliges Node-Skript `scripts/seed-sanity.ts`, das per `@sanity/client` mit dem vorhandenen `SANITY_TOKEN` (Server-Secret) einen `homepage`-Singleton, `about`-Singleton und `settings`-Singleton anlegt — befüllt mit den **aktuellen hardcoded Texten** aus den Komponenten. Lauf-Befehl: `bun run scripts/seed-sanity.ts`. Das Skript ist idempotent (`createOrReplace` mit festen `_id`s wie `homepage-singleton`).

### 3. Komponenten auf Sanity umstellen

Für jede Sektion mit neuen Feldern:
- **`Hero.tsx`**: Badge/USPs/CTAs/H1/Subline aus `homepage`. Kein Fallback-JSX mehr — nur leerer String, falls Feld leer (so erkennt der Redakteur die Lücke).
- **`Stats.tsx`**: `statsItems` mappen.
- **`Process.tsx`**: `processSteps` mappen.
- **`About.tsx`**: `headline/intro/stats` aus `about`.
- **`Footer.tsx`**: `footerTagline/footerLegal` aus `settings`, `phone/email/address` schon vorhanden.

Wichtig: Texte direkt rendern (`{data.heroTitle}`), **nicht** in Template-Strings stecken (`` `Foo: ${data.x}` ``) — das würde Stega zerstören.

### 4. Stega studioUrl korrigieren

In `src/lib/sanity.ts`:
```ts
const STUDIO_URL = "https://scaffolding-craft.lovable.app/studio";
```
(statt `wietek-geruestbau.sanity.studio` — sonst öffnen Edit-Klicks das falsche Studio.) Per ENV überschreibbar lassen.

### 5. Verifikation

Nach Deploy:
1. `https://scaffolding-craft.lovable.app/studio` → links **Homepage** anlegen/öffnen → Felder sind alle sichtbar.
2. Wechsel zu **Presentation** → Edit-Toggle an → Klick auf Hero-H1 öffnet rechts den `heroTitle`-Editor.
3. Gleiches für USPs, CTAs, Stats, Process-Steps, Footer-Tagline.

## Was nicht in diesem Schritt drin ist

- `wietek-geruestbau.sanity.studio` Hosted-Studio — ignorieren wir wie besprochen.
- Bilder/Galerien für Stats/Process — kommen später.
- Mehrsprachigkeit.

Sag "los" und ich setze 1–4 in einem Rutsch um.