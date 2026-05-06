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
    question: "What is the DOX made of?",
    answerText:
      "The DOX is built from premium-quality components - genuine leather on the outside, soft velvet on the inside, with an integrated fingerprint lock and built-in charging and docking stations for your devices.",
    answer:
      "The DOX is built from premium-quality components - genuine leather on the outside, soft velvet on the inside, with an integrated fingerprint lock and built-in charging and docking stations for your devices.",
  },
  {
    question: "When do Kickstarter and Prelaunch orders ship?",
    answerText:
      "As communicated on Kickstarter, all Kickstarter and Prelaunch clients are expected to receive their ordered products in July 2026.",
    answer:
      "As communicated on Kickstarter, all Kickstarter and Prelaunch clients are expected to receive their ordered products in July 2026.",
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
      "The Vellvii Lux is a soft bag - crafted from genuine leather with a velvet-lined interior. No hard casing. Designed to cushion, protect, and travel quietly.",
    answer:
      "The Vellvii Lux is a soft bag - crafted from genuine leather with a velvet-lined interior. No hard casing. Designed to cushion, protect, and travel quietly.",
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
      "Vellvii is currently available exclusively through our online store at vellvii.com. Authorized retail partnerships are in process and will be announced here once finalized.",
    answer:
      "Vellvii is currently available exclusively through our online store at vellvii.com. Authorized retail partnerships are in process and will be announced here once finalized.",
  },
];

export const HomeFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28 md:py-40 px-4 sm:px-6 overflow-hidden">
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(40 50% 70% / 0.06), transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative">
        <ScrollReveal>
          <p className="text-primary/60 text-[0.7rem] uppercase tracking-[0.5em] font-light text-center mb-6">
            Considered Questions
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-baskerville italic text-white text-center mb-4 leading-tight tracking-tight">
            Plainly answered.
          </h2>
        </ScrollReveal>

        {/* Decorative hairline */}
        <ScrollReveal delay={0.15}>
          <div className="flex justify-center mb-6">
            <span className="block w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/45 font-light text-center mb-16 tracking-wide text-sm sm:text-base">
            Everything you might be wondering, without the small print.
          </p>
        </ScrollReveal>

        <div className="space-y-1">
          {homeFAQs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="relative"
              >
                {/* Soft gradient hairline */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
                />

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-8 py-7 md:py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-baskerville text-lg md:text-xl leading-snug transition-all duration-500 ${
                      isOpen
                        ? "text-white italic"
                        : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span className="shrink-0 mt-1.5">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/25 group-hover:border-primary/50 transition-colors duration-500"
                    >
                      <Plus
                        className="w-3 h-3"
                        style={{ color: "hsl(40 60% 75%)" }}
                        strokeWidth={1.25}
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
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-12 text-white/60 font-light leading-[1.85] text-[0.95rem] sm:text-base">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          {/* Closing hairline */}
          <div
            aria-hidden
            className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
