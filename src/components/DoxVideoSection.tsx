import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DoxVideoSectionProps {
  onReserve?: () => void;
}

export const DoxVideoSection = ({ onReserve }: DoxVideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      try {
        await video.play();
      } catch (err) {
        console.log("Video play error:", err);
      }
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleReplay = async () => {
    setVideoEnded(false);
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      try {
        await video.play();
      } catch (err) {
        console.log("Replay error:", err);
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2 sm:mb-3">
            Experience
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-baskerville font-bold text-light-primary mb-3">
            Dox in <span className="gradient-text">60 Seconds</span>
          </h2>
          <p className="text-light-secondary text-sm sm:text-base font-montserrat max-w-xl mx-auto">
            Discover what makes the Vellvii Dox the ultimate luxury storage solution
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 bg-black">
          <video
            ref={videoRef}
            src="/uploads/The_Vellvii_Dox_1.webm"
            className="w-full h-full object-contain bg-black"
            onEnded={handleVideoEnd}
            playsInline
            controls={isPlaying && !videoEnded}
          />

          {/* Play Button Overlay */}
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
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-500"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-black ml-1" fill="currentColor" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* End Screen */}
          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4"
              >
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-baskerville text-xl sm:text-2xl md:text-3xl text-primary mb-4 sm:mb-6 text-center"
                >
                  Ready to Experience Luxury?
                </motion.h3>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Watch Again */}
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleReplay}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 border border-white/30 hover:border-primary/50 text-light-primary rounded-xl transition-all font-montserrat text-sm"
                  >
                    Watch Again
                  </motion.button>

                  {/* Reserve CTA */}
                  {onReserve && (
                    <motion.button
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={onReserve}
                      className="btn-premium px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm"
                    >
                      Add to Cart
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DoxVideoSection;
