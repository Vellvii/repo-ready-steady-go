import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Why did Vellvii create the Lux?",
    answer: "Lux was created to whisper, \"I am private. I am elegant. I honour your pleasure.\"\nAnd no one - absolutely no one - offered anything with that level of devotion.\nSo we made it.\nA designer bag for your intimate world… with a \"say my name\" attitude."
  },
  {
    question: "What makes the Vellvii Lux so different?",
    answer: "At Vellvii we are proudly sex-positive.\nWe don't hide pleasure, we celebrate it.\nWe believe your orgasms deserve a passport just as much as your lipstick does.\nEverything in this bag is intentional:\nthe shape, the leather, the privacy, the quiet elegance.\nThis isn't a toy bag… it's a love letter to your pleasure."
  },
  {
    question: "Can the Lux hold multiple toys?",
    answer: "Of course it can.\nLux is for women who travel with confidence - and with options.\nIt comfortably holds one or two favourites, keeping everything cushioned, discreet, and beautifully organized.\nMinimalism meets indulgence.\nA perfect balance."
  },
  {
    question: "What is the Privacy Pocket for?",
    answer: "Ah… the clever little secret on the side.\nIt's designed for the things you may want quickly, without opening your entire world to prying eyes.\nCondoms, wipes, small essentials - all right there, within a graceful reach.\nPrivate. Purposeful. Perfectly sensual."
  },
  {
    question: "How many toys can I charge inside the Lux?",
    answer: "Two, simultaneously.\n\nTwo toys can recharge quietly inside, using a single elegant USB-C port on the outside.\nJust plug in your normal phone charger… and let them rest, gather strength, and wait for you."
  },
  {
    question: "What material is the Lux made from?",
    answer: "Only genuine leather, the kind you feel in designer houses and luxury ateliers.\nSoft. Supple. Scented with quiet wealth.\nWe don't do plastic masquerading as premium.\nLux feels like something you'd be proud to carry even if nobody ever knew what was inside."
  },
  {
    question: "Is the Lux discreet enough for travel?",
    answer: "More than discreet, it's expressive in the right way.\nThe Vellvii marks are subtle, sophisticated… a quiet signature of confidence.\nThey tell the world you are elegant, self-aware, and utterly unashamed of desire.\nIt's a travel companion with dignity, and so are you."
  },
  {
    question: "How do I clean and care for the Lux?",
    answer: "Treat her like any fine leather piece.\nA soft cloth.\nA whisper of genuine leather cream - never synthetics, never shortcuts.\nThe velvet interior? A gentle brush or fabric-safe cleaner.\nShe's luxurious, but she loves being taken care of."
  },
  {
    question: "Does the Lux protect my toys from damage?",
    answer: "Completely.\nThat's why we chose real leather and a velvet-lined interior.\nThe structure supports your toys like a glove, firm where needed, soft where it matters.\nYour favourites stay safe from pressure, scratches, or awkward angles in your luggage."
  },
  {
    question: "Can I use the Lux at home, not just for travel?",
    answer: "Oh, absolutely.\nLux looks stunning on a nightstand, disappears beautifully inside a drawer, and keeps your pleasures organized and dignified.\nIt's not just a travel piece, it's a lifestyle piece."
  },
  {
    question: "What warranty does the Lux come with?",
    answer: "The fingerprint lock, your little guardian of privacy, is protected for 12 months.\nIf it ever falters, we make it right.\nYour secrets deserve reliability."
  },
  {
    question: "What sizes of toys fit inside the Lux?",
    answer: "A standard 7-inch dildo fits comfortably.\nSmaller toys fit beautifully.\nThe layout was designed intelligently - compact on the outside, generous on the inside.\nDiscreet never meant small… it meant clever."
  },
  {
    question: "Can the Lux fit inside a handbag or carry-on?",
    answer: "Yes.\nShe was designed with that exact intention: slim enough to slide into your handbag, chic enough to be carried alone, and discreet enough to travel anywhere without raising so much as an eyebrow."
  },
  {
    question: "What makes the fingerprint lock special?",
    answer: "It's intimate… just like pleasure should be.\nYour finger - Your touch - Your property.\nNo codes. No clumsy combinations. No accidental openings.\nJust a quiet, elegant lock that responds only to you.\nYour desires stay yours. Always."
  },
  {
    question: "Is the Lux really the first of its kind?",
    answer: "Absolutely.\nNo one, not a single brand, has dared to treat women's pleasure with this level of respect, luxury, and intention.\nThe world offered plastic pouches and \"hide it in your suitcase\" solutions.\nVellvii Lux offers dignity, beauty, sensuality, and confidence.\nA designer bag for the art of \"O.\"\nNothing rivals it."
  }
];

export const LuxFAQSection = () => {
  return (
    <section className="min-h-screen py-32 lg:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute inset-0 opacity-20" style={{ background: 'var(--gradient-spotlight)' }} />
      
      <div className="w-full relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-16">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-baskerville text-center leading-tight" style={{
              textShadow: '0 0 60px rgba(178, 145, 108, 0.3)'
            }}>
              Questions & Answers
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-primary/20 rounded-lg bg-background/5 backdrop-blur-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 text-left text-base sm:text-lg text-white/90 font-medium hover:text-primary hover:no-underline transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-white/70 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
