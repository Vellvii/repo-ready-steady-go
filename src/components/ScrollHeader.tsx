import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide header when scrolling down (after scrolling past 100px)
        setIsVisible(false);
        setMobileMenuOpen(false); // Close mobile menu when hiding
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-[1000] bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Larger and more visible */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/uploads/Vellvii-full-logo-transparent.png"
              alt="Vellvii"
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation - with right padding for cart button */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 pr-28">
            <Link
              to="/shop"
              className="font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide whitespace-nowrap"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide whitespace-nowrap"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button - positioned with right margin for cart button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-light-secondary hover:text-primary transition-colors mr-16"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="py-4 space-y-3">
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide py-2"
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide py-2"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-montserrat text-sm text-light-secondary hover:text-primary transition-colors tracking-wide py-2"
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
