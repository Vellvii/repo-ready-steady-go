import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "When will the DOX launch?",
    answer: "The Vellvii DOX is launching in 2026. This is the most anticipated sexual wellness innovation, and we're taking the time to perfect every detail. Join the waitlist to receive exclusive updates throughout our journey to launch.",
  },
  {
    question: "What makes the DOX different?",
    answer: "The DOX is the world's first 3-in-1 luxury wellness innovation — it stores beautifully, charges intelligently, and enhances intimately. With features like the DDS (Dildo Docking Station) with poured acrylic glass surface, biometric security, and museum-quality craftsmanship, it transforms stigma into sophistication.",
  },
  {
    question: "What is the DDS?",
    answer: "The DDS (Dildo Docking Station) is the conscious evolution of pleasure engineering. It features a tri-layer construction topped with poured acrylic glass — perfectly smooth, crystal-clear, and built for flawless suction. Finally, pleasure has its dedicated, elegant space.",
  },
  {
    question: "What materials is the DOX made from?",
    answer: "The DOX features a high-quality waterproof faux leather exterior with rose-gold trims and a leather handle. Inside, you'll find soft velvet lining with golden accents and a removable inner tray. Every detail is designed to demand to be touched.",
  },
  {
    question: "How does the biometric security work?",
    answer: "One touch. One owner. The Vellvii-branded biometric fingerprint lock ensures your pleasure stays yours — always. It's not just smart — it's personal. No keys, no codes, just your touch and total control.",
  },
  {
    question: "Is there a warranty?",
    answer: "Yes! Every DOX includes a comprehensive warranty covering all manufacturing defects and components. We stand behind our revolutionary design with exceptional customer support.",
  },
  {
    question: "Will you ship internationally?",
    answer: "Yes, we plan to ship worldwide. International shipping details will be available closer to launch. Join the waitlist to stay informed about availability in your region.",
  },
  {
    question: "What makes this 'luxury' wellness?",
    answer: "This isn't adult novelty — it's modern intimacy, elevated to art. The DOX is crafted with the same precision and elegance you'd expect from luxury brands like Louis Vuitton or Bentley. It's designed to look, feel, and function like the luxury it is.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-baskerville">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-16 font-light">
            Everything you need to know about <span className="font-semibold text-white/80">the DOX</span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-dark border-white/10 rounded-lg px-6 data-[state=open]:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-white hover:text-primary text-left py-6 hover:no-underline">
                    <span className="font-bold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 leading-relaxed pb-6 font-light">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
