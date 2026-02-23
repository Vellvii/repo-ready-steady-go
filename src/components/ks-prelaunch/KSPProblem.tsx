import { ScrollReveal } from "@/components/animations/ScrollReveal";
import doxImprovisedStorage from "@/assets/dox-improvised-storage.png";

export const KSPProblem = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Chapter label */}
        <ScrollReveal>
          <p className="text-primary/60 text-xs uppercase tracking-[0.4em] font-semibold text-center mb-6">
            Chapter 01 — The Reality
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white text-center mb-6 font-baskerville leading-tight">
            Shower Walls &<br />Toilet Seats?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-lg sm:text-xl text-white/60 text-center max-w-2xl mx-auto mb-14 font-light leading-relaxed">
            For decades, intimate accessories have been stuck to walls, hidden behind
            doors, and tossed into drawers. Suction cups on tiles. Makeshift solutions.
            <span className="text-white/80 font-medium"> Zero sophistication.</span>
          </p>
        </ScrollReveal>

        {/* Improvised storage visual */}
        <ScrollReveal delay={0.4}>
          <div className="relative max-w-3xl mx-auto">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-white/10">
              <img
                src={doxImprovisedStorage}
                alt="Improvised storage — the old way"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">The status quo</p>
                <p className="text-white font-baskerville text-xl sm:text-2xl lg:text-3xl">
                  Hidden. Messy.<br />
                  <span className="text-white/50">Shameful.</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pain points */}
        <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          {[
            { emoji: "🚿", text: "Suction cups that fall in the shower" },
            { emoji: "👟", text: "Shoeboxes and plastic bags" },
            { emoji: "🔋", text: "Dead batteries, tangled cables" },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={0.5 + i * 0.1}>
              <div className="glass-dark border border-white/10 rounded-xl px-5 py-4 text-center">
                <p className="text-2xl mb-2">{item.emoji}</p>
                <p className="text-white/60 text-sm font-light">{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
