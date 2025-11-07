import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { CountdownTimer } from "./CountdownTimer";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const HeroSection = () => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(12,55%,70%)]/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left space-y-8">
            <ScrollReveal delay={0.2}>
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <p className="text-primary text-sm font-medium">Launching 2026</p>
              </div>
            </ScrollReveal>

            <AnimatedText 
              text="Pleasure: Redefined"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              delay={0.4}
            />

            <ScrollReveal delay={0.6}>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto lg:mx-0">
                The Most Creative, Most Luxurious, and Most Anticipated Sexual Wellness Innovation of 2026
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.8}>
              <CountdownTimer targetDate="2026-06-15T00:00:00" />
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <MagneticButton
                  onClick={scrollToEmailCapture}
                  className="px-8 py-4 bg-gradient-secondary text-white rounded-lg font-semibold text-lg shadow-luxury hover:shadow-glow transition-all duration-300"
                >
                  Reserve Your DOX
                </MagneticButton>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1.2}>
              <p className="text-white/50 text-sm">
                A statement of design and self-respect — <span className="text-primary font-semibold">a new era of elegance in intimacy</span>
              </p>
            </ScrollReveal>
          </div>

          {/* Right Side - Video */}
          <ScrollReveal delay={0.4} direction="right">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-luxury">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/uploads/HEROPAGE.webm" type="video/webm" />
              </video>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
