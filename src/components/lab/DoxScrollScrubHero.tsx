import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const SCRUB_VIDEO = "/uploads/dox-open-animation.mp4";

interface Caption {
  eyebrow: string;
  headline: string;
  body: string;
  range: [number, number, number, number]; // fade in start, in end, out start, out end (0-1 scroll progress)
}

const captions: Caption[] = [
  {
    eyebrow: "THE VELLVII DOX",
    headline: "Sealed. Silent. Yours alone.",
    body: "A luxury storage box built for discretion, beginning with how it opens.",
    range: [0, 0.04, 0.22, 0.3],
  },
  {
    eyebrow: "BIOMETRIC SECURITY",
    headline: "Touch is the only key.",
    body: "Advanced fingerprint technology ensures only you have access.",
    range: [0.34, 0.42, 0.58, 0.66],
  },
  {
    eyebrow: "FAUX LEATHER, VELVET-LINED",
    headline: "Crafted for the bedside table.",
    body: "Faux leather exterior with rose gold accents, fully velvet-lined within.",
    range: [0.7, 0.78, 0.94, 1],
  },
];

export const DoxScrollScrubHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (video && duration) {
      video.currentTime = progress * duration;
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setDuration(video.duration);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.load();

    return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={SCRUB_VIDEO}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

        {captions.map((caption) => (
          <CaptionLayer key={caption.headline} caption={caption} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
};

const CaptionLayer = ({
  caption,
  scrollYProgress,
}: {
  caption: Caption;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const opacity = useTransform(scrollYProgress, caption.range, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, caption.range, [24, 0, 0, -24]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-[18%] px-6 text-center sm:bottom-1/4"
    >
      <span className="mb-3 block font-montserrat text-sm font-medium tracking-[0.3em] text-primary/90">
        {caption.eyebrow}
      </span>
      <h2 className="mx-auto mb-4 max-w-2xl font-baskerville text-3xl text-white sm:text-5xl">
        {caption.headline}
      </h2>
      <p className="mx-auto max-w-md font-montserrat text-white/80">{caption.body}</p>
    </motion.div>
  );
};
