import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { CountdownTimer } from "./CountdownTimer";

export const FinalCTA = () => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-40" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-baskerville leading-[1.1] tracking-tight">
              The Future is Coming in 2026
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed">
              Because some things should feel as beautiful as they are private
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <CountdownTimer targetDate="2026-06-15T00:00:00" size="small" />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <MagneticButton
              onClick={scrollToEmailCapture}
              className="group px-12 py-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-xl shadow-elegant hover:shadow-glow transition-all duration-700 pulse-glow relative overflow-hidden"
            >
              <span className="relative z-10">Reserve Your DOX Now</span>
              <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </MagneticButton>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="text-white/50 text-lg font-light">
              Join the waitlist to receive exclusive updates on this revolutionary design
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
