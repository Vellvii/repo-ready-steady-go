import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TestimonialCarousel } from "./TestimonialCarousel";

const logos = [
  "LOGO: Tech Magazine",
  "LOGO: Luxury Blog",
  "LOGO: Design Weekly",
  "LOGO: Innovation Hub",
];

export const SocialProofSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-16 font-baskerville">
            Join the Waitlist
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <TestimonialCarousel />
        </ScrollReveal>

        {/* As Featured In */}
        <ScrollReveal delay={0.4}>
          <div className="mt-20">
            <p className="text-white/40 text-sm text-center mb-8 uppercase tracking-wider">
              As Featured In
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="aspect-[3/2] glass-dark rounded-lg flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors"
                >
                  <p className="text-white/30 text-xs font-medium text-center px-4">
                    {logo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
