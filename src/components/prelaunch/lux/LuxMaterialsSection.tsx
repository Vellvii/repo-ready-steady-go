import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxMaterialsSection = () => {
  return <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{
      background: 'var(--gradient-dark)'
    }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-8">
            <ScrollReveal>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-baskerville leading-tight">Your Pleasure.
Your Privacy.
Your Fingerprint.</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-2xl sm:text-3xl text-primary/90 font-light italic leading-relaxed">Because some things are for your eyes only..</p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto">With biometric fingerprint security, the VELLVII LUX responds only to your touch, your heat, your skin, your desire. One gentle press of your finger and it unlocks for you with the kind of obedience that feels… personal.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <LuxReserveCTA />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="max-w-3xl mx-auto">
              <CrossfadeCarousel items={['/uploads/lux-fingerprint-security-v2.mp4']} aspectRatio="aspect-[4/3]" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>;
};