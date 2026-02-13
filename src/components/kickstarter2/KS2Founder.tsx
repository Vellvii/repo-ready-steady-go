import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import contemporaryLiving from "@/assets/kickstarter/ks2-contemporary-living.jpg";

export const KS2Founder = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="founder" className="relative py-28 sm:py-36 bg-white">
      <div ref={ref} className="max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">The Founder</p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-stone-900 mb-10">
            A letter from our <span className="text-amber-700">founder.</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="rounded-3xl overflow-hidden mb-10">
            <img src={contemporaryLiving} alt="Contemporary interior" className="w-full h-48 sm:h-64 object-cover" />
          </div>
          <blockquote className="space-y-5 max-w-2xl mx-auto text-center">
            <p className="font-baskerville text-lg sm:text-xl text-stone-700 leading-relaxed italic">
              "I created Vellvii because intimate wellness deserved better design.
              Not hidden in drawers. Not stuck to surfaces. Not wrapped in shame."
            </p>
            <p className="font-baskerville text-lg sm:text-xl text-stone-700 leading-relaxed italic">
              "The Dox is a statement that pleasure and sophistication can coexist.
              We're building something that doesn't exist yet. I'd love for you to be part of it."
            </p>
          </blockquote>
          <div className="mt-8 text-center">
            <p className="font-montserrat text-sm text-stone-800 font-semibold">The Vellvii Team</p>
            <p className="font-montserrat text-xs text-stone-400 mt-1">Founder & Design Lead</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
