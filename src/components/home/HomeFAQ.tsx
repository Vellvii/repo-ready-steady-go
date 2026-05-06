import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
  /** plain-text answer for JSON-LD */
  answerText: string;
}

export const homeFAQs: FAQItem[] = [
  {
    question: "What is Vellvii?",
    answerText:
      "Vellvii is an American premium wellness house designing the world's first biometric storage and docking system for intimate wellness, alongside a curated Pleasure Collection of design-led devices. Quiet luxury, by intent.",
    answer:
      "Vellvii is an American premium wellness house designing the world's first biometric storage and docking system for intimate wellness, alongside a curated Pleasure Collection of design-led devices. Quiet luxury, by intent.",
  },
  {
    question: "What is the newest luxury pleasure storage box launching in 2026?",
    answerText:
      "The Vellvii Lux is the newest luxury pleasure storage piece launching in 2026 - a discreet, fingerprint-locked vessel built from aerospace-grade aluminum and Italian leather, designed to live on a nightstand without apology.",
    answer:
      "The Vellvii Lux is the newest luxury pleasure storage piece launching in 2026 - a discreet, fingerprint-locked vessel built from aerospace-grade aluminum and Italian leather, designed to live on a nightstand without apology.",
  },
  {
    question: "When does the Vellvii Lux ship?",
    answerText:
      "The Vellvii Lux ships to VIP early-access reservation holders first in 2026, with broader retail availability following the Kickstarter campaign. Reserve through the official Prelaunch page to secure a unit from the first 1,500.",
    answer: (
      <>
        The Vellvii Lux ships to VIP early-access reservation holders first in
        2026, with broader retail availability following the Kickstarter
        campaign. Reserve through the official Prelaunch page to secure a unit
        from the first 1,500.
      </>
    ),
  },
  {
    question: "Are Vellvii products discreet?",
    answerText:
      "Yes. Every Vellvii product is designed to look at home in a considered interior - no overt branding, no obvious silhouettes. The DOX and Lux both lock biometrically so nothing inside is ever on display.",
    answer:
      "Yes. Every Vellvii product is designed to look at home in a considered interior - no overt branding, no obvious silhouettes. The DOX and Lux both lock biometrically so nothing inside is ever on display.",
  },
  {
    question: "What materials is the Vellvii Lux made from?",
    answerText:
      "The Vellvii Lux is built from CNC-machined aerospace-grade aluminum, full-grain Italian leather, and medical-grade silicone touchpoints. Hardware is finished in champagne-gold or rose-gold tones.",
    answer:
      "The Vellvii Lux is built from CNC-machined aerospace-grade aluminum, full-grain Italian leather, and medical-grade silicone touchpoints. Hardware is finished in champagne-gold or rose-gold tones.",
  },
  {
    question: "How does the Vellvii ecosystem work?",
    answerText:
      "The DOX is the centerpiece - biometric storage with native USB-C charging and built-in docking mounts. The Pleasure Collection (Pulse, Vibe, G-Vibe) is engineered to charge and store inside it, so a single, considered object replaces drawers, chargers, and shower-suction shortcuts.",
    answer:
      "The DOX is the centerpiece - biometric storage with native USB-C charging and built-in docking mounts. The Pleasure Collection (Pulse, Vibe, G-Vibe) is engineered to charge and store inside it, so a single, considered object replaces drawers, chargers, and shower-suction shortcuts.",
  },
  {
    question: "Is there a warranty?",
    answerText:
      "Yes. Vellvii offers a limited warranty covering manufacturing defects. Registration is required within 7 days of delivery to activate coverage. Remedies are repair or replacement only.",
    answer: (
      <>
        Yes. Vellvii offers a limited warranty covering manufacturing defects.
        Registration is required within 7 days of delivery to activate coverage.
        Remedies are repair or replacement only.{" "}
        <Link
          to="/warranty"
          className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
        >
          Register your warranty
        </Link>
        .
      </>
    ),
  },
  {
    question: "Where can I buy Vellvii?",
    answerText:
      "Vellvii is available directly at vellvii.com and through select authorized retailers. The earliest units are reserved through the Kickstarter campaign and the official Prelaunch VIP list.",
    answer:
      "Vellvii is available directly at vellvii.com and through select authorized retailers. The earliest units are reserved through the Kickstarter campaign and the official Prelaunch VIP list.",
  },
];

export const HomeFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-primary/60 text-[0.7rem] uppercase tracking-[0.45em] font-semibold text-center mb-5">
            Considered Questions
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-baskerville text-white text-center mb-3 leading-tight">
            Plainly answered.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/50 font-light text-center mb-14 tracking-wide">
            Everything you might be wondering, without the small print.
          </p>
        </ScrollReveal>

        <div className="border-t border-primary/15">
          {homeFAQs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`border-b border-primary/15 transition-colors duration-500 ${
                  isOpen ? "bg-primary/[0.025]" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-6 md:py-7 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-baskerville text-lg md:text-xl leading-snug transition-colors duration-500 ${
                      isOpen ? "text-white" : "text-white/85 group-hover:text-white"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span className="shrink-0 mt-1">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      <Plus
                        className="w-4 h-4"
                        style={{ color: "hsl(40 65% 72%)" }}
                      />
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pr-12 text-white/65 font-light leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
