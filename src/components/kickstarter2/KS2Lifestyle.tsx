import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import concreteBedroom from "@/assets/kickstarter/ks2-concrete-bedroom.jpg";
import contemporaryLiving from "@/assets/kickstarter/ks2-contemporary-living.jpg";
import archHero from "@/assets/kickstarter/ks2-arch-hero.jpg";

const items = [
  { image: concreteBedroom, tagline: "Designed for your space.", desc: "Clean lines. Natural materials. Belongs on your nightstand.", alt: "Architectural bedroom with concrete and timber" },
  { image: contemporaryLiving, tagline: "At home in bold interiors.", desc: "Warm terracotta, stone, timber - the Dox complements how you actually live.", alt: "Contemporary living room with warm tones" },
  { image: archHero, tagline: "Sculptural by nature.", desc: "Not hidden. Displayed. A design object that holds its own in any room.", alt: "Brutalist architectural interior" },
];

export const KS2Lifestyle = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="lifestyle" className="relative py-28 sm:py-36 bg-stone-100">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">
            Designed to Belong
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-stone-900">
            Not where you hide it.
            <br />
            Where you <span className="text-amber-700">live.</span>
          </h2>
        </motion.div>

        <div className="space-y-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.12 * i }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-14`}
            >
              <div className="w-full md:w-2/3 overflow-hidden rounded-3xl group">
                <img src={item.image} alt={item.alt} className="w-full h-60 sm:h-72 md:h-[400px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" />
              </div>
              <div className="w-full md:w-1/3 text-center md:text-left">
                <h3 className="font-baskerville text-xl sm:text-2xl text-stone-900 mb-3">{item.tagline}</h3>
                <p className="font-montserrat text-sm text-stone-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
