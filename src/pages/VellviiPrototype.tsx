import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollHeader } from "@/components/ScrollHeader";
import { SEO } from "@/components/SEO";

const videos = [
  { label: "Vellvii Dox — Video 1", src: "/uploads/prototype-video-1.mp4" },
  { label: "Vellvii Dox — Video 2", src: "/uploads/prototype-video-2.mp4" },
  { label: "Vellvii Dox — Video 3", src: "/uploads/prototype-video-3.mp4" },
  { label: "Vellvii Pulse", src: "" },
  { label: "Vellvii Evolve", src: "" },
  { label: "Vellvii G-Vibe", src: "" },
  { label: "Vellvii Lux", src: "" },
];

const VideoBlock = ({ label, src }: { label: string; src: string }) => {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const play = async () => {
    setPlaying(true);
    try { await ref.current?.play(); } catch {}
  };

  return (
    <section className="space-y-4">
      <h2 className="font-baskerville text-2xl sm:text-3xl text-stone-800 text-center">
        {label}
      </h2>
      {src ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-900 shadow-lg">
          <video
            ref={ref}
            src={src}
            className="w-full h-full object-contain bg-black"
            playsInline
            controls={playing}
          />
          <AnimatePresence>
            {!playing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                onClick={play}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-700/90 flex items-center justify-center shadow-xl"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 shadow-lg flex items-center justify-center">
          <p className="text-stone-400 font-montserrat text-sm uppercase tracking-widest">Coming Soon</p>
        </div>
      )}
    </section>
  );
};

const VellviiPrototype = () => (
  <div className="min-h-screen bg-stone-50">
    <SEO title="Vellvii — Prototypes" description="Prototype video showcase" />
    <ScrollHeader />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-20">
      <header className="text-center space-y-3">
        <p className="text-amber-700 font-montserrat text-xs uppercase tracking-[0.25em]">
          Prototype Showcase
        </p>
        <h1 className="font-baskerville text-4xl sm:text-5xl text-stone-900">
          Vellvii Prototypes
        </h1>
      </header>
      {videos.map((v) => (
        <VideoBlock key={v.src} label={v.label} src={v.src} />
      ))}
    </div>
  </div>
);

export default VellviiPrototype;
