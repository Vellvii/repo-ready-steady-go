import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxAestheticSection = () => {
  return <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-10">
            <ScrollReveal>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-baskerville leading-tight">Resting softly.
Returning stronger.</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-4 text-xl sm:text-2xl text-white/80 font-light leading-relaxed">
                <p>No messy cables. No awkward angles. Just a perfect, effortless connection</p>
                <p>Every detail whispers purpose.</p>
                <p className="text-white/60 italic">The VELLVII LUX keeps your favourites charged, warmed by anticipation, hidden from the world but prepared for you. It’s a private ritual: you close the zip, and inside, your pleasure is quietly gathering power, pulsing back to life for the next time you need them.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto">Smarter charging. Stronger moments</p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <LuxReserveCTA />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="max-w-3xl mx-auto">
              <CrossfadeCarousel items={['/uploads/lux-lifestyle-final-v4.png']} aspectRatio="aspect-[4/3]" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>;
};