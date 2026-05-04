import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, CheckCircle2, Loader2, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { LuxCountdown } from "@/components/lux/LuxPreOrderPanel";
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

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email")
  .max(255, "Email too long");

interface CollectionItem {
  name: string;
  tagline: string;
  image: string;
  to: string;
  badge?: string;
}

const COLLECTION: CollectionItem[] = [
  {
    name: "Vellvii Lux",
    tagline: "Limited pre-order. Ships first week of June.",
    image: "/uploads/lux-bag-final-v4.jpg",
    to: "/products/vellvii-lux",
    badge: "Pre-Order",
  },
  {
    name: "DOX",
    tagline: "The flagship vault. New batch releasing soon.",
    image: "/uploads/Dox1.jpg",
    to: "/dox",
    badge: "Restock Soon",
  },
  {
    name: "Pulse",
    tagline: "Refined rhythm, quiet power.",
    image: "/uploads/Pulse1.jpg",
    to: "/pulse",
  },
  {
    name: "Vibe",
    tagline: "Sculpted for the everyday.",
    image: "/uploads/Vibe1.jpg",
    to: "/vibe",
  },
  {
    name: "G-Vibe",
    tagline: "Designed with intention.",
    image: "/uploads/G-Vibe1.jpg",
    to: "/g-vibe",
  },
  {
    name: "Sex Saddle",
    tagline: "Sculptured for the art of the 'O'.",
    image: "/uploads/Dox5.jpg",
    to: "/sex-saddle",
  },
];

