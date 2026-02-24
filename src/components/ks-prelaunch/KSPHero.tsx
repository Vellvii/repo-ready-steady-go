import { AnimatedText } from "@/components/animations/AnimatedText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";
import { useMemo } from "react";

const Particle = ({ delay, x, y, size, duration }: { delay: number; x: number; y: number; size: number; duration: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle, hsl(40 65% 72% / 0.6), hsl(40 65% 72% / 0))`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0.4, 0.8, 0],
      scale: [0, 1, 1.2, 1, 0],
      y: [0, -40, -80, -120],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export const KSPHero = () => {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 70,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 4,
    })), []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glow layers */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, hsl(40 65% 72% / 0.08), transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
        <div className="text-center space-y-8">
          <ScrollReveal delay={0.1}>
            <p className="text-primary text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
              Coming to Kickstarter
            </p>
          </ScrollReveal>

          <AnimatedText
            text="Problem : Solved."
            className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold text-white leading-[1] tracking-tight mx-auto justify-center"
            delay={0.3}
          />

          <ScrollReveal delay={0.6}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed font-baskerville">
              No more suction cups on shower walls.
              <br className="hidden sm:block" />
              No more shoeboxes under the bed.
              <br className="hidden sm:block" />
              No more charging under a pillow.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8}>
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
              <p className="text-white/40 text-sm uppercase tracking-widest font-semibold">
                Scroll to discover
              </p>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
