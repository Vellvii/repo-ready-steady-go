import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";

export const LuxJourneySection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-8">
            <ScrollReveal>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-baskerville leading-tight">
                Your Travel. Only Better.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto">
                From private jet terminals to city-penthouse arrivals, LUX carries your essentials with grace and silence.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-2 text-lg sm:text-xl text-white/80 font-light">
                <p>Nothing calls attention.</p>
                <p className="text-primary/90 font-normal">Everything commands presence.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <LuxReserveCTA />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
              <CrossfadeCarousel
                items={[
                  '/uploads/lux-bag-lifestyle-3.jpg',
                  '/uploads/lux-lifestyle-2-updated.png'
                ]}
                aspectRatio="aspect-[21/9]"
                className="rounded-none"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
