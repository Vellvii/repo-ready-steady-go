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

const VellviiKickstarter2 = () => {
  return (
    <>
      <SEO
        title="Vellvii DOX - Kickstarter Campaign"
        description="Back the world's first biometric storage and docking system for intimate wellness. The Vellvii DOX: designed, not hidden. Launching on Kickstarter."
      />
      {/* Light theme override scoped to this page */}
      <div
        className="min-h-screen ks-light-theme"
        style={{
          // @ts-ignore CSS custom properties
          "--background": "30 20% 96%",
          "--foreground": "15 25% 15%",
          "--primary": "32 60% 52%",
          "--primary-foreground": "0 0% 100%",
          "--secondary": "30 40% 70%",
          "--secondary-foreground": "15 25% 15%",
          "--accent": "25 55% 58%",
          "--accent-foreground": "0 0% 100%",
          "--muted": "30 15% 90%",
          "--muted-foreground": "15 15% 50%",
          "--border": "30 15% 88%",
          "--input": "30 15% 92%",
          "--ring": "32 60% 52%",
          "--card": "30 20% 98%",
          "--card-foreground": "15 25% 15%",
          "--popover": "30 20% 98%",
          "--popover-foreground": "15 25% 15%",
        } as React.CSSProperties}
      >
        <style>{`
          .ks-light-theme {
            background: hsl(30, 20%, 96%);
            color: hsl(15, 25%, 15%);
          }
          
          /* Override dark surface utilities */
          .ks-light-theme .surface-dark-rich {
            background: hsl(30, 18%, 93%) !important;
          }
          
          /* Light text tokens override */
          .ks-light-theme .text-light-primary {
            color: hsl(15, 25%, 12%) !important;
          }
          .ks-light-theme .text-light-secondary {
            color: hsl(15, 20%, 30%) !important;
          }
          .ks-light-theme .text-light-muted {
            color: hsl(15, 12%, 48%) !important;
          }
          
          /* Gradient text override */
          .ks-light-theme .gradient-text {
            background: linear-gradient(135deg, hsl(32, 60%, 48%), hsl(25, 65%, 55%)) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
          }
          
          /* Glass panels light mode */
          .ks-light-theme .glass-dark,
          .ks-light-theme .glass-accent {
            background: hsl(30, 20%, 98%) !important;
            border-color: hsl(30, 15%, 88%) !important;
          }
          .ks-light-theme .glass-accent {
            border-color: hsl(32, 50%, 72%) !important;
          }
          
          /* Border overrides for subtle cards */
          .ks-light-theme [class*="border-white\\/"] {
            border-color: hsl(30, 15%, 88%) !important;
          }
          .ks-light-theme [class*="bg-white\\/"] {
            background-color: hsl(30, 20%, 98%) !important;
          }
          
          /* Button overrides */
          .ks-light-theme .btn-premium {
            background: linear-gradient(135deg, hsl(32, 60%, 48%), hsl(25, 55%, 52%)) !important;
            color: white !important;
          }
          
          /* Hero overlay adjustments */
          .ks-light-theme #hero .bg-gradient-to-b {
            background: linear-gradient(to bottom, 
              hsla(30, 20%, 96%, 0.3), 
              hsla(30, 20%, 96%, 0.1), 
              hsla(30, 20%, 96%, 0.6)) !important;
          }
          
          /* Side index adjustments */
          .ks-light-theme .bg-white\\/15,
          .ks-light-theme .bg-white\\/20 {
            background-color: hsl(15, 15%, 70%) !important;
          }
          
          /* Accordion borders */
          .ks-light-theme [data-radix-collection-item] {
            border-color: hsl(30, 15%, 88%) !important;
            background: hsl(30, 20%, 98%) !important;
          }
          
          /* Footer CTA keep dark for contrast */
          .ks-light-theme section:last-of-type {
            color: white;
          }
          .ks-light-theme section:last-of-type .text-light-primary {
            color: hsl(0, 0%, 95%) !important;
          }
          .ks-light-theme section:last-of-type .text-light-muted {
            color: hsl(0, 0%, 70%) !important;
          }
        `}</style>

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

export default VellviiKickstarter2;
