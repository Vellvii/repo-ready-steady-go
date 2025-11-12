import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CrossfadeCarousel } from "@/components/media/CrossfadeCarousel";

const leftSpecs = [
  { label: "Exterior", value: "High-quality waterproof faux leather" },
  { label: "Accents", value: "Rose-gold trims & leather handle" },
  { label: "Interior", value: "Soft velvet lining with golden accents" },
  { label: "Tray", value: "Removable inner compartment" },
  { label: "Colors", value: "Midnight Black, Rose Gold Edition" },
];

const rightSpecs = [
  { label: "Lock System", value: "Vellvii-branded biometric fingerprint" },
  { label: "DDS Surface", value: "Poured acrylic glass (tri-layer construction)" },
  { label: "Charging", value: "Wireless charging intelligence" },
  { label: "Security", value: "One touch. One owner. Total control." },
  { label: "Design", value: "Museum-quality craftsmanship" },
  { label: "Experience", value: "3-in-1: Store, Charge, Enhance" },
];

export const TechSpecs = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-16 font-baskerville">
            Engineered Elegance. Designed to Perform.
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Materials & Dimensions */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="glass-dark border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6 font-baskerville">
                Materials & Dimensions
              </h3>
              <div className="space-y-4">
                {leftSpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0">
                    <span className="text-white/60 text-sm sm:text-base font-medium">{spec.label}</span>
                    <span className="text-white font-semibold text-sm sm:text-base text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Technology */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="glass-dark border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6 font-baskerville">
                Technology
              </h3>
              <div className="space-y-4">
                {rightSpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0">
                    <span className="text-white/60 text-sm sm:text-base font-medium">{spec.label}</span>
                    <span className="text-white font-semibold text-sm sm:text-base text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Technical Diagram */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-float ring-1 ring-white/10">
              <CrossfadeCarousel
                items={["/uploads/V_logo_video_2-2.mp4"]}
                aspectRatio="aspect-[5/4]"
                enableLightbox={true}
                altPrefix="Tri-Layer Construction"
                videoDisplayTime={8000}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
