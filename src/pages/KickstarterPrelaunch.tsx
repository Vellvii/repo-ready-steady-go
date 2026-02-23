import { KSPHero } from "@/components/ks-prelaunch/KSPHero";
import { KSPProblem } from "@/components/ks-prelaunch/KSPProblem";
import { KSPFeatures } from "@/components/ks-prelaunch/KSPFeatures";
import { KSPCredibility } from "@/components/ks-prelaunch/KSPCredibility";
import { KSPFooterCTA } from "@/components/ks-prelaunch/KSPFooterCTA";
import { KSPStickyBar } from "@/components/ks-prelaunch/KSPStickyBar";
import { PageTransition } from "@/components/animations/PageTransition";
import { SEO } from "@/components/SEO";

const KickstarterPrelaunch = () => {
  return (
    <>
      <SEO
        title="Vellvii DOX — Back Us on Kickstarter"
        description="The world's first biometric storage & docking system for intimate wellness. Super Early Bird pricing from $99. Notify me on launch."
      />
      <PageTransition>
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-dark)' }}>
          <div className="absolute inset-0 opacity-40" style={{ background: 'var(--gradient-mesh)' }} />
          <div className="relative z-10">
            <KSPHero />
            <KSPProblem />
            <KSPFeatures />
            <KSPCredibility />
            <KSPFooterCTA />
          </div>
          <KSPStickyBar />
        </div>
      </PageTransition>
    </>
  );
};

export default KickstarterPrelaunch;
