import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FeaturePanel {
  title: string;
  subtitle: string;
  description: string;
  media: string;
  isVideo?: boolean;
  reverse?: boolean;
}

const features: FeaturePanel[] = [
  {
    title: "BIOMETRIC",
    subtitle: "SECURITY",
    description: "Your privacy, sealed. Advanced fingerprint technology ensures only you have access.",
    media: "/uploads/Dox_fp_lock_video2.webm",
    isVideo: true,
    reverse: false,
  },
  {
    title: "INTEGRATED",
    subtitle: "CHARGING",
    description: "Always ready. Always hidden. Wireless charging keeps your devices powered discreetly.",
    media: "/uploads/Red_Dox_charge_inside.png",
    isVideo: false,
    reverse: true,
  },
  {
    title: "VEGAN",
    subtitle: "LEATHER",
    description: "Crafted with intention. Premium materials wrapped in velvet-lined luxury.",
    media: "/uploads/dox-interior-labeled.jpg",
    isVideo: false,
    reverse: false,
  },
];

const FeaturePanel = ({ feature, index }: { feature: FeaturePanel; index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 min-h-[60vh] items-center ${
        feature.reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Media */}
      <div className={`relative overflow-hidden ${feature.reverse ? "lg:order-2" : "lg:order-1"}`}>
        <div className="aspect-[4/3] lg:aspect-auto lg:h-[60vh] relative">
          {feature.isVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={feature.media} type="video/webm" />
            </video>
          ) : (
            <img
              src={feature.media}
              alt={feature.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center px-6 lg:px-16 py-12 ${feature.reverse ? "lg:order-1" : "lg:order-2"}`}>
        <motion.span
          initial={{ opacity: 0, x: feature.reverse ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-primary/90 font-montserrat text-sm tracking-[0.3em] mb-2 font-medium"
        >
          {feature.title}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, x: feature.reverse ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-baskerville text-4xl md:text-5xl lg:text-6xl text-white mb-6"
        >
          {feature.subtitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: feature.reverse ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-montserrat text-white/80 text-lg leading-relaxed max-w-md"
        >
          {feature.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export const DoxFeatures = () => {
  return (
    <section id="dox-features" className="bg-surface-dark">
      {features.map((feature, index) => (
        <FeaturePanel key={feature.title} feature={feature} index={index} />
      ))}
    </section>
  );
};
