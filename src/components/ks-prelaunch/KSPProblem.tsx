import { ScrollReveal } from "@/components/animations/ScrollReveal";
import doxCloseUp from "@/assets/dox-close-up.webp";
import doxImprovisedStorage from "@/assets/dox-improvised-storage.png";

export const KSPProblem = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-baskerville">
            The Problem No One Talks About
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-12 font-light">
            Your intimate collection deserves better than a shoebox under the bed.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          <ScrollReveal delay={0.3}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-dark ring-1 ring-white/10">
              <img
                src={doxImprovisedStorage}
                alt="Improvised storage — the old way"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Before</p>
                <p className="text-white font-baskerville text-lg sm:text-xl">Hidden. Messy. Shameful.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-dark ring-1 ring-primary/20">
              <img
                src={doxCloseUp}
                alt="Vellvii DOX — the refined way"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-primary text-xs uppercase tracking-widest mb-1">After</p>
                <p className="text-white font-baskerville text-lg sm:text-xl">Designed. Elegant. Empowering.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
