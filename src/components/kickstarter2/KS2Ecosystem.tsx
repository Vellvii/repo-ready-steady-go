import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const products = [
  {
    name: "Pulse",
    tagline: "Fun. Fast. Intense.",
    description: "The entry point. Immediate satisfaction, effortless pleasure.",
    image: "/uploads/Pulse_-trans.png",
    price: "$169", ksPrice: "$99",
    color: "bg-rose-50 border-rose-200",
  },
  {
    name: "G-Vibe",
    tagline: "Subtle at first. Unforgettable after.",
    description: "Dual-stimulation technology. Blended climax positioning.",
    image: "/uploads/G-Vibe-transparent.png",
    price: "$169", ksPrice: "$99",
    color: "bg-violet-50 border-violet-200",
  },
  {
    name: "Evolve",
    tagline: "Patience rewarded.",
    description: "Deep internal stimulation. Intentional. Profound.",
    image: "/uploads/PinkEvolveSide.png",
    price: "$169", ksPrice: "$99",
    color: "bg-amber-50 border-amber-200",
  },
];

export const KS2Ecosystem = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="ecosystem" className="relative py-28 sm:py-36 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">
            The Ecosystem
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
            Three experiences.
            <br />
            <span className="text-amber-700">One system.</span>
          </h2>
          <p className="font-montserrat text-sm text-stone-500 max-w-md mx-auto font-light">
            Each designed for a different journey. All dock, charge, and lock inside the Dox.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i }}
              className={`rounded-3xl border p-8 text-center ${p.color} group transition-shadow duration-500 hover:shadow-lg`}
            >
              <div className="h-48 sm:h-56 flex items-center justify-center mb-6">
                <img src={p.image} alt={p.name} className="max-h-full max-w-[65%] object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-baskerville text-2xl text-stone-900 mb-1">{p.name}</h3>
              <p className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-amber-700 mb-4 font-medium">{p.tagline}</p>
              <p className="font-montserrat text-sm text-stone-500 font-light mb-6">{p.description}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="font-montserrat text-sm text-stone-400 line-through">{p.price}</span>
                <span className="font-baskerville text-xl text-amber-700">{p.ksPrice}</span>
                <span className="font-montserrat text-[9px] uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">Early Bird</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
