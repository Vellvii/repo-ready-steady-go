import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const LuxPhilosophySection = () => {
  return (
    <section id="lux-philosophy" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <ScrollReveal>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-baskerville leading-tight">
              Luxury is Quiet. Power is Private.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto">
              For the elite, discretion is the ultimate signature. LUX was born for moments when the journey matters more than the destination.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-lg sm:text-xl text-white/60 leading-relaxed font-light italic">
              When the handshake isn't enough. When arrival is just the beginning.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
