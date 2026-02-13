import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const reasons = [
  { title: "Community, not just customers.", desc: "Your feedback shapes the final product." },
  { title: "Direct-to-you pricing.", desc: "No retail markup. No middlemen. Locked-in pricing." },
  { title: "Category creation.", desc: "This product doesn't exist yet. We're building something new." },
  { title: "Full transparency.", desc: "Regular updates on production, materials, and milestones." },
];

export const KS2WhyKickstarter = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="why" className="relative py-28 sm:py-36 bg-white">
      <div ref={ref} className="max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">Why Kickstarter</p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-stone-900 mb-4">
            Built with you, <span className="text-amber-700">not for you.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <h3 className="font-montserrat text-sm font-semibold text-stone-800 mb-1.5">{r.title}</h3>
              <p className="font-montserrat text-sm text-stone-500 leading-relaxed font-light">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
