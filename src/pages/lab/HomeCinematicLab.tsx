import { SEO } from "@/components/SEO";
import { CinematicHero } from "@/components/lab/CinematicHero";
import { ModelPicks } from "@/components/lab/ModelPicks";
import { SplitBanner } from "@/components/lab/SplitBanner";
import { DesignFeature } from "@/components/lab/DesignFeature";
import { VideoTextReveal } from "@/components/lab/VideoTextReveal";
import { SocialAndNews } from "@/components/lab/SocialAndNews";
import { LifestyleBanner } from "@/components/lab/LifestyleBanner";

const HomeCinematicLab = () => {
  return (
    <>
      <SEO
        title="Lab | Cinematic Home Preview"
        description="Internal preview of a cinematic, scroll-driven home page treatment for Vellvii, modeled on the iCaur layout."
        canonical="/lab/home-cinematic"
        noindex
      />

      <div className="bg-black">
        <div className="fixed top-0 z-50 w-full bg-primary py-1 text-center font-montserrat text-xs font-semibold text-black">
          INTERNAL TEST PAGE — NOT LIVE — Current home page is untouched
        </div>

        <CinematicHero />
        <ModelPicks />
        <SplitBanner />

        <DesignFeature
          headline="Quiet by Design"
          body="Vellvii shapes aren't accidents, they're decisions. Faux leather, velvet-lined, and built for the bedside table — discretion in service of pleasure."
          mainImage="/uploads/Dox3.jpg"
          sideImages={["/uploads/Dox4.jpg", "/uploads/dox_with_toys_1.jpg"]}
        />

        <DesignFeature
          headline="Discreet by Nature"
          body="Biometric locking, fully lined storage, and a docking system built for two types of intimacy: the one you share, and the one you keep to yourself."
          mainImage="/uploads/Dox_white_open_plugged_in_content2.png"
          sideImages={["/uploads/Red_Dox_charge_inside.png", "/uploads/dox_with_toys_2.jpg"]}
          reverse
        />

        <VideoTextReveal />

        <SocialAndNews />

        <LifestyleBanner />

        <div className="flex min-h-[40vh] items-center justify-center bg-black px-6">
          <p className="max-w-md text-center font-montserrat text-white/60">
            End of cinematic home test. Placeholder footage and images — send real assets to swap in.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeCinematicLab;
