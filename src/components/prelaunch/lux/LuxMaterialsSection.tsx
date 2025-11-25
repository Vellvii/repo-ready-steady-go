import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const LuxMaterialsSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-dark)' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <ScrollReveal>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-baskerville leading-tight">
              Leather. Hardware. Legacy.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-2xl sm:text-3xl text-primary/90 font-light italic leading-relaxed">
              Immutable. Inviting. Irrevocably stylish.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto">
              From the supple texture of heritage leather to the satin-finish precision of every zipper and seam - LUX is handcrafted for those who will not settle for anything less than exceptional.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
