import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { SmoothScroll } from "./components/animations/SmoothScroll";
import { PageTransition } from "./components/animations/PageTransition";
import Cart from "./components/Cart";

import { ErrorBoundary } from "./components/ErrorBoundary";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Pulse from "./pages/Pulse";
import Vibe from "./pages/Vibe";
import GVibe from "./pages/GVibe";
import DOX from "./pages/DOX";
import LuxuryStorage from "./pages/LuxuryStorage";
import DockingStation from "./pages/DockingStation";
import SexSaddle from "./pages/SexSaddle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const InnerApp = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isDev = searchParams.get('dev') === 'true';

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <SmoothScroll>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Landing />} />
            {isDev && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pulse" element={<Pulse />} />
                <Route path="/vibe" element={<Vibe />} />
                <Route path="/g-vibe" element={<GVibe />} />
                <Route path="/dox" element={<DOX />} />
                <Route path="/luxury-storage" element={<LuxuryStorage />} />
                <Route path="/docking-station" element={<DockingStation />} />
                <Route path="/sex-saddle" element={<SexSaddle />} />
              </>
            )}
            {/* All other routes redirect to landing during development */}
            <Route path="*" element={<Landing />} />
          </Routes>
        </PageTransition>
      </SmoothScroll>
      {/* Global sticky cart - only show in dev mode and not on landing */}
      {isDev && location.pathname !== '/' && <Cart />}
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <InnerApp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
