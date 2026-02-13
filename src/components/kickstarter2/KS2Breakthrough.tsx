import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import concreteBedroom from "@/assets/kickstarter/ks2-concrete-bedroom.jpg";
import { Check } from "lucide-react";

export const KS2Breakthrough = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="breakthrough" className="relative py-28 sm:py-36 bg-white overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-3xl"
          >
            <img src={concreteBedroom} alt="Modern architectural bedroom" className="w-full h-72 sm:h-96 lg:h-[520px] object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-10 h-1 bg-amber-700 mb-8" />
            <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">
              The Breakthrough
            </p>
            <h2 className="font-baskerville text-3xl sm:text-4xl text-stone-900 leading-tight mb-8">
              Not a product.
              <br />
              <span className="text-amber-700">A design object.</span>
            </h2>

            <div className="space-y-5">
              {[
                { t: "Charge out of sight.", d: "Internal USB-C hub powers everything discreetly." },
                { t: "Dock properly.", d: "Precision cradles hold each device securely." },
                { t: "Store elegantly.", d: "Velvet-lined interiors protect and present." },
                { t: "Lock privately.", d: "Biometric fingerprint access - your touch only." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-amber-700/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-amber-700" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-montserrat text-sm font-semibold text-stone-800 mb-0.5">{item.t}</h3>
                    <p className="font-montserrat text-sm text-stone-500 font-light">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
