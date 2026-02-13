import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X } from "lucide-react";

const problems = [
  { label: "Stuck to surfaces", desc: "Suction cups on shower walls and tiles. Functional - but far from elegant." },
  { label: "Industrial mounts", desc: "Overpriced, aggressive designs built for performance - not for your home." },
  { label: "No charging solution", desc: "Cables tangled in drawers. No dedicated, discreet way to stay ready." },
  { label: "No privacy system", desc: "No lock. No discretion. No design consideration for shared spaces." },
];

export const KS2Problem = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="problem" className="relative py-28 sm:py-36 bg-stone-100">
      <div ref={ref} className="max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">
            The Problem
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-stone-900 leading-tight mb-4">
            No premium solution
            <br />
            <span className="text-stone-400">exists.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="bg-white rounded-2xl p-6 border border-stone-200"
            >
              <div className="flex items-start gap-3">
                <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                <div>
                  <h3 className="font-montserrat text-sm font-semibold text-stone-800 mb-1">{item.label}</h3>
                  <p className="font-montserrat text-sm text-stone-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
