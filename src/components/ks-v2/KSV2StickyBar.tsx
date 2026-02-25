import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox";

export const KSV2StickyBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4 backdrop-blur-xl border-t border-white/[0.06]"
          style={{ background: "rgba(10,10,10,0.9)" }}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="container mx-auto flex items-center justify-between gap-4 max-w-4xl">
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm">Vellvii DOX</p>
              <p className="text-white/50 text-xs">Super Early Bird from <span className="text-primary font-bold">$149</span></p>
            </div>
            <div className="sm:hidden">
              <p className="text-white/50 text-xs">From <span className="text-primary font-bold text-sm">$149</span></p>
            </div>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-black"
              style={{ background: "linear-gradient(135deg, hsl(40 70% 75%), hsl(40 65% 60%))" }}
            >
              Get Notified
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
