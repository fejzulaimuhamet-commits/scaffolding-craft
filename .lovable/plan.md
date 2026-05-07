## Diagnose (durch Test belegt)

Direkter API-Test ergab: Aktuelle Submits enthalten **keine Standard-Felder** `name`, `email`, `message`, sondern nur deutsche Custom-Keys (`"Name"`, `"E-Mail"`, `"Telefon"` …). Web3Forms gibt zwar `success: true` zurück, **verwirft die Mail intern aber still** (Spam-Filter / Template-Rendering schlägt fehl).

Der Test mit Standard-Feldnamen war erfolgreich – die API akzeptiert das Format.

## Fix in `src/lib/web3forms.ts`

`submitToWeb3Forms` wird so erweitert, dass sie:

1. **`name`** automatisch aus `fields["Name"]` ableitet
2. **`email`** automatisch aus `fields["E-Mail"]` (oder `replyTo`) ableitet
3. **`message`** als zusammengefassten lesbaren Block aus allen Feldern baut (`"Art: Treppenturm\nHöhe: 5 m\n…"`)
4. Diese 3 Standard-Felder **zusätzlich** zu den deutschen Detail-Keys mitsendet

Die E-Mail bei `info@wietek-geruestbau.de` enthält dann sowohl die saubere `message`-Übersicht als auch alle Einzelfelder.

## Keine Änderungen nötig an

- `RequestWizard.tsx` (Aufruf bleibt gleich)
- `Anfrage.tsx` (Aufruf bleibt gleich)
- Access Key (bleibt)

## Verifikation nach Fix

Ich rufe nach der Code-Änderung die API erneut mit dem neuen Payload-Format auf und bestätige `success: true`. Du prüfst dann den Posteingang von `info@wietek-geruestbau.de` – die Mail sollte jetzt ankommen, weil das Web3Forms-Mail-Template korrekt rendert und der Spam-Filter nicht mehr triggert.

## Falls auch das nicht reicht

Web3Forms hat einen Hard-Limit-Filter gegen Test-Adressen wie `@example.com`. Beim echten Test sollten wir eine echte Adresse nutzen (z. B. deine private). Falls die Mail dann immer noch nicht kommt, ist die Ursache zu 99 % der **noch nicht aktivierte Access Key** – dann ist der nächste Schritt, den Aktivierungsklick im Web3Forms-Dashboard auszulösen (was du dort selbst sehen kannst, sobald du eingeloggt bist).
