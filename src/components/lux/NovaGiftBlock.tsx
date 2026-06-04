import { useEffect, useState } from "react";
import { Gift } from "lucide-react";
import novaAsset from "@/assets/nova.avif.asset.json";
import nova2Asset from "@/assets/nova-2.jpg.asset.json";

const NOVA_IMAGES = [
  {
    src: novaAsset.url,
    alt: "Vellvii Nova - complimentary handheld pleasure piece included free with every Lux",
  },
  {
    src: nova2Asset.url,
    alt: "Vellvii Nova - rose gold and matte black sculpted handheld piece, included free with every Lux",
  },
];

interface NovaCarouselProps {
  heightClass?: string;
  rotateMs?: number;
}

export const NovaCarousel = ({
  heightClass = "max-h-[480px]",
  rotateMs = 5000,
}: NovaCarouselProps) => {
  const [active, setActive] = useState(0);
  const [manualUntil, setManualUntil] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() < manualUntil) return;
      setActive((i) => (i + 1) % NOVA_IMAGES.length);
    }, rotateMs);
    return () => window.clearInterval(id);
  }, [manualUntil, rotateMs]);

  const goTo = (i: number) => {
    setActive(i);
    setManualUntil(Date.now() + 10000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="relative w-full flex-1 flex items-center justify-center">
        {NOVA_IMAGES.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className={`absolute inset-0 m-auto w-full h-full ${heightClass} object-contain transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* spacer to give the absolute layer height */}
        <div className={`w-full ${heightClass} invisible`} aria-hidden />
      </div>
      <div className="flex items-center gap-2">
        {NOVA_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show Nova image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-primary" : "w-1.5 bg-light-secondary/30 hover:bg-light-secondary/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Compact Nova "Free Bonus" block for use on the Lux PDP.
 * Smaller than the landing-page version so it complements - not competes with -
 * the Lux product hero/gallery.
 */
export const NovaGiftBlockCompact = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="bg-card/40 p-5 sm:p-8 flex items-center justify-center">
              <NovaCarousel heightClass="max-h-[260px] sm:max-h-[300px]" />
            </div>
            <div className="p-5 sm:p-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <Gift className="w-4 h-4 text-primary" />
                <p className="font-montserrat text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs">
                  Free Bonus - $50 Value
                </p>
              </div>
              <h2 className="font-baskerville font-bold text-light-primary text-2xl sm:text-3xl md:text-4xl leading-tight mb-3">
                Meet the Nova.
              </h2>
              <p className="font-montserrat text-light-secondary leading-relaxed text-sm sm:text-base mb-4">
                A sculpted handheld piece - whisper-quiet, rechargeable, and
                finished to the same premium standard. Slipped inside your Lux,
                it travels as discreetly as everything else you keep there.
              </p>
              <p className="font-montserrat text-light-primary text-sm sm:text-base">
                <span className="line-through text-light-secondary/60 mr-2">$50</span>
                <span className="text-primary font-semibold tracking-wide">FREE</span>
                <span className="text-light-secondary/40 mx-2">·</span>
                <span className="text-light-secondary/80 text-xs sm:text-sm tracking-[0.12em] uppercase">
                  Auto-added with every Lux
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
