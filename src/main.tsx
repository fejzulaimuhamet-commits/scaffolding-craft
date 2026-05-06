import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Sanity Visual Editing: rendert Edit-Overlays nur, wenn die Seite
// aus dem Sanity Presentation Tool (iframe) heraus geöffnet wird.
// Für normale Besucher unsichtbar.
if (typeof window !== "undefined" && window.self !== window.top) {
  import("@sanity/visual-editing")
    .then(({ enableVisualEditing }) => enableVisualEditing())
    .catch((err) => console.warn("[visual-editing] failed:", err));
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
