import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import heroImage from "@/assets/kickstarter/ks-modern-bedroom.jpg";

export const KickstarterHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background - video or fallback image */}
      {!isPlaying && (
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern minimalist bedroom with warm ambient lighting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary/80 mb-8"
        >
          A Design Innovation in Intimate Wellness
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-baskerville text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-light-primary leading-[1] mb-6 max-w-4xl"
        >
          Belongs in your
          <br />
          <span className="gradient-text">curated life.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-montserrat text-sm sm:text-base text-light-muted max-w-lg mb-14 leading-relaxed"
        >
          The world's first biometric storage and docking system
          <br className="hidden sm:block" />
          for intimate wellness - designed, not hidden.
        </motion.p>

        {/* Play Button */}
        {!isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            onClick={handlePlay}
            className="group flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary/60 group-hover:shadow-[0_0_30px_hsl(40_65%_72%/0.15)] transition-all duration-700">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-primary ml-0.5" fill="currentColor" />
            </div>
            <span className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-light-muted group-hover:text-primary/80 transition-colors">
              Watch the Film
            </span>
          </motion.button>
        )}

        {/* Mute toggle when playing */}
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => {
              setIsMuted(!isMuted);
              if (videoRef.current) videoRef.current.muted = !isMuted;
            }}
            className="absolute bottom-8 right-8 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-white/80" /> : <Volume2 className="w-5 h-5 text-white/80" />}
          </motion.button>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-10 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
};
