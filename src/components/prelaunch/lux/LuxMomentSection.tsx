import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";

export const LuxMomentSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-10">
            <ScrollReveal>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-baskerville leading-tight">
                Unzip. Step. Reveal.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto">
                A quick pulse of movement. A hint of golden hardware. A neatly folded interior under the soft glow of warm lighting.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-light italic">
                When you open LUX, you don't just unpack - you arrive.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <LuxReserveCTA className="text-xl" />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="max-w-3xl mx-auto">
              <CrossfadeCarousel
                items={[
                  '/uploads/dox-open-animation.mp4',
                  '/uploads/Dox_white_open_plugged_in_content2.png'
                ]}
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
