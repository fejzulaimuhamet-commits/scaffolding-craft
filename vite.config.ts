import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react/compiler-runtime": "react-compiler-runtime",
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "framer-motion", "@tanstack/react-query", "@tanstack/query-core"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "framer-motion"],
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true },
    rollupOptions: {
      output: {
        // Bundle React + framer-motion together so framer-motion can always
        // see React.createContext at module-eval time (fixes prod white screen
        // "Cannot read properties of undefined (reading 'createContext')").
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/scheduler/") ||
              id.includes("/framer-motion/") ||
              id.includes("/motion-dom/") ||
              id.includes("/motion-utils/")
            ) {
              return "react-motion";
            }
          }
        },
      },
    },
  },
}));
