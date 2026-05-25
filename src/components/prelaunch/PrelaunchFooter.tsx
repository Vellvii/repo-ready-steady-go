import { footerSocials } from "@/data/socials";

const linkColumns: { heading: string; items: { href: string; label: string }[] }[] = [
  {
    heading: "Explore",
    items: [
      { href: "/shop", label: "Shop" },
      { href: "/collections/pleasure-collection", label: "Pleasure Collection" },
      { href: "/collections/dox-compatible-products", label: "DOX-Compatible" },
      { href: "/collections/discreet-storage", label: "Discreet Storage" },
      { href: "/guides", label: "Guides" },
      { href: "/socials", label: "Socials" },
    ],
  },
  {
    heading: "Support",
    items: [
      { href: "/cart", label: "Cart" },
      { href: "/warranty", label: "Warranty" },
      { href: "/warranty/register", label: "Register Warranty" },
      { href: "/guides/discreet-storage-for-intimate-wellness-products", label: "Discreet Shipping" },
      { href: "/guides/how-to-care-for-your-vellvii-products", label: "Care Guide" },
      { href: "/guides", label: "FAQs" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
    ],
  },
];

const socials = footerSocials;

export const PrelaunchFooter = () => {
  return (
    <footer className="relative border-t border-white/10 surface-dark">
      <div className="container mx-auto px-4 sm:px-6 pt-14 pb-8">
        {/* Brand mark — centered anchor */}
        <div className="flex flex-col items-center text-center">
          <p className="font-baskerville italic text-lg sm:text-xl text-primary/80 tracking-wide">
            The Art of &lsquo;O&rsquo;
          </p>
          <img
            src="/uploads/Vellvii-full-logo-transparent.png"
            alt="Vellvii"
            className="mt-6 h-12 sm:h-14 w-auto drop-shadow-[0_0_18px_rgba(212,175,55,0.18)]"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="hidden mt-6 text-xl font-bold text-light-primary font-baskerville">Vellvii</span>
          <span className="block w-12 h-px bg-primary/30 mt-5" />
        </div>

        {/* Link columns */}
        <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-10 md:gap-12 text-center md:text-left max-w-3xl mx-auto">
          {linkColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-montserrat text-[0.65rem] uppercase tracking-[0.22em] text-light-secondary/55 mb-4">
                {col.heading}
              </h3>
              <ul className="font-montserrat text-xs sm:text-sm text-light-secondary/85 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center md:justify-between gap-5 text-center">
          <p className="text-light-muted text-xs font-montserrat order-3 md:order-1">
            © 2026 Vellvii. All rights reserved.
          </p>

          <a
            href="mailto:hello@vellvii.com"
            className="text-xs sm:text-sm font-montserrat text-light-secondary/85 hover:text-primary underline-offset-4 hover:underline transition-colors order-1 md:order-2"
          >
            hello@vellvii.com
          </a>

          <div className="flex items-center gap-5 order-2 md:order-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-light-secondary/70 hover:text-primary transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
