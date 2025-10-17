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
              <div className="relative w-full aspect-[4/3] perspective-[1000px]">
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

                {/* Clipping window over envelope body - keeps paper hidden behind until it rises */}
                <div
                  className="absolute z-20"
                  style={{
                    left: '12.5%',
                    top: '33.333%',
                    width: '75%',
                    height: '60%',
                    overflow: 'hidden',
                    borderRadius: '4px'
                  }}
                >
                  <motion.div
                    initial={{ y: '24%', zIndex: 5 }}
                    animate={{ 
                      y: isEnvelopeOpen ? ['24%', '-72%', '0%'] : '24%',
                      zIndex: isEnvelopeOpen ? [5, 25, 25] : 5
                    }}
                    transition={{ duration: 1.05, ease: 'easeInOut', times: [0, 0.58, 1], delay: 0.35 }}
                    className="absolute left-[6.666%] top-[6%] w-[86.666%] h-[86%]"
                    style={{
                      background: 'hsl(30, 35%, 96%)',
                      border: '1px solid hsl(30, 20%, 80%)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                      willChange: 'transform',
                      pointerEvents: 'auto'
                    }}
                  >
                    {/* Paper decoration lines */}
                    <div className="absolute top-[20%] left-[7.7%] right-[7.7%] h-[1px] bg-[hsl(12,55%,70%)] opacity-30" />
                    <div className="absolute top-[30%] left-[7.7%] right-[7.7%] h-[1px] bg-[hsl(12,55%,70%)] opacity-30" />
                    <div className="absolute top-[40%] left-[7.7%] right-[7.7%] h-[1px] bg-[hsl(12,55%,70%)] opacity-30" />
                    
                    {/* Embedded form on the paper */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isEnvelopeOpen ? 1 : 0 }}
                      transition={{ delay: 0.7 }}
                      className="absolute inset-0 flex items-start justify-center pt-[15%] px-[7.7%]"
                    >
                      <form onSubmit={handleSubmit} className="w-full space-y-3">
                        <label 
                          htmlFor="envelope-email" 
                          className="block text-xs font-playfair text-foreground/80 text-center"
                        >
                          Get notified about updates
                        </label>
                        <input
                          id="envelope-email"
                          type="email"
                          value={email}
                          onChange={(e) => onEmailChange(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-3 py-2 text-xs bg-background/90 border-b-2 border-primary/30 focus:border-primary outline-none transition-colors text-center font-inter text-foreground placeholder:text-muted-foreground rounded"
                          disabled={isSubmitting}
                          autoComplete="email"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2 px-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground font-medium text-xs rounded-full shadow-elegant transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Sending..." : "Join"}
                        </button>
                      </form>
                    </motion.div>
                  </motion.div>
                </div>

                {/* 3D Flap overlay (HTML) for a true flip */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isEnvelopeOpen ? 140 : 0 }}
                  transition={{ type: "spring", damping: 24, stiffness: 160, delay: 0.25 }}
                  className="absolute z-30"
                  style={{
                    left: '12.5%',
                    top: '10%',
                    width: '75%',
                    height: '23.333%',
                    transformOrigin: '50% 100%',
                    pointerEvents: isEnvelopeOpen ? 'none' : 'auto',
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div
                    className="w-full h-full rounded-b-[2px]"
                    style={{
                      background: 'linear-gradient(180deg, hsl(12, 55%, 68%), hsl(12, 50%, 58%))',
                      clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                      border: '2px solid hsl(12, 50%, 55%)'
                    }}
                  >
                    <img
                      src="/uploads/V-logo-transparent.png"
                      alt="Vellvii logo seal"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[14%] opacity-95"
                    />
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
