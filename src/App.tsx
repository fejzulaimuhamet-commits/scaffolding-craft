import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import Index from "./pages/Index.tsx";

// Lazy-load all non-critical routes to reduce initial JS bundle
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Leistungen = lazy(() => import("./pages/Leistungen.tsx"));
const Fassadengeruest = lazy(() => import("./pages/leistungen/Fassadengeruest.tsx"));
const Innengeruest = lazy(() => import("./pages/leistungen/Innengeruest.tsx"));
const Treppenturm = lazy(() => import("./pages/leistungen/Treppenturm.tsx"));
const Dachfanggeruest = lazy(() => import("./pages/leistungen/Dachfanggeruest.tsx"));
const SchutznetzeGelaender = lazy(() => import("./pages/leistungen/SchutznetzeGelaender.tsx"));
const Wetterschutz = lazy(() => import("./pages/leistungen/Wetterschutz.tsx"));
const Projekte = lazy(() => import("./pages/Projekte.tsx"));
const UeberUns = lazy(() => import("./pages/UeberUns.tsx"));
const Karriere = lazy(() => import("./pages/Karriere.tsx"));
const Kontakt = lazy(() => import("./pages/Kontakt.tsx"));
const Anfrage = lazy(() => import("./pages/Anfrage.tsx"));
const Impressum = lazy(() => import("./pages/Impressum.tsx"));
const Datenschutz = lazy(() => import("./pages/Datenschutz.tsx"));
const Studio = lazy(() => import("./pages/Studio.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PageTransition>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/leistungen" element={<Leistungen />} />
              <Route path="/leistungen/fassadengeruest" element={<Fassadengeruest />} />
              <Route path="/leistungen/innengeruest" element={<Innengeruest />} />
              <Route path="/leistungen/treppenturm" element={<Treppenturm />} />
              <Route path="/leistungen/dachfanggeruest" element={<Dachfanggeruest />} />
              <Route path="/leistungen/schutznetze-gelaender" element={<SchutznetzeGelaender />} />
              <Route path="/leistungen/wetterschutz" element={<Wetterschutz />} />
              <Route path="/projekte" element={<Projekte />} />
              <Route path="/ueber-uns" element={<UeberUns />} />
              <Route path="/karriere" element={<Karriere />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/anfrage" element={<Anfrage />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/studio/*" element={<Studio />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
