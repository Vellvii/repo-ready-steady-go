import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NavMenuButton } from "@/components/navigation/LuxuryNavDrawer";

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
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3 h-16 sm:h-20">
          {/* Left: menu trigger */}
          <NavMenuButton className="-ml-2" />

          {/* Center: Logo */}
          <Link to="/" className="flex items-center justify-self-center">
            <img
              src="/uploads/Vellvii-full-logo-transparent.png"
              alt="Vellvii"
              className="h-12 sm:h-14 md:h-16 w-auto"
            />
          </Link>

          {/* Right spacer for floating cart button */}
          <div className="w-12 sm:w-14" aria-hidden />
        </div>
      </div>
    </motion.header>
  );
};
