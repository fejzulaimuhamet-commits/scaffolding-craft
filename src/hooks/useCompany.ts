import { useSettings } from "./useSanity";
import { COMPANY } from "@/lib/site";

/**
 * Liefert COMPANY-Stammdaten und überschreibt Felder mit Werten aus Sanity (settings),
 * sobald sie dort gepflegt sind. Dadurch bleibt die Website funktionsfähig,
 * auch wenn im Studio noch nichts angelegt wurde.
 */
export const useCompany = () => {
  const { data } = useSettings();

  const phone = data?.phone?.trim() || COMPANY.phonePrimary;
  // Display = Sanity-Wert wie eingegeben; sonst Default-Display
  const phoneDisplay = data?.phone?.trim() || COMPANY.phonePrimaryDisplay;
  const email = data?.email?.trim() || COMPANY.email;
  const whatsappRaw = data?.whatsapp?.trim();
  const whatsappNumber = whatsappRaw
    ? whatsappRaw.replace(/[^\d]/g, "")
    : COMPANY.whatsappNumber;
  const address = data?.address?.trim();
  const hours = data?.openingHours?.trim() || COMPANY.hours;
  const rating = data?.googleRating ?? COMPANY.rating;

  return {
    ...COMPANY,
    phonePrimary: phone,
    phonePrimaryDisplay: phoneDisplay,
    email,
    whatsappNumber,
    hours,
    rating,
    // Wenn ein freier Adress-String gepflegt ist, exponieren wir ihn als addressLine.
    addressLine:
      address ||
      `${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}-${COMPANY.district}`,
  };
};
