import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { Truck, Package, Shield, Sparkles } from "lucide-react";

/**
 * Standalone Google Ads landing page for the Vellvii Lux.
 *
 * Strictly non-explicit copy. No references to sex toys, vibrators,
 * pleasure, intimate, or adult terminology. One CTA: pre-order on
 * the Lux product page. No site navigation. Reuses existing
 * Vellvii design tokens (no new visual system).
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

  return (
    <>
      <SEO
        title="Vellvii Lux | Biometric Leather Travel Case - Fingerprint Locked"
        description="A genuine leather biometric travel case with fingerprint-lock security and USB charging. Discreet. Considered. Designed for those who value what they protect."
        canonical="/pages/the-lux"
        type="website"
        image={images[0]?.url}
      />

      <div className="min-h-screen surface-dark-rich overflow-x-clip">
        {/* Minimal header: logo only, no nav */}
        <header className="w-full px-4 sm:px-8 py-5 sm:py-7 flex items-center justify-center">
          <img
            src="/uploads/Vellvii-full-logo-transparent.png"
            alt="Vellvii"
            className="h-8 sm:h-10"
          />
        </header>

        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-10 sm:pb-14">
          <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-7">
            <p className="font-montserrat text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs">
              Reserve Now - Ships End of June
            </p>
            <h1 className="font-baskerville font-bold text-light-primary text-3xl sm:text-5xl md:text-6xl leading-tight">
              The Lux - A Biometric Leather Case Worth Keeping
            </h1>
            <p className="font-baskerville italic text-primary/90 text-lg sm:text-2xl">
              Fingerprint-locked. Velvet-lined. Quietly extraordinary.
            </p>
          </div>
        </section>

        {/* Hero image */}
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

        {/* Body copy */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="max-w-2xl mx-auto">
            <p className="font-montserrat text-light-secondary leading-relaxed text-base sm:text-lg text-center">
              Some things deserve more than a drawer. The Vellvii Lux is a
              premium biometric leather case with fingerprint-lock security,
              two integrated USB-A charging ports, and a velvet-lined interior
              - designed for private, personal items you'd rather keep exactly
              that way. Compact enough for travel. Refined enough to stay on
              the nightstand. Genuine leather. Discreet shipping. Lifetime
              warranty.
            </p>
          </div>
        </section>

        {/* Primary CTA */}
        <section className="px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
          <div className="max-w-md mx-auto">
            <Link to="/products/vellvii-lux">
              <Button
                size="lg"
                className="btn-premium w-full h-14 sm:h-16 text-base sm:text-lg font-bold tracking-wide whitespace-normal text-center leading-tight"
              >
                Pre-Order Now - Ships End of June
              </Button>
            </Link>
          </div>
        </section>

        {/* Supporting gallery */}
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

        {/* Trust badges */}
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

        {/* Secondary CTA */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="max-w-md mx-auto text-center">
            <Link to="/products/vellvii-lux">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-12 sm:h-14 border-primary/40 text-primary hover:bg-primary/10 font-montserrat tracking-wide"
              >
                Reserve Your Lux
              </Button>
            </Link>
          </div>
        </section>

        {/* Minimal footer */}
        <footer className="border-t border-white/10 px-4 sm:px-6 py-6 sm:py-8 text-center">
          <p className="font-montserrat text-xs text-light-muted">
            (c) 2026 Vellvii. The Art of 'O'.
            {" "}
            <Link to="/privacy-policy" className="hover:text-primary">Privacy</Link>
            {" - "}
            <Link to="/terms-of-service" className="hover:text-primary">Terms</Link>
            {" - "}
            <Link to="/warranty" className="hover:text-primary">Warranty</Link>
          </p>
        </footer>
      </div>
    </>
  );
};

export default TheLuxLanding;
