import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Fingerprint, Zap, Package, Shield, Palette } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Biometric Fingerprint Lock",
    description: "One touch. Only you. Total privacy with multi-fingerprint security.",
  },
  {
    icon: Zap,
    title: "Built-In Charging Dock",
    description: "USB-C charging cradles keep your devices powered and organized.",
  },
  {
    icon: Package,
    title: "Modular Interior",
    description: "Removable velvet-lined compartments adapt to any collection.",
  },
  {
    icon: Palette,
    title: "Designer Exterior",
    description: "Faux leather with rose-gold trims — a décor piece, not a secret.",
  },
  {
    icon: Shield,
    title: "Discreet & Elegant",
    description: "Sits on any shelf or nightstand. No one knows what's inside.",
  },
];

export const KSPFeatures = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-baskerville">
            What Makes the DOX Different
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-12 font-light">
            Not just storage — a <span className="font-semibold text-white/80">complete ecosystem</span> for intimate wellness
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={0.1 * index} direction="up">
              <div className="glass-dark border border-white/10 hover:border-primary/30 transition-all duration-300 hover-glow rounded-xl p-5 sm:p-6 h-full group">
                <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold font-baskerville text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
