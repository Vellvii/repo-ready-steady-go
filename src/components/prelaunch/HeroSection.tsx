import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { CountdownTimer } from "./CountdownTimer";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import prelaunchLogo from "@/assets/prelaunch-logo.png";
const PRELAUNCH_URL = "https://prelaunch.com/projects/5ff3ce3f-6669-4243-918c-4d57d98b63f6/reservation?userEmail=stefan%40vellvii.com&reservationId=c3452574-55cf-49e6-aa12-79b4c18131ac";
export const HeroSection = () => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24">
      {/* Sophisticated gradient overlays */}
      <div className="absolute inset-0" style={{
      background: 'var(--gradient-hero)'
    }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Content at the Top */}
        <div className="text-center space-y-10 mb-16">
          <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center gap-2 px-6 py-3 glass-accent rounded-full backdrop-blur-2xl">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-primary text-sm font-bold tracking-wide uppercase">Launching 2026</p>
            </div>
          </ScrollReveal>

          <AnimatedText text="Pleasure: Redefined" className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight mx-auto justify-center" delay={0.4} />

          <ScrollReveal delay={0.6}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
              The Most Creative, Most Luxurious, and Most Anticipated Sexual Wellness Innovation of <span className="font-semibold">2026</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8}>
            <CountdownTimer targetDate="2026-06-15T00:00:00" />
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="flex flex-col gap-4 justify-center items-center">
              <a href={PRELAUNCH_URL} target="_blank" rel="noopener noreferrer" className="group px-10 py-5 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-lg shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right relative overflow-hidden flex items-center gap-3">
                <span className="relative z-10">Reserve Your DOX on</span>
                <img src={prelaunchLogo} alt="Prelaunch.com" className="h-6 w-6 relative z-10" />
                <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </a>
              <a href="https://prelaunch.com/projects/vellvii-dox-vellvii-dox-pleasure-in-a-luxury-vault/discussions" target="_blank" rel="noopener noreferrer" className="group px-10 py-5 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_100%] text-black rounded-2xl font-bold text-lg shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right relative overflow-hidden text-center">Share Your Thoughts
Let's Start A Conversation
              <span className="relative z-10">Share Your Thoughts
Let's Start A Conversation

              </span>
                <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1.2}>
            <p className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed font-light">
              A statement of design and self-respect — <span className="text-primary font-bold gradient-text">a new era of elegance in intimacy</span>
            </p>
          </ScrollReveal>
        </div>

        {/* Full-Width Video Below */}
        <ScrollReveal delay={0.4}>
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-float group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="absolute inset-0 ring-1 ring-white/10 rounded-3xl z-20" />
            <video autoPlay loop muted playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
              <source src="/uploads/HEROPAGE.webm" type="video/webm" />
            </video>
          </div>
        </ScrollReveal>
      </div>
    </section>;
};