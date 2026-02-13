import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import oceanTerrace from "@/assets/kickstarter/ks-ocean-terrace.jpg";

export const KickstarterFounder = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="founder" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            The Founder
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-light-primary mb-10">
            A letter from our <span className="gradient-text">founder.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src={oceanTerrace}
              alt="Modern apartment with ocean view at golden hour"
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>

          <blockquote className="space-y-5 max-w-2xl mx-auto">
            <p className="font-baskerville text-lg sm:text-xl text-light-secondary leading-relaxed italic">
              "I created Vellvii because I believed intimate wellness deserved better design.
              Not hidden in drawers. Not stuck to surfaces. Not wrapped in shame."
            </p>
            <p className="font-baskerville text-lg sm:text-xl text-light-secondary leading-relaxed italic">
              "The Dox isn't just a product - it's a statement that pleasure and sophistication
              can coexist. That confidence in your intimate life is something to be designed for,
              not designed around."
            </p>
            <p className="font-baskerville text-lg sm:text-xl text-light-secondary leading-relaxed italic">
              "We're building something that doesn't exist yet. I'd love for you to be part of it."
            </p>
          </blockquote>

          <div className="mt-8 text-center">
            <p className="font-montserrat text-sm text-light-primary">The Vellvii Team</p>
            <p className="font-montserrat text-xs text-light-muted mt-1">Founder & Design Lead</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
