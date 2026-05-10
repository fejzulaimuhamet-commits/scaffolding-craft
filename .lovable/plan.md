
## Ausgangslage

- Der Web3Forms Access Key `a75961e5-db1d-44ad-947a-6e4596aef603` ist bereits in `src/lib/web3forms.ts` (Zeile 6) eingetragen — **am Code muss nichts ersetzt werden**.
- Laut deiner Angabe ist dieser Key auf einen neuen Web3Forms-Account mit `wietek-ltd@gmx.de` registriert.
- Test-Anfrage über das Formular ist bei `wietek-ltd@gmx.de` **nicht** angekommen.

Web3Forms entscheidet die Empfänger-Adresse **serverseitig** anhand des Access-Key-Accounts — im Frontend-Code lässt sich der Empfänger nicht setzen. Wenn nichts ankommt, liegt es fast immer an einer dieser Ursachen:

1. **Account noch nicht bestätigt** — Web3Forms versendet erst, wenn der Bestätigungslink in der Willkommens-Mail angeklickt wurde. Solange das nicht passiert ist, ist der Key zwar gültig (API antwortet `success: true`), aber es geht keine Mail raus.
2. **GMX hat die Mail als Spam aussortiert** — Web3Forms-Mails landen bei GMX häufig im Spam-Ordner, vor allem in den ersten Wochen.
3. **Empfänger-Adresse im Dashboard weicht vom Account ab** — bei Web3Forms gibt es pro Key noch ein Feld „Recipient / Notification Email", das den tatsächlichen Empfänger steuert. Ist es leer oder falsch, geht nichts raus.
4. **Falscher Key** — der eingetragene Key gehört (versehentlich) doch noch zum alten `info@wietek-geruestbau.de`-Account.

## Plan

### 1. Verifikation auf Web3Forms-Seite (du, ca. 2 Min.)
Bitte einmal in deinem GMX-Postfach `wietek-ltd@gmx.de` prüfen:

- a) **Spam-/Werbung-Ordner** auf eine Mail von `noreply@web3forms.com` oder `Web3Forms` prüfen — sowohl die Account-Bestätigung als auch ggf. die Test-Anfrage.
- b) Auf [web3forms.com](https://web3forms.com) mit `wietek-ltd@gmx.de` einloggen und prüfen:
  - Steht beim Key `a75961e5-…` der Status **„Verified" / „Active"**? Falls nicht: Bestätigungslink (ggf. neu anfordern) anklicken.
  - Ist im Feld **„Recipient Email" / „Notification Email"** wirklich `wietek-ltd@gmx.de` eingetragen? Falls leer/anders: dort eintragen und speichern.
  - Im Reiter **„Submissions"**: Tauchen Test-Anfragen dort überhaupt auf? Wenn ja, ist das Frontend okay und es ist nur ein Zustell-/Spam-Problem.

### 2. Code-seitige Härtung (ich, falls du grünes Licht gibst)
Unabhängig davon nehme ich zwei kleine Verbesserungen in `src/lib/web3forms.ts` vor, damit künftige Probleme leichter auffallen und Mails seltener im Spam landen:

- **Fallback-Empfänger explizit setzen**: Web3Forms unterstützt das optionale Feld `to_email`. Ich trage `wietek-ltd@gmx.de` dort ein. Damit ist der Empfänger zusätzlich aus dem Code „angefragt" und unabhängig von einer evtl. fehlenden Dashboard-Einstellung.
- **Bessere Fehlerausgabe** im Submit-Flow (Status-Code + Web3Forms-`message` werden im Frontend-Toast angezeigt), damit ein zukünftiger Test sofort zeigt, ob die API ablehnt oder ob es nur ein Zustell-Problem ist.
- **Konfiguration zentralisieren**: Empfänger-Mail als Konstante `RECIPIENT_EMAIL` oben in der Datei, klar kommentiert — damit du sie zukünftig in einer Sekunde tauschen kannst.

Am Key selbst wird **nichts** geändert (er ist bereits korrekt eingetragen).

### 3. Verifikation nach der Code-Änderung
- Du sendest eine Test-Anfrage über `/anfrage`.
- Du prüfst Posteingang **und** Spam in `wietek-ltd@gmx.de`.
- Falls weiterhin nichts ankommt: Web3Forms-Dashboard → Reiter **Submissions** zeigt, ob die Anfrage zumindest serverseitig angenommen wurde — daraus lässt sich klar ableiten, ob es an Web3Forms-Account-Setup oder an GMX-Filtern liegt.

## Geänderte Dateien

- `src/lib/web3forms.ts` — `RECIPIENT_EMAIL`-Konstante, `to_email`-Feld im Payload, verbesserte Fehlermeldung. Keine Logikänderung an `RequestWizard.tsx` oder `Anfrage.tsx` nötig.

## Wichtig vorab

Bitte führe **Schritt 1 (a + b)** zuerst durch — in 90 % der „Mail kommt nicht an"-Fälle ist es entweder der Spam-Ordner oder ein nicht bestätigter Account, und dann reicht der Code-Fix in Schritt 2 alleine nicht. Wenn du mir kurz das Ergebnis zurückmeldest (Bestätigung okay? Recipient gesetzt? Submission im Dashboard sichtbar?), kann ich Schritt 2 zielgerichtet umsetzen.
