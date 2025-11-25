import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";

export const LuxMomentSection = () => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
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

          <ScrollReveal delay={0.5}>
            <MagneticButton
              onClick={scrollToEmailCapture}
              className="group px-12 py-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-xl shadow-elegant hover:shadow-glow transition-all duration-700 pulse-glow relative overflow-hidden"
            >
              <span className="relative z-10">Own LUX</span>
              <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </MagneticButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
