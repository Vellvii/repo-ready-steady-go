import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Fingerprint, BatteryCharging, EyeOff, Cable } from "lucide-react";

const features = [
  { icon: Fingerprint, title: "Fingerprint locking", desc: "Biometric access - your touch, your space." },
  { icon: BatteryCharging, title: "Charge while locked", desc: "Internal USB-C charges everything, even when secured." },
  { icon: Cable, title: "Hidden cables", desc: "One cable in. Everything managed. Clean exterior." },
  { icon: EyeOff, title: "Complete discretion", desc: "From outside, it's a design object. Nothing more." },
];

export const KS2Security = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="security" className="relative py-28 sm:py-36 bg-stone-100">
      <div ref={ref} className="max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">Security & Technology</p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
            Discretion meets <span className="text-amber-700">technology.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 * i }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 hover:border-amber-300 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-700/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-amber-700" strokeWidth={1.5} />
              </div>
              <h3 className="font-montserrat text-sm font-semibold text-stone-800 mb-1.5">{f.title}</h3>
              <p className="font-montserrat text-sm text-stone-500 leading-relaxed font-light">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 rounded-3xl overflow-hidden">
          <video src="/uploads/fingerprint-video.webm" autoPlay muted loop playsInline className="w-full h-48 sm:h-64 object-cover" />
        </motion.div>
      </div>
    </section>
  );
};
