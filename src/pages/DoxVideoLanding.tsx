import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, CheckCircle2, Loader2, Sparkles, Heart, ArrowRight, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { NavMenuButton } from "@/components/navigation/LuxuryNavDrawer";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { LuxCountdown } from "@/components/lux/LuxPreOrderPanel";
import { Milestones } from "@/components/home/Milestones";
import { HomeFAQ, homeFAQs } from "@/components/home/HomeFAQ";
import { FounderNote } from "@/components/home/FounderNote";
import { StatusPill, getProductStatus } from "@/components/products/StatusPill";
import { isProductAvailableNow } from "@/lib/productAvailability";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Skeleton } from "@/components/ui/skeleton";
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
import { pixelLead, pixelSubscribe } from "@/lib/metaPixel";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email")
  .max(255, "Email too long");

const DoxVideoLanding = () => {
  const { data: shopifyProducts, isLoading: productsLoading } = useShopifyProducts(12);
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
      const { data, error } = await supabase.functions.invoke("mailchimp-subscribe", {
        body: { email: result.data, source },
      });
      if (error) {
        const serverMsg = (error as any)?.context?.body
          ? (() => {
              try {
                return JSON.parse((error as any).context.body)?.error;
              } catch {
                return null;
              }
            })()
          : null;
        return { ok: false, message: serverMsg || error.message || "Something went wrong. Please try again." };
      }
      if (data?.error) return { ok: false, message: data.error };
      pixelLead({ content_name: source });
      pixelSubscribe();
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
        title="Vellvii | Luxury Intimate Wellness Products"
        description="Discover Vellvii's luxury intimate wellness collection, designed for modern couples who value elegance, discretion, and premium design."
        canonical="/"
        keywords="Vellvii, luxury intimate wellness, pleasure collection, premium wellness, design-led intimate wellness, Vellvii DOX, Vellvii Lux, Vellvii G-Vibe, Vellvii Evolve, Vellvii Pulse"
        faqData={homeFAQs.map(f => ({ question: f.question, answer: f.answerText }))}
      />

      <div className="min-h-screen bg-background flex flex-col">
        {/* Header with menu + logo (cart trigger floats top-right) */}
        <header className="py-5 sm:py-6 px-5 sm:px-8 grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
          <NavMenuButton className="-ml-1" />
          <img
            src="/uploads/Vellvii-full-logo-transparent.png"
            alt="Vellvii"
            width={320}
            height={96}
            fetchPriority="high"
            className="h-12 sm:h-16 md:h-20 w-auto justify-self-start sm:justify-self-center pl-1 sm:pl-0 drop-shadow-[0_0_24px_rgba(212,175,55,0.35)]"
          />
          <div className="w-20 sm:w-24" aria-hidden />
        </header>

        <main>

        {/* [1b] Hero Video */}
        <section className="px-4 mb-10 sm:mb-14">
          <div className="max-w-6xl mx-auto relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-elegant">
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-black">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/uploads/Dox1.jpg"
                className="w-full h-full object-cover"
              >
                <source src="/uploads/HEROPAGE.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </section>



        {/* [2] Backer thank-you + processing status */}
        <section className="px-4 mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto text-center px-4 sm:px-6"
          >
            {/* Hairline ornament */}
            <div className="flex items-center justify-center gap-3 mb-7">
              <span className="block w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
              <span className="font-baskerville italic text-[0.78rem] sm:text-sm tracking-[0.32em] uppercase text-primary/70">
                To Our Backers
              </span>
              <span className="block w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
            </div>

            <p className="font-baskerville italic text-xl sm:text-2xl md:text-[1.7rem] text-white/90 leading-[1.45] tracking-tight mb-5">
              To our Kickstarter and Prelaunch backers - thank you.
              <br className="hidden sm:block" />
              <span className="text-primary/85"> You made Vellvii real.</span>
            </p>

            <p className="font-montserrat font-light text-[0.92rem] sm:text-base text-white/55 leading-[1.85] max-w-xl mx-auto">
              Your orders are now quietly in processing. A shipping confirmation
              will arrive by email as your piece moves through fulfillment.
            </p>

            {/* Closing flourish */}
            <div className="flex justify-center mt-8">
              <span className="block w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* [3] Lux Pre-Order Hero */}
        <section className="px-4 mb-12 sm:mb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.25em] text-primary">
                First-Run Offer
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-3"
            >
              <h1 className="sr-only">
                Luxury Biometric Sex Toy Storage - The Art of Intentional Pleasure
              </h1>
              <p
                aria-hidden="true"
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
              </p>
              <p className="text-base sm:text-lg md:text-xl text-light-secondary font-montserrat max-w-2xl mx-auto leading-relaxed">
                Ships end of June. The current Lux first-run offer includes a complimentary
                Vellvii Nova - our handheld suction piece. Future Lux runs are planned, but the
                Nova gift will not be included after this first run.
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
              <Link
                to="/products/vellvii-lux"
                className="inline-block relative group"
              >
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
                  View Vellvii Lux
                </div>
              </Link>
              <p className="mt-4 text-xs sm:text-sm text-light-muted font-montserrat">
                Ships end of June
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
              <nav
                aria-label="Vellvii collections"
                className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3"
              >
                {[
                  { label: "Pleasure Collection", href: "/collections/pleasure-collection" },
                  { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
                  { label: "Discreet Storage", href: "/collections/discreet-storage" },
                ].map((c) => (
                  <Link
                    key={c.href}
                    to={c.href}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-colors font-montserrat text-[11px] sm:text-xs text-light-secondary hover:text-primary"
                  >
                    <span>{c.label}</span>
                    <span aria-hidden className="text-primary/70">→</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
              {productsLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-card/50"
                    >
                      <Skeleton className="aspect-[4/5] w-full" />
                      <div className="p-3 sm:p-4 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))
                : shopifyProducts && shopifyProducts.length > 0
                ? shopifyProducts.slice(0, 6).map((product, idx) => {
                    const node = product.node;
                    const image = node.images.edges[0]?.node;
                    const variant = node.variants.edges[0]?.node;
                    const inStock = variant?.availableForSale ?? false;
                    const price = parseFloat(node.priceRange.minVariantPrice.amount);
                    return (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: idx * 0.05, duration: 0.5 }}
                      >
                        <Link
                          to={`/products/${node.handle}`}
                          className="group block rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-card/50 hover:border-primary/40 transition-all duration-500 hover:shadow-elegant"
                        >
                          <div className="relative aspect-[4/5] overflow-hidden bg-black/30">
                            {image && (
                              <img
                                src={image.url}
                                alt={image.altText || node.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            )}
                            <StatusPill
                              status={getProductStatus(node.handle, inStock)}
                              className="absolute top-2 left-2 sm:top-3 sm:left-3"
                            />
                          </div>
                          <div className="p-3 sm:p-4">
                            <h3 className="font-baskerville font-bold text-base sm:text-lg text-light-primary group-hover:text-primary transition-colors mb-1">
                              {node.title}
                            </h3>
                            <p className="font-montserrat text-[11px] sm:text-xs text-primary leading-relaxed">
                              ${price.toFixed(0)}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })
                : (
                    <p className="col-span-full text-center text-light-secondary font-montserrat text-sm py-8">
                      Products coming soon.
                    </p>
                  )}
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

        {/* Founder Note */}
        <FounderNote />

        {/* Available Now strip */}
        <AvailableNowStrip />

        {/* Milestones strip */}
        <Milestones />

        {/* FAQ */}
        <HomeFAQ />

        {/* [7] Socials CTA */}
        <section className="px-4 mb-12 sm:mb-16 border-t border-white/5 pt-12 sm:pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
              <span className="font-baskerville italic text-[0.78rem] sm:text-sm tracking-[0.32em] uppercase text-primary/70">
                Connect
              </span>
              <span className="block w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-baskerville font-bold text-light-primary mb-3">
              Follow Vellvii
            </h2>
            <p className="text-sm sm:text-base text-light-secondary font-montserrat mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto">
              Behind-the-design previews, launch updates and the r/Vellvii community - one place for every channel.
            </p>

            <Link
              to="/socials"
              className="inline-flex items-center gap-2 h-11 px-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-md font-montserrat font-bold text-sm shadow-elegant hover:shadow-glow transition-all duration-500 hover:bg-right"
            >
              <Users className="w-4 h-4" />
              View All Channels
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

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

const AvailableNowStrip = () => {
  const { data: products } = useShopifyProducts(50);
  const inStock = (products ?? []).filter(isProductAvailableNow).slice(0, 4);
  if (inStock.length === 0) return null;
  return (
    <section className="px-4 mb-12 sm:mb-16 border-t border-white/5 pt-12 sm:pt-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-6 gap-3 flex-wrap">
          <div>
            <p className="font-baskerville italic text-[0.78rem] sm:text-sm tracking-[0.32em] uppercase text-primary/70 mb-1">
              Available Now
            </p>
            <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary">
              Ships from our atelier
            </h2>
          </div>
          <Link
            to="/available-now"
            className="font-montserrat text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {inStock.map((p) => {
            const img = p.node.images.edges[0]?.node;
            return (
              <Link
                key={p.node.id}
                to={`/products/${p.node.handle}`}
                className="group relative rounded-xl overflow-hidden border border-white/10 bg-card/50 hover:border-primary/40 transition-all"
              >
                <div className="aspect-square bg-black/30">
                  {img && (
                    <img
                      src={img.url}
                      alt={img.altText || p.node.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <StatusPill status={getProductStatus(p.node.handle, true)} className="absolute top-2 left-2" />
                <div className="p-3">
                  <p className="font-baskerville text-sm text-light-primary group-hover:text-primary transition-colors line-clamp-1">
                    {p.node.title}
                  </p>
                  <p className="font-montserrat text-xs text-primary font-medium">
                    ${parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(0)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DoxVideoLanding;
