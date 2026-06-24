import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Placeholder header video — swap for the real cinematic footage when ready.
const HERO_VIDEO = "/uploads/HEROPAGE.webm";

const models = [
  { name: "DOX", image: "/uploads/Dox1.jpg" },
  { name: "LUX", image: "/uploads/lux-bag-final-v4.jpg" },
];

export const CinematicHero = () => {
  const [index, setIndex] = useState(0);
  const model = models[index];

  const cycle = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + models.length) % models.length);
  };

  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden bg-black">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src={HERO_VIDEO} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Model-switcher card, bottom-left */}
      <div className="absolute bottom-10 left-6 z-10 flex items-center gap-3 sm:left-12">
        <button
          onClick={() => cycle(-1)}
          aria-label="Previous model"
          className="text-primary/80 transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="text-center">
          <img src={model.image} alt={model.name} className="h-16 w-28 object-cover" />
          <span className="font-baskerville text-lg text-white">{model.name}</span>
        </div>
        <button
          onClick={() => cycle(1)}
          aria-label="Next model"
          className="text-primary/80 transition-colors hover:text-primary"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* CTA text, bottom-right */}
      <div className="absolute bottom-10 right-6 z-10 text-right sm:right-12">
        <p className="font-baskerville text-xl text-white sm:text-2xl">
          Pick your Vellvii and start exploring.
        </p>
        <span className="mt-1 inline-block font-montserrat text-sm tracking-wide text-primary">
          Discover More →
        </span>
      </div>
    </section>
  );
};
