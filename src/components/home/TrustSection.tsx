import { Fingerprint, Zap, Shield, Package, Award } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const trustItems = [
  {
    icon: Fingerprint,
    title: "Biometric Security",
    description: "Advanced fingerprint lock keeps your privacy sealed",
  },
  {
    icon: Zap,
    title: "Integrated Charging",
    description: "Internal USB-A ports powered by an external USB-C input",
  },
  {
    icon: Shield,
    title: "Premium Materials",
    description: "Faux leather exterior with velvet-lined interior",
  },
  {
    icon: Package,
    title: "Discreet Shipping",
    description: "Plain packaging with no brand indicators",
  },
  {
    icon: Award,
    title: "2-Year Warranty",
    description: "Full coverage on all Vellvii products",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary/90 font-montserrat text-sm tracking-[0.3em] mb-4 block font-medium">
              WHY VELLVII
            </span>
            <h2 className="font-baskerville text-3xl md:text-5xl text-white">
              Crafted for Confidence
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-dark flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-montserrat font-medium text-white mb-2 text-sm md:text-base">
                  {item.title}
                </h3>
                <p className="font-montserrat text-white/70 text-xs md:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
