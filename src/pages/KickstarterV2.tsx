import { KSV2Hero } from "@/components/ks-v2/KSV2Hero";
import { KSV2Problem } from "@/components/ks-v2/KSV2Problem";
import { KSV2Innovation } from "@/components/ks-v2/KSV2Innovation";
import { KSV2Ecosystem } from "@/components/ks-v2/KSV2Ecosystem";
import { KSV2FooterCTA } from "@/components/ks-v2/KSV2FooterCTA";
import { KSV2StickyBar } from "@/components/ks-v2/KSV2StickyBar";
import { PageTransition } from "@/components/animations/PageTransition";
import { SEO } from "@/components/SEO";

const KickstarterV2 = () => {
  return (
    <>
      <SEO
        title="Vellvii DOX — Intimacy Redefined | Kickstarter"
        description="A new era in sexual wellness and luxury design. Super Early Bird pricing from $149 on Kickstarter."
      />
      <PageTransition>
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
          <KSV2Hero />
          <KSV2Problem />
          <KSV2Innovation />
          <KSV2Ecosystem />
          <KSV2FooterCTA />
          <KSV2StickyBar />
        </div>
      </PageTransition>
    </>
  );
};

export default KickstarterV2;
