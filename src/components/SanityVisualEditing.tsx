import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { HistoryAdapter } from "@sanity/visual-editing";

// Lazy-load the React VisualEditing component so it never ships in the
// initial bundle of the public site (only loaded inside the iframe).
const VisualEditingComponent = lazy(async () => {
  const mod = await import("@sanity/visual-editing/react");
  return { default: mod.VisualEditing };
});

const isInIframe = () =>
  typeof window !== "undefined" && window.self !== window.top;

/**
 * Visual editing overlays + React-Router history adapter.
 * Renders ONLY when the page is loaded inside Sanity's Presentation iframe.
 * Mount this once inside <BrowserRouter>.
 */
export function SanityVisualEditing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [enabled] = useState(() => isInIframe());
  const navigateRef = useRef<
    ((u: { type: "push" | "pop" | "replace"; url: string }) => void) | null
  >(null);

  // Notify the Studio when the SPA route changes.
  useEffect(() => {
    if (!enabled) return;
    navigateRef.current?.({
      type: "push",
      url: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [enabled, location.pathname, location.search, location.hash]);

  if (!enabled) return null;

  const history: HistoryAdapter = {
    subscribe: (cb) => {
      navigateRef.current = cb as never;
      return () => {
        navigateRef.current = null;
      };
    },
    update: (update) => {
      if (update.type === "push" || update.type === "replace") {
        navigate(update.url, { replace: update.type === "replace" });
      } else if (update.type === "pop") {
        navigate(-1);
      }
    },
  };

  return (
    <Suspense fallback={null}>
      <VisualEditingComponent history={history} />
    </Suspense>
  );
}

export default SanityVisualEditing;
