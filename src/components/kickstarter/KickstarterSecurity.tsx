import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Fingerprint, BatteryCharging, EyeOff, Cable } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Fingerprint locking",
    description: "Biometric access - your touch, your space. No keys, no codes.",
  },
  {
    icon: BatteryCharging,
    title: "Charge while locked",
    description: "Internal USB-C hub charges all devices simultaneously, even when secured.",
  },
  {
    icon: Cable,
    title: "Hidden cable management",
    description: "A single cable in. Everything managed inside. Clean, minimal exterior.",
  },
  {
    icon: EyeOff,
    title: "Complete discretion",
    description: "From the outside, it's a design object. No one needs to know what's inside.",
  },
];

export const KickstarterSecurity = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="security" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-background" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            Security & Technology
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary mb-4">
            Discretion meets <span className="gradient-text">technology.</span>
          </h2>
          <p className="font-montserrat text-sm text-light-muted max-w-md mx-auto">
            Plug and play. Lock and forget. Everything you need - nothing you don't.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i }}
              className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:border-primary/10 transition-colors duration-500"
            >
              <feature.icon className="w-5 h-5 text-primary/70 mb-4" strokeWidth={1.5} />
              <h3 className="font-montserrat text-sm font-medium text-light-primary mb-2">
                {feature.title}
              </h3>
              <p className="font-montserrat text-sm text-light-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 rounded-2xl overflow-hidden"
        >
          <video
            src="/uploads/fingerprint-video.webm"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-48 sm:h-64 object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};
