import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import materialsImg from "@/assets/kickstarter/ks2-product-macro.jpg";

const groups = [
  { area: "Exterior", features: ["Soft-touch luxury leather feel", "Precision stitching", "Automotive-grade inspiration"] },
  { area: "Interior", features: ["Velvet-lined compartments", "Scratch-free storage", "Cradle docking structure"] },
  { area: "Engineering", features: ["State-of-the-art docking precision", "Built by charging-system experts", "Internal USB-C charging"] },
];

export const KS2Materials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="materials" className="relative py-28 sm:py-36 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="w-10 h-1 bg-amber-700 mb-8" />
            <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">Materials & Engineering</p>
            <h2 className="font-baskerville text-3xl sm:text-4xl text-stone-900 leading-tight mb-4">
              Design worthy of <span className="text-amber-700">recognition.</span>
            </h2>
            <p className="font-montserrat text-sm text-stone-500 leading-relaxed mb-10 max-w-md font-light">
              Every surface, stitch, and mechanism - crafted with the precision of products that define their category.
            </p>
            <div className="space-y-8">
              {groups.map((g, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 * i }}>
                  <h3 className="font-montserrat text-xs uppercase tracking-[0.25em] text-amber-700 mb-3 font-semibold">{g.area}</h3>
                  <ul className="space-y-2">
                    {g.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-700/40" />
                        <span className="font-montserrat text-sm text-stone-600 font-light">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="overflow-hidden rounded-3xl">
            <img src={materialsImg} alt="Product macro with brushed metal detail" className="w-full h-72 sm:h-96 lg:h-[520px] object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