const DoxVideoLanding = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Waitlist dialog
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Inline waitlist (homepage section)
  const [inlineEmail, setInlineEmail] = useState("");
  const [inlineError, setInlineError] = useState("");
  const [inlineSubmitting, setInlineSubmitting] = useState(false);
  const [inlineSubmitted, setInlineSubmitted] = useState(false);

  const submitWaitlist = async (
    value: string,
    source: string,
  ): Promise<{ ok: true; message: string } | { ok: false; message: string }> => {
    const result = emailSchema.safeParse(value);
    if (!result.success) {
      return { ok: false, message: result.error.errors[0].message };
    }
    try {
      const { data, error } = await supabase.functions.invoke("usa-launch-notify", {
        body: { email: result.data, source },
      });
      if (error) throw error;
      return { ok: true, message: data?.message || "You're on the list!" };
    } catch (err: any) {
      console.error("Waitlist signup error:", err);
      return { ok: false, message: err.message || "Something went wrong. Please try again." };
    }
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setIsSubmitting(true);
    const res = await submitWaitlist(email, "homepage_waitlist_modal");
    if (res.ok) {
      setSuccessMessage(res.message);
      setIsSubmitted(true);
    } else {
      setEmailError(res.message);
    }
    setIsSubmitting(false);
  };

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError("");
    setInlineSubmitting(true);
    const res = await submitWaitlist(inlineEmail, "homepage_waitlist");
    if (res.ok) {
      setInlineSubmitted(true);
    } else {
      setInlineError(res.message);
    }
    setInlineSubmitting(false);
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      try {
        if (video.requestFullscreen) {
          await video.requestFullscreen();
        } else if ((video as any).webkitEnterFullscreen) {
          await (video as any).webkitEnterFullscreen();
        }
        await video.play();
      } catch (err) {
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
        title="Vellvii | The Art of 'O' - Lux Pre-Order, DOX & The Pleasure Collection"
        description="The Vellvii Lux is now in limited pre-order, shipping first week of June with a complimentary Vellvii Nova. Discover DOX, Pulse, Vibe and the full Pleasure Collection."
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

        {/* [2] Backer thank-you + processing status */}
        <section className="px-4 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 backdrop-blur-sm px-5 py-5 sm:px-8 sm:py-6 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              <span className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.25em] text-primary">
                To Our Backers
              </span>
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
            </div>
            <p className="font-baskerville text-base sm:text-lg md:text-xl text-light-primary leading-relaxed mb-2">
              To our Kickstarter and prelaunch backers - thank you. You made Vellvii real.
            </p>
            <p className="font-montserrat text-sm sm:text-base text-light-secondary leading-relaxed">
              Your orders are now in processing. You'll receive shipping confirmation by email as
              your unit moves through fulfillment.
            </p>
          </motion.div>
        </section>

        {/* [3] Lux Pre-Order Hero */}
        <section className="px-4 mb-12 sm:mb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.25em] text-primary">
                Limited Pre-Order - 1,500 Units
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-3"
            >
              <h1
                className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-baskerville font-bold leading-[0.95] tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%), hsl(40 70% 75%))",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer-text 3s ease-in-out infinite",
                }}
              >
                The Vellvii Lux is here.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-light-secondary font-montserrat max-w-2xl mx-auto leading-relaxed">
                Ships first week of June. Each pre-order includes a complimentary Vellvii Nova -
                handheld suction toy, reserved for the first 1,500 orders.
              </p>
            </motion.div>

            <style>{`
              @keyframes shimmer-text {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
            `}</style>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto"
            >
              <LuxCountdown />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/products/vellvii-lux" className="inline-block relative group">
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-75 blur-lg"
                  style={{
                    background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%))",
                  }}
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="relative px-10 sm:px-14 py-4 sm:py-6 rounded-2xl font-bold text-base sm:text-xl text-black tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(40 65% 60%))",
                  }}
                >
                  Reserve Your Lux
                </div>
              </Link>
              <p className="mt-4 text-xs sm:text-sm text-light-muted font-montserrat">
                Ships from the USA - no international delays
              </p>
            </motion.div>
          </div>
        </section>

        {/* [4] DOX Video Section */}
        <section className="px-4 mb-12 sm:mb-16 border-t border-white/5 pt-12 sm:pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
                Meet The DOX
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-baskerville font-bold text-light-primary">
                The Flagship Vault, in <span className="gradient-text">60 Seconds</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-light-secondary font-montserrat">
                New batches releasing soon. Join the waitlist below.
              </p>
            </div>

            <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 bg-black">
              <video
                ref={videoRef}
                src="/uploads/The_Vellvii_Dox_1.webm"
                className="w-full h-full object-contain bg-black"
                onEnded={handleVideoEnd}
                playsInline
                controls={isPlaying && !videoEnded}
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
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-primary/90 flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-500"
                    >
                      <Play
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black ml-1"
                        fill="currentColor"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {videoEnded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                  >
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      onClick={handleReplay}
                      className="px-8 py-4 border border-primary/50 hover:border-primary text-primary rounded-xl transition-all font-montserrat text-base hover:bg-primary/10"
                    >
                      Watch Again
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* [5] Vellvii Collection Grid */}
        <section className="px-4 mb-12 sm:mb-16 border-t border-white/5 pt-12 sm:pt-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
                The Pleasure Collection
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-baskerville font-bold text-light-primary mb-3">
                Discover the <span className="gradient-text">Collection</span>
              </h2>
              <p className="text-sm sm:text-base text-light-secondary font-montserrat max-w-2xl mx-auto leading-relaxed">
                More units of every product - including Lux - release soon. Reserve your place on
                the waitlist below.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
              {COLLECTION.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={item.to}
                    className="group block rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-card/50 hover:border-primary/40 transition-all duration-500 hover:shadow-elegant"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-black/30">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {item.badge && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2.5 py-1 rounded-full bg-primary/95 backdrop-blur-sm">
                          <span className="font-montserrat text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-baskerville font-bold text-base sm:text-lg text-light-primary group-hover:text-primary transition-colors mb-1">
                        {item.name}
                      </h3>
                      <p className="font-montserrat text-[11px] sm:text-xs text-light-secondary leading-relaxed line-clamp-2">
                        {item.tagline}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* [6] Inline Waitlist */}
        <section className="px-4 mb-16 sm:mb-20 border-t border-white/5 pt-12 sm:pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
              Be First in Line
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-baskerville font-bold text-light-primary mb-3">
              When the Next Batch Drops
            </h2>
            <p className="text-sm sm:text-base text-light-secondary font-montserrat mb-6 sm:mb-8 leading-relaxed">
              We'll notify you when DOX, Lux and the rest of the Vellvii Collection open for
              restock - no spam, just the moment it matters.
            </p>

            {inlineSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-primary/40 bg-primary/10"
              >
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-montserrat text-sm sm:text-base text-light-primary">
                  You're on the list. We'll be in touch.
                </span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleInlineSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={inlineEmail}
                  onChange={(e) => setInlineEmail(e.target.value)}
                  className="flex-1 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={inlineSubmitting}
                  className="h-12 px-6 sm:px-8 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-md font-montserrat font-bold text-sm shadow-elegant hover:shadow-glow transition-all duration-500 hover:bg-right disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {inlineSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Join the Waitlist"
                  )}
                </button>
              </form>
            )}
            {inlineError && (
              <p className="text-red-400 text-sm mt-3 font-montserrat">{inlineError}</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <PrelaunchFooter />

        {/* Notify Me Modal (kept for any deep links / legacy triggers) */}
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
                  {successMessage ||
                    "We'll notify you when the next batch of Vellvii products is released."}
                </p>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-baskerville text-light-primary text-center">
                    Join the Vellvii Waitlist
                  </DialogTitle>
                  <DialogDescription className="text-center text-white/60">
                    Be first to know when the next batch of any Vellvii product drops.
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
