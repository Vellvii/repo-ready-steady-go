import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "When will my Dox ship?", a: "Estimated shipping begins Q1 2026 for Super Early Bird backers." },
  { q: "What colors are available?", a: "Matte Black and Champagne Beige at launch. Final options based on backer feedback." },
  { q: "How does the biometric lock work?", a: "Capacitive fingerprint sensor storing up to 10 prints locally. No cloud, no apps." },
  { q: "What are the dimensions?", a: "Approximately 12\" x 8\" x 6\" - fits on a nightstand, shelf, or closet." },
  { q: "Is this only for intimate products?", a: "It's a premium privacy system for anything personal - wellness, jewelry, documents." },
  { q: "What if the campaign doesn't reach its goal?", a: "Full refund for all backers. No risk." },
  { q: "What's in the Full Ecosystem combo?", a: "Dox + Pulse + G-Vibe + Evolve at the best combined pricing." },
  { q: "Can I add the Vellvii Lux?", a: "Yes - $99 add-on at checkout for any tier." },
];

export const KS2FAQ = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="relative py-28 sm:py-36 bg-stone-100">
      <div ref={ref} className="max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">FAQ</p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-stone-900">
            Everything you need to <span className="text-amber-700">know.</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-stone-200 bg-white px-6 overflow-hidden">
                <AccordionTrigger className="font-baskerville text-base text-stone-800 hover:text-amber-700 py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-montserrat text-sm text-stone-500 leading-relaxed pb-5 font-light">
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
