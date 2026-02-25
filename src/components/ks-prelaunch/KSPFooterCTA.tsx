import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountdownTimer } from "@/components/prelaunch/CountdownTimer";
import { KSPPriceSticker } from "./KSPPriceSticker";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox";

export const KSPFooterCTA = () => {
  return (
    <section className="py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <ScrollReveal>
            <p className="text-primary/60 text-xs uppercase tracking-[0.4em] font-semibold mb-4">
              Chapter 04 — The Ecosystem
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white font-baskerville leading-[1.1]">
              The Full <span className="gradient-text">Vellvii</span> Ecosystem
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-base sm:text-lg text-white/40 font-light max-w-xl mx-auto">
              The Vellvii DOX + all 3 Pleasure Collection devices — Pulse, G-Vibe &amp; Evolve.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-white/60 font-light">
              Super Early Bird pricing won't last. Get notified the moment we go live.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <CountdownTimer targetDate="2026-03-10T12:00:00Z" size="small" />
          </ScrollReveal>

          {/* Full Ecosystem Sticker */}
          <ScrollReveal delay={0.35}>
            <div className="flex justify-center">
              <KSPPriceSticker
                label="Full Ecosystem"
                retailPrice="$749"
                kickstarterPrice="$499"
                vipPrice="$399"
                rotation={-2}
                size="lg"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-xl shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right relative overflow-hidden pulse-glow"
            >
              <span className="relative z-10">Notify Me on Launch</span>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="text-white/40 text-sm font-light">
              No payment required. Just click to follow & get notified.
            </p>
          </ScrollReveal>

          {/* Founder note */}
          <ScrollReveal delay={0.6}>
            <div className="glass-dark border border-white/10 rounded-2xl p-6 sm:p-10 mt-12 text-center">
              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light italic mb-6">
                "I started Vellvii because I believed intimate wellness deserved the same design
                respect we give to every other part of our lives. The DOX isn't just a product —
                it's a statement that pleasure is nothing to hide."
              </p>
              <div>
                <p className="text-white font-baskerville font-bold text-lg">Stefan</p>
                <p className="text-white/40 text-sm">Founder, Vellvii</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Footer links */}
          <ScrollReveal delay={0.7}>
            <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
              <img
                src="/uploads/Vellvii-full-logo-transparent.png"
                alt="Vellvii"
                className="h-8 w-auto opacity-50"
              />
              <div className="flex gap-6">
                <a href="/about" className="text-xs text-white/30 hover:text-primary transition-colors uppercase tracking-wider">About</a>
                <a href="/contact" className="text-xs text-white/30 hover:text-primary transition-colors uppercase tracking-wider">Contact</a>
                <a href="/privacy-policy" className="text-xs text-white/30 hover:text-primary transition-colors uppercase tracking-wider">Privacy</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
