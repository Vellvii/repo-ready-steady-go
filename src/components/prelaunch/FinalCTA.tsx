import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { CountdownTimer } from "./CountdownTimer";
import prelaunchLogo from "@/assets/prelaunch-logo.png";

const PRELAUNCH_URL = "https://prelaunch.com/projects/5ff3ce3f-6669-4243-918c-4d57d98b63f6/reservation?userEmail=stefan%40vellvii.com&reservationId=c3452574-55cf-49e6-aa12-79b4c18131ac";

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
            <div className="flex flex-col gap-4 items-center">
              <a
                href={PRELAUNCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-12 py-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-xl shadow-elegant hover:shadow-glow transition-all duration-700 pulse-glow relative overflow-hidden flex items-center gap-3"
              >
                <span className="relative z-10">Reserve Your DOX on</span>
                <img src={prelaunchLogo} alt="Prelaunch.com" className="h-7 w-7 relative z-10" />
                <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </a>
              <a
                href="https://prelaunch.com/projects/vellvii-dox-vellvii-dox-pleasure-in-a-luxury-vault/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-12 py-6 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_100%] text-black rounded-2xl font-bold text-xl shadow-elegant hover:shadow-glow transition-all duration-700 pulse-glow relative overflow-hidden text-center"
              >
                <span className="relative z-10 flex flex-col leading-tight">
                  <span>Share Your Thoughts.</span>
                  <span>Let's Start A Conversation.</span>
                </span>
                <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="text-white/50 text-lg font-light">
              Join the waitlist to receive <span className="font-medium text-white/60">exclusive updates</span> on this revolutionary design
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
