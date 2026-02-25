import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const KSV2Problem = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      try { await video.play(); } catch (err) { console.log("Video play error:", err); }
    }
  };

  const painPoints = [
    { emoji: "🚿", text: "Suction cups on shower walls" },
    { emoji: "👟", text: "Shoeboxes under the bed" },
    { emoji: "🔌", text: "Charging under a pillow" },
  ];

  return (
    <section className="py-24 md:py-36 relative">
      {/* Diagonal accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(40 65% 72% / 0.3), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-primary/60 text-xs font-bold tracking-[0.4em] uppercase">01</span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center mb-6 leading-[0.95] tracking-tight">
            The DOX in{" "}
            <span
              style={{
                background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              60 Seconds
            </span>
          </h2>
        </ScrollReveal>

        {/* Pain points — horizontal pills */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {painPoints.map((p, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-lg">{p.emoji}</span>
                <span className="text-white/50 text-sm font-light line-through decoration-primary/60">{p.text}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Video */}
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
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                      style={{ background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(350 50% 60%))" }}
                    >
                      <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
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
