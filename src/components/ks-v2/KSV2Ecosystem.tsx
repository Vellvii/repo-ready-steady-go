import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";
import { KSPPriceSticker } from "@/components/ks-prelaunch/KSPPriceSticker";

const products = [
  { name: "Pulse", tagline: "Deep Resonant Vibration", image: "/uploads/PinkPulseBack.png", price: "$99", retail: "$169" },
  { name: "G-Vibe", tagline: "Precision G-Spot", image: "/uploads/PinkGVibeSide.png", price: "$99", retail: "$169" },
  { name: "Evolve", tagline: "Adaptive Pleasure", image: "/uploads/PinkEvolve2PSide.png", price: "$99", retail: "$169" },
];

export const KSV2Ecosystem = () => {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(40 65% 72% / 0.3), transparent)" }}
      />

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 60%, hsl(350 50% 50% / 0.06), transparent 70%)" }} />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-primary/60 text-xs font-bold tracking-[0.4em] uppercase">03</span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center mb-4 leading-[0.95] tracking-tight">
            The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Collection
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/50 text-center max-w-2xl mx-auto mb-16 font-light">
            Three devices. One ecosystem. All dock, charge, and live inside the DOX.
          </p>
        </ScrollReveal>

        {/* Product cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.12}>
              <motion.div
                className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden group"
                whileHover={{ y: -8, borderColor: "rgba(178,145,108,0.3)" }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative aspect-square flex items-center justify-center p-8">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center 60%, hsl(40 65% 72% / 0.1), transparent 60%)" }} />
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain mix-blend-lighten group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 pt-0 text-center">
                  <p className="text-white font-bold text-lg">{p.name}</p>
                  <p className="text-white/40 text-sm font-light mb-4">{p.tagline}</p>
                  <div className="flex justify-center">
                    <KSPPriceSticker
                      retailPrice={p.retail}
                      kickstarterPrice="$129"
                      vipPrice={p.price}
                      rotation={i === 0 ? -2 : i === 1 ? 1.5 : -1}
                      size="sm"
                    />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bundle callout */}
        <ScrollReveal delay={0.6}>
          <div className="mt-16 flex justify-center">
            <KSPPriceSticker
              label="Full Ecosystem"
              retailPrice="$749"
              kickstarterPrice="$499"
              vipPrice="$399"
              rotation={-2}
              size="lg"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
