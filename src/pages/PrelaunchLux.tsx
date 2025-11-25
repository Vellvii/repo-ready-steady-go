import { LuxHeroSection } from "@/components/prelaunch/lux/LuxHeroSection";
import { LuxPhilosophySection } from "@/components/prelaunch/lux/LuxPhilosophySection";
import { LuxMaterialsSection } from "@/components/prelaunch/lux/LuxMaterialsSection";
import { LuxAestheticSection } from "@/components/prelaunch/lux/LuxAestheticSection";
import { LuxPrivacyPocketSection } from "@/components/prelaunch/lux/LuxPrivacyPocketSection";
import { LuxJourneySection } from "@/components/prelaunch/lux/LuxJourneySection";
import { LuxMomentSection } from "@/components/prelaunch/lux/LuxMomentSection";
import { EmailCaptureSection } from "@/components/prelaunch/EmailCaptureSection";
import { LuxFooter } from "@/components/prelaunch/lux/LuxFooter";
import { PageTransition } from "@/components/animations/PageTransition";

export default function PrelaunchLux() {
  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-dark)' }}>
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40" style={{ background: 'var(--gradient-mesh)' }} />
        
        {/* Content */}
        <div className="relative z-10">
          <LuxHeroSection />
          <LuxPhilosophySection />
          <LuxMaterialsSection />
          <LuxAestheticSection />
          <LuxPrivacyPocketSection />
          <LuxJourneySection />
          <LuxMomentSection />
          <EmailCaptureSection />
          <LuxFooter />
        </div>
      </div>
    </PageTransition>
  );
}
