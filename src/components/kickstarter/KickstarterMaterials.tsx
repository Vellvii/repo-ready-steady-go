import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import materialsCloseup from "@/assets/kickstarter/ks-materials-closeup.jpg";

const materialDetails = [
  {
    area: "Exterior",
    features: ["Soft-touch luxury leather feel", "Precision stitching", "Automotive-grade inspiration"],
  },
  {
    area: "Interior",
    features: ["Velvet-lined compartments", "Scratch-free storage", "Cradle docking structure"],
  },
  {
    area: "Engineering",
    features: ["State-of-the-art docking precision", "Built by charging-system experts", "Internal USB-C charging"],
  },
];

export const KickstarterMaterials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="materials" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
              Materials & Engineering
            </p>
            <h2 className="font-baskerville text-3xl sm:text-4xl text-light-primary leading-tight mb-4">
              Design worthy of
              <br />
              <span className="gradient-text">recognition.</span>
            </h2>
            <p className="font-montserrat text-sm text-light-muted leading-relaxed mb-10 max-w-md">
              Every surface, every stitch, every mechanism - crafted with the precision
              and care of products that define their category.
            </p>

            <div className="space-y-8">
              {materialDetails.map((group, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 * i }}
                >
                  <h3 className="font-montserrat text-xs uppercase tracking-[0.2em] text-primary mb-3">
                    {group.area}
                  </h3>
                  <ul className="space-y-2">
                    {group.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                        <span className="font-montserrat text-sm text-light-secondary">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <img
              src={materialsCloseup}
              alt="Premium leather texture with precision stitching closeup"
              className="w-full h-72 sm:h-96 lg:h-[520px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
