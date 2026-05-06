import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { PREVIEW_TOKEN_KEY } from "./lib/sanity";


// Sanity Visual Editing + Draft Mode bootstrap.
// Runs only when the page is loaded inside the Sanity Presentation Tool (iframe).
async function bootstrapPreview() {
  if (typeof window === "undefined" || window.self === window.top) return;

  const url = new URL(window.location.href);
  const hasPreviewSecret = url.searchParams.has("sanity-preview-secret");

  // Validate the one-time preview secret via our edge function and store the
  // resulting Sanity read token in sessionStorage. The next render uses it
  // to fetch drafts. We reload once after storing so the SDK picks it up.
  if (hasPreviewSecret) {
    try {
      const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sanity-preview${url.search}`;
      const res = await fetch(fnUrl, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
        },
      });
      const data = await res.json();
      if (data?.valid && data?.token) {
        window.sessionStorage.setItem(PREVIEW_TOKEN_KEY, data.token);
        // strip the secret from the URL and reload to apply draft mode
        url.searchParams.delete("sanity-preview-secret");
        url.searchParams.delete("sanity-preview-pathname");
        url.searchParams.delete("sanity-preview-perspective");
        window.history.replaceState({}, "", url.toString());
        window.location.reload();
        return;
      }
    } catch (err) {
      console.warn("[sanity-preview] validation failed:", err);
    }
  }

  try {
    const { enableVisualEditing } = await import("@sanity/visual-editing");
    enableVisualEditing();
  } catch (err) {
    console.warn("[visual-editing] failed:", err);
  }
}

bootstrapPreview();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
