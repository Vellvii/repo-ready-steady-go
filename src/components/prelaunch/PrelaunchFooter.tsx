import { Instagram, Facebook, Mail } from "lucide-react";

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

export const PrelaunchFooter = () => {
  return (
    <footer className="relative border-t border-white/10 surface-dark">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Tagline */}
        <div className="pt-10 sm:pt-12 pb-2 flex flex-col items-center">
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-5" />
          <p className="font-baskerville italic text-xl sm:text-2xl md:text-3xl text-primary/85 tracking-wide">
            The Art of &lsquo;O&rsquo;
          </p>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-5" />
        </div>
        <div className="flex flex-col items-center space-y-6 sm:space-y-8 py-8 sm:py-10">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/uploads/Vellvii-full-logo-transparent.png"
              alt="Vellvii"
              className="h-12 sm:h-16 md:h-20 w-auto drop-shadow-[0_0_24px_rgba(212,175,55,0.3)]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-xl sm:text-2xl font-bold text-light-primary font-baskerville">Vellvii</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4">
            <a
              href="https://instagram.com/vellvii.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all group"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-light-secondary group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://x.com/OfficialVellvii"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all group"
              aria-label="X"
            >
              <XIcon className="w-4 h-4 sm:w-5 sm:h-5 text-light-secondary group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://tiktok.com/@vellvii.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all group"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-4 h-4 sm:w-5 sm:h-5 text-light-secondary group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61580639793053"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all group"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-light-secondary group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Email */}
          <a
            href="mailto:hello@vellvii.com"
            className="flex items-center gap-2 text-light-secondary hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-montserrat">hello@vellvii.com</span>
          </a>

          {/* Grouped link columns */}
          <div className="w-full max-w-3xl mx-auto pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 text-center sm:text-left">
            {/* Explore — slightly wider to accommodate "DOX-Compatible Products" */}
            <div className="sm:col-span-1 sm:pr-2">
              <h3 className="font-baskerville italic text-xs uppercase tracking-[0.2em] text-primary/80 mb-4">
                Explore
              </h3>
              <ul className="font-montserrat text-xs sm:text-sm text-light-secondary space-y-3">
                <li><a href="/shop" className="hover:text-primary transition-colors">Shop</a></li>
                <li><a href="/collections/pleasure-collection" className="hover:text-primary transition-colors">Pleasure Collection</a></li>
                <li><a href="/collections/dox-compatible-products" className="hover:text-primary transition-colors whitespace-nowrap">DOX-Compatible Products</a></li>
                <li><a href="/collections/discreet-storage" className="hover:text-primary transition-colors">Discreet Storage</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-baskerville italic text-xs uppercase tracking-[0.2em] text-primary/80 mb-4">
                Support
              </h3>
              <ul className="font-montserrat text-xs sm:text-sm text-light-secondary space-y-3">
                <li><a href="/warranty" className="hover:text-primary transition-colors">Warranty</a></li>
                <li><a href="/warranty/register" className="hover:text-primary transition-colors">Register Warranty</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-baskerville italic text-xs uppercase tracking-[0.2em] text-primary/80 mb-4">
                Legal
              </h3>
              <ul className="font-montserrat text-xs sm:text-sm text-light-secondary space-y-3">
                <li><a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="w-full max-w-3xl mx-auto pt-6 mt-2 border-t border-white/10 text-center">
            <p className="text-light-muted text-xs sm:text-sm font-montserrat">
              © 2026 Vellvii. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
