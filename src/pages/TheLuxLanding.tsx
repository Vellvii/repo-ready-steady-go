import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { Truck, Package, Shield, Sparkles, Gift } from "lucide-react";
import { NovaCarousel } from "@/components/lux/NovaGiftBlock";
import { ValueStackCard } from "@/components/lux/ValueStackCard";
import { LuxNovaPairing } from "@/components/lux/LuxNovaPairing";
import { LuxStickyOfferBar } from "@/components/lux/LuxStickyOfferBar";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CART_URL = "https://www.vellvii.com/cart/43225533972516:1";

/**
 * Standalone Meta Ads landing page for the Vellvii Lux.
 * Rebuilt to anchor the offer on the free Nova ($49 value) and
 * reduce abandonment at the cart by reinforcing the value before checkout.
 */
const TheLuxLanding = () => {
  const { data: product } = useShopifyProduct("vellvii-lux");
  const images = (product?.node?.images?.edges || []).map((e) => e.node);

  const luxAlts = [
    "Vellvii Lux biometric leather travel case, front view",
    "Vellvii Lux portable leather case held in hands, side angle",
    "Vellvii Lux fingerprint lock detail on genuine leather case",
    "Vellvii Lux interior velvet lining and USB charging ports",
    "Vellvii Lux discreet leather travel case on bedside table",
    "Vellvii Lux luxury leather case, open view",
    "Vellvii Lux portable biometric leather case lifestyle shot",
  ];

  const trustBadges = [
    { icon: Package, label: "Discreet Shipping" },
    { icon: Shield, label: "Lifetime Warranty" },
    { icon: Truck, label: "Plain Packaging" },
    { icon: Sparkles, label: "Premium Materials" },
  ];

  const faqs = [
    {
      q: "Is the Nova really free?",
      a: "Yes. Every Lux ordered through this page automatically includes a Vellvii Nova - a $49 gift - added to your shipment at no extra cost while the offer is live.",
    },
    {
      q: "When does the Vellvii Lux ship?",
      a: "The Vellvii Lux is available now and ships within standard processing times in plain, unbranded packaging.",
    },
    {
      q: "How does the biometric lock work?",
      a: "The Lux uses a fingerprint sensor that stores up to ten unique prints. Only registered fingerprints can open the case, keeping its contents private.",
    },
    {
      q: "What materials is the Lux made from?",
      a: "Genuine full-grain leather on the outside, with a soft velvet-lined interior. Hardware is finished in rose gold.",
    },
    {
      q: "Does the Lux charge what is inside?",
      a: "Yes. The case has a USB-C input and two internal USB-A ports, so devices stay powered while stored.",
    },
    {
      q: "Is shipping discreet?",
      a: "Always. The Lux ships in plain, unbranded packaging with no reference to Vellvii or its contents on the outside.",
    },
    {
      q: "What is the warranty?",
      a: "Every Lux comes with a lifetime warranty, redeemable after registering your unique warranty ID within seven days of delivery.",
    },
  ];

  return (
    <>
      <SEO
        title="The Lux + Free $49 Nova - Biometric Leather Case"
        description="The Vellvii Lux biometric leather case - available now with a free Nova ($49 gift) included with every order on this page. Fingerprint-locked, velvet-lined, USB charging."
        canonical="/pages/the-lux"
        type="website"
        image={images[0]?.url}
        faqData={faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="min-h-screen surface-dark-rich overflow-x-clip pb-24 lg:pb-0">
        <ScrollHeader />

        {/* 1. Gift ribbon */}
        <section className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-full border border-primary/30 bg-primary/[0.04] px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-center gap-2 sm:gap-3 text-center">
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <p className="font-montserrat text-light-primary text-[11px] sm:text-sm tracking-[0.08em]">
                Complimentary Vellvii Nova - a{" "}
                <span className="text-primary font-semibold">$49 gift</span> - free
                with every Lux on this page
              </p>
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
            </div>
          </div>
        </section>

        {/* 2. Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-10 sm:pb-14">
          <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-7">
            <p className="font-montserrat text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs">
              Available Now - Ships in Plain Packaging
            </p>
            <h1 className="font-baskerville font-bold text-light-primary text-3xl sm:text-5xl md:text-6xl leading-tight">
              The Lux. Plus a $49 Nova, on us.
            </h1>
            <p className="font-baskerville italic text-primary/90 text-lg sm:text-2xl">
              A biometric leather case worth keeping - and the quiet companion that lives inside it.
            </p>
            <div className="flex flex-col items-center gap-1 pt-1">
              <div className="h-px w-12 bg-primary/30" />
              <p className="font-baskerville text-primary text-3xl sm:text-4xl tracking-wide">
                $199
              </p>
              <p className="font-montserrat text-light-secondary/80 text-xs sm:text-sm tracking-[0.12em] uppercase">
                Includes free Nova - a $49 gift · + $14.20 shipping · Available now
              </p>
            </div>
          </div>
        </section>

        {/* 3. Hero image */}
        {images[0] && (
          <section className="px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-card/50">
              <img
                src={images[0].url}
                alt={luxAlts[0]}
                className="w-full h-auto object-cover"
              />
            </div>
          </section>
        )}

        {/* 4. Value Stack */}
        <ValueStackCard />

        {/* 5. Pairing showcase */}
        <LuxNovaPairing luxImageUrl={images[1]?.url || images[0]?.url} luxAlt={luxAlts[1]} />

        {/* 6. Body copy */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="max-w-2xl mx-auto">
            <p className="font-montserrat text-light-secondary leading-relaxed text-base sm:text-lg text-center">
              Two pieces, one order. The Vellvii Lux is a premium biometric
              leather case with fingerprint-lock security, two integrated USB-A
              charging ports, and a velvet-lined interior. The Vellvii Nova - a
              $49 sculpted handheld piece - is slipped inside, free, with every
              Lux ordered on this page. Compact enough for travel. Refined
              enough to stay on the nightstand. Genuine leather. Discreet
              shipping. Lifetime warranty.
            </p>
          </div>
        </section>

        {/* 7. Primary CTA */}
        <section className="px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
          <div className="max-w-md mx-auto text-center">
            <a href={CART_URL} rel="noopener noreferrer">
              <Button
                size="lg"
                className="btn-premium w-full h-14 sm:h-16 text-base sm:text-lg font-bold tracking-wide whitespace-normal text-center leading-tight"
              >
                Buy the Lux + Free Nova - $199
              </Button>
            </a>
            <p className="font-montserrat text-light-secondary/70 text-xs sm:text-sm mt-3 tracking-wide">
              $49 Nova included free · $14.20 shipping · Available now
            </p>
          </div>
        </section>

        {/* 8. Supporting gallery */}
        {images.length > 1 && (
          <section className="px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {images.slice(1, 7).map((img, i) => (
                <div
                  key={img.url}
                  className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-card/50"
                >
                  <img
                    src={img.url}
                    alt={luxAlts[i + 1] || `Vellvii Lux luxury leather case detail ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. Nova "Meet your gift" block */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0 items-center">
                <div className="bg-card/40 aspect-square md:aspect-auto md:h-full flex items-center justify-center p-6 sm:p-10">
                  <NovaCarousel heightClass="max-h-[420px]" />
                </div>
                <div className="p-6 sm:p-10 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Gift className="w-4 h-4 text-primary" />
                    <p className="font-montserrat text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs">
                      Your Free Gift - $49 Value
                    </p>
                  </div>
                  <h2 className="font-baskerville font-bold text-light-primary text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                    Meet the Nova.
                  </h2>
                  <p className="font-baskerville italic text-primary/90 text-lg sm:text-xl mb-5">
                    A $49 gift, included free with every Lux.
                  </p>
                  <p className="font-montserrat text-light-secondary leading-relaxed text-sm sm:text-base mb-6">
                    The Vellvii Nova is a sculpted handheld piece designed as a
                    quiet companion to the Lux - whisper-quiet, rechargeable,
                    and finished to the same premium standard. Slipped inside
                    your Lux, it travels as discreetly as everything else you
                    keep there.
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 mb-2">
                    <p className="font-montserrat text-light-primary text-sm sm:text-base">
                      <span className="line-through text-light-secondary/60 mr-2">$49</span>
                      <span className="text-primary font-semibold tracking-wide">FREE</span>
                    </p>
                    <span className="hidden sm:inline text-light-secondary/30">·</span>
                    <p className="font-montserrat text-light-secondary/80 text-xs sm:text-sm tracking-[0.12em] uppercase">
                      Auto-added with every Lux
                    </p>
                  </div>
                  <p className="font-montserrat text-light-secondary/60 text-xs tracking-wide">
                    Limited-time offer. Only included with Lux orders placed on this page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Trust badges */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {trustBadges.map((b) => (
              <div
                key={b.label}
                className="trust-badge flex-col text-center p-4 sm:p-5"
              >
                <div className="trust-badge-icon w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2">
                  <b.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <p className="text-light-primary text-xs sm:text-sm font-semibold font-montserrat leading-tight">
                  {b.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Secondary CTA */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="max-w-md mx-auto text-center">
            <p className="font-baskerville text-light-primary text-2xl sm:text-3xl mb-4">
              <span className="line-through text-light-secondary/50 mr-3 text-lg sm:text-xl">$248</span>
              <span className="text-primary font-bold">$199</span>
            </p>
            <a href={CART_URL} rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-12 sm:h-14 border-primary/40 text-primary hover:bg-primary/10 font-montserrat tracking-wide"
              >
                Buy Your Lux + Free Nova
              </Button>
            </a>
            <p className="font-montserrat text-light-secondary/70 text-xs sm:text-sm mt-3 tracking-[0.12em] uppercase">
              Discreet shipping · Lifetime warranty
            </p>
          </div>
        </section>

        {/* 12. FAQ */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-baskerville text-light-primary text-2xl sm:text-4xl text-center mb-8 sm:mb-10">
              Questions, Answered
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="font-montserrat text-light-primary text-left text-sm sm:text-base hover:text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-montserrat text-light-secondary text-sm sm:text-base leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <PrelaunchFooter />

        {/* 13. Sticky mobile CTA bar */}
        <LuxStickyOfferBar href={CART_URL} />
      </div>
    </>
  );
};

export default TheLuxLanding;
