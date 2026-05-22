import { Mail } from "lucide-react";
import { footerSocials } from "@/data/socials";

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
            {footerSocials.map(({ id, label, href, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border bg-card/70 backdrop-blur flex items-center justify-center hover:border-primary/40 transition-colors group"
                aria-label={label}
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
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
            <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="text-muted-foreground/60">•</span>
            <a href="/warranty" className="hover:text-primary transition-colors">Warranty</a>
            <span className="text-muted-foreground/60">•</span>
            <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
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
