import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { ArrowRight } from "lucide-react";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox-a-premium-luxury-vault-for-intimacy-and-storage";

const DoxVideoLanding = () => {
  return (
    <>
      <SEO
        title="Vellvii DOX | Follow Us on Kickstarter"
        description="We're about to change intimacy forever. Follow the Vellvii DOX on Kickstarter and be the first to know when we launch."
        canonical="/"
      />

      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center px-6 max-w-3xl text-center">
          {/* Logo */}
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            src="/uploads/Vellvii-full-logo-transparent.png"
            alt="Vellvii"
            className="h-8 sm:h-10 md:h-12 w-auto mb-12 sm:mb-16"
          />

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-primary/80 font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-6"
          >
            Coming Soon to Kickstarter
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-baskerville text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
          >
            <span className="text-white">We're About to</span>
            <br />
            <span className="text-white">Change </span>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Intimacy
            </span>
            <br />
            <span className="text-white">Forever.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-white/50 font-montserrat text-sm sm:text-base md:text-lg max-w-md mb-12 sm:mb-16 leading-relaxed"
          >
            The world's first biometric luxury vault for intimate wellness. Follow us — and be first in line.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full max-w-md"
          >
            {/* Shimmer background */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:300%_100%] animate-[shimmer_2s_ease-in-out_infinite] opacity-80 blur-sm group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:300%_100%] animate-[shimmer_2s_ease-in-out_infinite]" />
            <div className="relative z-10 px-8 py-5 sm:py-6 flex flex-col items-center gap-1.5">
              <span className="text-black font-bold text-lg sm:text-xl md:text-2xl tracking-wide uppercase flex items-center gap-3">
                Follow Us on Kickstarter
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-black/60 text-xs sm:text-sm font-medium">
                Click "Notify Me" on Kickstarter to follow our launch
              </span>
            </div>
          </motion.a>

          {/* Kickstarter badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-10 sm:mt-14 flex items-center gap-3"
          >
            <img
              src="/uploads/kickstarter-logo.webp"
              alt="Kickstarter"
              className="h-5 sm:h-6 w-auto opacity-50"
            />
            <span className="text-white/30 text-xs font-montserrat tracking-wider uppercase">
              Pre-Launch
            </span>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DoxVideoLanding;
