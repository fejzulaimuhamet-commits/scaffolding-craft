import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { PREVIEW_TOKEN_KEY } from "./lib/sanity";

// Sanity Draft-Mode bootstrap.
// Visual-editing overlays are mounted as a React component (<SanityVisualEditing />)
// inside the router — see src/App.tsx.
async function bootstrapPreview() {
  if (typeof window === "undefined" || window.self === window.top) return;

  const url = new URL(window.location.href);
  const hasPreviewSecret = url.searchParams.has("sanity-preview-secret");
  if (!hasPreviewSecret) return;

  // If we already have a token, just clean the URL — no reload, no loop.
  const existingToken = window.sessionStorage.getItem(PREVIEW_TOKEN_KEY);
  if (existingToken) {
    url.searchParams.delete("sanity-preview-secret");
    url.searchParams.delete("sanity-preview-pathname");
    url.searchParams.delete("sanity-preview-perspective");
    window.history.replaceState({}, "", url.toString());
    return;
  }

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
      url.searchParams.delete("sanity-preview-secret");
      url.searchParams.delete("sanity-preview-pathname");
      url.searchParams.delete("sanity-preview-perspective");
      window.history.replaceState({}, "", url.toString());
      // One-time reload so the Sanity client switches to draft perspective.
      window.location.reload();
    }
  } catch (err) {
    console.warn("[sanity-preview] validation failed:", err);
  }
}

bootstrapPreview();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
