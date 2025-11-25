import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { LuxCountdown } from "./LuxCountdown";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
import vellviiLogo from "@/assets/vellvii-logo-rose-gold.png";

export const LuxHeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Logo */}
          <ScrollReveal>
            <div className="flex justify-center mb-8">
              <img 
                src={vellviiLogo} 
                alt="Vellvii" 
                className="h-16 sm:h-20 lg:h-24 xl:h-28 w-auto"
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

          <ScrollReveal delay={0.3}>
            <AnimatedText 
              text="Flying Private? Keep it Private."
              className="text-3xl sm:text-4xl lg:text-5xl text-white/90 font-baskerville leading-tight"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
              Seamlessly handcrafted in genuine leather. A sartorial declaration for those who travel beyond first class.
              <br />
              <span className="text-white/90 font-normal">LUX hides your essentials in plain sight - because true luxury lives in the unseen.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <LuxCountdown />
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <LuxReserveCTA />
          </ScrollReveal>

          {/* Hero Carousel */}
          <ScrollReveal delay={0.7}>
            <div className="mt-16 max-w-4xl mx-auto">
              <CrossfadeCarousel
                items={[
                  '/public/uploads/dox-white-lifestyle-2.jpg',
                  '/public/uploads/dox-black-bookshelf.png'
                ]}
                aspectRatio="aspect-[16/9]"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
