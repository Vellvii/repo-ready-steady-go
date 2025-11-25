import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { LuxCountdown } from "./LuxCountdown";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
import vellviiLogo from "@/assets/vellvii-logo-rose-gold.png";

export const LuxHeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto relative z-10 px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Logo */}
          <ScrollReveal>
            <div className="flex justify-center mb-4">
              <img 
                src={vellviiLogo} 
                alt="Vellvii" 
                className="h-48 sm:h-60 lg:h-72 xl:h-84 w-auto"
                style={{ filter: 'drop-shadow(0 0 30px rgba(178, 145, 108, 0.4))' }}
              />
            </div>
          </ScrollReveal>

          {/* Introducing */}
          <ScrollReveal delay={0.1}>
            <p className="text-2xl sm:text-3xl text-primary/80 font-light italic tracking-wider uppercase">
              Introducing
            </p>
          </ScrollReveal>

          {/* Main Title */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white font-baskerville tracking-tight leading-tight">
              The Vellvii LUX
            </h1>
          </ScrollReveal>
        </div>
      </div>

      {/* Full-width Carousel */}
      <ScrollReveal delay={0.3}>
        <div className="w-full mt-12 relative z-10">
          <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
            <CrossfadeCarousel
              items={[
                '/public/uploads/lux-private-jet-lounge-3.jpg'
              ]}
              aspectRatio="aspect-[21/9]"
              showControls={false}
              showDots={false}
              className="rounded-none"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Bottom content */}
      <div className="container mx-auto relative z-10 px-4 mt-12 pb-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <ScrollReveal delay={0.4}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white/90 font-baskerville leading-tight">
              Flying Private?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl text-white font-baskerville leading-tight">
              Keep it Private!
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
              Seamlessly handcrafted in genuine leather. A sartorial declaration for those who travel beyond first class.
              <br />
              <span className="text-white/90 font-normal">LUX hides your essentials in plain sight - because true luxury lives in the unseen.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <LuxCountdown />
          </ScrollReveal>

          <ScrollReveal delay={0.7}>
            <LuxReserveCTA />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
