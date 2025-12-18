import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DoxLanding = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleReplay = () => {
    setVideoEnded(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
      
      {/* Subtle gold accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        {/* Title - hidden when video is playing */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="font-baskerville text-5xl md:text-7xl text-primary tracking-wide mb-3">
                Vellvii Dox
              </h1>
              <p className="font-montserrat text-lg md:text-xl text-foreground/60 tracking-widest uppercase">
                Explained in 60 seconds
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Container */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl shadow-primary/10">
          <video
            ref={videoRef}
            src="/uploads/The_Vellvii_Dox_1.webm"
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            playsInline
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
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/90 flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-500"
                >
                  <Play className="w-10 h-10 md:w-14 md:h-14 text-black ml-2" fill="currentColor" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* End Screen with Buttons */}
          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-baskerville text-3xl md:text-5xl text-primary mb-8"
                >
                  Ready to Experience Luxury?
                </motion.h2>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Reserve Button */}
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    href="https://prelaunch.com/projects/5ff3ce3f-6669-4243-918c-4d57d98b63f6/reservation?userEmail=stefan%40vellvii.com&reservationId=c3452574-55cf-49e6-aa12-79b4c18131ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-10 py-5 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-xl shadow-elegant hover:shadow-glow transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10 font-montserrat font-bold text-lg tracking-wide uppercase">
                      Reserve Your DOX
                    </span>
                    <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.a>

                  {/* Discuss Button */}
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    href="https://prelaunch.com/projects/vellvii-dox-vellvii-dox-pleasure-in-a-luxury-vault/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_100%] text-black rounded-xl shadow-elegant hover:shadow-glow transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10 font-montserrat font-bold text-lg tracking-wide uppercase">
                      Join Discussion
                    </span>
                    <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.a>
                </div>

                {/* Replay option */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleReplay}
                  className="mt-8 text-foreground/50 hover:text-primary transition-colors font-montserrat text-sm tracking-wide"
                >
                  Watch Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DoxLanding;
