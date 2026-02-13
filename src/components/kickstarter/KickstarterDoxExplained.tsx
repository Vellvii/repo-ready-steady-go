import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";

export const KickstarterDoxExplained = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    setIsPlaying(true);
    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch (err) {
        console.log("Play error:", err);
      }
    }
  };

  return (
    <section id="dox" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            The Dox
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary mb-4">
            The Dox in <span className="gradient-text">60 seconds.</span>
          </h2>
          <p className="font-montserrat text-sm text-light-muted max-w-md mx-auto">
            Storage. Saddle. Docking station. Charging hub. Privacy system.
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-black/50"
        >
          <video
            ref={videoRef}
            src="/uploads/The_Vellvii_Dox_1.webm"
            poster="/uploads/Dox1.jpg"
            className="w-full h-full object-cover"
            controls={isPlaying}
            playsInline
            onEnded={() => setIsPlaying(false)}
          />

          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-primary/40 flex items-center justify-center group-hover:border-primary/70 group-hover:shadow-[0_0_30px_hsl(40_65%_72%/0.15)] transition-all duration-500">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-primary ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </motion.div>

        {/* Key features strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-10"
        >
          {["Storage", "Saddle", "Dock", "Charger", "Lock"].map((label, i) => (
            <div key={i} className="text-center py-3 rounded-lg border border-white/[0.04] bg-white/[0.02]">
              <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-light-muted">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
