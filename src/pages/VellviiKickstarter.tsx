import { ScrollHeader } from "@/components/ScrollHeader";
import { KickstarterSideIndex } from "@/components/kickstarter/KickstarterSideIndex";
import { KickstarterHero } from "@/components/kickstarter/KickstarterHero";
import { KickstarterStory } from "@/components/kickstarter/KickstarterStory";
import { KickstarterProblem } from "@/components/kickstarter/KickstarterProblem";
import { KickstarterBreakthrough } from "@/components/kickstarter/KickstarterBreakthrough";
import { KickstarterDoxExplained } from "@/components/kickstarter/KickstarterDoxExplained";
import { KickstarterEcosystem } from "@/components/kickstarter/KickstarterEcosystem";
import { KickstarterLifestyle } from "@/components/kickstarter/KickstarterLifestyle";
import { KickstarterMaterials } from "@/components/kickstarter/KickstarterMaterials";
import { KickstarterSecurity } from "@/components/kickstarter/KickstarterSecurity";
import { KickstarterPricing } from "@/components/kickstarter/KickstarterPricing";
import { KickstarterLuxAddon } from "@/components/kickstarter/KickstarterLuxAddon";
import { KickstarterWhyKickstarter } from "@/components/kickstarter/KickstarterWhyKickstarter";
import { KickstarterTimeline } from "@/components/kickstarter/KickstarterTimeline";
import { KickstarterFounder } from "@/components/kickstarter/KickstarterFounder";
import { KickstarterFAQ } from "@/components/kickstarter/KickstarterFAQ";
import { KickstarterFooterCTA } from "@/components/kickstarter/KickstarterFooterCTA";
import { SEO } from "@/components/SEO";

const VellviiKickstarter = () => {
  return (
    <>
      <SEO
        title="Vellvii DOX - Kickstarter Campaign"
        description="Back the world's first biometric storage and docking system for intimate wellness. The Vellvii DOX: designed, not hidden. Launching on Kickstarter."
      />
      <div className="min-h-screen bg-background">
        <ScrollHeader />
        <KickstarterSideIndex />

        <KickstarterHero />
        <KickstarterStory />
        <KickstarterProblem />
        <KickstarterBreakthrough />
        <KickstarterDoxExplained />
        <KickstarterEcosystem />
        <KickstarterLifestyle />
        <KickstarterMaterials />
        <KickstarterSecurity />
        <KickstarterPricing />
        <KickstarterLuxAddon />
        <KickstarterWhyKickstarter />
        <KickstarterTimeline />
        <KickstarterFounder />
        <KickstarterFAQ />
        <KickstarterFooterCTA />
      </div>
    </>
  );
};

export default VellviiKickstarter;
