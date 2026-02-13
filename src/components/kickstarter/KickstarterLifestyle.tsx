import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import boutiqueNightstand from "@/assets/kickstarter/ks-boutique-nightstand.jpg";
import oceanTerrace from "@/assets/kickstarter/ks-ocean-terrace.jpg";
import fireplaceRoom from "@/assets/kickstarter/ks-fireplace-bedroom.jpg";

const lifestyleItems = [
  {
    image: boutiqueNightstand,
    tagline: "Designed for your nightstand.",
    description: "Not hidden. Displayed. A design object that belongs in your most intimate space.",
    alt: "Boutique hotel nightstand with warm ambient lighting",
  },
  {
    image: oceanTerrace,
    tagline: "At home in modern spaces.",
    description: "Clean lines, warm materials, intentional design - the Dox complements how you live.",
    alt: "Modern apartment with ocean view at golden hour",
  },
  {
    image: fireplaceRoom,
    tagline: "Warmth meets discretion.",
    description: "In your bedroom, on your shelf, beside your fireplace. Always elegant, always private.",
    alt: "Modern fireplace bedroom with designer furniture",
  },
];

export const KickstarterLifestyle = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="lifestyle" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-background" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            Designed to Belong
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary">
            Not where you <span className="text-light-muted">hide it.</span>
            <br />
            Where you <span className="gradient-text">live.</span>
          </h2>
        </motion.div>

        <div className="space-y-10 sm:space-y-14">
          {lifestyleItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 * i }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-14`}
            >
              <div className="w-full md:w-2/3 relative overflow-hidden rounded-2xl group">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-60 sm:h-72 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                />
              </div>
              <div className="w-full md:w-1/3 text-center md:text-left">
                <h3 className="font-baskerville text-xl sm:text-2xl text-light-primary mb-3">
                  {item.tagline}
                </h3>
                <p className="font-montserrat text-sm text-light-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
