/**
 * Web3Forms-Integration für die Anfrage-Formulare.
 *
 * Access Key (publishable, darf im Code stehen).
 */
export const WEB3FORMS_KEY = "a3395abc-2a50-42e5-ae58-2662fbce8201";

const ENDPOINT = "https://api.web3forms.com/submit";

export type Web3FormsPayload = {
  subject: string;
  fields: Record<string, string | undefined | null>;
  replyTo?: string;
  botcheck?: string;
};

function pick(
  fields: Record<string, string | undefined | null>,
  candidates: string[],
): string | undefined {
  for (const key of candidates) {
    const v = fields[key];
    if (v !== undefined && v !== null && String(v).trim().length > 0) {
      return String(v).trim();
    }
  }
  return undefined;
}

function buildMessage(fields: Record<string, string | undefined | null>): string {
  const lines: string[] = [];
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null) continue;
    const s = String(v).trim();
    if (s.length === 0) continue;
    lines.push(`${k}: ${s}`);
  }
  return lines.join("\n");
}

export async function submitToWeb3Forms({
  subject,
  fields,
  replyTo,
  botcheck,
}: Web3FormsPayload): Promise<void> {
  if (!WEB3FORMS_KEY || WEB3FORMS_KEY.startsWith("REPLACE_")) {
    throw new Error("Web3Forms Access Key fehlt.");
  }

  // Standard-Felder ableiten (kritisch für Web3Forms-Mailrendering / Spam-Filter)
  const stdName = pick(fields, ["Name", "name"]) ?? "Website-Anfrage";
  const stdEmail =
    pick(fields, ["E-Mail", "Email", "email"]) ?? replyTo ?? "noreply@example.com";
  const stdMessage = buildMessage(fields);

  const cleaned: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null) continue;
    const s = String(v).trim();
    if (s.length > 0) cleaned[k] = s;
  }

  const body: Record<string, string> = {
    access_key: WEB3FORMS_KEY,
    subject,
    from_name: "Wietek Gerüstbau Website",
    name: stdName,
    email: stdEmail,
    message: stdMessage,
    botcheck: botcheck ?? "",
    ...cleaned,
  };
  if (replyTo) body.replyto = replyTo;

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
    throw new Error(data?.message || `Web3Forms-Fehler (${res.status})`);
  }
}
