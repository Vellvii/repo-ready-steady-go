import { Instagram, Facebook } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const linkColumns: { heading: string; items: { href: string; label: string }[] }[] = [
  {
    heading: "Explore",
    items: [
      { href: "/shop", label: "Shop" },
      { href: "/collections/pleasure-collection", label: "Pleasure Collection" },
      { href: "/collections/dox-compatible-products", label: "DOX-Compatible" },
      { href: "/collections/discreet-storage", label: "Discreet Storage" },
      { href: "/guides", label: "Guides" },
    ],
  },
  {
    heading: "Support",
    items: [
      { href: "/warranty", label: "Warranty" },
      { href: "/warranty/register", label: "Register Warranty" },
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

const socials: { href: string; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { href: "https://instagram.com/vellvii.official", label: "Instagram", Icon: Instagram },
  { href: "https://x.com/OfficialVellvii", label: "X", Icon: XIcon },
  { href: "https://tiktok.com/@vellvii.official", label: "TikTok", Icon: TikTokIcon },
  { href: "https://www.facebook.com/profile.php?id=61580639793053", label: "Facebook", Icon: Facebook },
];

export const PrelaunchFooter = () => {
  return (
    <footer className="relative border-t border-white/10 surface-dark">
      <div className="container mx-auto px-4 sm:px-6 pt-14 pb-8">
        {/* Tagline — quiet, single accent */}
        <div className="flex flex-col items-center text-center">
          <p className="font-baskerville italic text-lg sm:text-xl text-primary/80 tracking-wide">
            The Art of &lsquo;O&rsquo;
          </p>
          <span className="block w-12 h-px bg-primary/30 mt-4" />
        </div>

        {/* Top row: logo + link columns */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-12 md:gap-16 items-start">
          <div className="flex md:block justify-center">
            <img
              src="/uploads/Vellvii-full-logo-transparent.png"
              alt="Vellvii"
              className="h-14 sm:h-16 w-auto drop-shadow-[0_0_18px_rgba(212,175,55,0.18)]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-xl font-bold text-light-primary font-baskerville">Vellvii</span>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-10 text-center md:text-left">
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
