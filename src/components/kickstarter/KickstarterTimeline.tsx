import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const milestones = [
  { phase: "Campaign Launch", date: "Q2 2025", status: "upcoming" },
  { phase: "Funding Goal Reached", date: "Q2 2025", status: "upcoming" },
  { phase: "Final Design Lock", date: "Q3 2025", status: "upcoming" },
  { phase: "Production", date: "Q3-Q4 2025", status: "upcoming" },
  { phase: "Quality Assurance", date: "Q4 2025", status: "upcoming" },
  { phase: "Shipping Begins", date: "Q1 2026", status: "upcoming" },
];

export const KickstarterTimeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="timeline" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-background" />

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            Timeline
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-light-primary">
            From concept to <span className="gradient-text">your hands.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />

          <div className="space-y-8">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="flex items-start gap-6 pl-0"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-6 h-6 rounded-full border border-primary/30 bg-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                  </div>
                </div>
                <div className="pt-0.5">
                  <h3 className="font-montserrat text-sm font-medium text-light-primary">
                    {milestone.phase}
                  </h3>
                  <p className="font-montserrat text-xs text-light-muted mt-0.5">{milestone.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
