import { ScrollReveal } from "@/components/animations/ScrollReveal";
import doxCloseUp from "@/assets/dox-close-up.webp";

export const KSPInnovation = () => {
  return (
    <section className="py-20 md:py-32 relative">
      {/* Subtle accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, hsl(40 65% 72% / 0.4), transparent 70%)' }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        <ScrollReveal>
          <p className="text-primary/60 text-xs uppercase tracking-[0.4em] font-semibold text-center mb-6">
            Chapter 02 — The Innovation
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white text-center mb-6 font-baskerville leading-tight">
            The <span className="gradient-text">DOX</span> — So much more than just a product.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-lg sm:text-xl text-white/60 text-center max-w-2xl mx-auto mb-14 font-light leading-relaxed">
            The world's first biometric storage & docking system for intimate wellness.
            Designed, not hidden. Elegant, not improvised.
          </p>
        </ScrollReveal>

        {/* Product hero image */}
        <ScrollReveal delay={0.35}>
          <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-float ring-1 ring-primary/20">
            <img
              src={doxCloseUp}
              alt="Vellvii DOX — premium biometric storage and docking"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
              <p className="text-white font-baskerville text-xl sm:text-2xl lg:text-3xl">
                Designed. Elegant. <span className="text-primary">Empowering.</span>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* How it solves */}
        <div className="grid sm:grid-cols-2 gap-4 mt-12 max-w-3xl mx-auto">
          {[
            { label: "Docking", desc: "From Suction Cups to Saddle Toys. Built-in mounts to secure your intimate toys." },
            { label: "USB-C Charging", desc: "Charging Simplified. One Cable, Multiple Toys." },
            { label: "Fingerprint Lock", desc: "One Touch. Total Privacy. Programmable with more than 1 set of prints." },
            { label: "Exceptional Design", desc: "Created as a masterpiece, not an afterthought." },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={0.4 + i * 0.1}>
              <div className="glass-accent border border-primary/20 rounded-xl px-5 py-5 text-center">
                <p className="text-white font-baskerville font-bold text-base mb-1">{item.label}</p>
                <p className="text-white/50 text-sm font-light">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
