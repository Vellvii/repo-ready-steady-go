import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxJourneySection = () => {
  return (
    <section className="min-h-screen py-20 sm:py-28 lg:py-48 relative overflow-hidden">
      {/* Hero gradient */}
      <div className="absolute inset-0" style={{
        background: 'var(--gradient-hero)'
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-14 sm:space-y-20 lg:space-y-32">
          <div className="text-center space-y-8 sm:space-y-12 lg:space-y-16">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-baskerville leading-tight" style={{
                textShadow: '0 0 60px rgba(178, 145, 108, 0.3)'
              }}>
                For the woman who packs confidence
                <br />
                <span className="gradient-text">and carries desire.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed font-light max-w-4xl mx-auto">
                From private jet terminals to city-penthouse arrivals, The VELLVII LUX carries your essentials with grace and silence.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-6 text-lg sm:text-xl lg:text-2xl font-light max-w-4xl mx-auto">
                <p className="text-white/70">Nothing calls attention.</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl gradient-text font-normal">Everything commands presence.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="pt-8">
                <LuxReserveCTA />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]" style={{
              boxShadow: 'var(--shadow-massive)'
            }}>
              <CrossfadeCarousel 
                items={[
                  '/uploads/lux-travel-suitcase.png',
                  '/uploads/lux-lifestyle-2.jpg',
                  '/uploads/lux-travel-lifestyle-hotel.jpg'
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