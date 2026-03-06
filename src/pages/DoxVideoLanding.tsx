import { useState, useRef } from "react";
import { Play, CheckCircle2, Loader2 } from "lucide-react";
import { CountdownTimer } from "@/components/prelaunch/CountdownTimer";
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

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox-a-premium-luxury-vault-for-intimacy-and-storage";

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

          </div>

          {/* Massive Kickstarter Banner */}
          <div className="w-full max-w-4xl mt-10 sm:mt-14 space-y-8 sm:space-y-10 text-center">
            {/* Giant headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tight"
              style={{
                background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%), hsl(40 70% 75%))",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-text 3s ease-in-out infinite",
              }}
            >
              Follow Us On Kickstarter
            </motion.h2>
            <style>{`
              @keyframes shimmer-text {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
            `}</style>

            {/* Launch date */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-light tracking-wide"
            >
              Launch Date:{" "}
              <span className="font-bold text-foreground">10 March 2026</span>
              {" · "}
              <span className="font-bold text-foreground">08:30 USA Time</span>
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center"
            >
              <CountdownTimer targetDate="2026-03-10T13:30:00Z" size="large" />
            </motion.div>

            {/* CTAs: Notify + Watch Again */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col items-center gap-4"
            >
              <a
                href={KICKSTARTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block relative group"
              >
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-75 blur-lg"
                  style={{ background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%))" }}
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="relative px-12 sm:px-16 py-5 sm:py-7 rounded-2xl font-bold text-lg sm:text-2xl text-black"
                  style={{ background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(40 65% 60%))" }}
                >
                  Notify Me on Launch
                </div>
              </a>
              <p className="text-muted-foreground/50 text-xs sm:text-sm font-light">
                No payment required. Just click to follow & get notified.
              </p>

              {/* Watch Again */}
              <button
                onClick={handleReplay}
                className="mt-2 px-6 py-3 border border-primary/30 hover:border-primary text-primary rounded-xl transition-all font-montserrat text-sm hover:bg-primary/10"
              >
                Watch Again
              </button>
            </motion.div>
          </div>
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
