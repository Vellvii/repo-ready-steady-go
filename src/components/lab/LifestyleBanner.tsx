import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const LifestyleBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section ref={ref} className="relative h-[70vh] w-full overflow-hidden bg-black">
      <motion.img
        src="/uploads/Lifestyle_img8.jpg"
        alt="Vellvii lifestyle"
        style={{ scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <motion.div style={{ opacity: labelOpacity }} className="absolute bottom-8 left-6 sm:left-12">
        <span className="font-montserrat text-sm tracking-[0.3em] text-primary/90">THE VELLVII DOX</span>
      </motion.div>
    </section>
  );
};
