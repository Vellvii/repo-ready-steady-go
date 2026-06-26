import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

// Pre-extracted, color-keyed frames from the DOX closed->open CGI render —
// the flat gray studio backdrop is keyed to real alpha transparency, swapped
// by scroll position instead of scrubbing a <video> (avoids autoplay/seek
// restrictions in sandboxed preview environments).
const FRAME_COUNT = 20;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/uploads/dox-open-frames-alpha/frame-${String(i).padStart(2, "0")}.png`,
);

// Looping motion texture showing through the cutout letters — mirrors the
// iCaur "BORN TO PLAY" treatment where the letters carry moving footage
// rather than a static image. Rendered as a cycling frame sequence (same
// reasoning as the product flipbook above) rather than a <video>, and the
// cutout itself is a CSS mask-image rather than an SVG foreignObject mask —
// both are far more reliably supported across sandboxed preview iframes.
const TEXTURE_FRAME_COUNT = 24;
const TEXTURE_FRAMES = Array.from(
  { length: TEXTURE_FRAME_COUNT },
  (_, i) => `/uploads/dox-texture-frames/frame-${String(i).padStart(2, "0")}.jpg`,
);

const TEXT_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 800'>
    <rect width='100%' height='100%' fill='black'/>
    <text x='50%' y='34%' text-anchor='middle' dominant-baseline='middle' font-family='Montserrat, sans-serif' font-size='240' font-weight='800' letter-spacing='-6' fill='white'>THE ART</text>
    <text x='50%' y='74%' text-anchor='middle' dominant-baseline='middle' font-family='Montserrat, sans-serif' font-size='240' font-weight='800' letter-spacing='-6' fill='white'>OF &quot;O&quot;</text>
  </svg>`,
)}")`;

export const ArtOfOReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);
  const productX = useTransform(scrollYProgress, [0, 1], ["0%", "160%"]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [textureFrame, setTextureFrame] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setFrameIndex(Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))));
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      setTextureFrame((i) => (i + 1) % TEXTURE_FRAME_COUNT);
    }, 110);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-white py-20 sm:py-28">
      <motion.div style={{ opacity }} className="relative mx-auto aspect-[2/1] w-full max-w-6xl px-4">
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: TEXT_MASK,
            maskImage: TEXT_MASK,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          {TEXTURE_FRAMES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: i === textureFrame ? 1 : 0, filter: "saturate(1.15) contrast(1.05)" }}
              loading="eager"
            />
          ))}
        </div>

        <motion.div
          style={{ x: productX }}
          className="pointer-events-none absolute left-[6%] top-[18%] h-[64%] w-[34%] sm:w-[30%]"
        >
          {FRAMES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === FRAME_COUNT - 1 ? "Vellvii DOX, branded" : "Vellvii DOX opening"}
              className="absolute inset-0 h-full w-full object-contain"
              style={{ opacity: i === frameIndex ? 1 : 0 }}
              loading="eager"
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
