import { useState, useRef } from "react";
import { Play, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import prelaunchLogo from "@/assets/prelaunch-logo.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import * as z from "zod";

const PRELAUNCH_URL = "https://prelaunch.com/projects/5ff3ce3f-6669-4243-918c-4d57d98b63f6/reservation?userEmail=stefan%40vellvii.com&reservationId=c3452574-55cf-49e6-aa12-79b4c18131ac";

const emailSchema = z.string().trim().min(1, "Email is required").email("Please enter a valid email").max(255, "Email too long");

const DoxVideoLanding = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("usa-launch-notify", {
        body: { email: result.data, source: "dox_video_landing" },
      });
      
      if (error) throw error;
      
      setSuccessMessage(data?.message || "You're on the list!");
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Notification signup error:", err);
      setEmailError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      try {
        // Try to enter fullscreen on mobile
        if (video.requestFullscreen) {
          await video.requestFullscreen();
        } else if ((video as any).webkitEnterFullscreen) {
          await (video as any).webkitEnterFullscreen();
        }
        await video.play();
      } catch (err) {
        console.log("Video play/fullscreen error:", err);
        // Still try to play even if fullscreen fails
        try {
          await video.play();
        } catch (playErr) {
          console.log("Video play error:", playErr);
        }
      }
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Exit fullscreen when video ends
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
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
      } catch (err) {
        console.log("Replay error:", err);
      }
    }
  };

  return (
    <>
      <SEO
        title="Vellvii DOX | Luxury Intimate Storage"
        description="Discover the Vellvii DOX - a luxury docking station featuring biometric security, integrated charging, and premium design. Watch the 60-second explainer."
        canonical="/"
      />

      <div className="min-h-screen bg-background flex flex-col">
        {/* Header with Logo */}
        <header className="py-6 px-4 flex justify-center">
          <img
            src="/uploads/Vellvii-full-logo-transparent.png"
            alt="Vellvii"
            className="h-8 sm:h-10 w-auto"
          />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        {/* Section Header */}
          <div className="text-center mb-5 sm:mb-8">
            <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
              Experience
            </p>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-baskerville font-bold text-light-primary">
              DOX in <span className="gradient-text">60 Seconds</span>
            </h1>
          </div>

          {/* Video Container */}
          <div className="relative w-full max-w-4xl aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 bg-black">
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
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-primary/90 flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-500"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black ml-1" fill="currentColor" />
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
                    className="font-baskerville text-xl sm:text-2xl md:text-3xl text-primary mb-6 sm:mb-8 text-center"
                  >
                    Ready to Experience Luxury?
                  </motion.h3>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
                    {/* Watch Again */}
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={handleReplay}
                      className="px-6 py-3 border border-white/30 hover:border-primary/50 text-light-primary rounded-xl transition-all font-montserrat text-sm"
                    >
                      Watch Again
                    </motion.button>

                    {/* Reserve CTA */}
                    <motion.a
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      href={PRELAUNCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-xl font-bold text-sm shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right text-center flex items-center justify-center gap-2"
                    >
                      <span>Reserve Your DOX</span>
                      <img src={prelaunchLogo} alt="" className="h-4 w-4" />
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Buttons (visible when not playing or video ended) */}
          <AnimatePresence>
            {(!isPlaying || videoEnded) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-3 mt-8 w-full max-w-sm px-4 items-center"
              >
                <a
                  href={PRELAUNCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group px-6 py-4 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-xl font-bold text-base shadow-elegant hover:shadow-glow transition-all duration-500 hover:bg-right relative overflow-hidden flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">Reserve Your DOX</span>
                  <img src={prelaunchLogo} alt="Prelaunch.com" className="h-5 w-5 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
                <button
                  onClick={() => setNotifyOpen(true)}
                  className="w-full group px-4 py-4 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 border-2 border-primary/50 hover:border-primary text-light-primary rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:bg-primary/20 flex items-center justify-center gap-2 text-center"
                >
                  <span className="text-base sm:text-lg">🇺🇸</span>
                  <span>Notify Me – USA Launch</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <PrelaunchFooter />

        {/* Notify Me Modal */}
        <Dialog open={notifyOpen} onOpenChange={setNotifyOpen}>
          <DialogContent className="bg-background border-primary/20 max-w-md">
            {isSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <DialogTitle className="text-2xl font-baskerville text-light-primary">
                  You're on the List!
                </DialogTitle>
                <p className="text-muted-foreground text-sm">
                  {successMessage || "We'll notify you as soon as DOX becomes available in the USA."}
                </p>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-baskerville text-light-primary text-center">
                    <span className="text-2xl mr-2">🇺🇸</span> Get Notified for USA Launch
                  </DialogTitle>
                  <DialogDescription className="text-center text-white/60">
                    Be first to know when DOX becomes available in your area
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNotifySubmit} className="space-y-4 mt-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                    />
                    {emailError && (
                      <p className="text-red-400 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-xl font-bold shadow-elegant hover:shadow-glow transition-all duration-500 hover:bg-right disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Notify Me</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default DoxVideoLanding;
