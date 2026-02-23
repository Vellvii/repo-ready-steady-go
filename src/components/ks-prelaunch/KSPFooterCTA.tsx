import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountdownTimer } from "@/components/prelaunch/CountdownTimer";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox"; // TODO: Replace with actual URL

export const KSPFooterCTA = () => {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white font-baskerville leading-[1.1]">
              Be First. Back the DOX.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-white/70 font-light">
              Super Early Bird pricing won't last. Get notified the moment we go live.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <CountdownTimer targetDate="2026-06-15T00:00:00" size="small" />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-xl shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right relative overflow-hidden pulse-glow"
            >
              <span className="relative z-10">Notify Me on Launch</span>
              <div className="absolute inset-0 bg-gradient-shimmer opacity-0 hover:opacity-100 transition-opacity duration-700" />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="text-white/40 text-sm font-light">
              No payment required. Just click to follow & get notified.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
