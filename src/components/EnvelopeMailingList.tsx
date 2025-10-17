import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface EnvelopeMailingListProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const EnvelopeMailingList = ({
  isOpen,
  onClose,
  email,
  onEmailChange,
  onSubmit,
  isSubmitting,
}: EnvelopeMailingListProps) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Delay opening animation
      const timer = setTimeout(() => setIsEnvelopeOpen(true), 400);
      return () => clearTimeout(timer);
    } else {
      setIsEnvelopeOpen(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleClose = () => {
    setIsEnvelopeOpen(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />

          {/* Envelope Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-[1001] p-4"
          >
            <div className="relative w-full max-w-md">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <X size={32} />
              </button>

              {/* Envelope SVG */}
              <div className="relative w-full aspect-[4/3]">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="envelopeBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(12, 55%, 70%)" />
                      <stop offset="50%" stopColor="hsl(12, 60%, 65%)" />
                      <stop offset="100%" stopColor="hsl(15, 50%, 75%)" />
                    </linearGradient>
                    <linearGradient id="envelopeFlap" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(12, 60%, 60%)" />
                      <stop offset="100%" stopColor="hsl(12, 55%, 65%)" />
                    </linearGradient>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
                    </filter>
                  </defs>

                  {/* Envelope Body */}
                  <rect
                    x="50"
                    y="100"
                    width="300"
                    height="180"
                    fill="url(#envelopeBody)"
                    stroke="hsl(12, 50%, 55%)"
                    strokeWidth="2"
                    rx="4"
                    filter="url(#shadow)"
                  />

                  {/* Paper that slides out */}
                  <motion.g
                    initial={{ y: 0 }}
                    animate={{ y: isEnvelopeOpen ? -80 : 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.4 }}
                  >
                    <rect
                      x="70"
                      y="120"
                      width="260"
                      height="200"
                      fill="hsl(30, 35%, 96%)"
                      stroke="hsl(30, 20%, 80%)"
                      strokeWidth="1"
                      rx="2"
                      filter="url(#shadow)"
                    />
                    {/* Paper lines decoration */}
                    <line x1="90" y1="160" x2="310" y2="160" stroke="hsl(12, 55%, 70%)" strokeWidth="1" opacity="0.3" />
                    <line x1="90" y1="180" x2="310" y2="180" stroke="hsl(12, 55%, 70%)" strokeWidth="1" opacity="0.3" />
                    <line x1="90" y1="200" x2="310" y2="200" stroke="hsl(12, 55%, 70%)" strokeWidth="1" opacity="0.3" />
                  </motion.g>

                  {/* Envelope Flap - rendered last to be on top */}
                  <motion.path
                    d="M 50 100 L 200 30 L 350 100 Z"
                    fill="url(#envelopeFlap)"
                    stroke="hsl(12, 50%, 55%)"
                    strokeWidth="2"
                    filter="url(#shadow)"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isEnvelopeOpen ? -180 : 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.2 }}
                    style={{ originX: "200px", originY: "100px" }}
                  />

                  {/* V-Logo on flap */}
                  <motion.image
                    href="/uploads/V-logo-transparent.png"
                    x="175"
                    y="50"
                    width="50"
                    height="50"
                    opacity="0.95"
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{ 
                      rotate: isEnvelopeOpen ? -180 : 0,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      rotate: { type: "spring", damping: 25, stiffness: 120, delay: 0.2 },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{ 
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                      originX: "200px",
                      originY: "100px"
                    }}
                  />
                </svg>

                {/* Form Content Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isEnvelopeOpen ? 1 : 0,
                    y: isEnvelopeOpen ? 0 : 20
                  }}
                  transition={{ delay: 0.7, type: "spring", damping: 20 }}
                  className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[70%] pointer-events-auto z-10"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label 
                        htmlFor="envelope-email" 
                        className="block text-sm font-playfair text-foreground/80 mb-2 text-center"
                      >
                        Get notified about updates
                      </label>
                      <input
                        id="envelope-email"
                        type="email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 text-sm bg-white/90 border-b-2 border-primary/30 focus:border-primary outline-none transition-colors text-center font-inter text-foreground placeholder:text-muted-foreground"
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 px-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground font-medium text-sm rounded-full shadow-elegant transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Join"}
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
