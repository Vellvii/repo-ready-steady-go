import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Vision" },
  { id: "story", label: "Story" },
  { id: "problem", label: "Problem" },
  { id: "breakthrough", label: "Breakthrough" },
  { id: "dox", label: "The Dox" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "materials", label: "Materials" },
  { id: "security", label: "Security" },
  { id: "pricing", label: "Pricing" },
  { id: "lux", label: "Lux" },
  { id: "why", label: "Why KS" },
  { id: "timeline", label: "Timeline" },
  { id: "founder", label: "Founder" },
  { id: "faq", label: "FAQ" },
];

export const KickstarterSideIndex = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);

      const offsets = sections.map(({ id }) => {
        const el = document.getElementById(id);
        return { id, top: el?.getBoundingClientRect().top ?? Infinity };
      });

      const current = offsets.reduce((closest, section) =>
        Math.abs(section.top) < Math.abs(closest.top) ? section : closest
      );
      setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2"
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group flex items-center gap-2.5"
            >
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-500",
                  activeSection === id
                    ? "bg-primary w-2.5 h-2.5 shadow-[0_0_8px_hsl(40_65%_72%/0.4)]"
                    : "bg-white/15 group-hover:bg-white/30"
                )}
              />
              <span
                className={cn(
                  "font-montserrat text-[10px] uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap",
                  activeSection === id
                    ? "text-primary/80 opacity-100"
                    : "text-white/0 group-hover:text-white/50"
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
