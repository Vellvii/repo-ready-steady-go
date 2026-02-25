import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { KSPPriceSticker } from "./KSPPriceSticker";

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
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, hsl(40 65% 72% / 0.12), transparent 70%)',
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dramatic spotlight behind headline */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '120vw',
          height: '60vh',
          top: '20%',
          left: '-10vw',
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, hsl(40 65% 72% / 0.15), transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center space-y-10">
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary text-xs sm:text-sm font-bold tracking-[0.4em] uppercase">VIP Offers on</span>
            <img
              src="/uploads/kickstarter-logo.webp"
              alt="Kickstarter"
              className="h-6 sm:h-8 w-auto rounded"
            />
          </motion.div>

          {/* THE HEADLINE — unmissable */}
          <div className="relative">
            {/* Glow behind text */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(40 65% 72% / 0.2), transparent 60%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex flex-col items-center gap-2 sm:gap-4">
              {/* PROBLEM */}
              <motion.span
                className="block font-baskerville text-white/40 text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-wide uppercase"
                initial={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Problem
              </motion.span>

              {/* Divider line */}
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* SOLVED — the star */}
              <motion.span
                className="block font-baskerville text-7xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] font-bold leading-[0.85] tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, hsl(40 65% 82%), hsl(40 70% 72%), hsl(30 60% 65%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 60px hsl(40 65% 72% / 0.4))',
                }}
                initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Solved.
              </motion.span>
            </div>
          </div>

          {/* Subtitle lines — staggered reveal */}
          <div className="max-w-3xl mx-auto space-y-1">
            {[
              { text: "No more suction cups on shower walls.", delay: 1.4 },
              { text: "No more shoeboxes under the bed.", delay: 1.6 },
              { text: "No more charging under a pillow.", delay: 1.8 },
            ].map(({ text, delay }) => (
              <motion.p
                key={text}
                className="text-lg sm:text-xl lg:text-2xl text-white/60 font-light font-baskerville"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay, ease: "easeOut" }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-primary/80 font-baskerville italic max-w-2xl mx-auto pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
          >
            A sexual wellness &amp; intimacy product that should have existed years ago.
          </motion.p>


          {/* DOX Price Sticker */}
          <div className="flex justify-center pt-6">
            <KSPPriceSticker
              label="The DOX"
              retailPrice="$299"
              kickstarterPrice="$199"
              vipPrice="$149"
              rotation={-2}
              size="lg"
            />
          </div>

          <ScrollReveal delay={2.6}>
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
