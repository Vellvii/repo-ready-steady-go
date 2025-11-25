import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxMaterialsSection = () => {
  return (
    <section className="min-h-screen py-32 lg:py-48 relative overflow-hidden">
      {/* Dramatic dark background */}
      <div className="absolute inset-0" style={{
        background: 'var(--gradient-luxury)'
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-32">
          <div className="text-center space-y-12 lg:space-y-16">
            <ScrollReveal>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white font-baskerville leading-[0.95]" style={{
                textShadow: '0 0 80px rgba(178, 145, 108, 0.4)'
              }}>
                Your Pleasure.
                <br />
                Your Privacy.
                <br />
                <span className="gradient-text">Your Fingerprint.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-3xl sm:text-4xl lg:text-5xl gradient-text font-light italic leading-relaxed max-w-5xl mx-auto">
                Because some things are for your eyes only...
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 leading-relaxed font-light max-w-6xl mx-auto">
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
            <div className="max-w-6xl mx-auto glass-luxury rounded-3xl p-4 lg:p-8" style={{
              boxShadow: 'var(--shadow-massive)'
            }}>
              <CrossfadeCarousel 
                items={['/uploads/lux-fingerprint-security-v2.mp4']} 
                aspectRatio="aspect-[4/3]"
                className="rounded-2xl overflow-hidden"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};