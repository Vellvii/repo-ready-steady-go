import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import PrelaunchDOX from "./pages/PrelaunchDOX";
import PrelaunchLux from "./pages/PrelaunchLux";
import DoxLanding from "./pages/DoxLanding";
import Video1 from "./pages/Video1";
import Video2 from "./pages/Video2";
import Video3 from "./pages/Video3";
import Video4 from "./pages/Video4";
import Video5 from "./pages/Video5";
import Video6 from "./pages/Video6";
import Video7 from "./pages/Video7";
import Video8 from "./pages/Video8";

const queryClient = new QueryClient();

const InnerApp = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <SmoothScroll>
        <PageTransition>
          <Routes>
            <Route path="/" element={<DoxLanding />} />
            <Route path="/prelaunch-dox" element={<PrelaunchDOX />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/Vellvii-Lux" element={<PrelaunchLux />} />
            <Route path="/v/1" element={<Video1 />} />
            <Route path="/v/2" element={<Video2 />} />
            <Route path="/v/3" element={<Video3 />} />
            <Route path="/v/4" element={<Video4 />} />
            <Route path="/v/5" element={<Video5 />} />
            <Route path="/v/6" element={<Video6 />} />
            <Route path="/v/7" element={<Video7 />} />
            <Route path="/v/8" element={<Video8 />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </SmoothScroll>
      <Cart />
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
