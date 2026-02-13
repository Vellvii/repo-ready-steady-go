import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import fireplaceImage from "@/assets/kickstarter/ks-fireplace-bedroom.jpg";

export const KickstarterFooterCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={fireplaceImage}
          alt="Modern fireplace with warm ambient lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary/80 mb-6">
            Coming to Kickstarter
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6">
            Elevate your
            <br />
            <span className="gradient-text">intimacy.</span>
          </h2>
          <p className="font-montserrat text-sm text-white/60 max-w-md mx-auto mb-10 leading-relaxed">
            Be among the first to experience a design innovation in intimate wellness.
            Limited early-bird pricing available at launch.
          </p>

          <button className="btn-premium px-10 py-4 font-montserrat text-sm font-medium tracking-wider">
            Back the Future of Intimate Wellness
          </button>

          <p className="font-montserrat text-[10px] text-white/30 mt-6 uppercase tracking-[0.2em]">
            No commitment until campaign launch
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <img
            src="/uploads/Vellvii-full-logo-transparent.png"
            alt="Vellvii"
            className="h-8 w-auto opacity-50"
          />
          <div className="flex gap-6">
            <a href="/about" className="font-montserrat text-xs text-white/30 hover:text-primary transition-colors uppercase tracking-wider">About</a>
            <a href="/contact" className="font-montserrat text-xs text-white/30 hover:text-primary transition-colors uppercase tracking-wider">Contact</a>
            <a href="/privacy-policy" className="font-montserrat text-xs text-white/30 hover:text-primary transition-colors uppercase tracking-wider">Privacy</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
