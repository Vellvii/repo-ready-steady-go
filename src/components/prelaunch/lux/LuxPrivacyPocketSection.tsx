import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxPrivacyPocketSection = () => {
  return (
    <section className="min-h-screen py-32 lg:py-48 relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="absolute inset-0 opacity-20" style={{ background: 'var(--gradient-spotlight)' }} />
      
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-32">
          <div className="text-center space-y-12 lg:space-y-16">
            <ScrollReveal>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white font-baskerville leading-[0.95]" style={{
                textShadow: '0 0 60px rgba(178, 145, 108, 0.3)'
              }}>
                The <span className="gradient-text">Privacy Pocket</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-2xl sm:text-3xl lg:text-4xl text-white/80 leading-relaxed font-light max-w-6xl mx-auto">
                A dedicated Privacy Pocket that lets you "reach for a condom" without ever opening your bag or revealing what's inside.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-3xl sm:text-4xl lg:text-5xl gradient-text italic leading-relaxed font-light">
                Because readiness is a sexy luxury.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="pt-8">
                <LuxReserveCTA />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="max-w-6xl mx-auto glass-accent rounded-3xl p-4 lg:p-8" style={{
              boxShadow: 'var(--shadow-elegant)'
            }}>
              <CrossfadeCarousel 
                items={['/uploads/lux-privacy-pocket-lifestyle.jpg']} 
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