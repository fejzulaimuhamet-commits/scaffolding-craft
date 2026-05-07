/**
 * Web3Forms-Integration für die Anfrage-Formulare.
 *
 * 👉 Access Key hier eintragen (publishable, darf im Code stehen).
 * Anlegen unter: https://web3forms.com → Create Access Key →
 * E-Mail: info@wietek-geruestbau.de → Bestätigungs-Mail klicken → Key kopieren.
 */
export const WEB3FORMS_KEY = "a3395abc-2a50-42e5-ae58-2662fbce8201";

const ENDPOINT = "https://api.web3forms.com/submit";

export type Web3FormsPayload = {
  subject: string;
  /** Felder, die als lesbare Liste in die E-Mail kommen. */
  fields: Record<string, string | undefined | null>;
  /** Optional: Reply-To für direkte Antwort an den Kunden. */
  replyTo?: string;
  /** Honeypot-Wert (vom versteckten Feld). Leer = kein Bot. */
  botcheck?: string;
};

export async function submitToWeb3Forms({
  subject,
  fields,
  replyTo,
  botcheck,
}: Web3FormsPayload): Promise<void> {
  if (!WEB3FORMS_KEY || WEB3FORMS_KEY.startsWith("REPLACE_")) {
    throw new Error(
      "Web3Forms Access Key fehlt. Bitte in src/lib/web3forms.ts eintragen.",
    );
  }

  // Werte als String absichern und leere Werte rausfiltern
  const cleaned: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null) continue;
    const s = String(v).trim();
    if (s.length > 0) cleaned[k] = s;
  }

  const body = {
    access_key: WEB3FORMS_KEY,
    subject,
    from_name: "Wietek Gerüstbau Website",
    replyto: replyTo,
    botcheck: botcheck ?? "",
    ...cleaned,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  let data: { success?: boolean; message?: string } = {};
  try {
    data = await res.json();
  } catch {
    /* ignore */
  }

  if (!res.ok || !data.success) {
    throw new Error(
      data?.message || `Web3Forms-Fehler (${res.status})`,
    );
  }
}
