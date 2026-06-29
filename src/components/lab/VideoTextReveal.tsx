import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Placeholder reveal video — swap for the real DOX open/unlock footage when ready.
const REVEAL_VIDEO = "/uploads/dox-open-animation.mp4";

export const VideoTextReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <motion.svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        style={{ scale, opacity }}
      >
        <defs>
          <mask id="text-mask">
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-baskerville"
              fontSize="280"
              fill="white"
            >
              SEALED.
            </text>
          </mask>
        </defs>
        <foreignObject width="100%" height="100%" mask="url(#text-mask)">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover">
            <source src={REVEAL_VIDEO} type="video/mp4" />
          </video>
        </foreignObject>
      </motion.svg>
    </section>
  );
};
