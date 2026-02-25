import { motion } from "framer-motion";

export const KSV2Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0">
        <img
          src="/uploads/ksv2-hero-products.jpg"
          alt="Vellvii DOX collection — Black, Red, and Cream luxury biometric vaults"
          className="w-full h-full object-cover object-center"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40" />
      </div>

      {/* Animated accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(40 70% 65%), hsl(350 60% 55%), hsl(40 70% 65%), transparent)",
        }}
        animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Content overlay */}
      <div className="relative z-10 w-full pb-20 sm:pb-28 lg:pb-36 pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Kickstarter badge */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-xs font-bold tracking-[0.5em] uppercase">Coming to</span>
            <img
              src="/uploads/kickstarter-logo.webp"
              alt="Kickstarter"
              className="h-5 sm:h-6 w-auto rounded"
            />
          </motion.div>

          {/* Main headline */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-white">Intimacy</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%), hsl(40 70% 65%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Redefined.
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-2xl font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              A new era in sexual wellness and luxury design.
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-white/40 italic font-light max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              "What a brilliant design"
            </motion.p>
          </div>

          {/* CTA row */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4 mt-10 sm:mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <a
              href="https://www.kickstarter.com/projects/vellvii/vellvii-dox"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-5 rounded-xl font-bold text-lg text-black overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(40 65% 60%))",
              }}
            >
              <span className="relative z-10">Get Notified on Launch</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, hsl(40 75% 80%), hsl(350 50% 60%), hsl(40 70% 65%))",
                }}
              />
            </a>
            <div className="flex items-center gap-3 text-white/40 text-sm">
              <div className="w-px h-8 bg-white/20" />
              <span>
                Super Early Bird from{" "}
                <span className="text-primary font-bold text-base">$149</span>
              </span>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 sm:mt-24 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1"
              animate={{ borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-primary"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <span className="text-white/30 text-xs uppercase tracking-[0.3em]">Explore</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
