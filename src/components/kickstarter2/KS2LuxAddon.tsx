import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const KS2LuxAddon = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="lux" className="relative py-28 sm:py-36 bg-stone-100">
      <div ref={ref} className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-3xl">
            <img src="/uploads/lux-bag-final-v4.jpg" alt="Vellvii Lux travel bag" className="w-full h-72 sm:h-96 object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="w-10 h-1 bg-amber-700 mb-8" />
            <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">Add-On</p>
            <h2 className="font-baskerville text-3xl sm:text-4xl text-stone-900 leading-tight mb-4">
              Vellvii <span className="text-amber-700">Lux</span>
            </h2>
            <p className="font-montserrat text-sm text-stone-500 leading-relaxed mb-6 max-w-md font-light">
              A premium leather travel companion. Structured, elegant, and purpose-built for discretion on the move.
            </p>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-baskerville text-3xl text-amber-700">$99</span>
              <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">Add at checkout</span>
            </div>
            <div className="space-y-3">
              {["Discreet travel companion", "Premium leather construction", "Structured compartments"].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-700/40" />
                  <span className="font-montserrat text-sm text-stone-600 font-light">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
