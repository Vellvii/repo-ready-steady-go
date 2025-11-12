import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint, Zap, Package, Heart, Shield, Lightbulb } from "lucide-react";
const features = [{
  icon: Fingerprint,
  title: "The Future of Privacy. At Your Fingertip.",
  description: "One touch. One owner. Biometric security ensures your pleasure stays yours — always. No keys. No codes. Just your touch."
}, {
  icon: Zap,
  title: "The DDS — Dildo Docking Station",
  description: "The conscious evolution of pleasure engineering. Poured acrylic glass surface with tri-layer construction for flawless suction."
}, {
  icon: Package,
  title: "Faux Leather & Rose Gold",
  description: "High-quality waterproof faux leather exterior with stylish rose-gold trims and leather handle. Designed to be touched."
}, {
  icon: Heart,
  title: "A Sanctuary Within",
  description: "Soft velvet lining, golden accents, and removable inner tray. Every detail designed to respect what it holds."
}, {
  icon: Shield,
  title: "Vellvii-Branded Lock",
  description: "Uniquely designed biometric lock system. It's not just smart — it's personal. Total control at your fingertips."
}, {
  icon: Lightbulb,
  title: "Wireless Charging Intelligence",
  description: "Charge your collection seamlessly. No cables, no clutter — just elegance and function in perfect harmony."
}];
export const FeatureGrid = () => {
  return <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-baskerville">
            Elegant — Empowering — Luxurious
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-16 font-light">
            It's more than storage, it's <span className="font-semibold text-white/80">a revolution in intimate design</span>
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => <ScrollReveal key={feature.title} delay={0.1 * index} direction="up">
              <Card className="glass-dark border-white/10 hover:border-primary/30 transition-all duration-300 hover-glow h-full group">
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-baskerville text-zinc-800">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-neutral-600 font-light">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>)}
        </div>
      </div>
    </section>;
};