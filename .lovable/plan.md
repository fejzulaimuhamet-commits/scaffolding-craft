## Plan: Anfragen per E-Mail mit Web3Forms

Beide Formulare (`RequestWizard` auf Kontakt/Startseite + ausführliches `Anfrage`-Formular) senden ihre Daten per `fetch` an die Web3Forms-API. Die Mail landet direkt bei `info@wietek-geruestbau.de`. Kein DNS, keine Datenbank, kein Backend.

### Was du einmalig tust (2 Min)
1. Auf https://web3forms.com → „Create Access Key" → `info@wietek-geruestbau.de` eintragen
2. Bestätigungsmail öffnen → Klick auf Bestätigen
3. Den Access Key (sieht aus wie `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) kopieren und mir geben

Den Key trage ich dann in eine zentrale Konstante ein. Es ist ein **publishable** Key – darf im Code stehen, kein Geheimnis.

### Was ich im Code mache

**Neue Datei `src/lib/web3forms.ts`**
- Konstante `WEB3FORMS_KEY` (dein Access Key)
- Hilfsfunktion `submitToWeb3Forms(data, subject)`:
  - POST an `https://api.web3forms.com/submit`
  - Felder: `access_key`, `subject`, `from_name: "Wietek Website"`, alle Formularwerte als lesbare Strings
  - Honeypot-Feld `botcheck` (Spamschutz, Web3Forms-Standard)
  - Wirft Error bei Fehlerresponse

**`src/components/sections/RequestWizard.tsx`**
- `onSubmit`: statt Dummy-`setTimeout` → `submitToWeb3Forms(data, "Neue Schnellanfrage – Wietek Website")` aufrufen
- Erfolg → wie bisher Step 3 + Toast
- Fehler → Toast mit Fallback-Hinweis (Telefon/WhatsApp anzeigen)

**`src/pages/Anfrage.tsx`**
- `onSubmit`: gleiche Funktion mit ausführlichen Feldern (Service-Liste, Adresse, Termine, Notizen)
- Hinweis: Datei-Uploads werden bei Web3Forms im freien Tarif **nicht** mitgeschickt → wir erwähnen im Erfolgs-Screen, dass Anhänge bei Bedarf per Mail an `info@wietek-geruestbau.de` nachgereicht werden können. (Falls du Uploads später brauchst → upgrade auf Option B.)

### So sieht die E-Mail bei dir aus
```
Von:     Web3Forms <noreply@web3forms.com>
An:      info@wietek-geruestbau.de
Betreff: Neue Schnellanfrage – Wietek Website

Name: Max Mustermann
Telefon: 0172 6666297
E-Mail: max@example.de
Art: Fassadengerüst
Höhe: ca. 8 m
Fläche: 120 m²
PLZ/Ort: 21037 Hamburg
…
```
Antworten direkt in deinem Mailprogramm geht – das Reply-To wird auf die E-Mail des Kunden gesetzt.

### Was du nicht tust
- Keine DNS-Änderungen
- Keine Subdomain
- Kein Account verknüpfen außer Mail-Bestätigung
- Keine Backend-/Cloud-Einrichtung

### Limits Free-Tarif
250 Submissions/Monat kostenlos. Reicht für die Praxis locker; falls überschritten → Upgrade ($5/Monat) oder Wechsel auf Option B.

---

**Nach deiner Freigabe brauche ich nur den Access Key, dann baue ich das in einem Rutsch ein.**
