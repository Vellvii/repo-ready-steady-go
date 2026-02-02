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
    <footer className="py-12 border-t border-white/10 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/public/uploads/Vellvii-full-logo-transparent.png"
              alt="Vellvii"
              className="h-8 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-2xl font-bold text-white font-baskerville">Vellvii</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/vellvii.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:border-primary/30 transition-colors group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://x.com/OfficialVellvii"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:border-primary/30 transition-colors group"
              aria-label="X"
            >
              <XIcon className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://tiktok.com/@vellvii.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:border-primary/30 transition-colors group"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61580639793053"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:border-primary/30 transition-colors group"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Email */}
          <a
            href="mailto:hello@vellvii.com"
            className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">hello@vellvii.com</span>
          </a>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <a href="/shop" className="hover:text-primary transition-colors">Shop</a>
            <span>•</span>
            <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/40 text-sm">
              © 2026 Vellvii. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
