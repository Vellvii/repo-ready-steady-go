import { NovaCarousel } from "./NovaGiftBlock";

interface LuxNovaPairingProps {
  luxImageUrl?: string;
  luxAlt?: string;
}

/**
 * Side-by-side proof shot: the Lux on the left, the Nova on the right.
 * Visually communicates "these belong together" before the CTA.
 */
export const LuxNovaPairing = ({ luxImageUrl, luxAlt }: LuxNovaPairingProps) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <p className="font-montserrat text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-2">
            The Pairing
          </p>
          <h2 className="font-baskerville text-light-primary text-2xl sm:text-3xl md:text-4xl">
            Designed to belong together.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 items-stretch">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-card/50 aspect-square">
            {luxImageUrl ? (
              <img
                src={luxImageUrl}
                alt={luxAlt || "Vellvii Lux biometric leather case"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-card/60" />
            )}
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <p className="font-baskerville text-light-primary text-sm sm:text-base bg-background/60 backdrop-blur-sm rounded-full py-1 px-3 inline-block">
                The Lux
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-primary/30 bg-card/50 aspect-square flex items-center justify-center p-4 sm:p-6">
            <NovaCarousel heightClass="max-h-full" />
            <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
              <p className="font-baskerville text-light-primary text-sm sm:text-base bg-background/60 backdrop-blur-sm rounded-full py-1 px-3 inline-block">
                The Nova - Free Gift
              </p>
            </div>
          </div>
        </div>

        <p className="font-baskerville italic text-light-secondary text-center text-sm sm:text-base mt-5 sm:mt-6">
          The Lux holds. The Nova travels inside. One purchase, two pieces.
        </p>
      </div>
    </section>
  );
};

export default LuxNovaPairing;
