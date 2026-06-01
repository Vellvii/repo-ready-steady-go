import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Shield, Store, MessageSquare, ArrowRight } from "lucide-react";

type ContactCard = {
  icon: typeof LifeBuoy;
  title: string;
  copy: string;
  cta: string;
  href: string;
  helper?: string;
  secondary?: { label: string; to: string };
};

const CARDS: ContactCard[] = [
  {
    icon: LifeBuoy,
    title: "Customer Support",
    copy: "For order questions, product support, shipping enquiries, and general customer assistance.",
    cta: "Email Customer Support",
    href: "mailto:hello@vellvii.com?subject=Customer%20Support%20Enquiry",
  },
  {
    icon: Shield,
    title: "Warranty Support",
    copy: "For warranty questions, product registration, and support with an existing Vellvii product.",
    cta: "Email Warranty Support",
    href: "mailto:warranties@vellvii.com?subject=Warranty%20Support%20Enquiry",
    secondary: { label: "Register Warranty", to: "/warranty/register" },
  },
  {
    icon: Store,
    title: "Retail & Partnerships",
    copy: "For retail stores, boutiques, distributors, and wellness or lifestyle retailers interested in carrying Vellvii in their retail environment.",
    cta: "Retail Partnership Enquiry",
    href: "mailto:partner@vellvii.com?subject=Retail%20Partnership%20Enquiry",
    helper: "Please include your store name, location, website, and a short note about your retail environment.",
  },
  {
    icon: MessageSquare,
    title: "General Enquiries",
    copy: "For press, brand, business, or general questions that do not fit the categories above.",
    cta: "Email Vellvii",
    href: "mailto:info@vellvii.com?subject=General%20Enquiry",
  },
];

const HELPFUL_LINKS = [
  { label: "Shop", to: "/shop" },
  { label: "Warranty", to: "/warranty" },
  { label: "Register Warranty", to: "/warranty/register" },
  { label: "Pleasure Collection", to: "/collections/pleasure-collection" },
  { label: "Terms of Service", to: "/terms-of-service" },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Contact Vellvii | Luxury Intimate Wellness"
        description="Get in touch with the Vellvii team. Questions about orders, pre-orders, or the Vellvii DOX waitlist - we are here."
        canonical="/contact"
      />

      <ScrollHeader />

      <main className="pt-28 sm:pt-32 pb-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-14 sm:mb-20 flex flex-col items-center">
            <span className="block w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-5" />
            <p className="font-baskerville italic text-xs sm:text-sm uppercase tracking-[0.32em] text-primary/80 mb-5">
              Contact Vellvii
            </p>
            <h1 className="font-baskerville text-4xl sm:text-5xl md:text-6xl text-light-primary mb-6">
              How can we help?
            </h1>
            <p className="font-montserrat text-sm sm:text-base text-light-secondary max-w-2xl leading-relaxed">
              Whether you need help with an order, have a warranty question, or want to explore retail opportunities, we&rsquo;ll direct you to the right place.
            </p>
            <span className="block w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-8" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {CARDS.map(({ icon: Icon, title, copy, cta, href, helper, secondary }) => (
              <article
                key={title}
                className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 transition-colors hover:border-primary/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-primary/5 text-primary/80">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <h2 className="font-baskerville text-xl sm:text-2xl text-light-primary">
                    {title}
                  </h2>
                </div>

                <p className="font-montserrat text-sm text-light-secondary leading-relaxed mb-5 flex-1">
                  {copy}
                </p>

                {helper && (
                  <p className="font-montserrat text-xs text-light-secondary/70 italic leading-relaxed mb-5">
                    {helper}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-auto">
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <a href={href}>{cta}</a>
                  </Button>
                  {secondary && (
                    <Link
                      to={secondary.to}
                      className="inline-flex items-center gap-1 font-montserrat text-xs uppercase tracking-[0.18em] text-light-secondary hover:text-primary transition-colors"
                    >
                      {secondary.label}
                      <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Response time note */}
          <div className="mt-14 sm:mt-16 text-center">
            <p className="font-baskerville italic text-sm sm:text-base text-light-secondary/80">
              We aim to respond within 1&ndash;2 business days.
            </p>
          </div>

          {/* Helpful links */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-white/10">
            <p className="font-baskerville italic text-[0.7rem] uppercase tracking-[0.32em] text-primary/70 text-center mb-5">
              Helpful Links
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-montserrat text-xs sm:text-sm text-light-secondary">
              {HELPFUL_LINKS.map((l, i) => (
                <li key={l.to} className="flex items-center gap-x-5">
                  <Link to={l.to} className="hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                  {i < HELPFUL_LINKS.length - 1 && (
                    <span aria-hidden className="hidden sm:inline text-light-secondary/30">
                      &middot;
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <PrelaunchFooter />
    </div>
  );
};

export default Contact;
