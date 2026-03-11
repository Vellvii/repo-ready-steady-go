import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountdownTimer } from "@/components/prelaunch/CountdownTimer";
import { motion } from "framer-motion";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox-a-premium-luxury-vault-for-intimacy-and-storage";

export const KSV2FooterCTA = () => {
  return (
    <section className="py-28 sm:py-40 relative overflow-hidden">
      {/* Dramatic gradient */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 80%, hsl(40 65% 72% / 0.12), transparent 60%)" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Massive headline */}
          <ScrollReveal>
            <h2
              className="text-5xl sm:text-7xl lg:text-9xl font-bold uppercase leading-[0.95] tracking-tight"
              style={{
                background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%), hsl(40 70% 75%))",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-text 3s ease-in-out infinite",
              }}
            >
              Officially Live On Kickstarter.
            </h2>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl sm:text-6xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tight hover:opacity-80 transition-opacity underline decoration-2 underline-offset-8"
              style={{
                background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(40 65% 60%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Book Your Dox.
            </a>
            <style>{`
              @keyframes shimmer-text {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
            `}</style>
          </ScrollReveal>

          {/* Launch date */}
          <ScrollReveal delay={0.15}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 font-light tracking-wide">
              Project Ends:{" "}
              <span className="font-bold text-white">10 April 2026</span>
            </p>
          </ScrollReveal>

          {/* Countdown */}
          <ScrollReveal delay={0.25}>
            <div className="flex justify-center">
              <CountdownTimer targetDate="2026-03-10T13:30:00Z" size="large" />
            </div>
          </ScrollReveal>

          {/* Big CTA button */}
          <ScrollReveal delay={0.35}>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block relative group"
            >
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-75 blur-lg"
                style={{ background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%))" }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div
                className="relative px-16 py-7 rounded-2xl font-bold text-xl sm:text-2xl text-black"
                style={{ background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(40 65% 60%))" }}
              >
                Notify Me on Launch
              </div>
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
