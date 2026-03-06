import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountdownTimer } from "@/components/prelaunch/CountdownTimer";
import { motion } from "framer-motion";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox";

export const KSV2FooterCTA = () => {
  return (
    <section className="py-28 sm:py-40 relative overflow-hidden">
      {/* Dramatic gradient */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 80%, hsl(40 65% 72% / 0.12), transparent 60%)" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
              Don't Miss{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Launch Day
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-lg text-white/50 font-light max-w-xl mx-auto">
              Super Early Bird pricing won't last. Follow the project and be first in line.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <CountdownTimer targetDate="2026-03-10T12:00:00Z" size="small" />
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-14 py-6 rounded-2xl font-bold text-xl text-black relative overflow-hidden group"
              style={{ background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(40 65% 60%))" }}
            >
              <span className="relative z-10">Notify Me on Launch</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, hsl(40 75% 80%), hsl(350 50% 60%), hsl(40 70% 65%))" }}
              />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-white/30 text-sm font-light">
              No payment required. Just click to follow & get notified.
            </p>
          </ScrollReveal>

          {/* Founder quote */}
          <ScrollReveal delay={0.5}>
            <div className="mt-16 p-8 sm:p-10 rounded-3xl border border-white/[0.06] bg-white/[0.02] text-center">
              <p className="text-white/60 text-base sm:text-lg leading-relaxed font-light italic mb-6">
                "I started Vellvii because I believed intimate wellness deserved the same design
                respect we give to every other part of our lives. The DOX isn't just a product —
                it's a statement that pleasure is nothing to hide."
              </p>
              <p className="text-white font-bold text-lg">Stefan</p>
              <p className="text-white/40 text-sm">Founder, Vellvii</p>
            </div>
          </ScrollReveal>

          {/* Footer */}
          <ScrollReveal delay={0.6}>
            <div className="pt-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
              <img src="/uploads/Vellvii-full-logo-transparent.png" alt="Vellvii" className="h-8 w-auto opacity-40" />
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
