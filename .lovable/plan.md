## Ziel
Die Vorschau im Sanity Studio (Presentation-Tab) soll die Live-Website unter `https://www.wietek-geruestbau.de/` anzeigen. Die URL bleibt unverändert.

## Aktueller Stand
- Studio läuft: ✅
- Studio-Preview-URL ist korrekt auf `wietek-geruestbau.de` gesetzt: ✅
- Die Domain `wietek-geruestbau.de` ist aktuell **nicht** mit dem Lovable-Projekt verbunden → deshalb "Unable to connect"

## Was nötig ist (zwei Schritte)

### Schritt 1 – Domain mit Lovable verbinden (machst du, einmalig)

Zwei Möglichkeiten:

**A) Domain bei Lovable kaufen (einfachster Weg)**
1. In Lovable: **Project Settings → Domains → Buy new domain**
2. `wietek-geruestbau.de` suchen und kaufen
3. Wird automatisch verbunden, SSL läuft automatisch

**B) Domain bei einem Registrar (IONOS/GoDaddy/Strato) kaufen und verbinden**
1. Domain dort kaufen
2. In Lovable: **Project Settings → Domains → Connect Domain** → `wietek-geruestbau.de` eingeben
3. Beim Registrar diese DNS-Records eintragen:
   - **A-Record** für `@` → `185.158.133.1`
   - **A-Record** für `www` → `185.158.133.1`
   - **TXT-Record** `_lovable` → (Wert aus Lovable-Dialog)
4. Bis zu 72h warten auf DNS-Propagation, SSL kommt automatisch

### Schritt 2 – CORS-Origin in Sanity hinzufügen (mache ich automatisch)

Damit das Studio nach Domain-Verbindung die Live-Website laden darf, füge ich via Sanity MCP folgende CORS-Origins hinzu:
- `https://www.wietek-geruestbau.de`
- `https://wietek-geruestbau.de`

Das verhindert spätere CORS-Fehler in der Presentation-Vorschau.

## Was passiert nach Approve
Ich wechsle in Build-Mode und füge nur die CORS-Origins in Sanity hinzu. **Keine Code-Änderungen**, keine URL-Änderungen. Den Domain-Kauf/Verbindung musst du selbst in Lovable machen (Project Settings → Domains) – das kann ich nicht für dich klicken.

## Wichtige Frage
Hast du die Domain `wietek-geruestbau.de` schon irgendwo gekauft? 
- Wenn **ja, wo?** (IONOS, Strato, GoDaddy …) → Variante B
- Wenn **nein** → ich empfehle Variante A (direkt in Lovable kaufen, alles automatisch)
