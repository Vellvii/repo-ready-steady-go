import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// iCAUR "BORN TO PLAY" mechanic: the headline is a text-shaped cutout filled
// with a looping video, and the product drives straight across the screen
// left-to-right (and back, in reverse, on scroll-up) — no spin, no vertical
// drift, just a horizontal pan tied directly to scroll position.
const BG_VIDEO = "/uploads/dox-open-animation.mp4";

const HEADLINE_MASK_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 700'>
  <text x='50%' y='36%' text-anchor='middle' dominant-baseline='middle' font-family='Arial, Helvetica, sans-serif' font-weight='900' font-size='190' letter-spacing='2'>THE ART</text>
  <text x='50%' y='80%' text-anchor='middle' dominant-baseline='middle' font-family='Arial, Helvetica, sans-serif' font-weight='900' font-size='190' letter-spacing='2'>OF &quot;O&quot;</text>
</svg>`;
const HEADLINE_MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(HEADLINE_MASK_SVG)}")`;

const PRODUCTS = [
  { src: "/uploads/dox-open-frames-alpha/frame-00.png", alt: "Vellvii DOX", width: "w-[36%] max-w-sm", from: "-150%", to: "230%", y: "-85%" },
  { src: "/uploads/RedGVibeSide-alpha.png", alt: "Vellvii G-Vibe", width: "w-[24%] max-w-xs", from: "-260%", to: "120%", y: "10%" },
  { src: "/uploads/PinkPulseBack-alpha.png", alt: "Vellvii Pulse", width: "w-[24%] max-w-xs", from: "-200%", to: "320%", y: "75%" },
];

export const ArtOfOReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const p0x = useTransform(scrollYProgress, [0, 1], [PRODUCTS[0].from, PRODUCTS[0].to]);
  const p1x = useTransform(scrollYProgress, [0, 1], [PRODUCTS[1].from, PRODUCTS[1].to]);
  const p2x = useTransform(scrollYProgress, [0, 1], [PRODUCTS[2].from, PRODUCTS[2].to]);

  const productXs = [p0x, p1x, p2x];

  return (
    <section ref={ref} className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden bg-black">
      <div
        className="h-full w-full"
        style={{
          WebkitMaskImage: HEADLINE_MASK_URL,
          maskImage: HEADLINE_MASK_URL,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "85% 85%",
          maskSize: "85% 85%",
        }}
      >
        <video autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src={BG_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className="pointer-events-none absolute inset-0">
        {PRODUCTS.map((product, i) => (
          <motion.img
            key={product.src}
            src={product.src}
            alt={product.alt}
            className={`absolute left-1/2 top-1/2 ${product.width}`}
            style={{
              x: productXs[i],
              y: product.y,
              opacity,
            }}
          />
        ))}
      </div>
    </section>
  );
};
