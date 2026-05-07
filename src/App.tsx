import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import { FloatingButtons } from "@/components/sections/FloatingButtons";
import { StickyAskButton } from "@/components/StickyAskButton";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Leistungen from "./pages/Leistungen.tsx";
import Fassadengeruest from "./pages/leistungen/Fassadengeruest.tsx";
import Innengeruest from "./pages/leistungen/Innengeruest.tsx";
import Treppenturm from "./pages/leistungen/Treppenturm.tsx";
import Dachfanggeruest from "./pages/leistungen/Dachfanggeruest.tsx";
import SchutznetzeGelaender from "./pages/leistungen/SchutznetzeGelaender.tsx";
import Wetterschutz from "./pages/leistungen/Wetterschutz.tsx";
import Projekte from "./pages/Projekte.tsx";
import UeberUns from "./pages/UeberUns.tsx";
import Karriere from "./pages/Karriere.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import Anfrage from "./pages/Anfrage.tsx";
import Impressum from "./pages/Impressum.tsx";
import Datenschutz from "./pages/Datenschutz.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PageTransition>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
        <FloatingButtons />
        <StickyAskButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
