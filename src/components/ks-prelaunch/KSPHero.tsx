import { AnimatedText } from "@/components/animations/AnimatedText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const KSPHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
        <div className="text-center space-y-8">
          <ScrollReveal delay={0.1}>
            <p className="text-primary text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
              Coming to Kickstarter
            </p>
          </ScrollReveal>

          <AnimatedText
            text="Problem Solved."
            className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold text-white leading-[1] tracking-tight mx-auto justify-center"
            delay={0.3}
          />

          <ScrollReveal delay={0.6}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed font-baskerville">
              No more suction cups on shower walls.
              <br className="hidden sm:block" />
              No more shoeboxes under the bed.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8}>
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
              <p className="text-white/40 text-sm uppercase tracking-widest font-semibold">
                Scroll to discover
              </p>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
