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
import { LuxuryNavDrawer } from "./components/navigation/LuxuryNavDrawer";
import { useCartSync } from "./hooks/useCartSync";
import { ErrorBoundary } from "./components/ErrorBoundary";
import AgeGateLanding from "./pages/Landing";
import AgeGateModal from "./components/AgeGateModal";
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
import CartPage from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import CollectionDoxCompatible from "./pages/CollectionDoxCompatible";
import CollectionPleasureCollection from "./pages/CollectionPleasureCollection";
import CollectionDiscreetStorage from "./pages/CollectionDiscreetStorage";
import CollectionPortableStorage from "./pages/CollectionPortableStorage";
import CollectionBedroomStorage from "./pages/CollectionBedroomStorage";
import CollectionProductsForCouples from "./pages/CollectionProductsForCouples";
import Contact from "./pages/Contact";
import Socials from "./pages/Socials";
import Guides from "./pages/Guides";
import GuideLuxVsDox from "./pages/guides/GuideLuxVsDox";
import GuideDoxDockingSystem from "./pages/guides/GuideDoxDockingSystem";
import GuideDiscreetStorage from "./pages/guides/GuideDiscreetStorage";
import GuidePortableVsBedroomStorage from "./pages/guides/GuidePortableVsBedroomStorage";
import GuideProductsForCouples from "./pages/guides/GuideProductsForCouples";
import GuideProductCare from "./pages/guides/GuideProductCare";
import GuideHowToCleanAndStoreSexToys from "./pages/guides/GuideHowToCleanAndStoreSexToys";
import GuideBestSexToyStorageBox from "./pages/guides/GuideBestSexToyStorageBox";
import GuideBiometricLockBoxForSexToys from "./pages/guides/GuideBiometricLockBoxForSexToys";
import GuideWhatIsARoseToy from "./pages/guides/GuideWhatIsARoseToy";

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
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/showcase" element={<DoxLanding />} />
            <Route path="/landing" element={<AgeGateLanding />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/collections/dox-compatible-products" element={<CollectionDoxCompatible />} />
            <Route path="/collections/pleasure-collection" element={<CollectionPleasureCollection />} />
            <Route path="/collections/discreet-storage" element={<CollectionDiscreetStorage />} />
            <Route path="/collections/portable-storage" element={<CollectionPortableStorage />} />
            <Route path="/collections/bedroom-storage" element={<CollectionBedroomStorage />} />
            <Route path="/collections/products-for-couples" element={<CollectionProductsForCouples />} />
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/socials" element={<Socials />} />

            {/* Guides */}
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/lux-vs-dox" element={<GuideLuxVsDox />} />
            <Route path="/guides/how-the-vellvii-dox-docking-system-works" element={<GuideDoxDockingSystem />} />
            <Route path="/guides/discreet-storage-for-intimate-wellness-products" element={<GuideDiscreetStorage />} />
            <Route path="/guides/portable-vs-bedroom-storage" element={<GuidePortableVsBedroomStorage />} />
            <Route path="/guides/how-to-choose-premium-products-for-couples" element={<GuideProductsForCouples />} />
            <Route path="/guides/how-to-care-for-your-vellvii-products" element={<GuideProductCare />} />
            <Route path="/guides/how-to-clean-and-store-sex-toys" element={<GuideHowToCleanAndStoreSexToys />} />
            <Route path="/guides/best-sex-toy-storage-box" element={<GuideBestSexToyStorageBox />} />
            <Route path="/guides/biometric-lock-box-for-sex-toys" element={<GuideBiometricLockBoxForSexToys />} />
            <Route path="/guides/what-is-a-rose-toy" element={<GuideWhatIsARoseToy />} />

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
            <Route path="/about" element={<Navigate to="/" replace />} />
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
      <LuxuryNavDrawer />
      <AgeGateModal />
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
