import { SEO } from "@/components/SEO";
import { DoxScrollScrubHero } from "@/components/lab/DoxScrollScrubHero";

const DoxAnimationLab = () => {
  return (
    <>
      <SEO
        title="Lab | DOX Scroll Animation"
        description="Internal preview of the scroll-scrubbed DOX reveal animation."
        canonical="/lab/dox-animation"
        noindex
      />

      <div className="bg-black">
        <div className="fixed top-0 z-50 w-full bg-primary py-1 text-center font-montserrat text-xs font-semibold text-black">
          INTERNAL TEST PAGE — NOT LIVE
        </div>

        <DoxScrollScrubHero />

        <div className="flex min-h-[60vh] items-center justify-center bg-surface-dark px-6">
          <p className="max-w-md text-center font-montserrat text-white/60">
            End of scroll-scrub test section. Scroll back up to replay the reveal.
          </p>
        </div>
      </div>
    </>
  );
};

export default DoxAnimationLab;
