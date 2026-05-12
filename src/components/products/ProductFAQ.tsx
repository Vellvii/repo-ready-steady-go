import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/pdpContent";

interface ProductFAQProps {
  faqs: FaqItem[];
}

export const ProductFAQ = ({ faqs }: ProductFAQProps) => {
  if (!faqs?.length) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
            Good To Know
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-baskerville font-bold text-light-primary">
            Frequently Asked
          </h2>
        </div>

        <Accordion type="single" collapsible className="card-dark rounded-xl border border-white/10 px-4 sm:px-6">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-white/10 last:border-b-0"
            >
              <AccordionTrigger className="font-baskerville text-base sm:text-lg text-light-primary text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-montserrat text-sm sm:text-base text-light-secondary leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ProductFAQ;
