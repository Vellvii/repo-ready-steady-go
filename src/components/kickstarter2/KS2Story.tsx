import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const KS2Story = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="story" className="relative py-28 sm:py-36 bg-white">
      <div ref={ref} className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">
            Our Story
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-stone-900 leading-tight mb-10">
            Wellness deserves
            <br />
            <span className="text-amber-700">better design.</span>
          </h2>
          <p className="font-montserrat text-sm sm:text-base text-stone-500 leading-[1.9] mb-6 font-light">
            For too long, intimate products have been an afterthought - hidden in drawers,
            stuck to surfaces, wrapped in shame. We believe what you invite into
            your most personal moments deserves intention.
          </p>
          <p className="font-montserrat text-sm sm:text-base text-stone-500 leading-[1.9] font-light">
            Vellvii was built on one idea: wellness - all wellness -
            should be designed with care, stored with elegance, and experienced
            without apology.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
