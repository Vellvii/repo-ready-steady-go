import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const milestones = [
  { phase: "Campaign Launch", date: "Q2 2025" },
  { phase: "Funding Goal Reached", date: "Q2 2025" },
  { phase: "Final Design Lock", date: "Q3 2025" },
  { phase: "Production", date: "Q3-Q4 2025" },
  { phase: "Quality Assurance", date: "Q4 2025" },
  { phase: "Shipping Begins", date: "Q1 2026" },
];

export const KS2Timeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="timeline" className="relative py-28 sm:py-36 bg-stone-100">
      <div ref={ref} className="max-w-2xl mx-auto px-6 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">Timeline</p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-stone-900">
            From concept to <span className="text-amber-700">your hands.</span>
          </h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-amber-200" />
          <div className="space-y-7">
            {milestones.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 * i }}
                className="flex items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-6 h-6 rounded-full border-2 border-amber-400 bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-700" />
                  </div>
                </div>
                <div className="pt-0.5">
                  <h3 className="font-montserrat text-sm font-semibold text-stone-800">{m.phase}</h3>
                  <p className="font-montserrat text-xs text-stone-400 mt-0.5 font-medium">{m.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
