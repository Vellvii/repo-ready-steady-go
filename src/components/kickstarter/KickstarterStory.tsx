import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const KickstarterStory = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="story" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-background" />

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            Our Story
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-light-primary leading-tight mb-8">
            Intimate wellness deserves
            <br />
            <span className="gradient-text">better design.</span>
          </h2>
          <p className="font-montserrat text-sm text-light-muted leading-[1.9] mb-6">
            For too long, intimate products have been an afterthought - hidden in drawers,
            stuck to surfaces, wrapped in shame. We believe the objects you invite into
            your most personal moments deserve the same care as the rest of your curated life.
          </p>
          <p className="font-montserrat text-sm text-light-muted leading-[1.9]">
            Vellvii was founded on a simple principle: wellness - all wellness -
            should be designed with intention, stored with elegance, and experienced
            without apology.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
