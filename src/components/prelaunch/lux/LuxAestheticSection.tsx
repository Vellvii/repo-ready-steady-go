import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";

export const LuxAestheticSection = () => {
  return (
    <section className="min-h-screen py-32 lg:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/8 to-transparent" />
      
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-32">
          <div className="text-center space-y-12 lg:space-y-16">
            <ScrollReveal>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white font-baskerville leading-[0.95]" style={{
                textShadow: '0 0 60px rgba(178, 145, 108, 0.3)'
              }}>
                Resting softly.
                <br />
                <span className="gradient-text">Returning stronger.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-8 text-2xl sm:text-3xl lg:text-4xl text-white/80 font-light leading-relaxed max-w-6xl mx-auto">
                <p>No messy cables. No awkward angles.</p>
                <p className="gradient-text text-3xl sm:text-4xl lg:text-5xl">Just a perfect, effortless connection.</p>
                <p>Every detail whispers purpose.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/60 italic leading-relaxed font-light max-w-5xl mx-auto">
                The VELLVII LUX keeps your favourites charged, warmed by anticipation, hidden from the world but prepared for you. It's a private ritual: you close the zip, and inside, your pleasure is quietly gathering power, pulsing back to life for the next time you need them.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-2xl sm:text-3xl lg:text-4xl gradient-text font-light leading-relaxed max-w-5xl mx-auto">
                Smarter charging. Stronger moments.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="pt-8">
                <LuxReserveCTA />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.6}>
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]" style={{
              boxShadow: 'var(--shadow-luxury)'
            }}>
              <CrossfadeCarousel 
                items={['/uploads/lux-lifestyle-final-v4.png']} 
                aspectRatio="aspect-[16/9]"
                className="rounded-none"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
