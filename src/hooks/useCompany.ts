import { useSettings } from "./useSanity";
import { COMPANY } from "@/lib/site";

/**
 * Liefert COMPANY-Stammdaten und überschreibt Felder mit Werten aus Sanity (settings),
 * sobald sie dort gepflegt sind. Dadurch bleibt die Website funktionsfähig,
 * auch wenn im Studio noch nichts angelegt wurde.
 */
export const useCompany = () => {
  const { data } = useSettings();

  // Telefon/WhatsApp NICHT aus Sanity übernehmen – immer Code-Werte benutzen,
  // damit veraltete CMS-Einträge die echten Nummern nicht überschreiben.
  const phone = COMPANY.phonePrimary;
  const phoneDisplay = COMPANY.phonePrimaryDisplay;
  const phoneMobile = COMPANY.phoneMobile;
  const phoneMobileDisplay = COMPANY.phoneMobileDisplay;
  const email = data?.email?.trim() || COMPANY.email;
  const whatsappNumber = COMPANY.whatsappNumber;
  const address = data?.address?.trim();
  const hours = data?.openingHours?.trim() || COMPANY.hours;
  const rating = data?.googleRating ?? COMPANY.rating;
  const ratingCount = data?.googleRatingCount ?? COMPANY.ratingCount;
  const instagram = data?.instagramUrl?.trim() || COMPANY.instagram;
  const facebook = data?.facebookUrl?.trim() || COMPANY.facebook;

  return {
    ...COMPANY,
    phonePrimary: phone,
    phonePrimaryDisplay: phoneDisplay,
    phoneMobile,
    phoneMobileDisplay,
    email,
    whatsappNumber,
    hours,
    rating,
    ratingCount,
    instagram,
    facebook,
    addressLine:
      address ||
      `${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}-${COMPANY.district}`,
  };
};
