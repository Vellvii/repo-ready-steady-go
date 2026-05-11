import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxMaterialsSection = () => {
  return <section className="min-h-screen py-20 sm:py-28 lg:py-48 relative overflow-hidden">
      {/* Dramatic dark background */}
      <div className="absolute inset-0" style={{
      background: 'var(--gradient-luxury)'
    }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-14 sm:space-y-20 lg:space-y-32">
          <div className="text-center space-y-8 sm:space-y-12 lg:space-y-16">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-baskerville leading-tight" style={{
              textShadow: '0 0 80px rgba(178, 145, 108, 0.4)'
            }}> Your Fingerprint.</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl sm:text-2xl lg:text-3xl gradient-text font-light italic leading-relaxed max-w-4xl mx-auto">
                Because some things are for your eyes only...
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed font-light max-w-4xl mx-auto">
                With biometric fingerprint security, the VELLVII LUX responds only to your touch, your heat, your skin, your desire. One gentle press of your finger and it unlocks for you with the kind of obedience that feels… personal.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="pt-8">
                <LuxReserveCTA />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]" style={{
            boxShadow: 'var(--shadow-luxury)'
          }}>
              <CrossfadeCarousel items={['/uploads/lux-fingerprint-security-v2.mp4']} aspectRatio="aspect-[16/9]" className="rounded-none" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>;
};