import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LuxReserveCTA } from "./LuxReserveCTA";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";
export const LuxMomentSection = () => {
  return (
    <section className="min-h-screen py-32 lg:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
      <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-spotlight)' }} />
      
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-32">
          <div className="text-center space-y-12 lg:space-y-16">
            <ScrollReveal>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white font-baskerville leading-[0.95]" style={{
                textShadow: '0 0 80px rgba(178, 145, 108, 0.4)'
              }}>
                Where confidence meets elegance…
                <br />
                <span className="gradient-text">desire follows.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="pt-8">
                <LuxReserveCTA className="text-xl sm:text-2xl px-16 py-7" />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4}>
            <div className="max-w-6xl mx-auto glass-luxury rounded-3xl p-4 lg:p-8" style={{
              boxShadow: 'var(--shadow-massive)'
            }}>
              <CrossfadeCarousel 
                items={['/uploads/lux-moment-lifestyle.mp4']} 
                aspectRatio="aspect-[4/3]"
                videoPlaybackRate={0.75}
                className="rounded-2xl overflow-hidden"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};