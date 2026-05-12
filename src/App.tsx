import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { pixelPageView } from "./lib/metaPixel";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import { SmoothScroll } from "./components/animations/SmoothScroll";
import { PageTransition } from "./components/animations/PageTransition";
import CartDrawer from "./components/CartDrawer";
import { useCartSync } from "./hooks/useCartSync";
import { ErrorBoundary } from "./components/ErrorBoundary";
import AgeGateLanding from "./pages/Landing";
import NotFound from "./pages/NotFound";
import PrelaunchDOX from "./pages/PrelaunchDOX";
import PrelaunchLux from "./pages/PrelaunchLux";
import DoxLanding from "./pages/DoxLanding";
import DoxVideoLanding from "./pages/DoxVideoLanding";
import Video1 from "./pages/Video1";
import Video2 from "./pages/Video2";
import Video3 from "./pages/Video3";
import Video4 from "./pages/Video4";
import Video5 from "./pages/Video5";
import Video6 from "./pages/Video6";
import Video7 from "./pages/Video7";
import Video8 from "./pages/Video8";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Warranty from "./pages/Warranty";
import WarrantyRegister from "./pages/WarrantyRegister";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CollectionDoxCompatible from "./pages/CollectionDoxCompatible";

const queryClient = new QueryClient();

const InnerApp = () => {
  useCartSync();

  // SPA route-change PageView for Meta Pixel.
  // The base snippet in index.html already fires PageView on initial load,
  // so we skip the first render and only fire on subsequent route changes.
  const location = useLocation();
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    pixelPageView();
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <SmoothScroll>
        <PageTransition>
          <Routes>
            {/* Live pages */}
            <Route path="/" element={<DoxVideoLanding />} />
            <Route path="/showcase" element={<DoxLanding />} />
            <Route path="/landing" element={<AgeGateLanding />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections/dox-compatible-products" element={<CollectionDoxCompatible />} />
            <Route path="/products/:handle" element={<ProductDetail />} />
            <Route path="/product/:handle" element={<Navigate to="/products/:handle" replace />} />
            <Route path="/prelaunch" element={<PrelaunchDOX />} />
            <Route path="/prelaunch-dox" element={<Navigate to="/prelaunch" replace />} />
            <Route path="/Vellvii-Lux" element={<PrelaunchLux />} />
            <Route path="/vellvii-lux" element={<Navigate to="/Vellvii-Lux" replace />} />

            {/* QR-code video landings (packaging) */}
            <Route path="/v/1" element={<Video1 />} />
            <Route path="/v/2" element={<Video2 />} />
            <Route path="/v/3" element={<Video3 />} />
            <Route path="/v/4" element={<Video4 />} />
            <Route path="/v/5" element={<Video5 />} />
            <Route path="/v/6" element={<Video6 />} />
            <Route path="/v/7" element={<Video7 />} />
            <Route path="/v/8" element={<Video8 />} />

            {/* Legal & support */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/warranty/register" element={<WarrantyRegister />} />

            {/* Legacy redirects: pre-Shopify product pages → Shopify PDPs */}
            <Route path="/dox" element={<Navigate to="/products/vellvii-dox" replace />} />
            <Route path="/docking-station" element={<Navigate to="/products/vellvii-dox" replace />} />
            <Route path="/pulse" element={<Navigate to="/products/vellvii-pulse" replace />} />
            <Route path="/g-vibe" element={<Navigate to="/products/vellvii-g-vibe" replace />} />
            <Route path="/luxury-storage" element={<Navigate to="/products/vellvii-lux" replace />} />
            {/* Evolve canonicalisation: /vibe and old /products/vellvii-vibe → Evolve */}
            <Route path="/evolve" element={<Navigate to="/products/vellvii-evolve" replace />} />
            <Route path="/vibe" element={<Navigate to="/products/vellvii-evolve" replace />} />
            <Route path="/products/vellvii-vibe" element={<Navigate to="/products/vellvii-evolve" replace />} />

            {/* Legacy redirects: deleted Kickstarter & nav pages → home (preserve ad traffic) */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/contact" element={<Navigate to="/" replace />} />
            <Route path="/sex-saddle" element={<Navigate to="/shop" replace />} />
            <Route path="/kickstarter" element={<Navigate to="/" replace />} />
            <Route path="/kickstarterV2" element={<Navigate to="/" replace />} />
            <Route path="/Vellvii-Kickstarter" element={<Navigate to="/" replace />} />
            <Route path="/Vellvii-Kickstarter2" element={<Navigate to="/" replace />} />
            <Route path="/Vellvii-Prototype" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </SmoothScroll>
      <CartDrawer />
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <InnerApp />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
