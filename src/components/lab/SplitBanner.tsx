import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Panel {
  label: string;
  image: string;
  href: string;
}

const panels: Panel[] = [
  { label: "Biometric Security", image: "/uploads/FP_lock_V_lock_close_ups.png", href: "/guides/biometric-lock-box-for-sex-toys" },
  { label: "Find a Retailer", image: "/uploads/dox-black-bookshelf.png", href: "/contact" },
];

export const SplitBanner = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="grid w-full grid-cols-1 sm:grid-cols-2">
      {panels.map((panel, i) => (
        <motion.a
          key={panel.label}
          href={panel.href}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
          className="group relative flex h-40 items-center justify-between overflow-hidden bg-black px-8"
        >
          <img
            src={panel.image}
            alt={panel.label}
            className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-55"
          />
          <span className="relative z-10 font-baskerville text-2xl text-white">{panel.label}</span>
          <span className="relative z-10 font-montserrat text-primary transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </motion.a>
      ))}
    </section>
  );
};
