import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

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
          <div className="flex gap-6">
            <a
              href="#"
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:border-primary/30 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-white/70 hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:border-primary/30 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-white/70 hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:border-primary/30 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-white/70 hover:text-primary transition-colors" />
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
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-white/40 text-sm">
              © 2025 Vellvii. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Crafted by{" "}
              <a
                href="https://lumarostudios.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Lumaro Studios
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
