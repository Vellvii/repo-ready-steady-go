import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const problems = [
  {
    label: "Stuck to surfaces",
    description: "Suction cups on shower walls, tiles, and floors. Functional - but far from elegant.",
  },
  {
    label: "Industrial mounts",
    description: "Overpriced, aggressive designs built for performance - not for your home.",
  },
  {
    label: "No charging solution",
    description: "Cables tangled in drawers. No dedicated, discreet way to keep devices ready.",
  },
  {
    label: "No privacy",
    description: "No lock. No discretion. No design consideration for shared spaces.",
  },
];

export const KickstarterProblem = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="problem" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            The Problem
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary leading-tight mb-6">
            There is no premium solution
            <br />
            <span className="text-light-muted">for intimate wellness storage.</span>
          </h2>
          <p className="font-montserrat text-sm text-light-muted max-w-lg mx-auto leading-relaxed">
            The industry offers function without form. Products designed for use -
            but never designed to belong in your space.
          </p>
        </motion.div>

        <div className="space-y-6">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className="flex gap-5 items-start p-5 rounded-xl border border-white/[0.04] bg-white/[0.02]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
              <div>
                <h3 className="font-montserrat text-sm font-medium text-light-primary mb-1">
                  {item.label}
                </h3>
                <p className="font-montserrat text-sm text-light-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
