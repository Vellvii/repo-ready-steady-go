import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const STAGES = [
  {
    eyebrow: "Color",
    title: "Onyx, finished in rose gold.",
    body: "Faux leather wrapped in champagne-toned hardware - quiet luxury that disappears on the nightstand.",
  },
  {
    eyebrow: "Biometric",
    title: "Ten prints. Instant unlock.",
    body: "Enroll up to ten fingerprints. The DOX opens in under a second - no codes, no keys, no second guesses.",
  },
  {
    eyebrow: "Interior",
    title: "Velvet-lined. Built to host.",
    body: "A movable velvet tray, a cradle for your pieces, and three internal USB-A ports - powered by a single USB-C in.",
  },
  {
    eyebrow: "Craft",
    title: "Hand-finished. Quietly made.",
    body: "Faux leather, rose gold hardware, and a soft-close lid that closes with the weight of intention.",
  },
];

const IMAGE = "/uploads/Dox_black_shelf_close_up.png";

export const DoxScrollStory = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqD = window.matchMedia("(min-width: 768px)");
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsDesktop(mqD.matches);
      setReduced(mqR.matches);
    };
    update();
    mqD.addEventListener?.("change", update);
    mqR.addEventListener?.("change", update);
    return () => {
      mqD.removeEventListener?.("change", update);
      mqR.removeEventListener?.("change", update);
    };
  }, []);

  // Mobile / reduced-motion: simple stacked reveal
  if (!isDesktop || reduced) {
    return (
      <div className="max-w-5xl mx-auto space-y-10">
        <Reveal className="rounded-2xl overflow-hidden bg-black/40 border border-white/5">
          <img
            src={IMAGE}
            alt="Vellvii DOX in Onyx, finished with rose gold hardware"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </Reveal>
        <div className="space-y-8">
          {STAGES.map((s, i) => (
            <Reveal key={s.eyebrow} delay={i * 60}>
              <p className="text-primary font-montserrat text-[10px] uppercase tracking-[0.3em] mb-2">
                {s.eyebrow}
              </p>
              <h3 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary mb-3 leading-tight">
                {s.title}
              </h3>
              <p className="text-base text-light-secondary font-montserrat leading-relaxed">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    );
  }

  return <DesktopPinned containerRef={ref} />;
};

const DesktopPinned = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative" style={{ height: `${STAGES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 px-4">
          {/* Image */}
          <div className="col-span-6 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[560px] rounded-3xl overflow-hidden bg-gradient-to-br from-black/60 to-black/20 border border-white/5 shadow-2xl shadow-black/40">
              <img
                src={IMAGE}
                alt="Vellvii DOX in Onyx, finished with rose gold hardware"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* subtle ambient glow */}
              <div
                className="pointer-events-none absolute -inset-10 opacity-40 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 60%, hsl(350 50% 60% / 0.25), transparent 60%)",
                }}
              />
            </div>
          </div>

          {/* Text stages */}
          <div className="col-span-6 relative h-[60vh]">
            {STAGES.map((s, i) => (
              <Panel
                key={s.eyebrow}
                index={i}
                total={STAGES.length}
                progress={scrollYProgress}
                stage={s}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Panel = ({
  index,
  total,
  progress,
  stage,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  stage: (typeof STAGES)[number];
}) => {
  // Each panel "owns" 1/total of the scroll range
  const start = index / total;
  const end = (index + 1) / total;
  const peak = start + 1 / total / 2;

  const opacity = useTransform(
    progress,
    [start, peak - 0.02, peak + 0.02, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, peak, end],
    [40, 0, -40]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <p className="text-primary font-montserrat text-xs uppercase tracking-[0.3em] mb-3">
        {stage.eyebrow}
      </p>
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-baskerville font-bold text-light-primary mb-5 leading-[1.05]">
        {stage.title}
      </h3>
      <p className="text-base md:text-lg text-light-secondary font-montserrat leading-relaxed max-w-md">
        {stage.body}
      </p>
    </motion.div>
  );
};

export default DoxScrollStory;
