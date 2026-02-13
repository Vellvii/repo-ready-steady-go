import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const reasons = [
  {
    title: "Community, not just customers.",
    description: "We're building with our earliest believers. Your feedback shapes the final product.",
  },
  {
    title: "Direct-to-you pricing.",
    description: "No retail markup. No middlemen. Early supporters get the best pricing - permanently locked in.",
  },
  {
    title: "Category creation.",
    description: "This product doesn't exist yet. We're not competing - we're creating something entirely new.",
  },
  {
    title: "Transparent development.",
    description: "Regular updates on production, materials sourcing, and engineering milestones. Full visibility.",
  },
];

export const KickstarterWhyKickstarter = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="why" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            Why Kickstarter
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-light-primary mb-4">
            Built with you, <span className="gradient-text">not for you.</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className="border-l border-primary/15 pl-6 py-1"
            >
              <h3 className="font-montserrat text-sm font-medium text-light-primary mb-1.5">
                {reason.title}
              </h3>
              <p className="font-montserrat text-sm text-light-muted leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
