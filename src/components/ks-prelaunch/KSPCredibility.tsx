import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const KSPCredibility = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-baskerville">
            From Vision to Reality
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-12 font-light">
            2+ years of development. Every detail intentional.
          </p>
        </ScrollReveal>

        {/* Prototype videos */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
          <ScrollReveal delay={0.3}>
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-float">
              <video
                src="/uploads/dox-animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-float">
              <video
                src="/uploads/dox-open-animation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Founder note */}
        <ScrollReveal delay={0.5}>
          <div className="glass-dark border border-white/10 rounded-2xl p-6 sm:p-10 max-w-3xl mx-auto text-center">
            <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light italic mb-6">
              "I started Vellvii because I believed intimate wellness deserved the same design
              respect we give to every other part of our lives. The DOX isn't just a product —
              it's a statement that pleasure is nothing to hide."
            </p>
            <div>
              <p className="text-white font-baskerville font-bold text-lg">Stefan</p>
              <p className="text-white/40 text-sm">Founder, Vellvii</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
