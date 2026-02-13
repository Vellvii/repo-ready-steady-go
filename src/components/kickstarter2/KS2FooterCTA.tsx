import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import archHero from "@/assets/kickstarter/ks2-arch-hero.jpg";

export const KS2FooterCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={archHero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-stone-900/80" />
      </div>

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="w-10 h-1 bg-amber-500 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-amber-400/80 mb-6 font-medium">Coming to Kickstarter</p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6">
            Elevate your
            <br />
            <span className="text-amber-400">intimacy.</span>
          </h2>
          <p className="font-montserrat text-sm text-stone-400 max-w-md mx-auto mb-10 leading-relaxed font-light">
            Be among the first to experience a design innovation in intimate wellness.
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-xl font-montserrat text-sm font-semibold tracking-wider transition-colors shadow-lg shadow-amber-600/20">
            Back the Future of Intimate Wellness
          </button>
          <p className="font-montserrat text-[10px] text-stone-500 mt-6 uppercase tracking-[0.2em]">No commitment until launch</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <img src="/uploads/Vellvii-full-logo-transparent.png" alt="Vellvii" className="h-8 w-auto opacity-40" />
          <div className="flex gap-6">
            <a href="/about" className="font-montserrat text-xs text-stone-500 hover:text-amber-400 transition-colors uppercase tracking-wider">About</a>
            <a href="/contact" className="font-montserrat text-xs text-stone-500 hover:text-amber-400 transition-colors uppercase tracking-wider">Contact</a>
            <a href="/privacy-policy" className="font-montserrat text-xs text-stone-500 hover:text-amber-400 transition-colors uppercase tracking-wider">Privacy</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
