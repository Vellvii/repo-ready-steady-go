import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import prelaunchLogo from "@/assets/prelaunch-logo.png";

const RESERVE_URL = "https://prelaunch.com/projects/5ff3ce3f-6669-4243-918c-4d57d98b63f6/reservation";
const DISCUSSIONS_URL = "https://prelaunch.com/projects/vellvii-dox-vellvii-dox-pleasure-in-a-luxury-vault/discussions";

const DoxLanding = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const requestFullscreen = async (element: HTMLVideoElement) => {
    try {
      // iOS Safari uses webkitEnterFullscreen on video elements
      if ((element as any).webkitEnterFullscreen) {
        await (element as any).webkitEnterFullscreen();
      } else if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } catch (err) {
      console.log("Fullscreen not supported or denied:", err);
    }
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      try {
        await video.play();
        // Request fullscreen after play starts (required for mobile)
        await requestFullscreen(video);
      } catch (err) {
        console.log("Video play error:", err);
      }
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Exit fullscreen when video ends
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if ((document as any).webkitFullscreenElement) {
      (document as any).webkitExitFullscreen?.();
    }
  };

  const handleReplay = async () => {
    setVideoEnded(false);
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      try {
        await video.play();
        await requestFullscreen(video);
      } catch (err) {
        console.log("Replay error:", err);
      }
    }
  };

  // Handle fullscreen exit (user manually exits)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      
      // If user exits fullscreen and video was playing, show end screen
      if (!isFullscreen && isPlaying && videoRef.current && !videoRef.current.ended) {
        videoRef.current.pause();
        setVideoEnded(true);
      }
    };

    // iOS Safari specific event for video fullscreen
    const handleWebkitEnd = () => {
      setVideoEnded(true);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    
    // iOS specific: webkitendfullscreen fires when exiting fullscreen on video
    videoRef.current?.addEventListener("webkitendfullscreen", handleWebkitEnd);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
      videoRef.current?.removeEventListener("webkitendfullscreen", handleWebkitEnd);
    };
  }, [isPlaying]);

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
              {/* Vellvii Logo */}
              <img 
                src="/uploads/Vellvii-full-logo-transparent.png" 
                alt="Vellvii" 
                className="h-16 md:h-20 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              />
              <h1 className="font-baskerville text-5xl md:text-7xl text-primary tracking-wide mb-3">
                Vellvii Dox
              </h1>
              <p className="font-montserrat text-lg md:text-xl text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse">
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
            className="w-full h-full object-contain bg-black"
            onEnded={handleVideoEnd}
            playsInline
            webkit-playsinline="true"
            controls={isPlaying}
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
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-baskerville text-3xl md:text-5xl text-primary mb-8 text-center"
                >
                  Ready to Experience Luxury?
                </motion.h2>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Reserve Button */}
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    href={RESERVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-xl shadow-elegant hover:shadow-glow transition-all duration-500 overflow-hidden flex items-center gap-3"
                  >
                    <span className="relative z-10 font-montserrat font-bold text-sm tracking-wide uppercase">
                      Reserve Your DOX on
                    </span>
                    <img 
                      src={prelaunchLogo} 
                      alt="Prelaunch" 
                      className="h-5 relative z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.a>

                  {/* Join Discussion Button */}
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    href={DISCUSSIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_100%] text-black rounded-xl shadow-elegant hover:shadow-glow transition-all duration-500 overflow-hidden flex items-center gap-3"
                  >
                    <span className="relative z-10 font-montserrat font-bold text-sm tracking-wide uppercase">
                      Join Discussion on
                    </span>
                    <img 
                      src={prelaunchLogo} 
                      alt="Prelaunch" 
                      className="h-5 relative z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.a>
                </div>

                {/* Follow on Prelaunch */}
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  href={RESERVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors group"
                >
                  <span className="font-montserrat text-sm tracking-wide">Follow our progress on</span>
                  <img 
                    src={prelaunchLogo} 
                    alt="Prelaunch" 
                    className="h-6 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </motion.a>

                {/* Replay option */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleReplay}
                  className="mt-4 text-foreground/50 hover:text-primary transition-colors font-montserrat text-sm tracking-wide"
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
