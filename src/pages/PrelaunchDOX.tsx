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
  { question: "What is the Vellvii Dox?", answer: "The Vellvii Dox is a luxury pleasure collection storage and docking station featuring biometric fingerprint lock, USB-C charging, and premium vegan leather with velvet interior." },
  { question: "How does the fingerprint lock work?", answer: "The biometric lock stores multiple fingerprints for secure, instant access. Only registered users can unlock the Dox, ensuring complete privacy." },
  { question: "Can I charge my toys inside the Dox?", answer: "Yes, the Dox features an embedded USB-C charging dock with dedicated cradle slots for Vellvii Pulse, Vibe, and G-Vibe products." },
  { question: "When will the Dox be available?", answer: "The Vellvii Dox is currently in pre-order phase. Reserve yours now for exclusive early access and special launch pricing." },
];

export default function PrelaunchDOX() {
  return (
    <>
      <SEO
        title="Pre-Order Luxury Pleasure Collection Storage | Vellvii Dox"
        description="Reserve the Vellvii Dox - premium docking station with fingerprint lock, charging dock, and designer storage. Exclusive prelaunch access."
        canonical="/prelaunch-dox"
        productData={{
          name: "Vellvii Dox Pre-Order",
          description: "Luxury pleasure collection storage prelaunch with biometric security, USB-C charging, and premium materials.",
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
