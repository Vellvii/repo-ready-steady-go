import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const LuxAestheticSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <ScrollReveal>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-baskerville leading-tight">
              Minimalism Meets Mastery.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-4 text-xl sm:text-2xl text-white/80 font-light leading-relaxed">
              <p>Every line echoes intention.</p>
              <p>Every detail whispers purpose.</p>
              <p className="text-white/60 italic">No logos shouting. No flair for show. Just perfect refinement.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto">
              LUX is built to complement your journey, not define it.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
