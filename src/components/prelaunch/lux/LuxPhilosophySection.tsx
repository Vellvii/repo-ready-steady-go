import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxPhilosophySection = () => {
  return <section className="min-h-screen py-32 lg:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute inset-0 opacity-20" style={{
      background: 'var(--gradient-spotlight)'
    }} />
      
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-32">
          <div className="text-center space-y-12 lg:space-y-16">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-baskerville leading-tight" style={{
              textShadow: '0 0 60px rgba(178, 145, 108, 0.3)'
            }}>Designed for Sex Toys. 
            </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed font-light max-w-4xl mx-auto">The VELLVII LUX was designed for travel, crafted for privacy, and perfected for the minimalist who keeps only one or two treasured toys. </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed font-light max-w-4xl mx-auto">Deliberate by Nature. Exceptional by Design.
Where elegance meets intimacy.</p>
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
              <CrossfadeCarousel items={['/uploads/lux-philosophy-bag-v5.jpg']} aspectRatio="aspect-[16/9]" className="rounded-none" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>;
};