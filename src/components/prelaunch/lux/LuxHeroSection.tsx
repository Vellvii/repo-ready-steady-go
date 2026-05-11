import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { LuxCountdown } from "./LuxCountdown";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxHeroSection = () => {
  return <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dramatic background gradient */}
      <div className="absolute inset-0" style={{
      background: 'var(--gradient-hero)'
    }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      <div className="w-full relative z-10 pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto text-center space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Logo Video */}
          <ScrollReveal>
            <div className="flex justify-center mb-8">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-[12rem] sm:h-[18rem] lg:h-[28rem] xl:h-[34rem] w-auto"
                style={{
                  filter: 'drop-shadow(0 0 60px rgba(178, 145, 108, 0.6)) drop-shadow(0 0 100px rgba(178, 145, 108, 0.3))'
                }}
              >
                <source src="/uploads/vellvii-logo-video.mp4" type="video/mp4" />
              </video>
            </div>
          </ScrollReveal>

          <div className="px-4 sm:px-8 lg:px-12">
            {/* Introducing with shimmer */}
            <ScrollReveal delay={0.1}>
              <p className="text-xl sm:text-2xl lg:text-3xl gradient-text font-light italic tracking-[0.3em] uppercase">
                Introducing
              </p>
            </ScrollReveal>

            {/* Main Title */}
            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-baskerville tracking-tight leading-[0.95]" style={{
                textShadow: '0 0 80px rgba(178, 145, 108, 0.4)'
              }}>
                The Vellvii LUX
              </h1>
            </ScrollReveal>

            {/* Tagline Hook */}
            <ScrollReveal delay={0.25}>
              <p className="relative text-xl sm:text-3xl lg:text-4xl font-light italic text-white/90 font-baskerville mt-8 px-2 sparkle-text" style={{
                textShadow: '0 0 40px rgba(178, 145, 108, 0.5), 0 0 20px rgba(178, 145, 108, 0.3)'
              }}>
                Because Your Pleasure Collection Deserves...........
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Full-width Carousel with dramatic shadow */}
      <ScrollReveal delay={0.3}>
        <div className="w-full mt-16 lg:mt-24 relative z-10">
          <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]" style={{
            boxShadow: 'var(--shadow-massive)'
          }}>
            <CrossfadeCarousel items={['/uploads/lux-private-jet-lounge-hero.jpg']} aspectRatio="aspect-[21/9]" showControls={false} showDots={false} className="rounded-none" />
          </div>
        </div>
      </ScrollReveal>

      {/* Bottom content - More dramatic spacing */}
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12 mt-20 lg:mt-32 pb-32 lg:pb-40">
        <div className="max-w-7xl mx-auto text-center space-y-12 lg:space-y-16">
          <ScrollReveal delay={0.4}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-baskerville leading-tight" style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
            }}>
              Flying Private?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl gradient-text font-baskerville leading-tight">
              Keep it Private!
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-5xl mx-auto leading-relaxed font-light">
              A masterpiece of designer leather craftsmanship refined with next-generation biometric technology.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.7}>
            <p className="text-base sm:text-lg lg:text-xl text-white/60 max-w-5xl mx-auto leading-relaxed font-light">
              For the traveler who enjoys private lounges, discreet check-ins, and a life where privacy is the most valuable currency… LUX is the only companion worthy of your journey.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8}>
            <LuxCountdown />
          </ScrollReveal>

          <ScrollReveal delay={0.9}>
            <div className="pt-8">
              <LuxReserveCTA className="text-xl sm:text-2xl px-16 py-7" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>;
};