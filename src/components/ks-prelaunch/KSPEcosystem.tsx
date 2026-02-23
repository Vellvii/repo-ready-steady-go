import { ScrollReveal } from "@/components/animations/ScrollReveal";
import doxOpenToys from "@/assets/dox-open-toys.png";

export const KSPEcosystem = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <ScrollReveal>
          <p className="text-primary/60 text-xs uppercase tracking-[0.4em] font-semibold text-center mb-6">
            Chapter 03 — The Ecosystem
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white text-center mb-6 font-baskerville leading-tight">
            Everything Works Together
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-14 font-light leading-relaxed">
            The DOX isn't just storage — it's a complete ecosystem. Every device docks, charges, and
            lives elegantly inside. No more improvising.
          </p>
        </ScrollReveal>

        {/* Ecosystem image */}
        <ScrollReveal delay={0.35}>
          <div className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-float ring-1 ring-white/10 mb-14">
            <img
              src={doxOpenToys}
              alt="Vellvii DOX open with full collection inside"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </ScrollReveal>

        {/* Prototype videos */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-14">
          <ScrollReveal delay={0.4}>
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-float">
              <video
                src="/uploads/dox-animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-float">
              <video
                src="/uploads/dox-open-animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Super Early Bird Pricing */}
        <ScrollReveal delay={0.55}>
          <div className="text-center mb-4">
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-6">
              Super Early Bird — Limited Quantities
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <PricingBadge label="DOX Only" price="$149" originalPrice="$299" />
            <PricingBadge label="Pleasure Device" price="$99" originalPrice="$169" />
            <PricingBadge label="Full Ecosystem" price="$399" originalPrice="$699" highlight />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const PricingBadge = ({
  label,
  price,
  originalPrice,
  highlight = false,
}: {
  label: string;
  price: string;
  originalPrice: string;
  highlight?: boolean;
}) => (
  <div
    className={`px-5 py-4 rounded-xl text-center min-w-[130px] sm:min-w-[150px] ${
      highlight ? "glass-accent border-primary/30" : "glass-dark border-white/10"
    } border`}
  >
    <p className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-1">{label}</p>
    <div className="flex items-center justify-center gap-2">
      <span className="text-white/40 text-sm line-through">{originalPrice}</span>
      <span className="text-white text-2xl font-bold font-baskerville">{price}</span>
    </div>
    {highlight && (
      <p className="text-primary text-[10px] uppercase tracking-widest mt-1 font-bold">Best Value</p>
    )}
  </div>
);
