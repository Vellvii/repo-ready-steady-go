import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimatedText } from "@/components/animations/AnimatedText";

export const LuxHeroSection = () => {
  const scrollToExplore = () => {
    const section = document.getElementById('lux-philosophy');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <ScrollReveal>
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white font-baskerville tracking-tight">
              LUX
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <AnimatedText 
              text="Flying Private? Keep it Private."
              className="text-4xl sm:text-5xl lg:text-6xl text-white/90 font-baskerville leading-tight"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-xl sm:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
              Seamlessly handcrafted in genuine leather. A sartorial declaration for those who travel beyond first class.
              <br />
              <span className="text-white/90 font-normal">LUX hides your essentials in plain sight - because true luxury lives in the unseen.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <MagneticButton
              onClick={scrollToExplore}
              className="group px-12 py-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-xl shadow-elegant hover:shadow-glow transition-all duration-700 pulse-glow relative overflow-hidden"
            >
              <span className="relative z-10">Explore LUX</span>
              <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </MagneticButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
