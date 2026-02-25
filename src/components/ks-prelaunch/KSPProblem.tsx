import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const KSPProblem = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      try { await video.play(); } catch (err) { console.log("Video play error:", err); }
    }
  };

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <ScrollReveal>
          <p className="text-primary/60 text-xs uppercase tracking-[0.4em] font-semibold text-center mb-6">
            Chapter 01
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white text-center mb-14 font-baskerville leading-tight">
            Meet the <span className="text-primary">Vellvii DOX</span> in under 60 seconds.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black">
              <video
                ref={videoRef}
                src="/uploads/The_Vellvii_Dox_Kickstarter_PreLaunch_with_captions_1.mp4"
                className="w-full h-full object-contain bg-black"
                playsInline
                controls={isPlaying}
              />
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group"
                    onClick={handlePlay}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-500"
                    >
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-black ml-1" fill="currentColor" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
