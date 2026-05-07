import { COMPANY } from "@/lib/site";

/**
 * Liefert COMPANY-Stammdaten ausschließlich aus dem Code (src/lib/site.ts).
 * Diese Werte werden NICHT aus Sanity gezogen, damit Header/Footer/Kontaktdaten
 * eine einzige verlässliche Quelle haben (Lovable-Code → Publish → live).
 */
export const useCompany = () => {
  return {
    ...COMPANY,
    addressLine: `${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}-${COMPANY.district}`,
  };
};
