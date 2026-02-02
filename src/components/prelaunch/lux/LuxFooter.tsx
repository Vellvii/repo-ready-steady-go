import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const LuxFooter = () => {
  return (
    <footer className="relative border-t border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-12 py-20">
          {/* Tagline */}
          <div className="text-center space-y-4">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-baskerville leading-tight">
              LUX
            </p>
            <p className="text-xl sm:text-2xl text-muted-foreground font-light italic">
              Where Privilege Becomes Presence.
            </p>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/uploads/Vellvii-full-logo-transparent.png"
              alt="Vellvii"
              className="h-8 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-2xl font-bold text-foreground font-baskerville">Vellvii</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/vellvii.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border bg-card/70 backdrop-blur flex items-center justify-center hover:border-primary/40 transition-colors group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://x.com/OfficialVellvii"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border bg-card/70 backdrop-blur flex items-center justify-center hover:border-primary/40 transition-colors group"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://tiktok.com/@vellvii.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border bg-card/70 backdrop-blur flex items-center justify-center hover:border-primary/40 transition-colors group"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61580639793053"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border bg-card/70 backdrop-blur flex items-center justify-center hover:border-primary/40 transition-colors group"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Email */}
          <a
            href="mailto:hello@vellvii.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">hello@vellvii.com</span>
          </a>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="text-muted-foreground/60">•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-muted-foreground/80 text-sm">
              © 2025 Vellvii. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
