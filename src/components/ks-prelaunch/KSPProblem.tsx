import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const KSPProblem = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Chapter label */}
        <ScrollReveal>
          <p className="text-primary/60 text-xs uppercase tracking-[0.4em] font-semibold text-center mb-6">
            Chapter 01
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white text-center mb-14 font-baskerville leading-tight">
            The Vellvii Dox.
          </h2>
        </ScrollReveal>

        {/* Video placeholder */}
        <ScrollReveal delay={0.3}>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/[0.03] flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full border border-primary/30 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-primary/60 ml-1" />
                </div>
                <p className="text-white/30 text-sm uppercase tracking-widest">Video coming soon</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
