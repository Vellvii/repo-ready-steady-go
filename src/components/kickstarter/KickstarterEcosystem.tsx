import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const products = [
  {
    name: "Pulse",
    tagline: "Fun. Fast. Intense.",
    description: "The entry point. Immediate satisfaction, effortless pleasure. Designed for those who want to feel something - now.",
    image: "/uploads/Pulse_-trans.png",
    price: "$169",
    ksPrice: "$99",
  },
  {
    name: "G-Vibe",
    tagline: "Subtle at first. Unforgettable after.",
    description: "Dual-stimulation technology that builds slowly and rewards patience. Blended climax positioning for deeper, layered experiences.",
    image: "/uploads/G-Vibe-transparent.png",
    price: "$169",
    ksPrice: "$99",
  },
  {
    name: "Evolve",
    tagline: "Patience rewarded.",
    description: "Engineered for deep internal stimulation. Not instant - intentional. The result is profound and unmistakably memorable.",
    image: "/uploads/PinkEvolveSide.png",
    price: "$169",
    ksPrice: "$99",
  },
];

export const KickstarterEcosystem = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="ecosystem" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-background" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            The Ecosystem
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary mb-4">
            Not just products.
            <br />
            <span className="gradient-text">A spectrum of experience.</span>
          </h2>
          <p className="font-montserrat text-sm text-light-muted max-w-md mx-auto">
            Three devices. Each designed for a different journey.
            All dock, charge, and lock inside the Dox.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="text-center group"
            >
              <div className="relative h-56 sm:h-64 mb-8 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-[70%] object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="font-baskerville text-2xl text-light-primary mb-2">
                {product.name}
              </h3>
              <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-primary/70 mb-4">
                {product.tagline}
              </p>
              <p className="font-montserrat text-sm text-light-muted leading-relaxed mb-6 max-w-xs mx-auto">
                {product.description}
              </p>

              <div className="flex items-center justify-center gap-3">
                <span className="font-montserrat text-sm text-light-muted line-through">{product.price}</span>
                <span className="font-baskerville text-xl text-primary">{product.ksPrice}</span>
                <span className="font-montserrat text-[10px] uppercase tracking-wider text-primary/60 bg-primary/10 px-2 py-0.5 rounded-full">
                  Early Bird
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
