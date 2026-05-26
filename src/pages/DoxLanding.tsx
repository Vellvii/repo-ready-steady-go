import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { HomeHero } from "@/components/home/HomeHero";
import { DoxFeatures } from "@/components/home/DoxFeatures";
import { DoxVideo } from "@/components/home/DoxVideo";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { BrandPhilosophy } from "@/components/home/BrandPhilosophy";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCTA } from "@/components/home/FinalCTA";

const DoxLanding = () => {
  return (
    <>
      <SEO
        title="Vellvii | Luxury Wellness & Intimate Storage"
        description="Discover Vellvii - luxury wellness products and the DOX docking station featuring biometric security, integrated charging, and premium design. The Art of 'O'."
        canonical="/"
        noindex
        productData={{
          name: "Vellvii DOX",
          description: "Vellvii DOX - biometric sex toy lock box and bedroom storage hub with a faux leather exterior, velvet interior, VDS and DDS docking, and 3 internal USB-A charging ports powered by an external USB-C input.",
          availability: "PreOrder",
          brand: "Vellvii",
          images: ["/uploads/Dox1.jpg", "/uploads/Dox2.jpg", "/uploads/Dox3.jpg"],
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Scroll-aware Navigation Header */}
        <ScrollHeader />

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
