import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const KickstarterLuxAddon = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="lux" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-background" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <img
              src="/uploads/lux-bag-final-v4.jpg"
              alt="Vellvii Lux premium leather travel bag"
              className="w-full h-72 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
              Add-On
            </p>
            <h2 className="font-baskerville text-3xl sm:text-4xl text-light-primary leading-tight mb-4">
              Vellvii <span className="gradient-text">Lux</span>
            </h2>
            <p className="font-montserrat text-sm text-light-muted leading-relaxed mb-6 max-w-md">
              A premium leather travel companion designed for discretion on the move.
              Structured, elegant, and purpose-built to carry your collection.
            </p>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-baskerville text-3xl text-primary">$99</span>
              <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-light-muted">
                Add at checkout
              </span>
            </div>

            <div className="space-y-3">
              {["Discreet travel companion", "Premium leather construction", "Structured internal compartments"].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                  <span className="font-montserrat text-sm text-light-secondary">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
