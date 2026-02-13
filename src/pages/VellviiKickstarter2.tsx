import { ScrollHeader } from "@/components/ScrollHeader";
import { KS2SideIndex } from "@/components/kickstarter2/KS2SideIndex";
import { KS2Hero } from "@/components/kickstarter2/KS2Hero";
import { KS2Story } from "@/components/kickstarter2/KS2Story";
import { KS2Problem } from "@/components/kickstarter2/KS2Problem";
import { KS2Breakthrough } from "@/components/kickstarter2/KS2Breakthrough";
import { KS2DoxExplained } from "@/components/kickstarter2/KS2DoxExplained";
import { KS2Ecosystem } from "@/components/kickstarter2/KS2Ecosystem";
import { KS2Lifestyle } from "@/components/kickstarter2/KS2Lifestyle";
import { KS2Materials } from "@/components/kickstarter2/KS2Materials";
import { KS2Security } from "@/components/kickstarter2/KS2Security";
import { KS2Pricing } from "@/components/kickstarter2/KS2Pricing";
import { KS2LuxAddon } from "@/components/kickstarter2/KS2LuxAddon";
import { KS2WhyKickstarter } from "@/components/kickstarter2/KS2WhyKickstarter";
import { KS2Timeline } from "@/components/kickstarter2/KS2Timeline";
import { KS2Founder } from "@/components/kickstarter2/KS2Founder";
import { KS2FAQ } from "@/components/kickstarter2/KS2FAQ";
import { KS2FooterCTA } from "@/components/kickstarter2/KS2FooterCTA";
import { SEO } from "@/components/SEO";

const VellviiKickstarter2 = () => {
  return (
    <>
      <SEO
        title="Vellvii DOX - Kickstarter Campaign"
        description="Back the world's first biometric storage and docking system for intimate wellness. The Vellvii DOX: designed, not hidden. Launching on Kickstarter."
      />
      <div className="min-h-screen">
        <ScrollHeader />
        <KS2SideIndex />
        <KS2Hero />
        <KS2Story />
        <KS2Problem />
        <KS2Breakthrough />
        <KS2DoxExplained />
        <KS2Ecosystem />
        <KS2Lifestyle />
        <KS2Materials />
        <KS2Security />
        <KS2Pricing />
        <KS2LuxAddon />
        <KS2WhyKickstarter />
        <KS2Timeline />
        <KS2Founder />
        <KS2FAQ />
        <KS2FooterCTA />
      </div>
    </>
  );
};

export default VellviiKickstarter2;
