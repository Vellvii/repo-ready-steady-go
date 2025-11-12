import { HeroSection } from "@/components/prelaunch/HeroSection";
import { ProblemSection } from "@/components/prelaunch/ProblemSection";
import { ProductShowcase } from "@/components/prelaunch/ProductShowcase";
import { FeatureGrid } from "@/components/prelaunch/FeatureGrid";
import { EmailCaptureSection } from "@/components/prelaunch/EmailCaptureSection";
import { TechSpecs } from "@/components/prelaunch/TechSpecs";
import { TimelineSection } from "@/components/prelaunch/TimelineSection";
import { SocialProofSection } from "@/components/prelaunch/SocialProofSection";
import { FAQSection } from "@/components/prelaunch/FAQSection";
import { FinalCTA } from "@/components/prelaunch/FinalCTA";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { PageTransition } from "@/components/animations/PageTransition";

export default function PrelaunchDOX() {
  return (
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
        <EmailCaptureSection />
        <TechSpecs />
        <TimelineSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTA />
        <PrelaunchFooter />
        </div>
      </div>
    </PageTransition>
  );
}
