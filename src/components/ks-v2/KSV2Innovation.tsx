import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";
import { Fingerprint, Plug, Lock, Gem } from "lucide-react";
import doxCloseUp from "@/assets/dox-close-up.webp";
import { KSPPriceSticker } from "@/components/ks-prelaunch/KSPPriceSticker";

const features = [
  { icon: Plug, label: "Docking", desc: "Built-in mounts for suction cups to saddle toys." },
  { icon: Fingerprint, label: "Biometric Lock", desc: "Programmable fingerprint. Total privacy." },
  { icon: Lock, label: "USB-C Charging", desc: "One cable charges multiple toys inside." },
  { icon: Gem, label: "Luxury Design", desc: "Created as a masterpiece, not an afterthought." },
];

export const KSV2Innovation = () => {
  return (
    <section className="py-24 md:py-36 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(40 65% 72% / 0.3), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <ScrollReveal>
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-primary/60 text-xs font-bold tracking-[0.4em] uppercase">02</span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center mb-4 leading-[0.95] tracking-tight">
            More Than a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Product
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/50 text-center max-w-2xl mx-auto mb-16 font-light">
            The world's first biometric storage & docking system for intimate wellness.
          </p>
        </ScrollReveal>

        {/* Two-column: image + features */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal delay={0.3}>
            <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <img src={doxCloseUp} alt="Vellvii DOX close-up" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          <div className="space-y-5">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={0.3 + i * 0.1}>
                <motion.div
                  className="flex items-start gap-5 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 group"
                  whileHover={{ x: 6 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500"
                    style={{ background: "linear-gradient(135deg, hsl(40 70% 75% / 0.15), hsl(350 50% 60% / 0.1))" }}
                  >
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base mb-1">{f.label}</p>
                    <p className="text-white/40 text-sm font-light leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Price sticker */}
        <ScrollReveal delay={0.6}>
          <div className="mt-16 flex justify-center">
            <KSPPriceSticker
              label="The DOX"
              retailPrice="$299"
              kickstarterPrice="$199"
              vipPrice="$149"
              rotation={3}
              size="lg"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
