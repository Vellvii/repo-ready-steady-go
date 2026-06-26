import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Matches the iCAUR "BORN TO PLAY" treatment: one large two-line headline
// filled with a single photo via background-clip:text (not a video — a
// static image is what iCAUR actually uses, and it's far more reliable
// than scrubbing/decoding video inside a text mask), with the product
// floating on top, entering off-angle from the left and settling flat and
// centered as the section scrolls into view.
const TEXT_FILL_IMAGE = "/uploads/RedLockClose.png";
const PRODUCT_IMAGE = "/uploads/dox-open-frames-alpha/frame-00.png";

export const ArtOfOReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.3"] });

  const productX = useTransform(scrollYProgress, [0, 1], ["-150%", "-50%"]);
  const productRotate = useTransform(scrollYProgress, [0, 1], [-28, 0]);
  const productScale = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const productOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-4">
        <h2
          className="bg-clip-text text-center font-montserrat text-[5.5rem] font-extrabold uppercase leading-[0.88] tracking-tight text-transparent sm:text-[8rem] md:text-[10rem]"
          style={{
            backgroundImage: `url(${TEXT_FILL_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
          }}
        >
          THE ART
          <br />
          OF &ldquo;O&rdquo;
        </h2>

        <motion.img
          src={PRODUCT_IMAGE}
          alt="Vellvii DOX"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[55%] max-w-md sm:w-[42%]"
          style={{
            x: productX,
            y: "-50%",
            rotate: productRotate,
            scale: productScale,
            opacity: productOpacity,
          }}
        />
      </div>
    </section>
  );
};
