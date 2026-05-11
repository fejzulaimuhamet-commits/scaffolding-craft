// Lightweight, provider-agnostic event tracking.
// Sendet ein Event an alle gängigen Analytics-Provider, falls vorhanden:
// - Google Analytics (gtag / dataLayer)
// - Plausible
// - Umami
// - PostHog
// Zusätzlich wird ein DOM-CustomEvent dispatched, falls eigene Listener
// (z.B. für Tag Manager oder Lovable Analytics) ergänzt werden sollen.

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    umami?: { track: (event: string, props?: EventProps) => void };
    posthog?: { capture: (event: string, props?: EventProps) => void };
  }
}

export function trackEvent(name: string, props: EventProps = {}) {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", name, props);
    window.dataLayer?.push({ event: name, ...props });
    window.plausible?.(name, { props });
    window.umami?.track(name, props);
    window.posthog?.capture(name, props);

    window.dispatchEvent(
      new CustomEvent("analytics:event", { detail: { name, props } })
    );

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[analytics]", name, props);
    }
  } catch {
    // Silent — Tracking darf die UX nie blockieren
  }
}
