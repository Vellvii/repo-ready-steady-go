import { HeroSection } from "@/components/prelaunch/HeroSection";
import { ProblemSection } from "@/components/prelaunch/ProblemSection";
import { ProductShowcase } from "@/components/prelaunch/ProductShowcase";
import { FeatureGrid } from "@/components/prelaunch/FeatureGrid";
import { TechSpecs } from "@/components/prelaunch/TechSpecs";
import { TimelineSection } from "@/components/prelaunch/TimelineSection";
import { SocialProofSection } from "@/components/prelaunch/SocialProofSection";
import { FAQSection } from "@/components/prelaunch/FAQSection";
import { FinalCTA } from "@/components/prelaunch/FinalCTA";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { PageTransition } from "@/components/animations/PageTransition";
import { SEO } from "@/components/SEO";

const doxFaqs = [
  { question: "What is the Vellvii Dox?", answer: "The Vellvii Dox is a luxury pleasure collection storage and docking hub with a faux leather exterior and rose gold accents, a velvet-lined interior with a movable velvet-lined tray, biometric fingerprint lock, and internal USB-A charging powered by an exterior USB-C input." },
  { question: "How does the fingerprint lock work?", answer: "The biometric lock stores up to 10 fingerprints for secure, instant access. Only registered users can unlock the Dox, ensuring complete privacy." },
  { question: "Can I charge my toys inside the Dox?", answer: "Yes. A USB-C input on the exterior of the Dox (opposite the lock) feeds 3 internal USB-A ports, so toys can be plugged in with their own chargers and charged securely inside." },
  { question: "How do the VDS and DDS work?", answer: "The VDS and DDS are suction-base mounting stations that sit atop the Dox. The VDS is shaped for compatible Vellvii pieces; the DDS supports compatible suction-base products up to 90mm (approximately 3.5 inches) in diameter." },
  { question: "When will the Dox be available?", answer: "The Vellvii Dox is currently in pre-order phase. Reserve yours now for exclusive early access and special launch pricing." },
];

export default function PrelaunchDOX() {
  return (
    <>
      <SEO
        title="Pre-Order Luxury Pleasure Collection Storage | Vellvii Dox"
        description="Reserve the Vellvii Dox - premium docking station with fingerprint lock, charging dock, and designer storage. Exclusive prelaunch access."
        canonical="/products/vellvii-dox"
        noindex
        productData={{
          name: "Vellvii Dox Pre-Order",
          description: "Luxury pleasure collection storage prelaunch - faux leather with rose gold accents, velvet-lined interior, biometric lock, internal USB-A charging via exterior USB-C, with VDS and DDS top-mounted suction stations.",
          availability: "PreOrder",
          brand: "Vellvii",
          images: ["/uploads/Dox1.jpg", "/uploads/Dox2.jpg"],
        }}
        faqData={doxFaqs}
      />
      <PageTransition>
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-dark)' }}>
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 opacity-40" style={{ background: 'var(--gradient-mesh)' }} />
          
          {/* Content */}
          <div className="relative z-10">
            <HeroSection />
            <ProblemSection />
            <ProductShowcase />
            <FeatureGrid />
            <TechSpecs />
            <TimelineSection />
            <SocialProofSection />
            <FAQSection />
            <FinalCTA />
            <PrelaunchFooter />
          </div>
        </div>
      </PageTransition>
    </>
  );
}
