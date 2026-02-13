import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";

export const KS2DoxExplained = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    setIsPlaying(true);
    if (videoRef.current) {
      try { await videoRef.current.play(); } catch (err) { console.log(err); }
    }
  };

  return (
    <section id="dox" className="relative py-28 sm:py-36 bg-stone-900">
      <div ref={ref} className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-10 h-1 bg-amber-500 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-500 mb-6 font-medium">
            The Dox
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            60 seconds. <span className="text-amber-500">One product.</span>
          </h2>
          <p className="font-montserrat text-sm text-stone-400 max-w-md mx-auto font-light">
            Storage. Saddle. Dock. Charger. Lock.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video rounded-3xl overflow-hidden"
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
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-600 flex items-center justify-center group-hover:bg-amber-700 transition-colors shadow-xl shadow-amber-600/30">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-5 gap-3 mt-8"
        >
          {["Storage", "Saddle", "Dock", "Charger", "Lock"].map((l) => (
            <div key={l} className="text-center py-3 rounded-xl border border-stone-700 bg-stone-800/50">
              <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">{l}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
