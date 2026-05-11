import { LuxHeroSection } from "@/components/prelaunch/lux/LuxHeroSection";
import { LuxPhilosophySection } from "@/components/prelaunch/lux/LuxPhilosophySection";
import { LuxMaterialsSection } from "@/components/prelaunch/lux/LuxMaterialsSection";
import { LuxAestheticSection } from "@/components/prelaunch/lux/LuxAestheticSection";
import { LuxPrivacyPocketSection } from "@/components/prelaunch/lux/LuxPrivacyPocketSection";
import { LuxJourneySection } from "@/components/prelaunch/lux/LuxJourneySection";
import { LuxMomentSection } from "@/components/prelaunch/lux/LuxMomentSection";
import { LuxFAQSection } from "@/components/prelaunch/lux/LuxFAQSection";
import { EmailCaptureSection } from "@/components/prelaunch/EmailCaptureSection";
import { LuxFooter } from "@/components/prelaunch/lux/LuxFooter";
import { PageTransition } from "@/components/animations/PageTransition";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { SEO } from "@/components/SEO";

const luxFaqs = [
  { question: "What is the Vellvii Lux?", answer: "The Vellvii Lux is a luxury pleasure storage system designed as premium bedroom furniture for discreet intimacy organization." },
  { question: "How is the Lux different from the Dox?", answer: "The Lux is a larger, furniture-grade storage system designed for high-end bedroom integration, while the Dox is a portable docking station." },
  { question: "When can I reserve the Lux?", answer: "The Vellvii Lux is currently in development. Join our mailing list for exclusive early access and launch notifications." },
];

export default function PrelaunchLux() {
  return (
    <>
      <SEO
        title="Luxury Pleasure Storage System | Vellvii Lux"
        description="Discover the Vellvii Lux - premium adult storage furniture for the discerning collector. Designer intimacy storage with privacy-focused design."
        canonical="/Vellvii-Lux"
        productData={{
          name: "Vellvii Lux",
          description: "Luxury pleasure storage furniture system for premium adult wellness and discreet bedroom organization.",
          availability: "PreOrder",
          brand: "Vellvii",
          images: ["/uploads/lux-lifestyle-final-v5.jpg"],
        }}
        faqData={luxFaqs}
      />
      <SmoothScroll>
        <PageTransition>
          <div className="min-h-screen relative overflow-hidden overflow-x-clip" style={{ background: 'var(--gradient-dark)' }}>
            {/* Animated mesh gradient overlay */}
            <div className="absolute inset-0 opacity-50 mesh-bg" style={{ background: 'var(--gradient-mesh)' }} />
            
            {/* Spotlight effect */}
            <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-spotlight)' }} />
            
            {/* Content */}
            <div className="relative z-10">
              <LuxHeroSection />
              <LuxPhilosophySection />
              <LuxMaterialsSection />
              <LuxAestheticSection />
              <LuxPrivacyPocketSection />
              <LuxJourneySection />
              <LuxMomentSection />
              <LuxFAQSection />
              <EmailCaptureSection />
              <LuxFooter />
            </div>
          </div>
        </PageTransition>
      </SmoothScroll>
    </>
  );
}
