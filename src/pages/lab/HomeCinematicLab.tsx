import { SEO } from "@/components/SEO";
import { CinematicHero } from "@/components/lab/CinematicHero";
import { VideoTextReveal } from "@/components/lab/VideoTextReveal";
import { PosterMoment } from "@/components/lab/PosterMoment";

const HomeCinematicLab = () => {
  return (
    <>
      <SEO
        title="Lab | Cinematic Home Preview"
        description="Internal preview of a cinematic, scroll-driven home page treatment for Vellvii."
        canonical="/lab/home-cinematic"
        noindex
      />

      <div className="bg-black">
        <div className="fixed top-0 z-50 w-full bg-primary py-1 text-center font-montserrat text-xs font-semibold text-black">
          INTERNAL TEST PAGE — NOT LIVE — Current home page is untouched
        </div>

        <CinematicHero />

        <VideoTextReveal />

        <PosterMoment
          eyebrow="BIOMETRIC SECURITY"
          headline="Touch is the only key."
          body="Advanced fingerprint technology ensures only you have access, every time, instantly."
          image="/uploads/Dox_black_shelf_close_up.png"
        />

        <PosterMoment
          eyebrow="FAUX LEATHER, VELVET-LINED"
          headline="Crafted for the bedside table."
          body="Faux leather exterior with rose gold accents, fully velvet-lined within."
          image="/uploads/Dox_white_lifestyle1.jpg"
          reverse
        />

        <div className="flex min-h-[60vh] items-center justify-center bg-black px-6">
          <p className="max-w-md text-center font-montserrat text-white/60">
            End of cinematic home test. Placeholder footage and images — send real assets to swap in.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeCinematicLab;
