import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const ScrollHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y < lastScrollY || y < 50) setIsVisible(true);
      else if (y > lastScrollY && y > 100) setIsVisible(false);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-xl transition-colors duration-500 ${
        scrolled
          ? "bg-black/55 border-b border-primary/15"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/uploads/Vellvii-full-logo-transparent.png"
              alt="Vellvii"
              className="h-12 sm:h-14 md:h-16 w-auto"
            />
          </Link>

          {/* Centered tagline (desktop only) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <span className="font-baskerville italic text-[0.7rem] tracking-[0.32em] uppercase text-primary/70">
              The Art of &lsquo;O&rsquo;
            </span>
          </div>

          {/* Right spacer for floating cart button */}
          <div className="w-12 sm:w-14" aria-hidden />
        </div>
      </div>
    </motion.header>
  );
};
