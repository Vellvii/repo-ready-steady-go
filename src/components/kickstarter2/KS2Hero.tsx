import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, ArrowDown } from "lucide-react";
import heroArch from "@/assets/kickstarter/ks2-arch-hero.jpg";

export const KS2Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = async () => {
    setIsPlaying(true);
    if (videoRef.current) {
      try { await videoRef.current.play(); } catch (err) { console.log(err); }
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-stone-50">
      {!isPlaying && (
        <div className="absolute inset-0">
          <img src={heroArch} alt="Modern architectural interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/60" />
        </div>
      )}

      <video
        ref={videoRef}
        src="/uploads/The_Vellvii_Dox_1.webm"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        muted={isMuted}
        playsInline
        onEnded={() => setIsPlaying(false)}
      />

      {isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      )}

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Thick geometric accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          className="w-16 h-1 bg-amber-700 mb-8 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-montserrat text-[11px] sm:text-xs uppercase tracking-[0.5em] text-stone-600 mb-6 font-medium"
        >
          A Design Innovation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-baskerville text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-900 leading-[0.95] mb-6"
        >
          Intimate wellness,
          <br />
          <span className="text-amber-700">redesigned.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-montserrat text-sm sm:text-base text-stone-500 max-w-lg mb-14 leading-relaxed font-light"
        >
          The world's first biometric storage and docking system.
          <br className="hidden sm:block" />
          Designed to belong - not to hide.
        </motion.p>

        {!isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            onClick={handlePlay}
            className="group flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-700 flex items-center justify-center group-hover:bg-amber-800 transition-colors duration-300 shadow-lg shadow-amber-700/20">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" />
            </div>
            <span className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-stone-500 group-hover:text-amber-700 transition-colors font-medium">
              Watch Film
            </span>
          </motion.button>
        )}

        {isPlaying && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => { setIsMuted(!isMuted); if (videoRef.current) videoRef.current.muted = !isMuted; }}
            className="absolute bottom-8 right-8 p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </motion.button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ArrowDown className="w-5 h-5 text-stone-400 animate-bounce" />
      </motion.div>
    </section>
  );
};
