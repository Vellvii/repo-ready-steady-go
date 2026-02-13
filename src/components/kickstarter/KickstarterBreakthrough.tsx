import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import boutiqueNightstand from "@/assets/kickstarter/ks-boutique-nightstand.jpg";

export const KickstarterBreakthrough = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="breakthrough" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <img
              src={boutiqueNightstand}
              alt="Premium nightstand scene with warm candlelight"
              className="w-full h-72 sm:h-96 lg:h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
              The Design Breakthrough
            </p>
            <h2 className="font-baskerville text-3xl sm:text-4xl text-light-primary leading-tight mb-8">
              Not a product.
              <br />
              <span className="gradient-text">A design object.</span>
            </h2>

            <div className="space-y-6">
              {[
                { title: "Charge out of sight.", desc: "Internal USB-C charging hub keeps everything powered, discreetly." },
                { title: "Dock properly.", desc: "Precision-engineered cradles hold each device securely in place." },
                { title: "Store elegantly.", desc: "Velvet-lined interiors protect and present - not just conceal." },
                { title: "Experience intentionally.", desc: "A sculptural saddle and docking station, designed for your space." },
              ].map((item, i) => (
                <div key={i} className="border-l border-primary/20 pl-5">
                  <h3 className="font-montserrat text-sm font-medium text-light-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="font-montserrat text-sm text-light-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
