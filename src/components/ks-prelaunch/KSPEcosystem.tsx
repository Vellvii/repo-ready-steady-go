import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ImageIcon } from "lucide-react";

export const KSPEcosystem = () => {
  const products = [
    { name: "Vellvii Pulse", tagline: "Deep, Resonant Vibration" },
    { name: "Vellvii G-Vibe", tagline: "Precision G-Spot Stimulation" },
    { name: "Vellvii Evolve", tagline: "Adaptive Pleasure, Redefined" },
  ];

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <ScrollReveal>
          <p className="text-primary/60 text-xs uppercase tracking-[0.4em] font-semibold text-center mb-6">
            Chapter 03 — The Collection
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white text-center mb-6 font-baskerville leading-tight">
            Our <span className="gradient-text">Pleasure Collection</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-14 font-light leading-relaxed">
            Three devices, one ecosystem. Each crafted for a distinct sensation — all designed to dock, charge, and live inside the DOX.
          </p>
        </ScrollReveal>

        {/* Product placeholders */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-14">
          {products.map((product, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.1}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/[0.03] flex flex-col items-center justify-center gap-4 group hover:ring-primary/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-primary/40" />
                </div>
                <div className="text-center px-4">
                  <p className="text-white font-baskerville font-bold text-lg mb-1">{product.name}</p>
                  <p className="text-white/40 text-sm font-light">{product.tagline}</p>
                </div>
                <p className="text-white/20 text-[10px] uppercase tracking-widest">Image coming soon</p>
              </div>
            </ScrollReveal>
          ))}
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
