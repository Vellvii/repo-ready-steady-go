import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "When will my Dox ship?",
    a: "Estimated shipping begins Q1 2026 for Super Early Bird backers. Standard campaign tiers ship within 2-4 weeks of the initial batch.",
  },
  {
    q: "What colors are available?",
    a: "Launch colors include Matte Black and Champagne Beige. Color options will be finalized during the campaign based on backer feedback.",
  },
  {
    q: "How does the biometric lock work?",
    a: "The Dox uses a capacitive fingerprint sensor that stores up to 10 fingerprints locally on the device. No cloud, no apps, no data leaves your Dox - ever.",
  },
  {
    q: "What are the dimensions?",
    a: "The Dox measures approximately 12\" x 8\" x 6\" - designed to sit elegantly on a nightstand, bookshelf, or closet shelf.",
  },
  {
    q: "Is this only for intimate products?",
    a: "The Dox is a premium privacy storage system for anything personal - wellness items, jewelry, documents, or medications. It's designed for discretion, not for a single category.",
  },
  {
    q: "What if the campaign doesn't reach its goal?",
    a: "If funding isn't reached, all backers receive a full refund. No risk.",
  },
  {
    q: "What's included in the Full Ecosystem combo?",
    a: "The Full Ecosystem includes the Dox storage unit with biometric lock, plus all three devices - Pulse, G-Vibe, and Evolve - at the best combined pricing available.",
  },
  {
    q: "Can I add the Vellvii Lux travel bag?",
    a: "Yes. The Lux premium leather travel bag is available as a $99 add-on at checkout for any reward tier.",
  },
];

export const KickstarterFAQ = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            Questions & Answers
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-light-primary">
            Everything you need to <span className="gradient-text">know.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-6 overflow-hidden"
              >
                <AccordionTrigger className="font-baskerville text-base text-light-primary hover:text-primary py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-montserrat text-sm text-light-muted leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
