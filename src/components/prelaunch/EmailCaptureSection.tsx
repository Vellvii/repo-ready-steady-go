import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { EmailCaptureForm } from "./EmailCaptureForm";
import { WaitlistCounter } from "./WaitlistCounter";
import { Check } from "lucide-react";

const benefits = [
  "Exclusive launch pricing — be among the first",
  "Priority access to limited edition colorways",
  "VIP updates on the journey to 2026 launch",
  "Early access to revolutionary features reveal",
];

export const EmailCaptureSection = () => {
  return (
    <section id="email-capture" className="py-16 md:py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-baskerville">
              Join the Revolution
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-white/70 text-center mb-8">
              Be first to experience <span className="text-primary font-semibold">modern intimacy, elevated to art</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <WaitlistCounter />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 mb-8">
              <EmailCaptureForm />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 glass-dark p-4 rounded-lg border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <p className="text-white/40 text-xs text-center mt-8">
              No spam. Unsubscribe anytime. Your privacy is our priority.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
