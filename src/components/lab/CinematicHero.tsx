// Placeholder header video — swap for the real cinematic footage when ready.
const HERO_VIDEO = "/uploads/HEROPAGE.webm";

export const CinematicHero = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      <div className="relative z-10 px-6 text-center">
        <span className="mb-4 block font-montserrat text-sm font-medium tracking-[0.3em] text-primary/90">
          THE VELLVII DOX
        </span>
        <h1 className="font-baskerville text-5xl text-white sm:text-7xl md:text-8xl">
          Sealed. Silent. Yours.
        </h1>
      </div>
    </section>
  );
};
