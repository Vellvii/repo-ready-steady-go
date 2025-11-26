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

export default function PrelaunchLux() {
  return (
    <SmoothScroll>
      <PageTransition>
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-dark)' }}>
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
  );
}
