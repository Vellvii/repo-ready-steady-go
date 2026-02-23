import { AnimatedText } from "@/components/animations/AnimatedText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountdownTimer } from "@/components/prelaunch/CountdownTimer";
import doxOpenToys from "@/assets/dox-open-toys.png";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox"; // TODO: Replace with actual URL

export const KSPHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center space-y-8 sm:space-y-10">
          {/* Kickstarter badge */}
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 glass-accent rounded-full backdrop-blur-2xl">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-primary text-xs sm:text-sm font-bold tracking-wide uppercase">
                Pre-Launch on Kickstarter
              </p>
            </div>
          </ScrollReveal>

          {/* Main tagline */}
          <AnimatedText
            text="Pleasure: Redefined"
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight mx-auto justify-center"
            delay={0.3}
          />

          {/* Value proposition */}
          <ScrollReveal delay={0.5}>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
              The world's first biometric storage & docking system for intimate wellness.{" "}
              <span className="font-semibold text-primary">Designed, not hidden.</span>
            </p>
          </ScrollReveal>

          {/* Product image */}
          <ScrollReveal delay={0.6}>
            <div className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-float ring-1 ring-white/10">
              <img
                src={doxOpenToys}
                alt="Vellvii DOX - Premium intimate wellness storage"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          {/* Super Early Bird Pricing */}
          <ScrollReveal delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <PricingBadge label="DOX Only" price="$149" originalPrice="$299" />
              <PricingBadge label="Pleasure Device" price="$99" originalPrice="$169" />
              <PricingBadge label="Full Ecosystem" price="$399" originalPrice="$699" highlight />
            </div>
            <p className="text-white/40 text-xs mt-3 uppercase tracking-widest font-semibold">
              Super Early Bird — Limited Quantities
            </p>
          </ScrollReveal>

          {/* Launch date countdown */}
          <ScrollReveal delay={0.8}>
            <div className="space-y-3">
              <p className="text-white/50 text-sm uppercase tracking-widest font-semibold">
                Launching on Kickstarter
              </p>
              <CountdownTimer targetDate="2026-06-15T00:00:00" />
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.9}>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 sm:px-14 py-5 sm:py-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-lg sm:text-xl shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right relative overflow-hidden pulse-glow"
            >
              <span className="relative z-10">Notify Me on Launch</span>
              <div className="absolute inset-0 bg-gradient-shimmer opacity-0 hover:opacity-100 transition-opacity duration-700" />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const PricingBadge = ({
  label,
  price,
  originalPrice,
  highlight = false,
}: {
  label: string;
  price: string;
  originalPrice: string;
  highlight?: boolean;
}) => (
  <div
    className={`px-5 py-4 rounded-xl text-center min-w-[130px] sm:min-w-[150px] ${
      highlight
        ? "glass-accent border-primary/30"
        : "glass-dark border-white/10"
    } border`}
  >
    <p className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-1">{label}</p>
    <div className="flex items-center justify-center gap-2">
      <span className="text-white/40 text-sm line-through">{originalPrice}</span>
      <span className="text-white text-2xl font-bold font-baskerville">{price}</span>
    </div>
    {highlight && (
      <p className="text-primary text-[10px] uppercase tracking-widest mt-1 font-bold">Best Value</p>
    )}
  </div>
);
