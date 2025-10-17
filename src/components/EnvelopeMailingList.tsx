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
            <div className="relative w-full max-w-2xl">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <X size={32} />
              </button>

              {/* Envelope SVG */}
              <div className="relative w-full aspect-[4/3]" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full relative z-10"
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

                  {/* Inner lines for decoration */}
                  <line x1="70" y1="140" x2="330" y2="140" stroke="hsl(12, 55%, 70%)" strokeWidth="1" opacity="0.3" />
                  <line x1="70" y1="160" x2="330" y2="160" stroke="hsl(12, 55%, 70%)" strokeWidth="1" opacity="0.3" />
                  <line x1="70" y1="180" x2="330" y2="180" stroke="hsl(12, 55%, 70%)" strokeWidth="1" opacity="0.3" />
                </svg>

                {/* Logo on envelope body */}
                <img
                  src="/uploads/V-logo-transparent.png"
                  alt="Vellvii logo"
                  className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[15%] opacity-90 z-5"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))' }}
                />

                {/* White paper sliding over envelope */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ 
                    y: isEnvelopeOpen ? '0%' : '100%'
                  }}
                  transition={{ 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 180,
                    delay: isEnvelopeOpen ? 0.3 : 0
                  }}
                  className="absolute transform-gpu"
                  style={{
                    left: '12.5%',
                    top: '33.33%',
                    width: '75%',
                    height: '60%',
                    background: 'hsl(30, 35%, 96%)',
                    border: '1px solid hsl(30, 20%, 80%)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    zIndex: 20,
                    willChange: 'transform',
                    pointerEvents: isEnvelopeOpen ? 'auto' : 'none'
                  }}
                >
                  {/* Paper decoration lines */}
                  <div className="absolute top-[15%] left-[8%] right-[8%] h-[1px] bg-[hsl(12,55%,70%)] opacity-30" />
                  <div className="absolute top-[25%] left-[8%] right-[8%] h-[1px] bg-[hsl(12,55%,70%)] opacity-30" />
                  <div className="absolute top-[35%] left-[8%] right-[8%] h-[1px] bg-[hsl(12,55%,70%)] opacity-30" />
                  
                  {/* Embedded form on the paper */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isEnvelopeOpen ? 1 : 0, y: isEnvelopeOpen ? 0 : 10 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute inset-0 px-[10%] pt-[17%]"
                  >
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[8%]">
                      <label 
                        htmlFor="envelope-email" 
                        className="block text-sm font-playfair text-foreground/80 text-center"
                      >
                        Get notified about updates
                      </label>
                      <input
                        id="envelope-email"
                        type="email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-3 py-1.5 text-sm bg-transparent border-none outline-none transition-colors text-center font-inter text-foreground placeholder:text-foreground/60"
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground font-medium text-base rounded-full shadow-elegant transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                      >
                        {isSubmitting ? "Sending..." : "Join"}
                      </button>
                    </form>
                    <img
                      src="/uploads/Vellvii-full-logo-transparent.png"
                      alt="Vellvii"
                      className="w-28 mx-auto opacity-50 mt-auto absolute bottom-[8%] left-1/2 -translate-x-1/2"
                    />
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
