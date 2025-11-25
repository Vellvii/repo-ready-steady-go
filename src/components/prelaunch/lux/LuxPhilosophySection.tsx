import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxPhilosophySection = () => {
  return <section id="lux-philosophy" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-8">
            <ScrollReveal>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-baskerville leading-tight">Designed for Sex Toys. Deliberate by Nature — Exceptional by Design.</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto">Your expensive toys deserve a home that respects them—something worthy of their quality, not an afterthought. LUX was designed for travel, crafted for privacy, and perfected for the minimalist who keeps only one or two treasured toys. Every line, every fold, every detail exists with intention. It’s discreet yet sophisticated, soft to the touch yet strong enough to protect what matters.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed font-light italic">Where elegance meets intimacy.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <LuxReserveCTA />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="max-w-3xl mx-auto">
              <CrossfadeCarousel items={['/public/uploads/Dox_white_lifestyle1.jpg', '/public/uploads/dox_with_toys_1.jpg']} aspectRatio="aspect-[4/3]" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>;
};