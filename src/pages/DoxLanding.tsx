import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { HomeHero } from "@/components/home/HomeHero";
import { DoxFeatures } from "@/components/home/DoxFeatures";
import { DoxVideo } from "@/components/home/DoxVideo";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { BrandPhilosophy } from "@/components/home/BrandPhilosophy";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCTA } from "@/components/home/FinalCTA";

const DoxLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <SEO
        title="Vellvii | Luxury Wellness & Intimate Storage"
        description="Discover Vellvii - luxury wellness products and the DOX docking station featuring biometric security, integrated charging, and premium design. The Art of 'O'."
        canonical="/"
        organizationData
        productData={{
          name: "Vellvii DOX",
          description: "Luxury docking station for intimate wellness products featuring biometric fingerprint lock, USB-C charging dock, and premium vegan leather with velvet interior.",
          availability: "PreOrder",
          brand: "Vellvii",
          images: ["/uploads/Dox1.jpg", "/uploads/Dox2.jpg", "/uploads/Dox3.jpg"],
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img
                  src="/uploads/Vellvii-full-logo-transparent.png"
                  alt="Vellvii"
                  className="h-8 w-auto"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  to="/shop"
                  className="font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide"
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  className="font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide"
                >
                  Contact
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-light-secondary hover:text-primary transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.nav
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden border-t border-white/10 overflow-hidden"
                >
                  <div className="py-4 space-y-3">
                    <Link
                      to="/shop"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide py-2"
                    >
                      Shop
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide py-2"
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide py-2"
                    >
                      Contact
                    </Link>
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Main Content - All 7 Sections */}
        <main>
          {/* Section 1: Hero */}
          <HomeHero />

          {/* Section 2: DOX Features */}
          <DoxFeatures />

          {/* Section 3: DOX Video */}
          <DoxVideo />

          {/* Section 4: Product Carousel */}
          <ProductCarousel />

          {/* Section 5: Brand Philosophy */}
          <BrandPhilosophy />

          {/* Section 6: Trust Section */}
          <TrustSection />

          {/* Section 7: Final CTA */}
          <FinalCTA />
        </main>

        {/* Footer */}
        <PrelaunchFooter />
      </div>
    </>
  );
};

export default DoxLanding;
